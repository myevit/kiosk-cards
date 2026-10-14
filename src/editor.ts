import { LitElement, html, nothing, css } from "lit";
import type { Hass, Config } from "./types.js";
const text = (name: string) => ({ name, selector: { text: {} } });
const entity = (name: string, options: any = {}) => ({
  name,
  selector: { entity: options },
});
export class KioskCardEditor extends LitElement {
  static properties = { hass: { attribute: false }, config: { state: true } };
  declare hass: Hass;
  declare config: Config;
  static styles = css`
    :host {
      display: block;
    }
    p {
      color: var(--secondary-text-color);
      font-size: 14px;
    }
  `;
  setConfig(config: Config) {
    this.config = { ...config };
  }
  private get schema() {
    const room = this.config.type === "custom:kiosk-room-card";
    const action = this.config.type === "custom:kiosk-action-card";
    const identity = room
      ? [
          { name: "area", selector: { area: {} } },
          text("name"),
          { name: "icon", selector: { icon: {} } },
          text("navigation_path"),
          entity("temperature_entity", {
            filter: { domain: "sensor", device_class: "temperature" },
          }),
          entity("occupancy_entity", { filter: { domain: "binary_sensor" } }),
          entity("light_entities", {
            multiple: true,
            filter: { domain: "light" },
          }),
        ]
      : [
          entity(
            "entity",
            action ? { filter: { domain: ["script", "scene", "button"] } } : {},
          ),
          text("name"),
          {
            name: "icon",
            selector: { icon: {} },
            context: { icon_entity: "entity" },
          },
        ];
    const interactions = room
      ? []
      : [
          {
            name: "interactions",
            type: "expandable",
            flatten: true,
            schema: [
              "tap_action",
              "hold_action",
              "double_tap_action",
              "icon_tap_action",
              "icon_hold_action",
              "icon_double_tap_action",
            ].map((name) => ({
              name,
              selector: {
                ui_action: {
                  default_action: action
                    ? "none"
                    : name === "icon_tap_action"
                      ? ["light", "switch", "input_boolean", "fan"].includes(
                          (this.config.entity || "").split(".")[0],
                        )
                        ? "toggle"
                        : "more-info"
                      : name.includes("double")
                        ? "none"
                        : "more-info",
                },
              },
              context: { entity: "entity" },
            })),
          },
        ];
    return [
      ...identity,
      ...(!room ? [text("detail")] : []),
      ...interactions,
      {
        name: "appearance",
        type: "expandable",
        schema: ["icon_color", "background", "active_background", "radius"].map(
          text,
        ),
      },
    ];
  }
  private label = (s: any) =>
    (
      ({
        entity: "Entity",
        name: "Name",
        icon: "Icon",
        area: "Area",
        navigation_path: "Navigation path",
        temperature_entity: "Temperature sensor",
        occupancy_entity: "Occupancy sensor",
        light_entities: "Lights (optional override)",
        detail: "Detail (optional override)",
        interactions: "Interactions",
        appearance: "Appearance (optional)",
        icon_color: "Category color (CSS color)",
        background: "Off background",
        active_background: "Active background",
        radius: "Corner radius",
        tap_action: "Body tap",
        hold_action: "Body hold",
        double_tap_action: "Body double tap",
        icon_tap_action: "Icon tap",
        icon_hold_action: "Icon hold",
        icon_double_tap_action: "Icon double tap",
      }) as any
    )[s.name] || s.name;
  private change(e: CustomEvent) {
    e.stopPropagation();
    const value = e.detail.value;
    this.config = { ...this.config, ...value };
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this.config },
        bubbles: true,
        composed: true,
      }),
    );
  }
  render() {
    if (!this.config || !this.hass) return nothing;
    return html`<ha-form
        .hass=${this.hass}
        .data=${this.config}
        .schema=${this.schema}
        .computeLabel=${this.label}
        @value-changed=${this.change}
      ></ha-form>
      <p>
        Default appearance follows the kiosk design. Entity icon taps control
        only lights, switches, input booleans and fans. Room controls only
        navigate; action cards require an explicit action.
      </p>`;
  }
}
if (!customElements.get("kiosk-card-editor"))
  customElements.define("kiosk-card-editor", KioskCardEditor);
