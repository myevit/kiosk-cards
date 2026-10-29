import { LitElement, html, svg, nothing, css } from "lit";
import { kioskStyles } from "./design.js";
import type { Hass, State } from "./types.js";
export interface BlindPosition {
  top: number;
  bottom: number;
  [key: string]: unknown;
}
export interface Blind {
  entity: string;
  name?: string;
  width?: number;
  mapping?: "sequential-tdbu";
  [key: string]: unknown;
}
export interface BlindPreset {
  id: string;
  name: string;
  positions: BlindPosition[];
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
    if (
      !b ||
      typeof b.entity !== "string" ||
      !/^cover\.[a-z0-9_]+$/.test(b.entity) ||
      ids.has(b.entity)
    )
      throw Error("Choose unique cover entities");
    ids.add(b.entity);
    if (
      b.width !== undefined &&
      (typeof b.width !== "number" ||
        !Number.isFinite(b.width) ||
        b.width <= 0 ||
        b.width > 10)
    )
      throw Error("Blind widths must be greater than 0 and at most 10");
    if (b.mapping !== undefined && b.mapping !== "sequential-tdbu")
      throw Error("Only sequential-tdbu mapping is supported");
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
    if (!Array.isArray(p.positions) || p.positions.length !== c.blinds.length)
      throw Error("Each preset needs one position per blind");
    for (const v of p.positions) {
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
export function presetProblem(p: BlindPreset) {
  return p.positions.some((v) => v.top !== 0 && v.bottom !== 100)
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
function matches(s: State | undefined, p: BlindPosition) {
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
  private watchdog?: ReturnType<typeof setTimeout>;
  private expected?: BlindPreset;
  private acknowledged = false;
  private invalidate() {
    this.operation++;
    clearTimeout(this.watchdog);
    this.busy = false;
    this.expected = undefined;
    this.acknowledged = false;
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
        (b) => old.states[b.entity] !== this.hass.states[b.entity],
      )
    );
  }
  protected willUpdate() {
    this.finishIfConfirmed();
  }
  private finishIfConfirmed() {
    if (
      this.busy &&
      this.acknowledged &&
      this.expected &&
      this.config.blinds.every((b, i) =>
        matches(this.hass.states[b.entity], this.expected!.positions[i]),
      )
    )
      this.invalidate();
  }
  private plan(p: BlindPreset) {
    validateBlindConfig(this.config);
    if (presetProblem(p)) throw Error(presetProblem(p));
    return this.config.blinds.flatMap((b, i) => {
      const s = this.hass.states[b.entity],
        v = p.positions[i];
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
    if (
      this.busy ||
      e.detail > 1 ||
      !this.isConnected ||
      !this.config.presets.includes(p)
    )
      return;
    let plan: ReturnType<KioskBlindPresetsCard["plan"]>;
    try {
      plan = this.plan(p);
    } catch (e) {
      this.error = (e as Error).message;
      return;
    }
    this.error = "";
    if (!plan.length) return;
    const token = ++this.operation;
    this.busy = true;
    this.expected = p;
    this.acknowledged = false;
    this.watchdog = setTimeout(() => {
      if (this.operation === token) {
        this.invalidate();
        this.error = "No confirmation. Check device.";
      }
    }, 12000);
    try {
      for (const command of plan) {
        if (this.operation !== token || !this.isConnected) return;
        if (!available(this.hass.states[command.data.entity_id]))
          throw Error("Unavailable");
        await this.hass.callService("cover", command.service, command.data);
      }
      if (this.operation !== token) return;
      this.acknowledged = true;
      this.finishIfConfirmed();
    } catch {
      if (this.operation === token) {
        this.invalidate();
        this.error = "Action failed. Check device.";
      }
    }
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
    const rows = Math.ceil(this.config.rows * this.config.columns / columns);
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
      .slot {
        aspect-ratio: 1.2133333;
        min-height: 44px;
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
            presetProblem(p) ||
            (this.config.blinds.every((b) =>
              available(this.hass.states[b.entity]),
            )
              ? ""
              : "Blind unavailable");
          const active =
            !problem &&
            this.config.blinds.every((b, i) =>
              matches(this.hass.states[b.entity], p.positions[i]),
            );
          return html`<button
            type="button"
            class=${`tile ${active ? "active" : ""}`}
            aria-label=${p.name}
            ?disabled=${!!problem || this.busy}
            @click=${(e: MouseEvent) => this.activate(p, e)}
            @keydown=${(e: KeyboardEvent) => {
              if (e.repeat) e.preventDefault();
            }}
            aria-pressed=${String(active)}
          >
            ${blindPicture(this.config.blinds, p.positions)}
          </button>`;
        })}${Array.from({ length: this.config.rows * this.config.columns - this.config.presets.length }, () => html`<div class="slot" aria-hidden="true"></div>`)}
      </div>`;
  }
}
if (!customElements.get("kiosk-blind-presets-card"))
  customElements.define("kiosk-blind-presets-card", KioskBlindPresetsCard);