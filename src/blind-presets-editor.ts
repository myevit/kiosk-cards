import { LitElement, html, nothing, css } from "lit";
import type { Hass } from "./types.js";
import { nativeComponents } from "./native.js";
import { importCommands, nativeServices, type BlindCommand } from './blind-commands.js';
import {
  blindPicture,
  presetProblem,
  validateBlindConfig,
  type Blind,
  type BlindPreset,
  type BlindPresetsConfig,
} from "./blind-presets.js";
const number = (name: string, min: number, max: number, step = 1) => ({
  name,
  selector: { number: { min, max, step, mode: "box" } },
});
const text = (name: string) => ({ name, selector: { text: {} } });
const blindSchema = [
  {
    name: "entity",
    required: true,
    selector: { entity: { filter: { domain: "cover" } } },
  },
  text("name"),
  number("width", 0.1, 10, 0.1),
];
export class KioskBlindPresetsEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    draft: { state: true },
    newBlind: { state: true },
    error: { state: true },
    removing: { state: true },
    sourceScript: { state: true },
    copying: { state: true },
  };
  declare hass: Hass;
  declare config: BlindPresetsConfig;
  private draft?: BlindPreset;
  private draftIndex = -1;
  private newBlind: Partial<Blind> = { width: 1 };
  private error = "";
  private sourceScript = '';
  private copying = false;
  private removing?: {
    kind: "blind" | "preset";
    index: number;
  };
  connectedCallback() {
    super.connectedCallback();
    nativeComponents(["ha-form"]).catch(() => {
      this.error =
        "Home Assistant native form controls could not load. Reopen the editor.";
    });
  }
  setConfig(c: BlindPresetsConfig) {
    this.sourceScript = '';
    this.config = structuredClone(c);
    this.draft = undefined;
    this.removing = undefined;
    this.error = "";
  }
  private emit(c: BlindPresetsConfig) {
    try {
      validateBlindConfig(c);
    } catch (e) {
      this.error = (e as Error).message;
      return false;
    }
    this.config = c;
    this.error = "";
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: structuredClone(c) },
        bubbles: true,
        composed: true,
      }),
    );
    return true;
  }
  private updateGrid(e: CustomEvent) {
    e.stopPropagation();
    const v = e.detail.value;
    this.emit({ ...this.config, rows: v.rows, columns: v.columns });
  }
  private updateBlind(i: number, e: CustomEvent) {
    e.stopPropagation();
    const c = structuredClone(this.config);
    c.blinds[i] = { ...c.blinds[i], ...e.detail.value };
    this.emit(c);
  }
  private moveBlind(i: number, d: number) {
    const c = structuredClone(this.config),
      j = i + d;
    [c.blinds[i], c.blinds[j]] = [c.blinds[j], c.blinds[i]];
    for (const p of c.presets)
      [p.positions[i], p.positions[j]] = [p.positions[j], p.positions[i]];
    this.emit(c);
  }
  private addBlind() {
    const b = { ...this.newBlind } as Blind,
      c = structuredClone(this.config);
    c.blinds.push(b);
    for (const p of c.presets) p.positions.push({ top: 0, bottom: 100 });
    if (this.emit(c)) this.newBlind = { width: 1 };
  }
  private edit(i: number) {
    this.sourceScript = '';
    this.error = "";
    this.draftIndex = i;
    this.draft = structuredClone(this.config.presets[i]);
  }
  private addPreset() {
    this.sourceScript = '';
    this.draftIndex = this.config.presets.length;
    this.error = "";
    let n = this.draftIndex + 1;
    while (this.config.presets.some((p) => p.id === `preset-${n}`)) n++;
    this.draft = {
      id: `preset-${n}`,
      name: `Preset ${this.draftIndex + 1}`,
      positions: this.config.blinds.map(() => ({ top: 0, bottom: 100 })),
    };
  }
  private get draftProblem() {
    if (!this.draft) return "";
    try {
      const c = structuredClone(this.config);
      c.presets[this.draftIndex] = this.draft;
      validateBlindConfig(c);
    } catch (e) {
      return (e as Error).message;
    }
    return presetProblem(this.draft);
  }
  private save() {
    if (!this.draft || this.draftProblem) return;
    const c = structuredClone(this.config);
    c.presets[this.draftIndex] = this.draft;
    if (this.emit(c)) this.draft = undefined;
  }
  private async copyCommands() {
    if (!this.draft || !/^script\.[a-z0-9_]+$/.test(this.sourceScript) || !this.hass.callWS || this.copying) return;
    const draft = this.draft, source = this.sourceScript, config = this.config;
    this.copying = true;
    this.error = '';
    try {
      const result = await this.hass.callWS({type:'script/config', entity_id:source});
      const commands = importCommands(result, config.blinds.map(b => b.entity));
      if (!this.isConnected || this.draft !== draft || this.sourceScript !== source || this.config !== config) return;
      const next = {...draft, commands};
      delete next.actions;
      this.draft = next;
    } catch (e) {
      if (this.draft === draft && this.sourceScript === source && this.config === config) this.error = (e as Error).message;
    } finally { this.copying = false; }
  }
  private commandChange(entity: string, e: CustomEvent) {
    e.stopPropagation();
    if (!this.draft) return;
    const value = e.detail.value;
    const commands = structuredClone(this.draft.commands ?? this.draft.actions ?? []);
    const index = commands.findIndex(c => c.entity_id === entity);
    if (!value.service || value.service === 'untouched') {
      if (index >= 0) commands.splice(index, 1);
    } else {
      const field = value.service === 'set_cover_position' ? 'position' : value.service === 'set_cover_tilt_position' ? 'tilt_position' : undefined;
      const c = {service:value.service,entity_id:entity,...(field ? {[field]:value.value} : {})} as BlindCommand;
      if (index >= 0) commands[index] = c; else commands.push(c);
    }
    const next = {...this.draft};
    delete next.actions;
    if (commands.length) next.commands = commands; else delete next.commands;
    this.draft = next;
  }
  private removeItem() {
    if (!this.removing) return;
    const c = structuredClone(this.config),
      { kind, index } = this.removing;
    if (kind === "blind") {
      c.blinds.splice(index, 1);
      for (const p of c.presets) p.positions.splice(index, 1);
    } else c.presets.splice(index, 1);
    if (this.emit(c)) {
      this.removing = undefined;
      this.draft = undefined;
    }
  }
  private movePreset(i: number, d: number) {
    const c = structuredClone(this.config),
      j = i + d;
    [c.presets[i], c.presets[j]] = [c.presets[j], c.presets[i]];
    this.emit(c);
  }
  private label = (s: { name: string }) =>
    ({
      rows: "Grid rows",
      columns: "Grid columns",
      entity: "Cover entity",
      name: "Accessible name",
      width: "Relative picture width",
      top: "Top (% down)",
      bottom: "Bottom (% down)",
    })[s.name] || s.name;
  static styles = css`
    :host {
      display: block;
    }
    h3 {
      margin: 16px 0 8px;
      font-size: 16px;
    }
    p {
      font-size: 14px;
      color: var(--secondary-text-color);
    }
    button {
      font: inherit;
      cursor: pointer;
      min-height: 44px;
      padding: 8px 12px;
      border: 1px solid var(--divider-color, #888);
      border-radius: 8px;
      background: var(--ha-card-background, var(--card-background-color, #fff));
      color: var(--primary-text-color);
    }
    button:disabled {
      opacity: 0.45;
      cursor: default;
    }
    button:focus-visible {
      outline: 3px solid var(--accent-color);
      outline-offset: 2px;
    }
    .actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin: 8px 0;
    }
    .blind {
      border-bottom: 1px solid var(--divider-color);
      padding: 8px 0;
    }
    .pictures {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
      gap: 12px;
    }
    .tile {
      aspect-ratio: 1.2133333;
      padding: 0;
      background: rgba(0, 0, 0, 0.3);
      color: white;
    }
    .tile svg {
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    [data-preview] {
      width: 160px;
      height: 132px;
      background: rgba(0, 0, 0, 0.3);
      color: white;
      border-radius: 14px;
      margin: 12px auto;
    }
    [data-preview] svg {
      width: 100%;
      height: 100%;
    }
    [role="status"] {
      display: block;
      color: var(--error-color, #db4437);
      font-size: 14px;
      margin: 8px 0;
    }
    pre {
      white-space: pre-wrap;
      overflow-wrap: anywhere;
    }
  `;
  render() {
    if (!this.config) return nothing;
    if (this.removing)
      return html`<p>
          Remove this ${this.removing.kind}?
          ${this.removing.kind === "blind" ? "Its coordinates will be removed from every preset." : "This preset will be deleted."}
          This cannot be undone here.
        </p>
        <div class="actions">
          <button @click=${() => this.removeItem()}>Confirm removal</button
          ><button @click=${() => (this.removing = undefined)}>
            Cancel removal
          </button>
        </div>`;
    if (this.draft) {
      const problem = this.draftProblem;
      return html`<h3>Edit preset</h3>
        <ha-form
          .hass=${this.hass}
          .data=${{ name: this.draft.name }}
          .schema=${[text("name")]}
          .computeLabel=${this.label}
          @value-changed=${(e: CustomEvent) => {
            e.stopPropagation();
            this.draft = { ...this.draft!, name: e.detail.value.name };
          }}
        ></ha-form>
        <div data-preview>
          ${blindPicture(this.config.blinds, this.draft.positions)}
        </div>
        <p>
          Pictures use percentages down from the top. Without native overrides,
          sequential blinds require top 0 or bottom 100. Native overrides match
          reported command attributes, not measured rail geometry. Saving never moves blinds.
        </p>
        <ha-form data-script .hass=${this.hass} .data=${{script:this.sourceScript}}
          .schema=${[{name:'script',selector:{entity:{filter:{domain:'script'}}}}]}
          .computeLabel=${() => 'Copy from existing script (optional)'}
          @value-changed=${(e: CustomEvent) => {e.stopPropagation(); this.sourceScript = e.detail.value.script ?? ''; this.error = '';}}
        ></ha-form>
        <button ?disabled=${!this.sourceScript || this.copying || !this.hass?.callWS} @click=${() => this.copyCommands()}>Copy commands</button>
        <p>Copies only simple cover actions into this draft. Review commands and picture, then Save. No script is run or linked.</p>
        <h3>Native override (optional)</h3>
        <p>With an override, only listed shades are commanded; all others are untouched. Removing the override restores sequential mode.</p>
        ${this.config.blinds.map(b => {
          const c = (this.draft!.commands ?? this.draft!.actions)?.find(c => c.entity_id === b.entity);
          const numeric = c?.service === 'set_cover_position' || c?.service === 'set_cover_tilt_position';
          return html`<ha-form data-command=${b.entity} .hass=${this.hass}
            .data=${{service:c?.service ?? 'untouched',value:c?.service === 'set_cover_position' ? c.position : c?.service === 'set_cover_tilt_position' ? c.tilt_position : 0}}
            .schema=${[{name:'service',selector:{select:{mode:'dropdown',options:[{value:'untouched',label:'Untouched (no native command)'},...nativeServices.map(value=>({value,label:value}))]}}},...(numeric ? [number('value',0,100)] : [])]}
            .computeLabel=${(s: {name:string}) => s.name === 'service' ? (b.name || b.entity) : 'Native value (%)'}
            @value-changed=${(e: CustomEvent) => this.commandChange(b.entity,e)}></ha-form>`;
        })}
        ${(this.draft.commands ?? this.draft.actions) ? html`<pre data-command-preview>${JSON.stringify(this.draft.commands ?? this.draft.actions,null,2)}</pre><button @click=${() => {const p = {...this.draft!};delete p.commands;delete p.actions;this.draft = p;}}>Remove override</button>` : nothing}
        ${this.config.blinds.map(
          (b, i) =>
            html`<h3>
                ${b.name || ["Left", "Middle", "Right"][i] || `Blind ${i + 1}`}
              </h3>
              <ha-form
                data-position=${i}
                .hass=${this.hass}
                .data=${this.draft!.positions[i]}
                .schema=${[number("top", 0, 100), number("bottom", 0, 100)]}
                .computeLabel=${this.label}
                @value-changed=${(e: CustomEvent) => {
                  e.stopPropagation();
                  const p = structuredClone(this.draft!);
                  p.positions[i] = { ...p.positions[i], ...e.detail.value };
                  this.draft = p;
                }}
              ></ha-form>`,
        )}${problem ? html`<span role="status">${problem}</span>` : nothing}${this.error ? html`<span role="status">${this.error}</span>` : nothing}
        <div class="actions">
          <button ?disabled=${!!problem} @click=${() => this.save()}>
            Save</button
          ><button @click=${() => (this.draft = undefined)}>Cancel</button
          >${this.draftIndex < this.config.presets.length ? html`<button @click=${() => (this.removing = { kind: "preset", index: this.draftIndex })}>Remove preset</button>` : nothing}
        </div>`;
    }
    return html`<ha-form
        data-grid
        .hass=${this.hass}
        .data=${{ rows: this.config.rows, columns: this.config.columns }}
        .schema=${[number("rows", 1, 12), number("columns", 1, 12)]}
        .computeLabel=${this.label}
        @value-changed=${this.updateGrid}
      ></ha-form>
      <p>
        Remove extra presets explicitly before shrinking the grid. Narrow cards
        wrap columns to keep 44px touch targets.
      </p>
      <h3>Blinds (picture order)</h3>
      ${this.config.blinds.map(
        (b, i) =>
          html`<section class="blind">
            <ha-form
              data-blind=${i}
              .hass=${this.hass}
              .data=${b}
              .schema=${blindSchema}
              .computeLabel=${this.label}
              @value-changed=${(e: CustomEvent) => this.updateBlind(i, e)}
            ></ha-form>
            <div class="actions">
              <button
                aria-label=${`Move blind ${b.name || i + 1} up`}
                ?disabled=${i === 0}
                @click=${() => this.moveBlind(i, -1)}
              >
                ↑</button
              ><button
                aria-label=${`Move blind ${b.name || i + 1} down`}
                ?disabled=${i === this.config.blinds.length - 1}
                @click=${() => this.moveBlind(i, 1)}
              >
                ↓</button
              ><button
                aria-label=${`Remove blind ${b.name || i + 1}`}
                ?disabled=${this.config.blinds.length === 1}
                @click=${() => (this.removing = { kind: "blind", index: i })}
              >
                Remove
              </button>
            </div>
          </section>`,
      )}
      <h3>Add blind</h3>
      <ha-form
        data-new-blind
        .hass=${this.hass}
        .data=${this.newBlind}
        .schema=${blindSchema}
        .computeLabel=${this.label}
        @value-changed=${(e: CustomEvent) => {
          e.stopPropagation();
          this.newBlind = { ...this.newBlind, ...e.detail.value };
        }}
      ></ha-form>
      <div class="actions">
        <button
          ?disabled=${this.config.blinds.length >= 12 || !this.newBlind.entity}
          @click=${() => this.addBlind()}
        >
          Add blind
        </button>
      </div>
      <h3>Presets</h3>
      <div class="pictures">
        ${this.config.presets.map((p, i) => html`<button class="tile" aria-label=${`Edit ${p.name}`} title=${presetProblem(p)} @click=${() => this.edit(i)}>${blindPicture(this.config.blinds, p.positions)}</button>`)}
      </div>
      ${this.config.presets.map((p, i) => html`<div class="actions"><span>${p.name}</span><button aria-label=${`Move preset ${p.name} up`} ?disabled=${i === 0} @click=${() => this.movePreset(i, -1)}>↑</button><button aria-label=${`Move preset ${p.name} down`} ?disabled=${i === this.config.presets.length - 1} @click=${() => this.movePreset(i, 1)}>↓</button></div>`)}<button
        ?disabled=${!this.config.blinds.length || this.config.presets.length >= this.config.rows * this.config.columns}
        @click=${() => this.addPreset()}
      >
        Add preset</button
      >${this.error ? html`<span role="status">${this.error}</span>` : nothing}`;
  }
}
if (!customElements.get("kiosk-blind-presets-editor"))
  customElements.define("kiosk-blind-presets-editor", KioskBlindPresetsEditor);