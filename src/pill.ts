import { css, html, nothing } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { KioskBaseCard } from "./card.js";
import { kioskStyles, pillStyles } from "./design.js";
import type { Config, Action } from "./types.js";
export class KioskPillCard extends KioskBaseCard {
  static styles = css`
    ${kioskStyles}${pillStyles}
  `;
  setConfig(config: Config) {
    if (!config.entity) throw Error("Choose an entity");
    if (config.var_large ?? config.variables?.var_large)
      throw Error("Pills are compact; Large is not supported");
    for (const key of ["show_name", "show_state", "show_icon"])
      if (config[key] !== undefined && typeof config[key] !== "boolean")
        throw Error(`${key} must be a boolean`);
    if (
      config.show_name === false &&
      config.show_state === false &&
      config.show_icon === false
    )
      throw Error("Show at least one pill field");
    this.applyConfig(config);
  }
  protected get large() {
    return false;
  }
  protected get active() {
    return false;
  }
  getCardSize() {
    return 1;
  }
  protected get detail() {
    const s = this.state;
    if (this.config.state_display !== undefined)
      return this.config.state_display;
    const label = s
      ? (this.config.state_labels?.[s.state] ??
        this.config.state_labels?.default)
      : undefined;
    if (label !== undefined) return label;
    if (!s) return "Unavailable";
    const text = this.hass.formatEntityState?.(s) || s.state;
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  protected action(target: "icon" | "body", gesture = "tap"): Action {
    const key = (target === "icon" ? "icon_" : "") + gesture + "_action";
    return (
      this.config[key] ||
      (target === "icon" ? this.config[gesture + "_action"] : undefined) || {
        action: gesture === "double_tap" ? "none" : "more-info",
      }
    );
  }
  private disabled(target: "icon" | "body") {
    return (
      this.busy ||
      this.confirming ||
      (!this.available &&
        ["toggle", "perform-action", "call-service"].includes(
          this.action(target).action,
        ))
    );
  }
  render() {
    if (!this.config || !this.hass) return nothing;
    const a = this.config.appearance;
    const showName = this.config.show_name !== false,
      showState = this.config.show_state !== false;
    return html`<ha-card
      part="surface"
      class=${`pill ${showName ? "" : "no-name"} ${showState ? "" : "no-state"} ${!this.available ? "unavailable" : ""}`}
      style=${styleMap({ "--kiosk-background": a?.background, "--kiosk-icon-color": a?.icon_color, "--kiosk-radius": a?.radius })}
      @click=${(e: MouseEvent) => this.tap("body", e)}
      @pointerdown=${(e: PointerEvent) => this.pointerDown("body", e)}
      @pointerup=${this.pointerEnd}
      @pointercancel=${this.pointerEnd}
      @pointerleave=${this.pointerEnd}
    >
      ${this.config.show_icon !== false ? html`<button part="icon-target" aria-label=${`Icon — ${this.cardTitle}`} ?disabled=${this.disabled("icon")} @click=${(e: MouseEvent) => this.tap("icon", e)} @pointerdown=${(e: PointerEvent) => this.pointerDown("icon", e)} @pointerup=${this.pointerEnd} @pointercancel=${this.pointerEnd} @pointerleave=${this.pointerEnd}><span part="icon-circle">${this.cardIcon ? html`<ha-icon .icon=${this.cardIcon}></ha-icon>` : html`<ha-state-icon .hass=${this.hass} .stateObj=${this.state} .stateColor=${false}></ha-state-icon>`}</span></button>` : html`<span class="empty-icon" aria-hidden="true"></span>`}
      <button
        part="body-target"
        aria-label=${`${this.cardTitle}: ${this.detail}`}
        ?disabled=${this.disabled("body")}
        @click=${(e: MouseEvent) => this.tap("body", e)}
        @pointerdown=${(e: PointerEvent) => this.pointerDown("body", e)}
        @pointerup=${this.pointerEnd}
        @pointercancel=${this.pointerEnd}
        @pointerleave=${this.pointerEnd}
      >
        ${showName ? html`<span part="title">${this.cardTitle}</span>` : nothing}${showState ? html`<span part="detail">${this.detail}</span>` : nothing}</button
      >${this.busy || this.error ? html`<span part="feedback" role="status">${this.busy ? "Saving…" : this.error}</span>` : nothing}</ha-card
    >`;
  }
}
