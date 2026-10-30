# Picture-only blind preset matrix

`rows × columns` is the preset capacity, not reserved empty space. Runtime height follows the actual preset count and responsive column count. Ignored shades retain their place in each picture as muted crossed-out windows; their saved targets are preserved.

`custom:kiosk-blind-presets-v2-card` is **one composite card**. The v2 card and `kiosk-blind-presets-v2-editor` use distinct guarded registrations, allowing native mapping even if an older bundle registered the legacy keys first. The legacy `custom:kiosk-blind-presets-card` key remains supported; migrate only the type when needed, preserving the rest of the config. This does not establish why any particular browser loaded older bytes. Each picture is a whole native button showing absolute targets for all configured blinds, using each blind's chosen rail mapping. Names are accessible labels, never production tile captions. There is no long-hold configuration or browser-local preset storage. Use Home Assistant's standard visual card editor.

```yaml
type: custom:kiosk-blind-presets-card
rows: 3
columns: 3
blinds:
  - entity: cover.example_left
    name: Left
    width: 1
    mapping: sequential-tdbu
  - entity: cover.example_middle
    name: Middle
    width: 2
  - entity: cover.example_right
    name: Right
    width: 1
presets:
  - id: closed
    name: All closed
    positions:
      - { top: 0, bottom: 100 }
      - { top: 0, bottom: 100 }
      - { top: 0, bottom: 100 }
  - id: top_light
    name: Light above
    positions:
      - { top: 30, bottom: 100 }
      - { top: 30, bottom: 100 }
      - { top: 30, bottom: 100 }
  - id: gathered_top
    name: Gathered at top
    positions:
      - { top: 0, bottom: 0 }
      - { top: 0, bottom: 0 }
      - { top: 0, bottom: 0 }
grid_options:
  columns: 12
  rows: auto
```

All example entities are synthetic. No scripts, scenes, helpers, additional resources, or backend integrations are created.

## Configuration

- `blinds`: ordered list of 1–12 shades with unique `cover.*` IDs. Optional `name` labels the editor. `width` is a relative picture width greater than 0 and at most 10; default 1. Choose `mapping: sequential-tdbu` (also the omitted default), `mapping: independent-tdbu`, or `mapping: native-dual-cover` separately for each blind. Native pairs require `entity_top` and `entity_bottom` instead of the legacy `entity`. These modes may coexist in one card.
- `rows`, `columns`: integers 1–12. Their product is the maximum preset count. Empty slots preserve the chosen matrix shape. Columns wrap at narrow widths to preserve 44px touch targets. Rows are content-sized in native Sections; an explicit fixed HA `grid_options.rows` can clip a taller matrix.
- `presets`: ordered list with unique nonempty `id`, nonempty accessible `name`, and one `positions` item per blind, in blind order. Coordinates are finite numbers 0–100 with `top <= bottom`.
- Coordinates are **absolute percentages down from the top** of the window, not HA service percentages. `0/0` means fabric gathered at the top; `0/100` fully closed; `100/100` gathered at the bottom. A thin gathered fabric strip is still drawn at either endpoint.
- Without an explicit native override, sequential blinds permit only `top == 0` **or** `bottom == 100`. Independent blinds permit all `0 <= top <= bottom <= 100`, including actual `30/70`. An unsupported sequential middle band remains stored and drawn, but disabled. Explicit overrides replace the derived plan, not the picture. Explanations and validation errors appear only in the editor, never on production buttons or tooltips. Targets are never silently replaced or approximated.
- Unknown config fields, HA `grid_options`, and HA `visibility` are preserved by the editor.

## Verified sequential converter contract

This is a specific sequential TDBU mapping, not a universal Home Assistant cover abstraction. Required `supported_features` must advertise the relevant cover service.

| Picture target | Exactly one service per nonmatching blind |
| --- | --- |
| `0/0` | `cover.open_cover` (OPEN, bit 1) |
| `0/100` | `cover.close_cover` (CLOSE, bit 2) |
| `t/100`, `t > 0` | `cover.set_cover_tilt_position`, `tilt_position: t` (SET_TILT_POSITION, bit 128) |
| `0/b`, `0 < b < 100` | `cover.set_cover_position`, `position: 100-b` (SET_POSITION, bit 4) |

The deployed converter reports bottom opening in `current_position`. When it is **greater than zero**, picture coordinates are `top=0`, `bottom=100-current_position`; `current_tilt_position` does not represent a simultaneous independent top opening. Thus reported position 100 / tilt 100 means picture `0/0`, **not** `100/0`. At position 0, picture `top=current_tilt_position`, `bottom=100`. Reported position 0 / tilt 100 means gathered bottom; position 0 / tilt 0 means closed. Both numeric attributes must be known and within 0–100.

Reported coordinates select an active white tile with theme-accent art only when **every** blind matches within 2 percentage points and none reports `opening`, `closing`, `unknown`, or `unavailable`. The tolerance accommodates integer raw-position quantization. No requested/optimistic state is displayed as matched.

## Independent rail driver and execution contract

```yaml
type: custom:kiosk-blind-presets-card
rows: 1
columns: 1
blinds:
  - entity: cover.example_independent
    mapping: independent-tdbu
presets:
  - id: middle_band
    name: Middle band
    positions:
      - {top: 30, bottom: 70}
```

The independent driver must expose source-unique `rail_top` and `rail_bottom` attributes, each a finite **raw measured absolute edge from the top**, 0–100; use `null` (or omit) until that axis has a genuine report. `rails_known` is true only when both are known. On converter migration invalidate these unique measurements to null/false; never populate them from old derived scalar/cache values. Preserve a known axis when only the other axis reports. Individual known flags are not needed because numeric versus null raw fields uniquely identify each known axis.

Native service mapping is always `set_cover_tilt_position(tilt_position=top)` followed by `set_cover_position(position=100-bottom)`, requiring capability bits 128 and 4 for every included independent shade. Thus the `30/70` picture sends **tilt 30 and position 30**, not bottom 70 as HA position. Both targets are sent even when measured coordinates already match, so a previous in-flight motor target is replaced correctly.

The card awaits only each Home Assistant service publish return before sending the second target, never physical arrival, opposite-rail clearance, or a STOP report. It does not home unknown rails, reorder crossing moves, or generate STOP/query/restore commands. An available entity with state `unknown` can receive targets; unavailable or missing entities cannot. No actual position samples are required for dispatch.

Selection uses only raw `rail_top` / `rail_bottom`, never cached `current_position` / `current_tilt_position`, target echoes, or service acknowledgement. Both numeric rails, stable `open`/`closed` state, and `STOP` for any supplied motion attributes are required for whole-picture selection (two-point tolerance). Explicit `rails_known:false` prevents whole-picture selection; if omitted, both unique numeric raw fields suffice.

**Physical risk:** motor/driver control owns movement and collision handling; actual motor collision behavior has not been verified by these frontend tests.

## Native dual-cover driver (permanent motor pair)

```yaml
type: custom:kiosk-blind-presets-v2-card
blinds:
  - mapping: native-dual-cover
    entity_top: cover.example_top
    entity_bottom: cover.example_bottom
    name: Example
    width: 1
# Keep existing presets, absolute positions, ignored flags, and height unchanged.
```

Each shade uses two distinct native `cover.*` entities. Both are required and must advertise SET_POSITION (bit 4); included pairs are preflighted together before any shade is dispatched. Missing or unavailable native entities disable the picture. An entity reporting `unknown` may accept absolute targets when it advertises SET_POSITION, but cannot select a picture. Missing measured positions do not prevent absolute targets on otherwise available motors, but can never select a picture. An optional old `entity` is identity-only: it is neither read nor commanded and need not exist in HA. Entity IDs must remain unique across all shade rows.

Absolute picture targets remain **T/B down from the window top**: publish `set_cover_position(entity_top, position=T)` and `set_cover_position(entity_bottom, position=100-B)` back-to-back, without waiting for motor arrival or the other rail's service return. Both targets are replaced on every valid activation, including an already-matching picture. In particular whole-picture OPEN (`0/0`) means native top **0**, native bottom **100**. Do not substitute native `open_cover` on the top motor: that motor's native OPEN is T=100, downward, not the card's whole-picture OPEN.

Only actual native `current_position` numbers in 0–100 select a picture, when **both** entities have stable open/closed states and match within two points. Null, omitted, nonnumeric and nonfinite reports are never coerced to zero. No cached tilt/derived rail fields or target acknowledgements are used. Ignored shades produce zero actions, preflight checks or selection requirements. Pair selectors appear in the normal editor; ordinary absolute T/B, Ignore, Save/Cancel and height semantics stay unchanged. There is no native-command override UI.

Native intent is keyed by the physical top/bottom pair, not an individual axis. Native cards sharing the same HA client's `callService` function share latest-intent replacement; each native entity retains its own publish fence across timeout, reconfiguration and removal until its outstanding service settles. Legacy recipe/sequential/independent transport lanes are separate and retain their existing behavior. Sharing does not extend across browser tabs or different HA client instances. Motor collision control remains the native driver/hardware's responsibility.

### Migration: explicit callers, no compatibility facade

Keep a fresh copy of the current dashboard configuration before migration; do not replace user-edited presets with an example or old snapshot. Change only each migrated blind's mapping and native entity pair, preserving its order, width/name, all positions/Ignore flags, IDs/names, grid/visibility fields and height. The optional old identity can be retained or removed deliberately. Remove legacy `commands`/`actions` for migrated presets explicitly in YAML after checking their intended absolute picture. Native pair entities (and identity-only IDs) are **not** added to the legacy recipe allowlist.

Update automations, scripts, scenes, remotes and dashboards that call the old scalar cover explicitly to the new native motor pair and the appropriate per-motor position/direction. Do not install a custom HA compatibility component, facade, helper script or invented upstream ID. Card support does not itself migrate those callers or discover actual upstream entity IDs. Old card mappings/configurations remain unchanged unless explicitly migrated. Qualification here is offline synthetic HA service transport: zero physical operations; production migration, physical direction/report checks, publication and versioning require separate approval/review.

## Advanced: backward-compatible inline native commands

For existing advanced configurations, an optional per-preset `commands` array (alias `actions`, never both) replaces the entire mapping-derived execution plan. Each entry is one native command with one configured `entity_id`. The array must be nonempty, with at most one entry per entity, even across different axes. Unlisted blinds are **untouched**, not implicitly closed or moved to their illustration coordinates. All picture positions remain required and obey `0 <= top <= bottom <= 100`.

```yaml
# Example only: choose actions from your own working recipe; this is NOT
# an automatic or physically verified mapping from a 30/70 drawing.
id: custom_picture
name: Custom picture
positions:
  - { top: 30, bottom: 70 }
  - { top: 30, bottom: 100 }
  - { top: 30, bottom: 100 }
commands:
  - service: set_cover_tilt_position
    entity_id: cover.example_left
    tilt_position: 30
```

Allowed entries, with no extra fields:

| `service` | Additional field | Capability | Native feedback |
| --- | --- | --- | --- |
| `open_cover` | none | 1 | `current_position: 100` |
| `close_cover` | none | 2 | `current_position: 0` |
| `set_cover_position` | `position: 0..100` | 4 | `current_position` equals requested position |
| `set_cover_tilt_position` | `tilt_position: 0..100` | 128 | `current_tilt_position` equals requested tilt |

Values must be finite literal numbers. Only commanded entities are checked for availability, capabilities, and native feedback. Missing capabilities fail closed before any dispatch, including for an already-matched explicit target. Sequential commands also require their native numeric attribute before dispatch. Independent commands may start with unknown measurements, but match only their source-unique measured axis: tilt uses `rail_top`, position/open/close use `100-rail_bottom`; the other axis need not be available. Sequential-only endpoint aliases (position 0 requiring tilt 100, tilt 100 requiring position 0) do **not** apply to independent blinds. Matching uses a two-point tolerance and stable `open`/`closed` states; `opening`, `closing`, unknown, or unavailable never match. A highlighted explicit preset means its **native command conditions** match, not that independently measured fabric rails match the drawing. Picture coordinates are never consulted for explicit selection. Acknowledgement alone is not arrival or selection.

## Editor

The normal HA card editor uses real `ha-form` entity, text, and numeric selectors:

1. Select blinds, names/relative widths, and each blind's mapping independently (sequential by default). Move blinds up/down to reorder pictures; each preset's coordinates and mapping follow its blind.
2. Add blinds explicitly. Existing positions are retained; the new coordinate defaults to closed (`0/100`) and is editable.
3. Set rows/columns. Growing preserves existing data. Shrinking below the stored preset count is refused until presets are explicitly deleted.
4. Click a picture to open its item editor. Edit its accessible name and each blind's top/bottom coordinates while watching the picture preview. **Save** emits normal `config-changed`; **Cancel** discards the draft.
5. Add/reorder presets as needed. Removing a blind or preset requires explicit confirmation; blind removal deletes that blind's coordinates from all presets. The last blind cannot be removed.

The normal workflow uses absolute picture targets and each blind's independent mapping choice, not script or recipe associations. There is no script selector, script import, native command editor, or command preview. The editor does not read script configurations or call Home Assistant WebSocket APIs.

Existing inline `commands` / `actions` remain supported as advanced, backward-compatible YAML configuration. The visual editor preserves them during picture edits; changing the picture does not change those legacy command conditions. To return such a preset to mapping-derived targets, remove its `commands` / `actions` in the YAML editor. Correct any unsupported sequential middle band before saving. Remove legacy command references in YAML before removing or changing a referenced blind; references are never silently rebound.

Editing, previewing, saving, cancelling, and removing send **zero** cover commands. Presets live only in card config, under normal dashboard storage and HA editor permissions.

## Command safety without runtime messages

Before the first command, the **entire** preset is validated against one snapshot: configured entity IDs, mappings, literal coordinates (`0 <= top <= bottom <= 100`), availability and all required capabilities. Preflight failure leaves the previous valid generation running. A position may set `ignored: true` (omitted means false). Ignored shades retain their saved coordinates but have no availability/capability checks, commands, waits, or selected matching. Their picture is a muted empty window. At least one shade must remain included. Legacy native overrides are structurally validated in full, then ignored commands are filtered before capability checks or execution. An empty filtered override is disabled, never a successful no-op or fallback.

For mapping-derived presets containing independent shades, each included entity publishes its commands serially while different shades run in parallel with `Promise.allSettled`. An unresponsive or failed publish cannot starve other shades. Pure sequential mappings and explicit legacy recipes retain their command order, validations, and partial-command selection semantics.

A newer valid press cancels unsent old steps and installs only the latest intent, without disabling the grid or requiring a refresh. An already-sent publish cannot be cancelled: its per-entity transport fence survives timeout, config save and removal until that service promise settles. New included targets for that entity await only this publish, not motor movement or measured feedback. Ignoring a previously active entity sends it no new commands and never blocks included entities. Late errors and acknowledgements cannot mutate newer intent or resume cancelled steps.

Each publish or wait for an existing publish has a bounded **120-second timeout**. Timeout reports an internal error and releases busy state without faking acknowledgement or discarding an unresolved transport fence. There are no automatic retries or rollbacks. Busy reflects publishing only, not physical travel; selected pictures remain actual-feedback-only. Config save and removal cancel unsent continuations and themselves send zero commands. The runtime remains silent: no labels, status captions, tooltips, progress text, spinner, dimming or perimeter padding. Keyboard repeat, holds and double clicks cannot create multiple plans for one gesture.

## Appearance

The outer container is transparent; existing dashboard wallpaper remains visible. There is no bundled wallpaper. Perimeter padding is zero, gaps are 12px, and the default tile ratio is 1.21333. A three-by-three matrix at 420px card width is approximately 350.37px tall, with 132 × 108.79px tiles (subject to browser subpixel rounding). The first tile starts at the matrix origin and the last tile meets its right/bottom edges. Illustration widths follow `blinds[].width`, such as narrow–wide–narrow for 1/2/1.

Shared `--kiosk-background`, `--kiosk-active-background`, `--kiosk-radius` (HA radius fallback, then 14px), `--kiosk-glyph`, and `--kiosk-icon-color` tokens apply; active artwork falls back to `--accent-color`. Set `--kiosk-radius: 14px` in your theme for the approved 14px radius. The card has focus-visible and pressed feedback. No extra title, status caption, or preset text is visible on production tiles.

## Verification scope

Bundled-DOM Playwright tests exercise drawing, commands, native editor schemas/events, immediate target publishing, publish fences, failures/timeouts/stale continuations, keyboard/pointer gestures, responsive 320/360/400/420/600px sizing, unknown/unsupported state, and config preservation. A separately isolated native-HA harness verifies actual Sections sizing and real HA number/entity selectors, with services mocked and non-static network access denied. Neither test path verifies physical blind movement or authorizes production device commands.
