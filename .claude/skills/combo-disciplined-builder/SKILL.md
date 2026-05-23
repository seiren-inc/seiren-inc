---
name: combo-disciplined-builder
description: Disciplined development pipeline — TDD + planning + verification + review chained together. Trigger when user says "Combo Disciplined Builder", "/combo-disciplined-builder", "disciplined builder combo", or requests a high-rigor development workflow for a non-trivial feature.
version: 1.0.0
category: combo-orchestrator
risk: safe
source: personal
date_added: '2026-05-21'
tools: [claude-code, antigravity, cursor, codex-cli, copilot-cli]
---

# 🛡️ The Disciplined Builder

**Ability:** Cuts bug density to ~1/3, halves review findings, eliminates design drift by sequencing 8 disciplined skills.

## Chain (sequential)
```
brainstorming → planning-with-files → tdd-workflows-tdd-red → executing-plans
  → tdd-workflows-tdd-green → tdd-workflows-tdd-refactor
    → verification-before-completion → requesting-code-review
```

## Execution
1. Begin response with marker `[combo-disciplined-builder: running]`.
2. Invoke each skill in order via the `Skill` tool. Carry forward outputs (plan, failing tests, refactor diffs) as context to the next step.
3. If a step surfaces a blocker, surface it to the user and pause — never skip silently. Explicit skip requires user approval and rationale.
4. Final step (`requesting-code-review`) summarizes the full chain.

## Synergy
- Each stage sharpens the next stage's input → multiplicative quality gain.
- TDD red→green→refactor sandwich is wrapped by planning (front) and verification+review (back).

## Notes
- Apply skill-creator token discipline: no ASCII banners, narrow filesystem scope, no echoing constituent skill bodies back.
- If a referenced skill is missing, report and ask user.
