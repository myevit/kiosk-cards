export { KioskBaseCard, KioskEntityCard, KioskActionCard } from "./card.js";
export { kioskStyles, pillStyles, designTokens } from "./design.js";
export type { Hass, Config, Action, Appearance, State } from "./types.js";
import { KioskEntityCard, KioskActionCard } from "./card.js";
import { KioskRoomCard } from "./room.js";
export { KioskRoomCard } from "./room.js";
import { KioskPillCard } from "./pill.js";
export { KioskPillCard } from "./pill.js";
export { KioskCardEditor } from "./editor.js";
if (!customElements.get("kiosk-entity-card"))
  customElements.define("kiosk-entity-card", KioskEntityCard);
if (!customElements.get("kiosk-action-card"))
  customElements.define("kiosk-action-card", KioskActionCard);
if (!customElements.get("kiosk-room-card"))
  customElements.define("kiosk-room-card", KioskRoomCard);
if (!customElements.get("kiosk-pill-card"))
  customElements.define("kiosk-pill-card", KioskPillCard);
const badgeCatalog = ((window as any).customBadges ||= []);
if (!badgeCatalog.some((b: any) => b.type === "kiosk-pill-card"))
  badgeCatalog.push({
    type: "kiosk-pill-card",
    name: "Kiosk pill",
    description: "Compact status capsule",
    preview: true,
    documentationURL: "https://github.com/myevit/kiosk-cards",
  });
const catalog = ((window as any).customCards ||= []);
for (const [type, name, description] of [
  [
    "kiosk-entity-card",
    "Kiosk entity",
    "State tile with isolated quick control",
  ],
  ["kiosk-action-card", "Kiosk action", "Explicit momentary action tile"],
  ["kiosk-room-card", "Kiosk room", "Room summary and navigation"],
  [
    "kiosk-pill-card",
    "Kiosk pill",
    "Compact status capsule for cards and native badges",
  ],
])
  if (!catalog.some((c: any) => c.type === type))
    catalog.push({
      type,
      name,
      description,
      preview: true,
      documentationURL: "https://github.com/myevit/kiosk-cards",
    });
