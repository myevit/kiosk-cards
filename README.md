# Kiosk Cards

Reusable Home Assistant dashboard cards with a consistent touch-first design. One frontend module, a shared family of cards, no backend integration, button-card templates or card-mod required.

![Synthetic preview: entity off/on, action and room cards](docs/preview.png)

The image uses synthetic entities and is disconnected from devices.

## Install with HACS

1. Open **HACS → ⋮ → Custom repositories**.
2. Add `https://github.com/myevit/kiosk-cards`, category **Dashboard** (internally `plugin`).
3. Download **Kiosk Cards**, then reload the browser/companion frontend.
4. Confirm the JavaScript module resource `/hacsfiles/kiosk-cards/kiosk-cards.js` exists under dashboard resources. HACS normally registers it. Do not add a duplicate.

Manual install: put the release's `kiosk-cards.js` in `/config/www/kiosk-cards/`, then add `/local/kiosk-cards/kiosk-cards.js` as a **JavaScript module**. No Home Assistant restart is needed.

## Entity

```yaml
type: custom:kiosk-entity-card
entity: light.example
```

The icon toggles only `light`, `switch` and `input_boolean`. The body opens Home Assistant's normal more-info dialog, retaining brightness and device-specific controls. Locks, covers, alarm panels, scripts, scenes and buttons never receive an implicit toggle or service call. Hold opens more-info by default. Double tap defaults to no action.

ON uses a white tile, black title, gray detail and a colored circle with white glyph. OFF uses a translucent dark tile, theme title color, muted detail and a darker circle with white glyph. State always comes from `hass.states`, not from optimistic animation. Unknown/unavailable entities cannot send commands.

## Picture-only blind presets

`custom:kiosk-blind-presets-card` adds one composite, responsive picture-button matrix with a native visual editor. It stores ordered blinds and presets in normal card config. Each blind independently chooses backward-compatible `sequential-tdbu` (default) or `independent-tdbu`. Independent rails support actual middle bands such as absolute top 30 / bottom 70, by immediately publishing both native targets without movement delays; selected pictures require source-unique `rail_top` / `rail_bottom` feedback from a compatible driver. It does not create helpers, scripts, scenes, or backend integrations.

See [configuration, mapping, editor, and safety details](docs/blind-presets.md).

## Explicit action

```yaml
type: custom:kiosk-action-card
entity: script.example
name: Example action
tap_action:
  action: perform-action
  perform_action: script.turn_on
  target:
    entity_id: script.example
  confirmation:
    text: Run the example action?
```

Action cards are momentary commands, not ON/OFF indicators. They use a white command tile and the category accent at rest. There is **no implicit action**; choose `tap_action`. The icon shares the configured body tap unless you override `icon_tap_action`. No last-triggered timestamp is represented as an active state. A name-only card can perform an explicit service with an explicit target.

## Room

```yaml
type: custom:kiosk-room-card
area: example_room
navigation_path: /lovelace/example-room
# Optional explicit sensor/light overrides:
temperature_entity: sensor.example_temperature
occupancy_entity: binary_sensor.example_presence
light_entities:
  - light.example
```

Room cards use HA's cached entity/device/area registries: explicit entity area overrides device area, hidden/disabled entities are excluded, and explicit entity lists take precedence. Temperature, occupancy and light summaries are read-only. Tap navigates **only**; room cards never toggle a whole area. Unavailable lights are counted explicitly, never treated as confirmed off. If multiple eligible sensors exist, use explicit overrides rather than relying on registry order.

## Compact top pills / native badges

```yaml
type: custom:kiosk-pill-card
entity: sensor.example_status
```

The same type works in a view's native `badges:` list and in ordinary `cards:`/Sections. It is registered in both HA pickers and verified through the actual native `hui-badge` loader; no separate badge backend or alternate tag is needed. HA badge layout ignores card grid options and uses intrinsic capsule sizing.

Pills reproduce the extracted compact status style: **35px** with both text lines, **32px** with an icon and one/no text line, **18px** radius, **4px 12px** padding, **24px** icon, **10px** regular name and **14px/800-weight** state. Default width is clamped to **140–180px**, preserving ellipsis for long labels. The neutral translucent white background and theme accent icon remain consistent across ON/OFF/unavailable states; incoming state text changes without inventing an active command state.

The native editor offers entity, name, icon, **Show name**, **Show state**, **Show icon**, optional literal `state_display`, appearance and interactions. Both icon and body default to more-info, **even for switches or locks**; no implicit pill toggle. Deliberately configured quick toggles retain the same safe-domain allowlist, confirmation, unavailable-state protection and no-auto-retry safeguards as the entity card. Padding and keyboard taps are isolated from parent click/ripple handlers. The compact visual height is retained rather than silently expanded to 68px or 44px.

For special status wording, an optional literal `state_labels` mapping follows incoming entity state, with `default` as its fallback. This does not evaluate JavaScript or private template expressions. Pill backgrounds can be overridden with `appearance.background`, for example for a warning capsule. Existing HA visibility conditions are preserved.

The original pill template has **no Large variant**. Accordingly, pills do not offer a Large switch and reject `var_large: true` instead of inventing a scaled design; Large remains supported on entity/action/room cards.

## Door and linked lock (v0.4)

```yaml
type: custom:kiosk-door-card
entity: binary_sensor.example_door
lock_entity: lock.example
name: Example door
var_large: true
```

Contact `on` or cover `open` means open; contact `off` or cover `closed` means closed. Door and lock states are reported independently, including `open / locked`: a locked latch does **not** imply the door is closed. Only closed **and** locked selects the inactive dark presentation. Unknown/unavailable observations remain explicit. The original four-state glyph mapping and fallback lock icon are retained. Standard/Large geometry matches the entity design.

By default the body opens primary-entity more-info and the icon opens linked-lock more-info. There is **no implicit physical action**. For migration from a lock-primary card, use `entity: lock.example` with `door_entity: binary_sensor.example_door`; this keeps the original body more-info target. Explicit icon actions support the same native confirmation and availability safeguards as other cards. Preserve existing confirmations when migrating; do not introduce a toggle as a default.

## Climate (v0.4)

```yaml
type: custom:kiosk-climate-card
entity: climate.example
name: Example climate
var_large: true
hvac_colors:
  heating: "rgb(240,90,40)"
  cooling: "rgb(84,190,240)"
  default: black
```

The identity shows **current temperature**, not setpoint or an invented HVAC switch. Both targets default to native climate more-info, retaining HA's thermostat controls. Detail priority is Off → Fan On → heat/cool target and mode → low/high range → single target → current temperature and mode. Modes off/idle/standby/away are inactive; other modes retain the extracted active presentation. HVAC-action colors are optional; without an override, climate uses the theme accent rather than the general entity category color.

Numbers use the HA locale language by default; values already use the entity's HA-configured temperature unit and the compact glyph stays `°`. `temperature_format: legacy` preserves literal original number formatting and original missing-attribute fallback semantics for exact template migrations. Standard climate is **68px** with a **20px** number; Large is **145px** with a **50px** number. Name/detail remain **18px/15px**. Large changes appearance only.

## Passive temperature/status hero (v0.4)

```yaml
type: custom:kiosk-status-card
entity: sensor.example_temperature
status_entity: sensor.example_message
status_active_entity: binary_sensor.example_status
trend_entity: sensor.example_temperature_trend
grid_options:
  columns: 12
  rows: auto
```

A genuine incoming `on` status swaps the rounded **112px** temperature display for a wrapping **20px** message on white; it is not a local command progress banner. Trend thresholds color only the degree glyph. Missing/unavailable numeric states stay honest. Height follows content and its HA wrapper; a full-width override preserves a hero's placement while the reusable default remains six columns. Body gestures default to normal more-info. No helper updates, status clears, climate commands or device calls occur from rendering.

## Editing and interactions

All seven cards appear in the card picker and include a visual editor built from native `ha-form` and HA entity/icon/area/action selectors. The editor changes configuration only; it never calls devices. Appearance settings are optional and collapsed by default.

For entity/action/pill cards, supported options are `tap_action`, `hold_action`, `double_tap_action`, `icon_tap_action`, `icon_hold_action`, `icon_double_tap_action`. Supported HA actions: `none`, `more-info`, `toggle` (safe domains only), `perform-action`, legacy `call-service`, `navigate`, `url`, `assist`, `fire-dom-event`. Service actions support `data`/legacy `service_data`, `target`, and HA-style `confirmation` (including user exemptions). Confirmation is hosted by HA's native `ha-dialog` through `show-dialog`; no custom overlay and no more-info replacement.

Icon and body are separate keyboard-accessible buttons. Taps and holds are isolated from parent click/ripple handlers. Hold threshold is 500 ms; a configured double tap delays a single tap by 300 ms. During a command, duplicate actions are blocked. A safe toggle waits for the matching incoming entity state **and** service acknowledgment. Explicit momentary actions wait for acknowledgment only, without inventing a lasting ON state. A 12-second watchdog surfaces a concise error and **never retries automatically**. Check the device before retrying after a timeout; the request may still have reached HA.

## Declarative dynamic rules (v0.3)

Entity/action/pill configuration can use `presentation.name`, `presentation.icon`,
`presentation.detail` (entity) or `presentation.state_display` (pill). These are
bounded JSON expressions, **not JavaScript**. Literal fields remain compatible.
The native editor exposes optional advanced object selectors and preserves rules
when changing ordinary fields. Every incoming `hass` update resolves current
cross-entity values; countdown expressions also refresh every 30 seconds while
connected, without service calls, and stop their timer when disconnected.

```yaml
type: custom:kiosk-entity-card
entity: light.example
tap_action:
  action: toggle
action_rules:
  tap_action:
    - when:
        op: defined
        args: [{attribute: brightness}]
      action: {action: more-info}
presentation:
  name:
    op: map
    args:
      - {state: true}
      - {"on": Active, "off": Inactive, default: Unknown}
```

First matching action rule wins; otherwise the ordinary gesture action/default
applies. Rule keys are the same six body/icon tap/hold/double-tap keys. A present
brightness attribute, **including zero**, selects more-info in this example;
when absent the explicit toggle applies. All resolved command actions retain
availability, confirmation, duplicate and pending guards. More-info remains
accessible when the entity is unavailable; unavailable entities cannot actuate.

Expression references: `{state: true}` reads this entity, `{entity: sensor.example,
state: true}` reads another, `{attribute: brightness}` reads a direct attribute,
and `{entity: sensor.example, last_changed: true}` reads a timestamp. Missing
references return undefined; there is no object-path/global/code access.
`{op: NAME, args: [...]}` operations:

- `if`, `eq`, `ne`, `includes` (substring), `in` (value/list), `and`, `or`, `not`;
- `defined` (not undefined), `number` (Number conversion), `finite` (numeric),
  `round`, `gt`, `lt`;
- `concat`, `capitalize`, `map` (value, literal mapping with `default` fallback);
- `minutes` (timestamp to nonnegative remaining minutes, NaN if invalid),
  `countdown` (timestamp, invalid fallback; `1h 01m left` / `5m left`).

Conditions are evaluated lazily for `if`/`and`/`or`. Expressions are limited to
24 levels and 100 arguments/rules; unknown operations and prototype attributes
are rejected at configuration time. Strings such as old `[[[ JavaScript ]]]`
are **never evaluated**: migrate them into explicit declarative expressions.
Routine command progress/success banners are absent. Disabled controls and
`aria-busy` represent pending work without changing layout; genuine entity
activity and local failure messages remain visible.

## Appearance

```yaml
appearance:
  icon_color: "var(--primary-color)"
  background: "rgba(0,0,0,0.3)"
  active_background: white
  radius: 14px
```

Defaults reproduce a 69px entity/room row, 68px action row, 45px circle, 25px glyph, 17px entity title (18px action), 15px detail. Theme font, border radius, text and light accent are inherited. Default category color is teal `#3bc8ce`, independent of `--primary-color`; lights inherit `--accent-color`. If you want primary-color instead, set it explicitly as above. `active_states` can override entity active-state detection; `detail` can override entity/action secondary text. Entity names/icons use HA values unless overridden by `name`/`icon`.

Stable CSS variables: `--kiosk-height`, `--kiosk-radius`, `--kiosk-background`, `--kiosk-active-background`, `--kiosk-icon-color`, `--kiosk-off-title`, `--kiosk-active-title`, `--kiosk-off-detail`, `--kiosk-active-detail`, `--kiosk-off-circle`, `--kiosk-glyph`, `--kiosk-shadow`, `--kiosk-title-size`, `--kiosk-identity-width`. Shadow parts: `surface`, `icon-target`, `icon-circle`, `body-target`, `title`, `detail`, `feedback`. No private HA/button-card class names are styling dependencies.

## Canadian local smoke air card — DEPRECATED

> **`custom:kiosk-air-card` is deprecated; do not use it for new dashboards.**
> Prefer Home Assistant's built-in [Statistics](https://www.home-assistant.io/integrations/statistics/)
> and [Template](https://www.home-assistant.io/integrations/template/) helpers with
> a built-in dashboard card for a local PM2.5 smoke estimate. Native helper
> window/coverage semantics are not guaranteed to match the custom integration;
> validate real output and missing-data behavior after warmup before cutover.
> A local PM2.5-only estimate is not full or official community AQHI; keep the
> official regional feed separate and render the top local band as **10+**.
>
> Existing air-card rendering and picker registration are retained for fallback
> and rollback until replacements are verified. This notice does not remove or
> disable an installed card. The configuration below is legacy reference.
> **Only the dedicated air card is deprecated:** the shared Kiosk Cards package
> and its other entity, action, room, pill, door, climate and status cards remain
> maintained. Do not uninstall the shared package while other cards use it.

`custom:kiosk-air-card` is read-only. A prominent Canadian number and risk
category lead a calm tinted card with a four-band rail. A smaller optional
regional AQHI remains independent. Identity reuses the standard kiosk 45px
circle, 25px glyph and 17/15px title/subtitle; the hero affects no other cards.

```yaml
type: custom:kiosk-air-card
aqhi_entity: sensor.example_canadian_smoke_index
category_entity: sensor.example_canadian_smoke_category
source_entity: sensor.example_pm25
regional_entity: sensor.example_regional_aqhi # optional, independent regional feed
name: Outside air
location: Patio
stale_after_minutes: 120                    # 1–1440; default 120
# Optional: timestamp when enough local history will be available
# data_expected_entity: sensor.example_history_ready
appearance:
  radius: 30px                             # optional; otherwise HA theme radius
  icon_color: var(--accent-color)
grid_options:
  columns: 12
  rows: auto
```

The local numeric sensor must be a native Canadian **PM2.5-only smoke estimate**,
not a renamed US AQI. Its required attributes are
`index_type: canadian_aqhi_smoke_pm25` and `scope: local_pm25_only_estimate`.
The card does not calculate an index, gather history, convert US AQI to AQHI or
create sensors. Configure the compatible integration profile separately.

| Numeric state | Category sensor state | Display |
| --- | --- | --- |
| 1–3 | `low` | Low risk |
| 4–6 | `moderate` | Moderate risk |
| 7–10 | `high` | High risk |
| 11 | `very_high` | 10+ · Very high risk |

Every **Details** button is at least 44px and supports Enter/Space. Local Details
opens `aqhi_entity`; regional Details opens `regional_entity`, both in native HA
more-info/history. No custom dialogs or physical actions. The local caption says
**Canadian smoke estimate · Local PM2.5 only**; it is not a full multi-pollutant
regional AQHI or a health guarantee. No weather, trend or ventilation advice.

Exact local category/numeric agreement is required; disagreement shows
**Updating**. Missing/unavailable observations show **Unavailable**. Invalid,
unknown or incorrectly typed data show **Unknown**. Unknown calculation plus an
optional future ready timestamp shows **Warming up**. Stale local calculation or
PM source reports show **Stale**. Non-ready states hide the number/rail marker;
zero PM2.5 remains valid input (Canadian index minimum is 1). Backend validity
and history-completeness decisions are never overridden by the card.

Regional AQHI never substitutes or blends with the local estimate. It stays
readable if the local source fails, and vice versa. Location/attribution come
from the regional entity. Environment Canada's XML preserves decimals; the card
uses nearest-integer public reporting, minimum 1, before the published bands:
2.9 → **3 · Low risk**, 3.5 → 4, 6.5 → 7, 10.5 → **10+**. A regional `10+` or
integer 11 displays **10+**. This rounding concerns regional source display,
not local PM-to-index calculation.

Sources: [federal AQHI bands](https://www.canada.ca/en/environment-climate-change/services/air-quality-health-index/about.html),
[Environment Canada source library](https://github.com/michaeldavie/env_canada/blob/master/env_canada/ec_aqhi.py),
[public calculation/rounding description](https://en.wikipedia.org/wiki/Air_Quality_Health_Index_(Canada)#Calculation).

Local freshness requires the numeric backend's `status: valid`, matching
`source_entity`, positive numeric `source_max_age_minutes`, and explicit ISO
`source_last_reported` / `evaluated_at` attributes. HA's normal frontend states
omit `last_reported`; unchanged source `last_updated` is not a receipt time.
The source timestamp ages against the smaller of the backend source limit and
`stale_after_minutes`; evaluation ages independently against the latter.
Missing/malformed timestamps fail closed, with at most one minute of future
clock skew allowed. Backend invalid/history statuses still hide the number.
Regional feeds retain conservative `last_reported` / `last_updated` aging,
never `last_changed`; without explicit report metadata unchanged feeds may age
out. A 30-second clock catches aging without incoming updates and stops on
disconnect. These limits never override backend source checks.

Native visual editor and YAML support the same observations/identity settings.
Appearance fields: `background`, `radius`, `icon_color`. Shared HA/kiosk font,
accent, radius and shadow variables apply. Category color only tints the
surface/rail; readable category text conveys status without relying on color.
No Large toggle or configurable physical actions are exposed on air cards.

## Large tiles

Turn on **Large** in the native visual editor for entity, action, room, door or climate cards. Standard is the default. The editor writes the top-level boolean `var_large`; YAML is optional:

```yaml
type: custom:kiosk-entity-card
entity: light.example
var_large: true
```

Large matches the extracted stacked reference: **146px height**, top-left **45px circle**, unchanged **25px glyph** and title/detail font sizes, with the title beneath the icon. It is not a doubled icon/font scale. Entity/room text begins 14px from the left, title at 96px and detail at 116px; action title begins at 111px. State colors, isolated actions and keyboard controls are unchanged. Editing size does not send device commands. For migration, `variables.var_large` is accepted as a boolean alias; explicit top-level `var_large` (including `false`) wins. Other legacy template variables are not interpreted.

## Sections layout

All seven cards report **`{ columns: 6, rows: "auto" }` by default**; entity/action/room retain those defaults in Large mode, while pills stay compact. You do not need to repeat `grid_options` in YAML or stub configurations. HA merges explicit `grid_options` after the card defaults, so custom `columns: 12`, `rows: "auto"` or intentionally chosen numeric row counts win. The visual editor preserves these overrides; it never forces six columns or a fixed row height. Standard HA visibility conditions are retained. Avoid manually forcing a row height shorter than the rendered card.

This uses the native `LovelaceGridOptions` API, not a global HA patch. Omitted grid configuration, custom overrides and native 8px section gaps are tested against HA frontend 20260930.3 at 320/640px.

## Reuse in other custom cards

The source package exports `KioskBaseCard`, concrete cards, types, `kioskStyles` and immutable `designTokens`. Build outputs include an unbundled ES module library with shared Lit dependency and TypeScript declarations. For design-only reuse (without registering cards):

```ts
import { kioskStyles, designTokens } from "@myevit/kiosk-cards/design";
```

Install from this tagged repository (`npm install github:myevit/kiosk-cards#v0.4.0`), or build/pack locally. There is no npm registry publication. Do not load multiple versions of the browser resource simultaneously; registration guards prevent duplicate-definition exceptions, but the first loaded version wins until the page reloads.

## Development and evidence

```sh
npm ci
npm run build
npx playwright install chromium
npm test
python3 scripts/check_public.py
```

Browser tests exercise the real `dist/kiosk-cards.js` with synthetic `hass` objects, command mocks, geometry, gesture separation, editor events, unavailable states, confirmation cancellation and timeout behavior. These are not live-device tests. Native editor selectors and dialog shell have additionally been exercised against HA frontend `20260930.3` in an isolated browser with API/service calls disconnected. Compatibility is not claimed for every historical frontend version.

[HA custom-card documentation](https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card/) · [HACS frontend requirements](https://www.hacs.xyz/docs/publish/plugin/)

MIT; bundled Lit notices are included in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
