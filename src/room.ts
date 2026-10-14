import { KioskBaseCard } from "./card.js";
import type { Config, Action, State } from "./types.js";
export class KioskRoomCard extends KioskBaseCard {
  static getStubConfig() {
    return { name: "Room", navigation_path: "/lovelace" };
  }
  setConfig(config: Config) {
    if (!config.area && !config.name) throw Error("Choose an area or name");
    this.applyConfig(config);
  }
  protected get cardTitle() {
    return (
      this.config.name ||
      this.hass.areas?.[this.config.area || ""]?.name ||
      "Room"
    );
  }
  protected get cardIcon() {
    return (
      this.config.icon ||
      this.hass.areas?.[this.config.area || ""]?.icon ||
      "mdi:home-outline"
    );
  }
  protected get available() {
    return true;
  }
  protected get active() {
    return (
      this.lights.some((s) => s.state === "on") ||
      (this.config.occupancy_entity
        ? this.hass.states[this.config.occupancy_entity]?.state === "on"
        : this.roomStates.some(
            (s) =>
              s.entity_id.startsWith("binary_sensor.") &&
              ["occupancy", "presence", "motion"].includes(
                s.attributes.device_class,
              ) &&
              s.state === "on",
          ))
    );
  }
  private get roomStates(): State[] {
    if (!this.config.area) return [];
    return Object.values(this.hass.states).filter((s) => {
      const e = this.hass.entities?.[s.entity_id];
      if (!e || e.hidden || e.hidden_by || e.disabled_by) return false;
      return (
        (e.area_id || this.hass.devices?.[e.device_id]?.area_id) ===
        this.config.area
      );
    });
  }
  private get lights() {
    return this.config.light_entities !== undefined
      ? this.config.light_entities.map(
          (e) =>
            this.hass.states[e] || {
              entity_id: e,
              state: "unavailable",
              attributes: {},
            },
        )
      : this.roomStates.filter((s) => s.entity_id.startsWith("light."));
  }
  protected get detail() {
    const room = this.roomStates;
    const temp = this.config.temperature_entity
      ? this.hass.states[this.config.temperature_entity] || {
          entity_id: this.config.temperature_entity,
          state: "unavailable",
          attributes: {},
        }
      : room.find((s) => s.attributes.device_class === "temperature");
    const occupancy = this.config.occupancy_entity
      ? this.hass.states[this.config.occupancy_entity] || {
          entity_id: this.config.occupancy_entity,
          state: "unavailable",
          attributes: {},
        }
      : room.find(
          (s) =>
            s.entity_id.startsWith("binary_sensor.") &&
            ["occupancy", "presence", "motion"].includes(
              s.attributes.device_class,
            ),
        );
    const parts: string[] = [];
    if (temp)
      parts.push(
        ["unknown", "unavailable"].includes(temp.state)
          ? "Temperature unavailable"
          : `${temp.state}${temp.attributes.unit_of_measurement ? " " + temp.attributes.unit_of_measurement : ""}`,
      );
    if (occupancy)
      parts.push(
        occupancy.state === "on"
          ? "Occupied"
          : occupancy.state === "off"
            ? "Clear"
            : "Occupancy unavailable",
      );
    const lights = this.lights;
    if (lights.length) {
      const on = lights.filter((s) => s.state === "on").length;
      const unavailable = lights.filter((s) =>
        ["unknown", "unavailable"].includes(s.state),
      ).length;
      if (on) parts.push(`${on} light${on === 1 ? "" : "s"} on`);
      else if (unavailable < lights.length) parts.push("Lights off");
      if (unavailable) parts.push(`${unavailable} unavailable`);
    }
    return parts.join(" · ");
  }
  protected action(_target: "icon" | "body", gesture = "tap"): Action {
    return gesture === "tap" && this.config.navigation_path
      ? { action: "navigate", navigation_path: this.config.navigation_path }
      : { action: "none" };
  }
}
