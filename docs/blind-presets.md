# Picture-only blind preset matrix

`custom:kiosk-blind-presets-card` is **one composite card**. Each picture is a whole native button showing absolute targets for all configured blinds, using each blind's chosen rail mapping. Names are accessible labels, never production tile captions. There is no long-hold configuration or browser-local preset storage. Use Home Assistant's standard visual card editor.

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

- `blinds`: ordered list of 1–12 unique `cover.*` entities. Optional `name` labels the editor. `width` is a relative picture width greater than 0 and at most 10; default 1. Choose `mapping: sequential-tdbu` (also the omitted default) or `mapping: independent-tdbu` separately for each blind. These modes may coexist in one card.
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

Native service mapping is `set_cover_tilt_position(tilt_position=top)` and `set_cover_position(position=100-bottom)`, requiring capability bits 128 and 4 respectively when those services are needed. Thus the `30/70` picture sends **tilt 30 and position 30** to its configured entity, not bottom 70 as HA position. The driver's normal `current_tilt_position=top` and `current_position=100-bottom` should agree, but may still hold old converter cache values after deployment. Independent matching, skipping, ordering, and completion use **only raw `rail_top` / `rail_bottom`**, never those flat cached fields or a scalar-derived rail. Stable `open`/`closed` states and both numeric rails are needed for whole-picture selection; explicit `rails_known:false` prevents whole-picture selection. If `rails_known` is omitted, both unique numeric raw fields suffice. Two-point quantization tolerance applies to arrival/selection, but never relaxes the next movement's safe boundary.

For known rails, a target top below the current bottom (`targetTop > currentBottom`) moves the bottom first and waits for native measured arrival before top movement. A target bottom above the current top (`targetBottom < currentTop`) moves the top first and waits before bottom movement. Otherwise top then bottom is safe. The card checks the next measured clearance as well as destination tolerance before continuing. A newly unsafe boundary or loss of availability/capability aborts subsequent dispatch.

If either raw rail is unknown, do not guess geometry from the old native values: initialize **bottom 100 → top target → bottom target**, waiting for measured arrival after every stage. Bottom 100 is HA `position:0`. Its measured `rail_bottom:100` can release the first stage while `rail_top:null` and `rails_known:false`; top feedback then releases the next stage. The final bottom stage is omitted when target bottom is already 100 (including fully closed `0/100`). Missing raw reports cannot be confirmed by service acknowledgement. An available entity with state `unknown` may start this plan; `unavailable` or a missing entity cannot. Movement reports must settle to `open`/`closed` before arrival matches. No automatic retry or restore occurs.

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

Values must be finite literal numbers. Only commanded entities are checked for availability, capabilities, and native feedback. Missing capabilities fail closed before any dispatch, including for an already-matched explicit target. Sequential commands also require their native numeric attribute before dispatch. Independent commands may start with unknown measurements, but match only their source-unique measured axis: tilt uses `rail_top`, position/open/close use `100-rail_bottom`; the other axis need not be available. Sequential-only endpoint aliases (position 0 requiring tilt 100, tilt 100 requiring position 0) do **not** apply to independent blinds. Matching uses a two-point tolerance and stable `open`/`closed` states; `opening`, `closing`, unknown, or unavailable never match. A highlighted explicit preset means its **native command conditions** match, not that independently measured fabric rails match the drawing. Picture coordinates are never consulted for explicit selection or completion. Acknowledgement alone is not arrival or selection.

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

Before the first command, the **entire** preset is validated against one snapshot: configured entity IDs, mappings, literal coordinates, availability and required capabilities. A position may set `ignored: true` (omitted means false). Ignored shades retain their saved absolute coordinates but are excluded from availability/capability checks, dispatch, initialization, arrival waits and selected matching. Their picture is a muted empty window, not a claimed fabric target. At least one shade must remain included. Legacy native overrides are structurally validated in full, then commands for ignored entities are removed **before** availability checks or execution. An override with no included commands is disabled; it never succeeds as an empty operation or falls back to unrequested picture commands.

For cards containing only `independent-tdbu` blinds and no legacy explicit recipes, each included entity has its own serial worker. Workers settle independently with `Promise.allSettled`: a cold MIDDLE bottom-100 no-op with target-only feedback cannot starve RIGHT's own safe initialization or LEFT's measured movement. Within each shade, measured crossing clearances and native actual arrival still gate later axis commands. A newer valid preset press replaces unfinished intent without disabling the grid or requiring a reload. Preflight failure leaves the previous valid generation running. All old goal waiters and deadlines are cancelled and generation-fenced **before** the new goal is installed. Repeated presses retain only the newest pending goal, not a FIFO of physical commands.

Replacement is a **deferred safe handoff**, not immediate motor preemption. An already-transmitted axis cannot be retracted: its physical arrival observer survives goal cancellation, timeout, config save and removal. The included entity's new worker waits for that axis's genuine measured target with settled motion, and for its uncancellable service publish promise to settle, before recomputing a fresh measured plan. For example, an old top-80 command with stale top-30/STOP feedback cannot authorize a new bottom-70 command; top 80 must first arrive, then the new top 30 must arrive before lowering to 70. Native rail changes or observed motion are required to distinguish actual feedback from unchanged raw remnants republished with target echoes. Target-only echoes and service ACKs never prove arrival. Before each dispatch, current opposite-rail coordinates and motion are checked again; an unsafe clearance waits rather than approximating safety. No STOP, restore, query or unplanned motor command is generated. Ignoring a previously active entity cancels its future goal steps but sends nothing new to it and does not make included workers wait for it; its already-transmitted movement may still finish.

Each handoff/service/destination wait has a bounded **120-second timeout**, including transport acknowledgement and measured arrival. Timeout retires that worker and releases pending UI state without declaring arrival or discarding its unresolved physical barrier. Other workers continue; a future click can install a new goal, but cannot bypass the missing actual report or an unsettled publish. There are no automatic retries or rollbacks. Late ACKs/errors cannot release or mutate a newer generation or resume cancelled steps. Config save and removal cancel continuations and send zero commands. The runtime remains silent: no labels, status captions, tooltips, progress text, spinner, dimming or perimeter padding.

Mixed-mapping cards and cards containing explicit `commands`/`actions` retain the legacy globally pending, whole-plan-preflighted runtime: blind/array order and explicit native semantics are unchanged, except for the ignore filter. They do not offer latest-intent replacement while busy. Keyboard repeat, holds and double clicks cannot create multiple plans for one gesture.

**Commissioning limitation:** cold native actual fields remain honestly unknown until genuine device feedback establishes them; a no-op bottom-100 target echo cannot advance a crossing or select a preset. An unchanged numeric remnant without observed motion also remains unconfirmed. Physical initialization approval timed out; no initialization moves were approved and this setup is **not fully physically commissioned**. Driver v0.8c964 is unchanged; no query/bootstrap fix was established. Later user-authorized movement may establish reports normally. Browser tests use synthetic devices and never invent actual reports automatically for cold no-ops; they do not prove physical movement.

## Appearance

The outer container is transparent; existing dashboard wallpaper remains visible. There is no bundled wallpaper. Perimeter padding is zero, gaps are 12px, and the default tile ratio is 1.21333. A three-by-three matrix at 420px card width is approximately 350.37px tall, with 132 × 108.79px tiles (subject to browser subpixel rounding). The first tile starts at the matrix origin and the last tile meets its right/bottom edges. Illustration widths follow `blinds[].width`, such as narrow–wide–narrow for 1/2/1.

Shared `--kiosk-background`, `--kiosk-active-background`, `--kiosk-radius` (HA radius fallback, then 14px), `--kiosk-glyph`, and `--kiosk-icon-color` tokens apply; active artwork falls back to `--accent-color`. Set `--kiosk-radius: 14px` in your theme for the approved 14px radius. The card has focus-visible and pressed feedback. No extra title, status caption, or preset text is visible on production tiles.

## Verification scope

Bundled-DOM Playwright tests exercise drawing, commands, native editor schemas/events, global pending, failures/timeouts/stale continuations, keyboard/pointer gestures, responsive 320/360/400/420/600px sizing, unknown/unsupported state, and config preservation. A separately isolated native-HA harness verifies actual Sections sizing and real HA number/entity selectors, with services mocked and non-static network access denied. Neither test path verifies physical blind movement or authorizes production device commands.
