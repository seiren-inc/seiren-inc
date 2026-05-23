---
name: combo-bug-hunter-pack
description: Multi-angle debugging — attacks one bug from 5 axes (procedure / trace / hypothesis / phase / root cause) in parallel for full coverage. Trigger when user says "Combo Bug Hunter Pack", "/combo-bug-hunter-pack", "bug hunter combo", or requests intensive debugging of a stubborn issue.
version: 1.0.0
category: combo-orchestrator
risk: safe
source: personal
date_added: '2026-05-21'
tools: [claude-code, antigravity, cursor, codex-cli, copilot-cli]
---

# 🔍 Bug Hunter Pack

**Ability:** Multi-axis attack on a single bug. Combines procedure, evidence, hypothesis, phase-gating, and root-cause analysis — drastically reduces "fixed but recurs" outcomes.

## Chain (parallel + integrate)
```
systematic-debugging × error-detective × bug-hunter × phase-gated-debugging
  → root-cause-fix (integrates findings)
```

## Execution
1. Begin response with marker `[combo-bug-hunter-pack: running]`.
2. Collect the symptom / repro / observed behavior from the user first. Stop and ask if missing.
3. Invoke the 4 axes (`systematic-debugging`, `error-detective`, `bug-hunter`, `phase-gated-debugging`) — share the same symptom context to each. Run sequentially in Claude Code (parallelism is not available for the Skill tool).
4. Consolidate findings into a hypothesis ranking.
5. Invoke `root-cause-fix` against the top-ranked hypothesis.
6. Report: cause + fix + prevention plan.

## Synergy
- 4 orthogonal lenses → minimal blind spots.
- `root-cause-fix` prevents recurrence; without it the pack would just locate, not heal.

## Notes
- Token discipline applies. Do not echo full stack traces back to the user — reference file:line only.
