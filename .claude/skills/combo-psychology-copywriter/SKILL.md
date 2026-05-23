---
name: combo-psychology-copywriter
description: Six-lever psychology-stack copywriting — copy, headline, scarcity/urgency, loss aversion, social proof, objection preemption — followed by AI-detection bypass and human polish. Trigger when user says "Combo Psychology Copywriter", "/combo-psychology-copywriter", or requests conversion-optimized copy for landing pages, ads, emails, or sales pages.
version: 1.0.0
category: combo-orchestrator
risk: safe
source: personal
date_added: '2026-05-21'
tools: [claude-code, antigravity, cursor, codex-cli, copilot-cli]
---

# 🧠 Psychology-Stack Copywriter

**Ability:** Six psychology levers applied in parallel + AI-detection bypass — typically 1.5–2× conversion lift over single-skill copywriting.

## Chain (parallel + finishing)
```
copywriting-psychologist × headline-psychologist × scarcity-urgency-psychologist
  × loss-aversion-designer × social-proof-architect × objection-preemptor
            ⬇
avoid-ai-writing → unslop
```

## Execution
1. Begin response with marker `[combo-psychology-copywriter: running]`.
2. Confirm offer, audience, awareness stage, and primary objection. If missing, ask.
3. Run the 6 psychology skills sequentially, each producing a copy variant or angle.
4. Integrate the 6 variants into a single copy draft with each lever explicitly mapped.
5. Run `avoid-ai-writing` to strip AI tells and `unslop` for final human polish.
6. Output: final copy + lever-attribution map + 2–3 A/B test variants.

## Synergy
- Single levers convert weakly; multi-lever stacking compounds CTR × close rate.
- AI-detection bypass is critical for ads and SEO (modern detectors penalize stock AI prose).

## Notes
- Token discipline applies. Do not paste competitor copy verbatim — reference URLs.
