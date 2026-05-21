---
name: combo-omega-full-cycle
description: Meta-meta combo orchestrating the full improvement cycle — site audit → revenue strategy → disciplined implementation — via isolated sub-agents to bypass context limits. Trigger when user says "Combo Omega", "/combo-omega-full-cycle", "full cycle combo", or requests an end-to-end improve-an-existing-product workflow. Use ONLY when the constituent combos (Beta, Gamma, Disciplined Builder) would exceed a single context window if run sequentially in one session.
version: 1.0.0
category: meta-meta-orchestrator
risk: safe
source: personal
date_added: '2026-05-21'
tools: [claude-code, antigravity, cursor, codex-cli, copilot-cli]
---

# 🌀 Combo Omega — Full Improvement Cycle (Meta-Meta)

**Ability:** Chains three combos that together would exceed any single 200K context window. Uses sub-agent delegation so each constituent combo runs in its own fresh 200K context. Parent retains only summaries + artifact file paths.

## Architecture: ORCHESTRATOR ONLY

**This skill does NOT execute constituent skills directly.** It dispatches each sub-combo to a fresh sub-agent via the `Agent` tool. Parent context cost stays ~5–10K regardless of how heavy the work is.

```
[Parent Orchestrator — ~5K context]
        ⬇ Agent.dispatch
[Phase 1 sub-agent — fresh 200K]  combo-beta-site-audit
        ⬇ returns: 500-word summary + audit.md path
[Phase 2 sub-agent — fresh 200K]  combo-gamma-revenue-engine
        ⬇ returns: 500-word summary + revenue-plan.md path
[Phase 3 sub-agent — fresh 200K]  combo-disciplined-builder
        ⬇ returns: 500-word summary + PR/diff path
[Parent merges 3 summaries → final report]
```

## Required Inputs
- **Target**: URL (for audit) and/or repo path (for implementation)
- **Workdir**: Output directory for artifacts. Default: `/tmp/combo-omega-<timestamp>/`
- **Scope constraints** (optional): max changes, budget, must-preserve items

If any required input is missing, stop and ask.

## Execution

1. Begin response with marker `[combo-omega-full-cycle: running]`.
2. Create workdir. Confirm inputs with user before dispatching.
3. **Phase 1 — Audit (sub-agent)**:
   - `Agent(subagent_type="general-purpose", prompt="Invoke the combo-beta-site-audit skill against TARGET=<url>. Save the full audit report to <workdir>/01-audit.md. Return ONLY: (a) a 500-word executive summary highlighting top-5 issues by impact×effort, (b) the file path. Do NOT include the full report in your response.")`
   - Wait for completion. Parent only stores summary + path.
4. **Phase 2 — Revenue Plan (sub-agent)**:
   - `Agent(subagent_type="general-purpose", prompt="Invoke the combo-gamma-revenue-engine skill, treating <workdir>/01-audit.md as the existing-site baseline. Save the revenue plan to <workdir>/02-revenue-plan.md. Return ONLY: (a) 500-word summary of recommended funnel + top-3 priority changes, (b) the file path.")`
5. **Phase 3 — Implementation (sub-agent)**:
   - `Agent(subagent_type="general-purpose", prompt="Invoke the combo-disciplined-builder skill to implement the top-3 priority changes from <workdir>/02-revenue-plan.md against repo=<repo-path>. Create a feature branch. Save implementation notes to <workdir>/03-impl-notes.md. Return ONLY: (a) 500-word summary of changes made, (b) branch name + diff path.", isolation="worktree")`
   - Use `isolation: "worktree"` so the sub-agent works on an isolated copy.
6. **Merge & Report**: Parent reads the 3 summaries and produces a unified report `<workdir>/00-omega-report.md`:
   - Cross-references findings ↔ revenue plan ↔ implementation
   - Highlights what was deferred and why
   - Final deliverable path list

## Synergy Multiplier
- Three combos together exercise ~30+ skills.
- Linear in one session: impossible (would burst 200K).
- Linear in three sub-agents: feasible because each is independent.
- Parent stays light → user can continue the conversation after Omega without context degradation.

## Context Discipline (CRITICAL)
- **Sub-agent prompts must explicitly forbid full-content return.** Use phrasing like "Return ONLY summary + path. Do NOT paste the full report." This is the single most important constraint.
- **Set workdir before dispatching** so sub-agents know where to save without asking.
- **Do not read sub-agent's artifact files in the parent** — only Phase 4's merge step touches them, and only the sections needed for the final report.
- **If a sub-agent fails**, capture its error, surface to user, and ask whether to retry or abort — do not silently re-dispatch.

## Skip / Branch Logic
- If audit (Phase 1) finds zero P1 issues → skip Phase 2+3, output "no action needed".
- If revenue plan (Phase 2) recommends only content/non-code changes → skip Phase 3 (disciplined-builder is for code), instead dispatch combo-content-engine sub-agent.
- Surface skip rationale to user explicitly.

## Notes
- Token discipline preamble applies to this skill itself: no ASCII banners, narrow scope, no echoing constituent outputs back.
- This skill is the prototype for further meta-meta combos (e.g. Sigma for greenfield launch). The orchestrator pattern is the reusable template.
- Failure mode: if `Agent` tool is unavailable in the current environment, fall back to user-warned sequential execution with explicit context checkpoint at each phase boundary.

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
