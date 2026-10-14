# Changelog

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
