# Changelog

## 0.9.1

- Send independent top/bottom targets back-to-back without motor-arrival waits, cold homing, or software clearance sequencing.
- Retain range/capability validation, Ignore settings, publish error handling and measured-only selection.
- Movement coordination belongs to the device controller; its protection behavior has not been independently verified.

## 0.9.0

- Add per-preset Ignore this shade controls, preserving targets and excluding ignored shades from commands, readiness, completion and selection.
- Remove script-copy and native-override editor controls; retain existing inline recipes for compatibility.
- Run independent shade workers so missing feedback from one does not starve others. Accept newer independent preset intents without a disabled-grid refresh trap.
- Preserve already-transmitted movement barriers during safe handoff; never promote target echoes into measured arrival.
- Test realistic no-op/missing feedback and consecutive preset presses. Unknown native hardware state remains an explicit commissioning limitation.

## 0.8.0

- Add independent two-rail mapping and per-blind editor selection; support absolute middle-band targets without scenes or explicit command overrides.
- Match native measured rail fields rather than cached single-lift projections, with feedback-gated safe ordering and cold-start initialization.
- Keep partial-state arrival usable while global state is unknown; do not confirm moving rails or whole-window targets from incomplete measurements.
- Allow 120 seconds per service/destination for actual shade travel, retaining bounded silent failures and existing sequential compatibility.

## 0.7.0

- Picture presets can store explicit native cover commands, independently of picture coordinates, with reported native-state matching and whole-plan preflight.
- The visual editor can copy simple literal cover recipes from an existing script into the preset draft; no source-script link or runtime scene/script dependency is retained.
- Native command controls, atomic import validation and draft Save/Cancel preserve author-selected pictures and reject unsafe or conflicting actions.
- Retained buttons-only output, flush-edge layout and existing automatic sequential mapping for compatible presets.

## 0.6.1

- Blind preset controls render buttons only: no runtime status text, error captions or tooltips. Editor validation stays available.
- Removed composite perimeter padding; retained inter-button spacing and shared themed surfaces.
- Reconciled responsive columns, touch-size thresholds and initial masonry sizing with flush-edge layout.
- Added regressions for silent failures/timeouts and exact zero-padding geometry at narrow/wide sizes.

## 0.6.0

- Composite picture-only blind preset card with configurable shade order/proportions and preset grid dimensions.
- Native visual editor with per-preset preview, draft Save/Cancel, entity selection, reordering and guarded removal.
- Direct sequential-TDBU cover control without scenes or scripts; preflight, global pending lock, report-based selection and no automatic retry.
- Unsupported rail combinations remain visible and editable but cannot actuate. Existing kiosk theme tokens and cards are preserved.
- Synthetic browser coverage plus isolated native Home Assistant grid/editor verification.

## 0.4.0

- Door/contact/cover plus independent linked-lock observations, original icon/state priority and explicit native action overrides.
- Climate current-temperature glyph, target/range/mode detail priority, locale or literal migration formatting, optional HVAC action colors and extracted standard/Large layout.
- Passive temperature/status hero with genuine cross-entity activity, threshold-colored degree glyph and content-based native layout.
- Seven picker types and native visual selectors; door/climate Large and six-column auto-row defaults, explicit grid overrides preserved.
- Synthetic regression coverage and isolated installed-frontend reference/state/geometry/dialog gates; no backend changes or implicit physical actions.

## 0.3.0

- Bounded declarative presentation expressions and conditional actions for state, cross-entity and countdown consumers.
- Quiet pending operations with disabled controls and aria-busy, without routine command banners.

## 0.2.0

- Fourth reusable type: compact kiosk pill cards, also registered and verified as native HA custom badges.
- Extracted compact geometry/typography, field switches, literal state labels and shared safe action controls.
- Pills default to more-info on both targets; no implicit switch/lock actuation and no invented Large variant.
- Native badge/editor and narrow/wide reference validation; prior three-card Large/grid defaults retained.

## 0.1.1

- Native six-column, auto-row defaults for all three cards; explicit HA grid overrides remain authoritative.
- Native visual-editor Large switch writing `var_large`, with boolean migration alias and unchanged standard defaults.
- Measured 146px stacked Large geometry, original icon/font sizes and unchanged state/action/accessibility semantics.
- Narrow/wide standard/Large, editor and override regression coverage.

## 0.1.0

- Entity, explicit action and room-navigation cards with shared Lit design primitives.
- Native visual editor, independent accessible icon/body controls, native confirmation shell.
- Safe-domain quick controls, unavailable-state safeguards and no automatic command retries.
- HACS frontend bundle, reusable source/library exports and synthetic browser tests.
