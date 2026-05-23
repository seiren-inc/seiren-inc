---
name: combo-alpha-product-launch
description: Cross-domain product launch full stack — strategy, design, implementation, copy, SEO/GEO, launch tactics, and continuous monitoring chained for 0→1 product launch in one session. Trigger when user says "Combo Alpha", "/combo-alpha-product-launch", "product launch combo", or requests an end-to-end new-product launch design.
version: 1.0.0
category: combo-orchestrator
risk: safe
source: personal
date_added: '2026-05-21'
tools: [claude-code, antigravity, cursor, codex-cli, copilot-cli]
---

# 🚀 Combo Alpha — Product Launch Full Stack

**Ability:** Designs the entire 0→1 launch in one session. Replaces work that normally requires 4–5 separate specialists (market analyst, designer, dev, copywriter, marketer).

## Chain (7 phases, sequential)
```
[Strategy]    brainstorming → startup-business-analyst-market-opportunity → osterwalder-canvas-architect
        ⬇
[Design]      design-research:user-persona → ux-strategy:north-star-vision → design-systems:design-token
        ⬇
[Implementation] writing-plans → tdd-workflows-tdd-red → executing-plans → frontend-design
        ⬇
[Copy]        copywriting-psychologist + headline-psychologist + social-proof-architect
        ⬇
[SEO/GEO]     seo-cluster + geo-llmstxt + seo-schema + geo-citability
        ⬇
[Launch]      launch-strategy + paid-ads + viral-generator-builder
        ⬇
[Continuous]  seo-drift + analytics-product + churn-prevention
```

## Execution
1. Begin response with marker `[combo-alpha-product-launch: running]`.
2. Required inputs (ask if missing): product idea, target market, unique value, budget bracket.
3. Run phases sequentially. Each phase's artifacts become the next phase's spec.
4. Surface phase gates — pause and confirm before transitioning between Strategy → Design → Implementation.
5. Final deliverable: launch package (strategy doc + design system + MVP plan + copy library + SEO plan + launch checklist + monitoring dashboard spec).

## Synergy
- Each domain informs the next: persona shapes design, design constrains implementation, implementation defines copy, copy seeds SEO.
- Skipping any domain breaks the chain — explicit skip requires user approval.

## Notes
- Token discipline applies. This is a LONG combo — save artifacts to files frequently; do not accumulate in conversation context.
- Mid-combo, propose using `Agent` tool to delegate independent sub-phases in parallel if context is filling.
