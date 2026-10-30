import { LitElement, html, svg, nothing, css } from "lit";
import { kioskStyles } from "./design.js";
import type { Hass, State } from "./types.js";
import { validateCommands, nativeAvailable, nativeMatches, type BlindCommand } from './blind-commands.js';
export interface BlindPosition {
  top: number;
  bottom: number;
  ignored?: boolean;
  [key: string]: unknown;
}
export interface Blind {
  entity?: string;
  entity_top?: string;
  entity_bottom?: string;
  name?: string;
  width?: number;
  mapping?: "sequential-tdbu" | "independent-tdbu" | "native-dual-cover";
  [key: string]: unknown;
}
export interface BlindPreset {
  id: string;
  name: string;
  positions: BlindPosition[];
  commands?: BlindCommand[];
  actions?: BlindCommand[];
  [key: string]: unknown;
}
export interface BlindPresetsConfig {
  type: string;
  blinds: Blind[];
  rows: number;
  columns: number;
  presets: BlindPreset[];
  [key: string]: any;
}
/** Absolute coordinates down from the top. The 2px gathered fabric is intentional. */
export function blindPicture(blinds: Blind[], positions: BlindPosition[]) {
  const widths = blinds.map((b) => b.width ?? 1),
    total = widths.reduce((a, b) => a + b, 0);
  let x = 8;
  return svg`<svg viewBox="0 0 120 100" aria-hidden="true" focusable="false">${blinds.map(
    (b, i) => {
      const w = ((104 - 4 * (blinds.length - 1)) * widths[i]) / total,
        left = x;
      x += w + 4;
      const p = positions[i] ?? { top: 0, bottom: 100 };
      if (p.ignored) return svg`<g data-ignored opacity="0.35"><rect x=${left} y="12" width=${w} height="76" rx="1" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/><path data-ignore-mark d=${`M ${left} 88 L ${left + w} 12`} fill="none" stroke="currentColor" stroke-width="2"/></g>`;
      return svg`<g><rect x=${left} y="12" width=${w} height="76" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect data-fabric x=${left} y=${12 + Math.min(74, (76 * p.top) / 100)} width=${w} height=${Math.max(2, (76 * (p.bottom - p.top)) / 100)} rx="1" fill="currentColor"/></g>`;
    },
  )}</svg>`;
}
export function validateBlindConfig(c: BlindPresetsConfig) {
  if (
    !c ||
    !Number.isInteger(c.rows) ||
    c.rows < 1 ||
    c.rows > 12 ||
    !Number.isInteger(c.columns) ||
    c.columns < 1 ||
    c.columns > 12
  )
    throw Error("Rows and columns must be integers from 1 to 12");
  if (!Array.isArray(c.blinds) || !c.blinds.length || c.blinds.length > 12)
    throw Error("Choose 1–12 blinds");
  const ids = new Set<string>();
  for (const b of c.blinds) {
    if (!b) throw Error("Choose unique cover entities");
    const entities = b.mapping === 'native-dual-cover'
      ? [b.entity_top, b.entity_bottom, ...(b.entity === undefined ? [] : [b.entity])]
      : [b.entity];
    for (const entity of entities) {
      if (typeof entity !== 'string' || !/^cover\.[a-z0-9_]+$/.test(entity) || ids.has(entity))
        throw Error('Choose unique cover entities (native dual cover requires distinct top and bottom)');
      ids.add(entity);
    }
    if (
      b.width !== undefined &&
      (typeof b.width !== "number" ||
        !Number.isFinite(b.width) ||
        b.width <= 0 ||
        b.width > 10)
    )
      throw Error("Blind widths must be greater than 0 and at most 10");
    if (b.mapping !== undefined && !['sequential-tdbu', 'independent-tdbu', 'native-dual-cover'].includes(b.mapping))
      throw Error("Choose sequential-tdbu, independent-tdbu or native-dual-cover mapping");
  }
  if (!Array.isArray(c.presets) || c.presets.length > c.rows * c.columns)
    throw Error("Remove presets before shrinking the grid");
  ids.clear();
  for (const p of c.presets) {
    if (
      !p ||
      typeof p.id !== "string" ||
      !p.id.trim() ||
      ids.has(p.id) ||
      typeof p.name !== "string" ||
      !p.name.trim()
    )
      throw Error("Presets need unique IDs and accessible names");
    ids.add(p.id);
    if (p.commands !== undefined && p.actions !== undefined) throw Error('Use commands or actions, not both');
    if (p.commands !== undefined || p.actions !== undefined)
      validateCommands(p.commands ?? p.actions, c.blinds.flatMap(b => b.mapping !== 'native-dual-cover' && b.entity ? [b.entity] : []));
    if (!Array.isArray(p.positions) || p.positions.length !== c.blinds.length)
      throw Error("Each preset needs one position per blind");
    for (const v of p.positions) {
      if (v && v.ignored !== undefined && typeof v.ignored !== 'boolean') throw Error('Ignored must be a boolean');
      if (
        !v ||
        ![v.top, v.bottom].every(
          (n) =>
            typeof n === "number" && Number.isFinite(n) && n >= 0 && n <= 100,
        ) ||
        v.top > v.bottom
      )
        throw Error("Coordinates must be 0–100 with top ≤ bottom");
    }
  }
}
function includedCommands(p: BlindPreset, blinds?: Blind[]) {
  const commands = p.commands ?? p.actions;
  return commands?.filter(c => !blinds || !p.positions[blinds.findIndex(b => b.entity === c.entity_id)]?.ignored);
}
export function presetProblem(p: BlindPreset, blinds?: Blind[]) {
  if (!p.positions.some(v => !v.ignored)) return 'Include at least one shade';
  if (p.commands !== undefined || p.actions !== undefined) return includedCommands(p,blinds)?.length ? '' : 'Include at least one native command';
  return p.positions.some((v, i) => !v.ignored && !['independent-tdbu', 'native-dual-cover'].includes(blinds?.[i]?.mapping ?? '') && v.top !== 0 && v.bottom !== 100)
    ? "Unsupported sequential TDBU position: top must be 0 or bottom must be 100."
    : "";
}
function available(s?: State) {
  return (
    !!s &&
    !["unknown", "unavailable"].includes(s.state) &&
    ["current_position", "current_tilt_position"].every(
      (k) =>
        typeof s.attributes[k] === "number" &&
        Number.isFinite(s.attributes[k]) &&
        s.attributes[k] >= 0 &&
        s.attributes[k] <= 100,
    )
  );
}
function independentAxis(s: State | undefined, top: boolean): number | undefined {
  // These source-unique fields are real rail measurements. Native HA fields may
  // still contain the old sequential converter's cached, derived scalar values.
  const value = s?.attributes[top ? 'rail_top' : 'rail_bottom'];
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 100 ? value : undefined;
}
function independentMatches(s: State | undefined, c: BlindCommand) {
  if (!s || !['open', 'closed'].includes(s.state)) return false;
  const moving = (top: boolean) => {
    const motion = s.attributes[top ? 'motion_top' : 'motion_bottom'];
    return motion !== undefined && motion !== 'STOP';
  };
  if (c.service === 'open_cover' || c.service === 'close_cover') {
    const t = independentAxis(s,true), b = independentAxis(s,false);
    return s.attributes.rails_known !== false && t !== undefined && b !== undefined && !moving(true) && !moving(false) && Math.abs(t) <= 2 && Math.abs(b-(c.service === 'open_cover' ? 0 : 100)) <= 2 && (c.service !== 'close_cover' || s.state === 'closed');
  }
  const top = c.service === 'set_cover_tilt_position';
  const measured = independentAxis(s, top);
  if (measured === undefined || moving(top)) return false;
  const expected = top ? c.tilt_position : c.position;
  return Math.abs((top ? measured : 100-measured) - expected!) <= 2;
}
type PairGoal = { active: boolean; cancels: Set<() => void> };
type PairScope = { goals: Map<string, PairGoal>; transports: Map<string, Promise<unknown>> };
// Two dashboard cards in one HA client share native intent, never legacy recipe lanes.
const pairScopes = new WeakMap<Hass['callService'], PairScope>();
type PlanStep = {service: string; data: Record<string, any>; pair?: {goal: PairGoal; scope: PairScope}};
function pairAvailable(b: Blind, states: Record<string, State>) {
  return [b.entity_top!, b.entity_bottom!].every(id => {
    const s = states[id], features = s?.attributes.supported_features;
    return !!s && ['open','closed','opening','closing','unknown'].includes(s.state) && typeof features === 'number' && Number.isInteger(features) && (features & 4) !== 0;
  });
}
function pairMatches(b: Blind, states: Record<string, State>, p: BlindPosition) {
  return [b.entity_top!, b.entity_bottom!].every((id, i) => {
    const s = states[id], value = s?.attributes.current_position;
    return !!s && ['open','closed'].includes(s.state) && typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 100 && Math.abs(value - (i === 0 ? p.top : 100-p.bottom)) <= 2;
  });
}
function independentPlan(b: Blind, s: State | undefined, p: BlindPosition): PlanStep[] {
  if (!s || !['open','closed','opening','closing','unknown'].includes(s.state)) throw Error('Independent blind unavailable');
  const features = s.attributes.supported_features;
  if (typeof features !== 'number' || !Number.isInteger(features) || (features & 132) !== 132) throw Error('Required independent capability unavailable');
  // Always replace both motor targets, including when measured coordinates match.
  return [
    {service:'set_cover_tilt_position', data:{entity_id:b.entity!, tilt_position:p.top}},
    {service:'set_cover_position', data:{entity_id:b.entity!, position:100-p.bottom}},
  ];
}
function matches(s: State | undefined, p: BlindPosition, b?: Blind) {
  if (b?.mapping === 'independent-tdbu') return s?.attributes.rails_known !== false && independentMatches(s, {service:'set_cover_tilt_position',entity_id:b.entity!,tilt_position:p.top}) && independentMatches(s, {service:'set_cover_position',entity_id:b.entity!,position:100-p.bottom});
  return (
    available(s) &&
    !["opening", "closing"].includes(s!.state) &&
    Math.abs(
      (s!.attributes.current_position > 0
        ? 0
        : s!.attributes.current_tilt_position) - p.top,
    ) <= 2 &&
    Math.abs(100 - s!.attributes.current_position - p.bottom) <= 2
  );
}
export class KioskBlindPresetsCard extends LitElement {
  static async getConfigElement() {
    await import("./blind-presets-editor.js");
    return document.createElement("kiosk-blind-presets-editor");
  }
  static getStubConfig(hass?: Hass): BlindPresetsConfig {
    const blinds = Object.keys(hass?.states || {})
      .filter((id) => id.startsWith("cover."))
      .slice(0, 3)
      .map((entity) => ({
        entity,
        mapping: "sequential-tdbu" as const,
        width: 1,
      }));
    if (!blinds.length)
      blinds.push({
        entity: "cover.example_blind",
        mapping: "sequential-tdbu",
        width: 1,
      });
    return {
      type: "custom:kiosk-blind-presets-card",
      rows: 3,
      columns: 3,
      blinds,
      presets: blinds.length
        ? [
            {
              id: "closed",
              name: "Closed",
              positions: blinds.map(() => ({ top: 0, bottom: 100 })),
            },
          ]
        : [],
    };
  }
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    busy: { state: true },
    error: { state: true },
    cardWidth: { state: true },
  };
  private cardWidth = 320;
  private resize?: ResizeObserver;
  connectedCallback() {
    super.connectedCallback();
    this.resize = new ResizeObserver((entries) => {
      this.cardWidth = entries[0].contentRect.width;
    });
    this.resize.observe(this);
  }
  busy = false;
  error = "";
  private operation = 0;
  private publishCancels = new Set<() => void>();
  // Only uncancellable publishes live here; superseded goals never append to a FIFO.
  private transports = new Map<string, Promise<unknown>>();
  private releasePairs: (() => void)[] = [];
  private async publishRail(step: PlanStep, live: () => boolean, cancelled: Promise<false>) {
    const id = step.data.entity_id;
    const transports = step.pair?.scope.transports ?? this.transports;
    while (transports.has(id)) {
      await Promise.race([transports.get(id), cancelled]);
      if (!live()) return false;
    }
    if (!live()) return false;
    const publish = Promise.resolve().then(() => {
      if (!live()) return;
      if (!this.commandAvailable({service:step.service,...step.data} as BlindCommand)) throw Error('Unavailable');
      return this.hass.callService('cover',step.service,step.data);
    });
    // Catch separately: a stale failure cannot reject a newer goal waiting for the lane.
    const settled = publish.catch(() => undefined);
    transports.set(id, settled);
    settled.then(() => { if (transports.get(id) === settled) { transports.delete(id); this.requestUpdate(); } });
    await publish;
    return live();
  }
  private async runPlan(p: BlindPreset, plan: PlanStep[], token: number) {
    // Legacy recipes retain their order; independent shades publish in parallel.
    const parallel = !(p.commands || p.actions) && this.config.blinds.some(b => ['independent-tdbu','native-dual-cover'].includes(b.mapping ?? ''));
    const groups = parallel ? [...new Set(plan.map(step => step.data.entity_id))].map(id => plan.filter(step => step.data.entity_id === id)) : [plan];
    await Promise.allSettled(groups.map(async steps => {
      try {
        for (const step of steps) {
          let active = true;
          let cancel!: () => void;
          const live = () => active && this.operation === token && this.isConnected && (step.pair?.goal.active ?? true);
          const cancelled = new Promise<false>(resolve => { cancel = () => { active = false; resolve(false); }; });
          this.publishCancels.add(cancel);
          step.pair?.goal.cancels.add(cancel);
          const timer = setTimeout(() => {
            if (live()) this.error = 'Publish timed out. Check device.';
            cancel();
          },120000);
          try {
            if (!await Promise.race([cancelled,this.publishRail(step,live,cancelled)])) return;
          } finally {
            clearTimeout(timer);
            this.publishCancels.delete(cancel);
            step.pair?.goal.cancels.delete(cancel);
            cancel();
          }
        }
      } catch {
        if (this.operation === token) this.error = 'Action failed. Check device.';
      }
    }));
    if (this.operation === token) this.busy = false;
  }
  private invalidate() {
    for (const release of this.releasePairs) release();
    this.releasePairs = [];
    for (const cancel of this.publishCancels) cancel();
    this.publishCancels.clear();
    this.operation++;
    this.busy = false;
  }
  disconnectedCallback() {
    this.resize?.disconnect();
    this.invalidate();
    super.disconnectedCallback();
  }
  protected shouldUpdate(changed: Map<PropertyKey, unknown>) {
    if (changed.size !== 1 || !changed.has("hass")) return true;
    const old = changed.get("hass") as Hass | undefined;
    return (
      !old ||
      this.config.blinds.some(
        (b) => (b.mapping === 'native-dual-cover' ? [b.entity_top!, b.entity_bottom!] : [b.entity!]).some(id => old.states[id] !== this.hass.states[id]),
      )
    );
  }
  private presetMatches(p: BlindPreset) {
    if (presetProblem(p,this.config.blinds)) return false;
    const commands = includedCommands(p,this.config.blinds);
    return commands ? commands.length > 0 && commands.every(c => this.commandMatches(c))
      : this.config.blinds.every((b, i) => p.positions[i].ignored || (b.mapping === 'native-dual-cover' ? pairMatches(b,this.hass.states,p.positions[i]) : matches(this.hass.states[b.entity!], p.positions[i], b)));
  }
  private isIndependent(entity: string) {
    return this.config.blinds.find(b => b.entity === entity)?.mapping === 'independent-tdbu';
  }
  private commandMatches(c: BlindCommand) {
    return this.isIndependent(c.entity_id) ? independentMatches(this.hass.states[c.entity_id],c) : nativeMatches(this.hass.states[c.entity_id],c);
  }
  private commandAvailable(c: BlindCommand) {
    const s = this.hass.states[c.entity_id];
    if (this.config.blinds.some(b => b.mapping === 'native-dual-cover' && [b.entity_top,b.entity_bottom].includes(c.entity_id))) {
      const features = s?.attributes.supported_features;
      return !!s && ['open','closed','opening','closing','unknown'].includes(s.state) && c.service === 'set_cover_position' && typeof features === 'number' && Number.isInteger(features) && (features & 4) !== 0;
    }
    if (!this.isIndependent(c.entity_id)) return nativeAvailable(s,c);
    const features = s?.attributes.supported_features;
    const capability = {open_cover:1,close_cover:2,set_cover_position:4,set_cover_tilt_position:128}[c.service];
    return !!s && ['open','closed','opening','closing','unknown'].includes(s.state) && typeof features === 'number' && Number.isInteger(features) && (features & capability) !== 0;
  }
  private plan(p: BlindPreset): PlanStep[] {
    validateBlindConfig(this.config);
    if (presetProblem(p, this.config.blinds)) throw Error(presetProblem(p, this.config.blinds));
    const commands = includedCommands(p,this.config.blinds);
    if (commands) {
      // Full schema validation happens before ignored entities are filtered.
      const validated = commands;
      if (!validated.every(c => this.commandAvailable(c))) throw Error('Required native attribute or capability unavailable');
      return validated.flatMap(c => {
        const {service, ...data} = c;
        return this.commandMatches(c) ? [] : [{service, data: data as Record<string, any>}];
      });
    }
    if (presetProblem(p, this.config.blinds)) throw Error(presetProblem(p, this.config.blinds));
    return this.config.blinds.flatMap((b, i) => {
      if (p.positions[i].ignored) return [];
      const s = this.hass.states[b.entity!],
        v = p.positions[i];
      if (b.mapping === 'native-dual-cover') {
        if (!pairAvailable(b,this.hass.states)) throw Error('Required native pair capability unavailable');
        // Replace both targets even at the measured picture: an older motor goal may still be active.
        return [
          {service:'set_cover_position',data:{entity_id:b.entity_top!,position:v.top}},
          {service:'set_cover_position',data:{entity_id:b.entity_bottom!,position:100-v.bottom}},
        ];
      }
      if (b.mapping === 'independent-tdbu') {
        return independentPlan(b,s,v);
      }
      if (!available(s)) throw Error("Blind unavailable. Check device.");
      let service: string,
        capability: number,
        data: Record<string, any> = { entity_id: b.entity };
      if (v.top === 0 && v.bottom === 0) {
        service = "open_cover";
        capability = 1;
      } else if (v.top === 0 && v.bottom === 100) {
        service = "close_cover";
        capability = 2;
      } else if (v.bottom === 100) {
        service = "set_cover_tilt_position";
        capability = 128;
        data.tilt_position = v.top;
      } else {
        service = "set_cover_position";
        capability = 4;
        data.position = 100 - v.bottom;
      }
      // Validate every target, even if already matched; do not partially execute an invalid plan.
      if (!(Number(s!.attributes.supported_features) & capability))
        throw Error("Required blind capability is missing. Check device.");
      return matches(s, v) ? [] : [{ service, data }];
    });
  }
  private async activate(p: BlindPreset, e: MouseEvent) {
    e.stopPropagation();
    if (e.detail > 1 || !this.isConnected || !this.config.presets.includes(p)) return;
    let plan: PlanStep[];
    try { plan = this.plan(p); }
    catch (e) { this.error = (e as Error).message; return; }
    this.invalidate();
    this.error = '';
    if (!plan.length) return;
    for (const [i,b] of this.config.blinds.entries()) {
      if (b.mapping !== 'native-dual-cover' || p.positions[i].ignored || p.commands || p.actions) continue;
      let scope = pairScopes.get(this.hass.callService);
      if (!scope) { scope = {goals:new Map(),transports:new Map()}; pairScopes.set(this.hass.callService,scope); }
      const key = `${b.entity_top}/${b.entity_bottom}`;
      const old = scope.goals.get(key);
      if (old) { old.active = false; for (const cancel of old.cancels) cancel(); }
      const goal: PairGoal = {active:true,cancels:new Set()};
      scope.goals.set(key,goal);
      const ownedScope = scope;
      this.releasePairs.push(() => {
        goal.active = false;
        for (const cancel of goal.cancels) cancel();
        if (ownedScope.goals.get(key) === goal) ownedScope.goals.delete(key);
      });
      for (const step of plan) if ([b.entity_top,b.entity_bottom].includes(step.data.entity_id)) step.pair = {goal,scope};
    }
    this.busy = true;
    await this.runPlan(p,plan,this.operation);
  }
  declare hass: Hass;
  declare config: BlindPresetsConfig;
  setConfig(config: BlindPresetsConfig) {
    validateBlindConfig(config);
    this.invalidate();
    this.error = "";
    this.config = structuredClone(config);
  }
  getCardSize() {
    if (!this.config) return 1;
    // HA can ask for masonry size before ResizeObserver's first callback.
    const width = this.getBoundingClientRect().width || this.cardWidth;
    const columns = this.columnsForWidth(width);
    const rows = Math.ceil(this.config.presets.length / columns);
    const tileHeight = Math.max(44, (width - (columns - 1) * 12) / columns / 1.2133333);
    return Math.ceil((rows * tileHeight + (rows - 1) * 12) / 50);
  }
  private columnsForWidth(width: number) {
    // Only inter-button gaps consume space: n * 44 + (n - 1) * 12 <= width.
    return Math.min(this.config.columns, Math.max(1, Math.floor((width + 12) / 56)));
  }
  getGridOptions() {
    return { columns: 12, rows: "auto", min_columns: 3 };
  }
  static styles = [
    kioskStyles,
    css`
      :host {
        min-width: 0;
        position: relative;
      }

      .matrix {
        display: grid;
        gap: 12px;
        padding: 0;
        box-sizing: border-box;
        background: transparent;
      }
      button.tile {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-width: 44px;
        min-height: 44px;
        aspect-ratio: 1.2133333;
        border-radius: var(--kiosk-radius, var(--ha-card-border-radius, 14px));
        box-shadow: var(--kiosk-shadow, var(--ha-card-box-shadow, 0 2px 4px rgba(0, 0, 0, 0.1), 0 6px 10px rgba(0, 0, 0, 0.08)));
        background: var(--kiosk-background, rgba(0, 0, 0, 0.3));
        color: var(--kiosk-glyph, white);
        overflow: hidden;
      }
      button.tile.active {
        background: var(--kiosk-active-background, white);
        color: var(--kiosk-icon-color, var(--accent-color, #3bc8ce));
      }
      button.tile:active:not(:disabled) {
        filter: brightness(0.85);
        transform: scale(0.98);
      }
      svg {
        width: 100%;
        height: 100%;
        max-height: 110px;
        pointer-events: none;
      }
    `,
  ];
  render() {
    if (!this.config || !this.hass) return nothing;
    return html`<div
        class="matrix"
        style=${`grid-template-columns:repeat(${this.columnsForWidth(this.cardWidth)},minmax(44px,1fr))`}
      >
        ${this.config.presets.map((p) => {
          const problem =
            presetProblem(p, this.config.blinds) ||
            ((includedCommands(p,this.config.blinds)?.every(c => this.commandAvailable(c)) ?? this.config.blinds.every((b,i) =>
              p.positions[i].ignored || (b.mapping === 'native-dual-cover' ? pairAvailable(b,this.hass.states) : b.mapping === 'independent-tdbu' ? !!this.hass.states[b.entity!] && this.hass.states[b.entity!].state !== 'unavailable' : available(this.hass.states[b.entity!])),
            ))
              ? ""
              : "Blind unavailable");
          const active =
            !problem &&
            this.presetMatches(p);
          return html`<button
            type="button"
            class=${`tile ${active ? "active" : ""}`}
            aria-label=${p.name}
            ?disabled=${!!problem}
            @click=${(e: MouseEvent) => this.activate(p, e)}
            @keydown=${(e: KeyboardEvent) => {
              if (e.repeat) e.preventDefault();
            }}
            aria-pressed=${String(active)}
          >
            ${blindPicture(this.config.blinds, p.positions)}
          </button>`;
        })}
      </div>`;
  }
}
if (!customElements.get("kiosk-blind-presets-card"))
  customElements.define("kiosk-blind-presets-card", KioskBlindPresetsCard);

// A new registry key bypasses immutable pre-native card/editor registrations.
export class KioskBlindPresetsV2Card extends KioskBlindPresetsCard {
  static async getConfigElement() {
    await import("./blind-presets-editor.js");
    return document.createElement("kiosk-blind-presets-v2-editor");
  }
  static getStubConfig(hass?: Hass): BlindPresetsConfig {
    return { ...super.getStubConfig(hass), type: "custom:kiosk-blind-presets-v2-card" };
  }
}
if (!customElements.get("kiosk-blind-presets-v2-card"))
  customElements.define("kiosk-blind-presets-v2-card", KioskBlindPresetsV2Card);