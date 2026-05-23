---
name: combo-strategic-to-pixel
description: Four-layer design pipeline from strategy to pixel-level implementation — persona/JTBD → design tokens/typography/spacing → component spec → frontend implementation → visual & a11y validation. Trigger when user says "Combo Strategic-to-Pixel", "/combo-strategic-to-pixel", or requests an end-to-end design pipeline for a product/feature.
version: 1.0.0
category: combo-orchestrator
risk: safe
source: personal
date_added: '2026-05-21'
tools: [claude-code, antigravity, cursor, codex-cli, copilot-cli]
---

# 🎨 Strategic-to-Pixel Pipeline

**Ability:** Forces design work to start from strategy and end with verified pixels — eliminates "pretty but doesn't convert" outcomes.

## Chain (4 layers, sequential)
```
[Strategy]
  design-research:user-persona → ux-strategy:jobs-to-be-done → ux-strategy:north-star-vision
            ⬇
[System]
  design-tokens-color → ui-design:typography-scale → ui-design:spacing-system → design-systems:component-spec
            ⬇
[Implementation]
  frontend-design → premium-frontend-ui → react-ui-patterns
            ⬇
[Validation]
  ui-visual-validator → ui-review → accessibility-compliance-accessibility-audit
```

## Execution
1. Begin response with marker `[combo-strategic-to-pixel: running]`.
2. Confirm target product/feature + user audience before starting.
3. Do not skip the Strategy layer even if the user pushes for "just design fast" — surface the trade-off explicitly and let them decide.
4. Each layer's artifact becomes the spec for the next.
5. Final report cross-references Strategy artifacts to validate that implementation honors the original intent.

## Synergy
- Decoupled layers means design tokens stay reusable across products.
- A11y audit at the end catches the most common implementation gaps.

## Notes
- Token discipline applies. Visual artifacts (images, screenshots) are referenced by path, not embedded.
