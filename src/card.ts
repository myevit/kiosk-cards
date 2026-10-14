import { LitElement, html, nothing } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { kioskStyles } from "./design.js";
import { confirmAction, nativeComponents } from "./native.js";
import "./editor.js";
import { evaluate, validateRules, hasClock } from "./rules.js";
import type { Hass, Config, State, Action } from "./types.js";
const toggleDomains = new Set(["light", "switch", "input_boolean"]);
function fire(node: HTMLElement, name: string, detail: any) {
  node.dispatchEvent(
    new CustomEvent(name, { detail, bubbles: true, composed: true }),
  );
}
const inactive = new Set([
  "off",
  "closed",
  "idle",
  "paused",
  "standby",
  "away",
  "docked",
  "unknown",
  "unavailable",
  "locked",
  "disarmed",
]);
export class KioskBaseCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    busy: { state: true },
    error: { state: true },
    confirming: { state: true },
  };
  busy = false;
  confirming = false;
  error = "";
  private clock?: ReturnType<typeof setInterval>;
  connectedCallback() { super.connectedCallback(); this.startClock(); }
  private startClock() { clearInterval(this.clock); if (this.isConnected && this.config && hasClock(this.config)) this.clock = setInterval(() => this.requestUpdate(), 30000); }
  protected presentation(key: "name" | "icon" | "detail" | "state_display") { const e = this.config.presentation?.[key]; return e === undefined ? undefined : evaluate(e, this.hass, this.config); }
  protected resolvedAction(key: string, fallback: Action): Action {
    const rule = this.config.action_rules?.[key]?.find((r: any) => evaluate(r.when, this.hass, this.config));
    return rule?.action || fallback;
  }
  private operation = 0;
  private expected?: string;
  private acknowledged = false;
  private watchdog?: ReturnType<typeof setTimeout>;
  protected action(target: "icon" | "body", gesture = "tap"): Action {
    const key = (target === "icon" ? "icon_" : "") + gesture + "_action";
    return (
      this.resolvedAction(key, this.config[key] || {
        action:
          gesture === "tap"
            ? target === "icon" &&
              this.available && toggleDomains.has((this.config.entity || "").split(".")[0])
              ? "toggle"
              : "more-info"
            : gesture === "hold"
              ? "more-info"
              : "none",
      })
    );
  }
  protected async runAction(
    target: "icon" | "body",
    event: Event,
    gesture = "tap",
  ) {
    event.stopPropagation();
    const action = this.action(target, gesture);
    if (action.action === "none" || this.busy || this.confirming) return;
    const cfg = this.config;
    const confirmation = action.confirmation;
    if (
      confirmation &&
      !(
        typeof confirmation === "object" &&
        confirmation.exemptions?.some((e) => e.user === this.hass.user?.id)
      )
    ) {
      const confirmationToken = this.operation;
      this.confirming = true;
      const yes = await confirmAction(
        this,
        typeof confirmation === "object" ? confirmation : {},
      );
      if (this.operation !== confirmationToken) return;
      this.confirming = false;
      if (!yes || !this.isConnected || this.config !== cfg) return;
    }
    if (action.action === "more-info") {
      fire(this, "hass-more-info", {
        entityId: action.entity || this.config.entity,
      });
      return;
    }
    if (!["toggle", "perform-action", "call-service"].includes(action.action)) {
      const { confirmation: _confirmation, ...forwarded } = action;
      fire(this, "hass-action", {
        config: { ...this.config, tap_action: forwarded },
        action: "tap",
      });
      return;
    }
    if (!this.available) return;
    let domain: string,
      service: string,
      data: Record<string, any> | undefined,
      targetData = action.target;
    if (action.action === "toggle") {
      domain = (this.config.entity || "").split(".")[0];
      if (!toggleDomains.has(domain)) {
        this.error = "Choose an explicit action for this device.";
        return;
      }
      this.expected = this.state?.state === "on" ? "off" : "on";
      service = this.expected === "on" ? "turn_on" : "turn_off";
      data = { entity_id: this.config.entity };
    } else {
      [domain, service] = (action.perform_action || action.service || "").split(
        ".",
      );
      if (!domain || !service) {
        this.error = "Choose an action.";
        return;
      }
      data = action.data ?? action.service_data;
      this.expected = undefined;
    }
    const token = ++this.operation;
    this.busy = true;
    this.error = "";
    this.acknowledged = false;
    this.watchdog = setTimeout(() => {
      if (this.operation === token) {
        this.operation++;
        this.busy = false;
        this.error = "No confirmation. Check device.";
      }
    }, 12000);
    try {
      await this.hass.callService(domain, service, data, targetData);
      if (this.operation !== token) return;
      this.acknowledged = true;
      this.finishIfConfirmed();
    } catch {
      if (this.operation === token) {
        this.operation++;
        this.busy = false;
        clearTimeout(this.watchdog);
        this.error = "Action failed. Check device.";
      }
    }
  }
  private finishIfConfirmed() {
    if (
      this.busy &&
      this.acknowledged &&
      (!this.expected || this.state?.state === this.expected)
    ) {
      this.busy = false;
      this.expected = undefined;
      clearTimeout(this.watchdog);
    }
  }
  protected updated() {
    this.finishIfConfirmed();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this.clock);
    clearTimeout(this.watchdog);
    clearTimeout(this.holdTimer);
    clearTimeout(this.tapTimer);
    this.operation++;
    this.busy = false;
  }
  private holdTimer?: ReturnType<typeof setTimeout>;
  private tapTimer?: ReturnType<typeof setTimeout>;
  private held = false;
  protected pointerDown(target: "icon" | "body", e: PointerEvent) {
    e.stopPropagation();
    if (e.button !== 0) return;
    this.held = false;
    clearTimeout(this.holdTimer);
    this.holdTimer = setTimeout(() => {
      this.held = true;
      clearTimeout(this.tapTimer);
      void this.runAction(target, e, "hold");
    }, 500);
  }
  protected pointerEnd(e: Event) {
    e.stopPropagation();
    clearTimeout(this.holdTimer);
  }
  protected tap(target: "icon" | "body", e: MouseEvent) {
    e.stopPropagation();
    if (this.held) {
      this.held = false;
      return;
    }
    if (e.detail === 0 || this.action(target, "double_tap").action === "none") {
      void this.runAction(target, e);
      return;
    }
    if (e.detail > 1) {
      clearTimeout(this.tapTimer);
      void this.runAction(target, e, "double_tap");
    } else
      this.tapTimer = setTimeout(() => void this.runAction(target, e), 300);
  }
  static async getConfigElement() {
    if ((window as any).loadCardHelpers) await nativeComponents(["ha-form"]);
    return document.createElement("kiosk-card-editor");
  }
  static getStubConfig(hass: Hass, entities: string[] = []): Partial<Config> {
    return {
      entity:
        entities.find((e) => hass.states[e]) ||
        Object.keys(hass.states).find((e) => e.startsWith("light.")) ||
        Object.keys(hass.states)[0],
    };
  }
  static styles = kioskStyles;
  declare hass: Hass;
  declare config: Config;
  protected applyConfig(config: Config) {
    validateRules(config);
    const large = config.var_large ?? config.variables?.var_large;
    if (large !== undefined && typeof large !== "boolean")
      throw Error("var_large must be a boolean");
    clearTimeout(this.watchdog);
    clearTimeout(this.holdTimer);
    clearTimeout(this.tapTimer);
    this.operation++;
    this.busy = false;
    this.confirming = false;
    this.expected = undefined;
    this.error = "";
    this.config = { ...config };
    this.startClock();
  }
  setConfig(config: Config) {
    if (!config.entity) throw new Error("Choose an entity");
    this.applyConfig(config);
  }
  getCardSize(): number {
    return this.large ? 3 : 1.38;
  }
  getGridOptions() {
    return { columns: 6, rows: "auto" as const };
  }
  protected get state(): State | undefined {
    return this.hass?.states[this.config?.entity || ""];
  }
  protected get active() {
    return (
      !!this.state &&
      (this.config.active_states
        ? this.config.active_states.includes(this.state.state)
        : !inactive.has(this.state.state))
    );
  }
  protected get cardTitle() {
    return (
      (this.presentation("name") ?? this.config.name) ||
      this.state?.attributes.friendly_name ||
      this.config.entity ||
      "Entity"
    );
  }
  protected get detail() {
    const dynamic = this.presentation("detail");
    if (dynamic !== undefined) return String(dynamic);
    if (this.config.detail !== undefined) return this.config.detail;
    const s = this.state;
    if (!s) return "Unavailable";
    if (
      s.state === "on" &&
      s.entity_id.startsWith("light.") &&
      s.attributes.brightness
    )
      return `${Math.round(s.attributes.brightness / 2.55)}%`;
    if (
      s.entity_id.startsWith("climate.") &&
      !["unknown", "unavailable"].includes(s.state)
    ) {
      const a = s.attributes;
      if (a.target_temp_low != null && a.target_temp_high != null)
        return `${a.target_temp_low}°–${a.target_temp_high}°`;
      if (a.temperature != null) return `${a.temperature}°`;
      if (a.current_temperature != null)
        return `${a.current_temperature}° (${s.state.charAt(0).toUpperCase() + s.state.slice(1)})`;
    }
    const d = this.hass.formatEntityState?.(s) || s.state;
    return d.charAt(0).toUpperCase() + d.slice(1);
  }
  protected get available() {
    return (
      !!this.state && !["unknown", "unavailable"].includes(this.state.state)
    );
  }
  protected get isAction() {
    return false;
  }
  protected get large() {
    return (this.config.var_large ?? this.config.variables?.var_large) === true;
  }
  protected get cardIcon() {
    return this.presentation("icon") ?? this.config.icon;
  }
  protected get surfaceStyles(): Record<string, string | undefined> { return {}; }
  protected get iconContent() {
    return this.cardIcon ? html`<ha-icon .icon=${this.cardIcon}></ha-icon>` : html`<ha-state-icon .hass=${this.hass} .stateObj=${this.state} .stateColor=${false}></ha-state-icon>`;
  }
  render() {
    if (!this.config || !this.hass) return nothing;
    const a = this.config.appearance;
    return html`<ha-card
      part="surface"
      aria-busy=${String(this.busy)}
      class=${[this.active ? "active" : "", !this.available ? "unavailable" : "", this.isAction ? "action" : "", this.large ? "large" : ""].join(" ")}
      style=${styleMap({ "--kiosk-icon-color": a?.icon_color, "--kiosk-default-icon-color": this.config.entity?.startsWith("light.") ? "var(--accent-color,#3bc8ce)" : undefined, "--kiosk-background": a?.background, "--kiosk-active-background": a?.active_background, "--kiosk-radius": a?.radius, ...this.surfaceStyles })}
    >
      <button
        part="icon-target"
        @click=${(e: MouseEvent) => this.tap("icon", e)}
        @pointerdown=${(e: PointerEvent) => this.pointerDown("icon", e)}
        @pointerup=${this.pointerEnd}
        @pointercancel=${this.pointerEnd}
        @pointerleave=${this.pointerEnd}
        aria-label=${`Icon — ${this.cardTitle}`}
        ?disabled=${this.busy || this.confirming || (!this.available && ["none", "toggle", "perform-action", "call-service"].includes(this.action("icon").action))}
      >
        <span part="icon-circle"
          >${this.iconContent}</span
        >
      </button>
      <button
        part="body-target"
        @click=${(e: MouseEvent) => this.tap("body", e)}
        @pointerdown=${(e: PointerEvent) => this.pointerDown("body", e)}
        @pointerup=${this.pointerEnd}
        @pointercancel=${this.pointerEnd}
        @pointerleave=${this.pointerEnd}
        aria-label=${this.cardTitle}
        ?disabled=${this.busy || this.confirming || (!this.available && ["toggle", "perform-action", "call-service"].includes(this.action("body").action))}
      >
        <span part="title">${this.cardTitle}</span
        >${this.detail ? html`<span part="detail">${this.detail}</span>` : nothing}</button
      >${this.error ? html`<span part="feedback" role="status">${this.error}</span>` : nothing}</ha-card
    >`;
  }
}
export class KioskEntityCard extends KioskBaseCard {}
export class KioskActionCard extends KioskBaseCard {
  static getStubConfig(hass: Hass, entities: string[] = []): Partial<Config> {
    const candidates = [...entities, ...Object.keys(hass.states)];
    const entity = candidates.find((e) =>
      ["script", "scene", "button"].includes(e.split(".")[0]),
    );
    return entity ? { entity } : { name: "Action" };
  }
  setConfig(config: Config) {
    if (!config.entity && !config.name) throw Error("Choose an entity or name");
    if (
      config.entity &&
      !["script", "scene", "button"].includes(config.entity.split(".")[0])
    )
      throw Error("Action entities must be scripts, scenes or buttons");
    this.applyConfig(config);
  }
  protected get isAction() {
    return true;
  }
  protected get cardIcon() {
    return (this.presentation("icon") ?? this.config.icon) || (!this.state ? "mdi:play" : undefined);
  }
  protected get active() {
    return true;
  }
  protected get detail() {
    return this.config.detail || (!this.available ? "Unavailable" : "");
  }
  protected get available() {
    return !this.config.entity || super.available;
  }
  protected action(target: "icon" | "body", gesture = "tap"): Action {
    const key = (target === "icon" ? "icon_" : "") + gesture + "_action";
    return (
      this.resolvedAction(key, this.config[key] ||
      (target === "icon" && gesture === "tap"
        ? this.config.tap_action
        : undefined) || { action: "none" })
    );
  }
}
