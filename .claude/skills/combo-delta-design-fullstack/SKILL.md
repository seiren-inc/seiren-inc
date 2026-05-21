---
name: combo-delta-design-fullstack
description: Design full-stack meta-meta combo with motion + 3D — discovery → grilled style decisions → system build → static implementation → motion layer → optional 3D layer → validation. Uses isolated sub-agents for every phase to keep parent context ~10K regardless of total work volume. Strong motion / 3D coverage with conditional execution based on style-decision flags. Trigger when user says "Combo Delta", "/combo-delta-design-fullstack", or requests an end-to-end design build with strong motion or 3D treatment.
version: 1.0.0
category: meta-meta-orchestrator
risk: safe
source: personal
date_added: '2026-05-21'
tools: [claude-code, antigravity, cursor, codex-cli, copilot-cli]
---

# Δ Combo Delta — Design Full Stack (Motion + 3D, Context-Disciplined)

**Ability:** End-to-end design execution from vague brief to validated award-tier implementation with motion + 3D. Each phase runs in an isolated sub-agent. Parent stays ~10K. Conditional execution skips unneeded phases automatically.

## Architecture: ORCHESTRATOR ONLY

```
[Parent — ~5-10K]
   ├── Phase 1: Discovery               (sub-agent, 80K → ≤700 tok)
   ├── Phase 2: Style Decisions ★      (sub-agent, 60K → ≤500 tok + flags)
   ├── Phase 3: System Build            (sub-agent, 80K → ≤400 tok)
   ├── Phase 4: Static Implementation   (sub-agent, 150K, worktree → ≤500 tok)
   ├── Phase 5: Motion Layer  [if needsMotionLayer]  (sub-agent, 100K → ≤500 tok)
   ├── Phase 6: 3D Layer      [if needs3D]            (sub-agent, 150K → ≤500 tok)
   └── Phase 7: Validation              (sub-agent, 60K → ≤500 tok)
        ↓
   Parent merges into 00-delta-report.md  (reads summaries only)
```

**Parent total cost: ~10K (5K orchestration + 7 × ~700 tok returns).**

## Required Inputs
- Project name / target URL or repo path
- Initial vague brief (e.g. "make Animo landing premium and modern")
- Workdir (default `/tmp/combo-delta-<timestamp>/`)
- Optional budgets: motion JS KB cap, 3D asset MB cap

If missing, stop and ask before dispatching anything.

## Phase Dispatch Templates

Every phase uses `Agent(subagent_type="general-purpose", prompt=...)`. Phase 4/5/6 use `isolation: "worktree"` if a code repo is involved.

### Phase 1 — Discovery
> Invoke `grill-me` + `taste` + `design-research:user-persona` + `ux-strategy:jobs-to-be-done` + `ux-strategy:north-star-vision` for project=<NAME>. Save full discovery to `<workdir>/01-discovery.md`. Return ONLY a 500-word summary covering persona / JTBD / taste-axis baseline. Do NOT paste the discovery doc.

### Phase 2 — Style Decisions ★CORE
> Invoke `design-taste-grill` using `<workdir>/01-discovery.md` as context. Save full spec to `<workdir>/02-style-decisions.md`. Return ONLY: 5-line headline (tone/typography/color/hero/motion) + file path + the YAML implementation flags block (needsMotionLayer / needs3D / needsScrollChoreography / recommendedStack).

### Phase 3 — System Build
> Read `<workdir>/02-style-decisions.md`. Invoke `design-tokens-color` + `ui-design:typography-scale` + `ui-design:spacing-system` + `design-systems:design-token` + `design-systems:component-spec`. Save tokens to `<workdir>/03-design-system/`. Return ONLY: token file count, component count, 200-word summary. Do NOT paste tokens.

### Phase 4 — Static Implementation
> Read `<workdir>/02` and `<workdir>/03`. Invoke `awwwards-landing-page` + `high-end-visual-design` + `premium-frontend-ui` + `frontend-design`. Build static HTML/CSS/JSX in `<workdir>/04-impl/`. Return ONLY: file tree paths, 300-word summary. Do NOT paste code.

### Phase 5 — Motion Layer [conditional: needsMotionLayer]
> Read `<workdir>/02` (motion section) and `<workdir>/04-impl`. Invoke `animation-best-practices` + `magic-animator` + `animejs-animation` + `interaction-design:animation-principles` + `interaction-design:micro-interaction-spec` + `interaction-design:gesture-patterns` + `scroll-experience` + `fixing-motion-performance`. Add motion to `<workdir>/04-impl/`. Save motion strategy doc to `<workdir>/05-motion.md`. Return ONLY: animations-added count, JS budget used vs cap, 300-word summary. Do NOT paste animation code.

### Phase 6 — 3D Layer [conditional: needs3D]
> Read `<workdir>/02` (3D section) and `<workdir>/04-impl`. Invoke `3d-web-experience` + `threejs-fundamentals` + `threejs-materials` + `threejs-shaders` + `threejs-lighting` + `threejs-postprocessing` + `threejs-interaction` + `threejs-textures` + `shader-programming-glsl` + `spline-3d-integration` (or `generate-3d-model` if assets needed). Add 3D to `<workdir>/04-impl/`. Save 3D scene doc to `<workdir>/06-3d.md`. Return ONLY: scene complexity, asset size used vs cap, 300-word summary. Do NOT paste scene/shader code.

### Phase 7 — Validation
> Read `<workdir>/04-impl`. Invoke `ui-visual-validator` + `ui-review` + `accessibility-compliance-accessibility-audit` + `fixing-motion-performance` (perf check). Save report to `<workdir>/07-validation.md`. Return ONLY: pass/fail counts by category, top-5 issues, 300-word summary.

### Final Merge
Parent reads only the 7 summaries (~5K total) and writes `<workdir>/00-delta-report.md` cross-referencing all phases.

## Context Discipline (CRITICAL — DO NOT VIOLATE)

| Rule | Enforcement |
|---|---|
| Forbid full-content return | Every sub-agent prompt contains "Return ONLY: ..." and "Do NOT paste [thing]" |
| Parent never reads artifact files directly | Only short summary lookups during merge |
| Filesystem is the bus | Each phase reads previous phase's artifacts from disk, not from chat |
| 1K return cap | If a sub-agent's return exceeds 1K tokens, parent asks it to re-summarize before proceeding |
| No silent retry | Phase failure → capture error, surface to user, ask retry or skip |
| Worktree for code phases | Phases 4/5/6 use `isolation: "worktree"` to keep main repo clean |

## Skip / Branch Logic

| Condition (from Phase 2 flags) | Action |
|---|---|
| `needsMotionLayer: false` | Skip Phase 5 |
| `needs3D: false` | Skip Phase 6 |
| Phase 4 fails | Stop chain, escalate to user |
| Phase 7 finds critical a11y issue | Re-dispatch Phase 4 with a11y constraints in prompt |

## Marker
Begin response with `[combo-delta-design-fullstack: running]`.

## Comparison

| Combo | Phase2 grilling | Motion | 3D | Validation | Sub-agent isolation |
|---|---|---|---|---|---|
| `combo-strategic-to-pixel` | weak | — | — | a11y only | no |
| `combo-awwwards-strike` | — | high | — | — | no |
| **`combo-delta-design-fullstack`** | **strong** | **high** | **high (conditional)** | **yes** | **yes (every phase)** |

---

## Antigravity / No-Agent-Tool Fallback

If running in Antigravity, Cursor, or another environment **without Claude Code's `Agent` tool**, the automatic sub-agent dispatch above fails. Use the hybrid pattern defined in `combo-antigravity-hybrid-pattern`:

- Orchestrator generates each phase prompt as a ready-to-paste block
- User opens a New Conversation (Cmd+T) in Antigravity and runs that phase there
- Each Antigravity conversation = its own fresh 200K context (= our isolation property preserved)
- User pastes the 300-500 word summary back into the orchestrator conversation
- Orchestrator records summary and proceeds to next phase

Same context discipline applies: artifacts on disk, summaries only in chat, never echo full content.

See: `combo-antigravity-hybrid-pattern` skill for full protocol.
