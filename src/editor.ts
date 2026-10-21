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
    const air = this.config.type === "custom:kiosk-air-card";
    if (air) return [entity('aqhi_entity',{filter:{domain:'sensor'}}),entity('regional_entity',{filter:{domain:'sensor'}}),entity('category_entity',{filter:{domain:'sensor'}}),entity('source_entity',{filter:{domain:'sensor'}}),entity('data_expected_entity',{filter:{domain:'sensor',device_class:'timestamp'}}),text('name'),text('location'),{name:'icon',selector:{icon:{}}},{name:'stale_after_minutes',selector:{number:{min:1,max:1440,mode:'box',unit_of_measurement:'min'}}},{name:'appearance',type:'expandable',schema:['icon_color','background','radius'].map(text)}];
    const room = this.config.type === "custom:kiosk-room-card";
    const action = this.config.type === "custom:kiosk-action-card";
    const pill = this.config.type === "custom:kiosk-pill-card";
    const door = this.config.type === "custom:kiosk-door-card";
    const climate = this.config.type === "custom:kiosk-climate-card";
    const status = this.config.type === "custom:kiosk-status-card";
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
            action ? { filter: { domain: ["script", "scene", "button"] } } : door ? {filter:{domain:["binary_sensor","cover","lock"]}} : climate ? {filter:{domain:"climate"}} : {},
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
                      ? !pill &&
                        ["light", "switch", "input_boolean"].includes(
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
      ...(door ? [entity('door_entity',{filter:{domain:['binary_sensor','cover']}}),entity('lock_entity',{filter:{domain:'lock'}})] : []),
      ...(climate ? [{name:'temperature_format',selector:{select:{options:['locale','legacy']}}},{name:'hvac_colors',selector:{object:{}}}] : []),
      ...(status ? [entity('status_entity'),entity('status_active_entity',{filter:{domain:'binary_sensor'}}),entity('trend_entity',{filter:{domain:'sensor'}})] : []),
      ...(pill
        ? ["show_name", "show_state", "show_icon"].map((name) => ({
            name,
            selector: { boolean: {} },
          }))
        : status ? [] : [{ name: "var_large", selector: { boolean: {} } }]),
      ...(!room ? [text(pill ? "state_display" : "detail")] : []),
      ...interactions,
      ...(!room ? [{ name: "dynamic", type: "expandable", flatten: true, schema: ["presentation", "action_rules"].map(name => ({ name, selector: { object: {} } })) }] : []),
      {
        name: "appearance",
        type: "expandable",
        schema: (pill
          ? ["icon_color", "background", "radius"]
          : ["icon_color", "background", "active_background", "radius"]
        ).map(text),
      },
    ];
  }
  private label = (s: any) =>
    this.config.type === "custom:kiosk-pill-card" && s.name === "background"
      ? "Background"
      : (
          {
            aqhi_entity: "Local Canadian PM2.5 smoke index",
            regional_entity: "Regional Canadian AQHI (optional)",
            category_entity: "Canadian smoke risk category sensor",
            source_entity: "Source PM2.5 sensor",
            data_expected_entity: "History ready timestamp (optional)",
            stale_after_minutes: "Stale after (minutes; default 120)",
            location: "Location (optional)",
            entity: "Primary entity (body more-info target)",
            door_entity: "Door contact or cover (optional override)",
            lock_entity: "Linked lock",
            temperature_format: "Temperature number format",
            hvac_colors: "HVAC action colors (optional)",
            status_entity: "Status message sensor",
            status_active_entity: "Status active sensor",
            trend_entity: "Temperature trend sensor",
            name: "Name",
            icon: "Icon",
            area: "Area",
            navigation_path: "Navigation path",
            temperature_entity: "Temperature sensor",
            occupancy_entity: "Occupancy sensor",
            light_entities: "Lights (optional override)",
            var_large: "Large",
            show_name: "Show name",
            show_state: "Show state",
            show_icon: "Show icon",
            state_display: "State text (optional override)",
            detail: "Detail (optional override)",
            interactions: "Interactions",
            dynamic: "Declarative rules (advanced, optional)",
            presentation: "Presentation expressions",
            action_rules: "Conditional actions",
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
          } as any
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
        .data=${this.config.type === "custom:kiosk-pill-card" ? { ...this.config, show_name: this.config.show_name ?? true, show_state: this.config.show_state ?? true, show_icon: this.config.show_icon ?? true } : { ...this.config, var_large: this.config.var_large ?? this.config.variables?.var_large ?? false }}
        .schema=${this.schema}
        .computeLabel=${this.label}
        @value-changed=${this.change}
      ></ha-form>
      <p>
        ${this.config.type === 'custom:kiosk-air-card' ? 'Read-only Canadian PM2.5-only smoke estimate with separate optional regional AQHI. Each Details button opens its own native Home Assistant entity history. No device actions or custom dialogs.' : html`Pills stay compact and default to more-info on both targets. Large
        applies only to entity, action, room, door and climate cards. Default appearance
        follows the kiosk design. Entity icon taps control only lights, switches
        and input booleans. Room controls only navigate; action cards require an
        explicit action.`}
      </p>`;
  }
}
if (!customElements.get("kiosk-card-editor"))
  customElements.define("kiosk-card-editor", KioskCardEditor);
