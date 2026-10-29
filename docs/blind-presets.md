# Picture-only blind preset matrix

`custom:kiosk-blind-presets-card` is **one composite card**. Each picture is a whole native button controlling a preset for all configured blinds. Names are accessible labels, never production tile captions. There is no long-hold configuration or browser-local preset storage. Use Home Assistant's standard visual card editor.

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

- `blinds`: ordered list of 1–12 unique `cover.*` entities. Optional `name` labels the editor. `width` is a relative picture width greater than 0 and at most 10; default 1. Only `mapping: sequential-tdbu` is supported; omitted mapping means the same. Do not use this card for an independently controlled dual-rail cover.
- `rows`, `columns`: integers 1–12. Their product is the maximum preset count. Empty slots preserve the chosen matrix shape. Columns wrap at narrow widths to preserve 44px touch targets. Rows are content-sized in native Sections; an explicit fixed HA `grid_options.rows` can clip a taller matrix.
- `presets`: ordered list with unique nonempty `id`, nonempty accessible `name`, and one `positions` item per blind, in blind order. Coordinates are finite numbers 0–100 with `top <= bottom`.
- Coordinates are **absolute percentages down from the top** of the window, not HA service percentages. `0/0` means fabric gathered at the top; `0/100` fully closed; `100/100` gathered at the bottom. A thin gathered fabric strip is still drawn at either endpoint.
- Only sequential positions with `top == 0` **or** `bottom == 100` can be dispatched. Structurally valid middle bands such as `30/80` are retained and drawn, but their entire preset is disabled. Explanations and validation errors appear only in the editor, never on production buttons or tooltips. Targets are never silently replaced or converted.
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

## Editor

The normal HA card editor uses real `ha-form` entity, text, and numeric selectors:

1. Select blinds and names/relative widths. Move blinds up/down to reorder pictures; each preset's coordinates follow its blind.
2. Add blinds explicitly. Existing positions are retained; the new coordinate defaults to closed (`0/100`) and is editable.
3. Set rows/columns. Growing preserves existing data. Shrinking below the stored preset count is refused until presets are explicitly deleted.
4. Click a picture to open its item editor. Edit its accessible name and each blind's top/bottom coordinates while watching the picture preview. **Save** emits normal `config-changed`; **Cancel** discards the draft.
5. Correct unsupported middle bands in the item editor. An explanation is shown and Save stays disabled until that preset is supported. Other stored presets are unaffected.
6. Add/reorder presets as needed. Removing a blind or preset requires an explicit confirmation; blind removal deletes that blind's coordinates from all presets. The last blind cannot be removed.

Editing, previewing, saving, cancelling, and removing send **zero** cover commands. Presets live only in card config, under normal dashboard storage and HA editor permissions.

## Command safety without runtime messages

Before the first command, the **entire** plan is validated: all entity IDs, mappings, coordinates, availability, and required capabilities, including already-matched targets. Matched blinds are skipped. There is never a two-axis command pair, automatic retry, or rollback. Commands are awaited in blind order. On partial failure, later commands stop; successful earlier commands are not undone.

One global pending operation blocks every tile silently, without progress text, spinners, dimming, or geometry changes. It ends only after services acknowledge and reported coordinates confirm the preset; the shared 12-second no-confirmation timeout releases the card silently. Failures also release the lock without rendering a message, status node, or tooltip. Internal errors are not evidence that no physical movement occurred. Check the device before issuing another command. Reconfiguration and disconnect invalidate pending continuations; late acknowledgements/errors cannot dispatch later stale commands. Keyboard repeats, inner SVG taps, holds, and double click cannot create multiple plans for one gesture.

## Appearance

The outer container is transparent; existing dashboard wallpaper remains visible. There is no bundled wallpaper. Perimeter padding is zero, gaps are 12px, and the default tile ratio is 1.21333. A three-by-three matrix at 420px card width is approximately 350.37px tall, with 132 × 108.79px tiles (subject to browser subpixel rounding). The first tile starts at the matrix origin and the last tile meets its right/bottom edges. Illustration widths follow `blinds[].width`, such as narrow–wide–narrow for 1/2/1.

Shared `--kiosk-background`, `--kiosk-active-background`, `--kiosk-radius` (HA radius fallback, then 14px), `--kiosk-glyph`, and `--kiosk-icon-color` tokens apply; active artwork falls back to `--accent-color`. Set `--kiosk-radius: 14px` in your theme for the approved 14px radius. The card has focus-visible and pressed feedback. No extra title, status caption, or preset text is visible on production tiles.

## Verification scope

Bundled-DOM Playwright tests exercise drawing, commands, native editor schemas/events, global pending, failures/timeouts/stale continuations, keyboard/pointer gestures, responsive 320/360/400/420/600px sizing, unknown/unsupported state, and config preservation. A separately isolated native-HA harness verifies actual Sections sizing and real HA number/entity selectors, with services mocked and non-static network access denied. Neither test path verifies physical blind movement or authorizes production device commands.
