---
name: combo-antigravity-hybrid-pattern
description: Reference pattern for running meta-meta combos (Omega/Delta/Sigma/Kappa) in Antigravity (or other Gemini-based agents that lack Claude Code's Agent tool). Replaces automatic sub-agent dispatch with user-mediated hand-off via Antigravity Workspaces and New Conversations. Trigger when user says "Antigravity hybrid pattern" or when a mega-meta combo is invoked inside Antigravity.
category: meta-orchestrator
risk: safe
source: personal
date_added: '2026-05-21'
tools:
  - antigravity
  - cursor
  - gemini-cli
tags:
  - combo
  - antigravity
  - hybrid
  - fallback
version: 1.0.0
---

# 🔀 Combo Antigravity Hybrid Pattern

**Ability:** Adapts the sub-agent dispatch pattern (designed for Claude Code's `Agent` tool) to environments lacking that primitive. Uses Antigravity's UI affordances (Workspaces, New Conversation, Agent Manager) as the hand-off mechanism. Preserves the context-isolation benefit by relying on the IDE's own conversation isolation.

## Why This Exists

The mega-meta combos (Omega, Delta, Sigma, Kappa) achieve context-safety by dispatching each phase to a fresh sub-agent via `Agent(subagent_type=..., prompt=...)`. This tool is **Claude Code-specific**. Antigravity (Gemini 3.1 Pro) does not expose it.

Without sub-agent dispatch, running a mega combo sequentially in one conversation would exceed the 200K context window. This hybrid pattern preserves the safety property by leveraging Antigravity's native conversation isolation — each Antigravity conversation is its own 200K window.

## The Pattern: User-Mediated Hand-Off

```
[Orchestrator conversation in Antigravity — parent ~10K]
   │
   │  At each phase boundary:
   │   1. Orchestrator generates a ready-to-paste prompt
   │   2. Orchestrator instructs user: "Open New Conversation (Cmd+T),
   │      paste this prompt, run it. When done, paste the summary back here."
   │   3. User executes the phase in a NEW Antigravity conversation
   │      (= fresh 200K context, isolated from orchestrator)
   │   4. User copies the phase summary + artifact paths
   │   5. Pastes back into orchestrator conversation
   │   6. Orchestrator records summary, moves to next phase
   │
   ↓
[Final merge in orchestrator]
```

## Required User Actions (each phase)

| Step | What user does in Antigravity |
|---|---|
| 1 | Press **Cmd+T** or click **"+ New Conversation"** in left sidebar |
| 2 | Optionally open **Workspaces** menu and pick a relevant scope (e.g. project folder) |
| 3 | Paste the prepared prompt provided by orchestrator |
| 4 | Run; wait for completion |
| 5 | Copy the structured summary + file paths from the new conversation's final message |
| 6 | Return to orchestrator conversation, paste the summary |

## Phase Prompt Template

Orchestrator must generate prompts in this format for the user to paste:

```
[Phase N of <COMBO_NAME>]

CONTEXT (read this first):
- Project: <NAME>
- Workdir: <PATH>
- Previous phase output: <PATH or empty>

TASK:
<the actual phase instructions, identical to Claude Code version but
without the "Agent(...)" wrapper since YOU are now the agent>

DELIVERABLES:
- Save full artifact to: <workdir>/<phase-N>.md
- Return ONLY a 300-500 word structured summary covering: <bullets>
- Do NOT paste the full artifact back. Reference the file path only.

When complete, paste back into the orchestrator conversation:
1. The 300-500 word summary
2. The artifact file path
3. Implementation flags block (if any)
```

## Context Discipline (CRITICAL)

Same rules as Claude Code combos — they apply to the orchestrator AND every phase conversation:

| Rule | Why |
|---|---|
| Each phase conversation must return ≤500 word summary + file paths | Keeps orchestrator context light |
| Phase artifacts live on disk, never echoed | Filesystem is the bus between conversations |
| Orchestrator reads artifacts only at final merge | Prevents context bloat |
| If a phase conversation exceeds 200K, user must split it manually | Antigravity has no auto-compaction across phases |

## Antigravity-Specific Tips

- **Workspaces**: Use a dedicated Workspace per combo run. Each Workspace can have its own scope/permissions.
- **Model choice**: Set the orchestrator to Claude Opus 4.6 (Thinking) for best summary reasoning. Phase conversations can use Gemini 3.1 Pro for speed.
- **Agent Manager**: If "Open Agent Manager" is available, advanced users may dispatch phases to managed agents instead of New Conversations.
- **MCP servers**: If `claude-in-chrome` or `computer-use` MCP is connected to the orchestrator, it can autonomously open/manage New Conversations via UI automation — partial automation.

## Trade-offs vs Claude Code

| Aspect | Claude Code (Agent tool) | Antigravity Hybrid |
|---|---|---|
| Automation | Fully automatic | User-mediated hand-off |
| Context safety | Built-in | Preserved via conversation isolation, but user must follow protocol |
| Speed | Fast (no UI round-trips) | Slower (user copy-paste between conversations) |
| Reliability | High | Depends on user discipline |
| Parallelism | Possible (multiple Agent.dispatch) | Possible via multiple Workspaces, but manual |

## When to Use This vs Run in Claude Code

| Situation | Use this hybrid | Use Claude Code combo |
|---|---|---|
| Already deep in Antigravity for the project | ✓ | |
| Want fully autonomous run | | ✓ |
| Want fastest completion | | ✓ |
| Heavy 3D / design preview needed (Antigravity strength) | ✓ | |
| Want minimal user interaction | | ✓ |

## Marker
Begin orchestrator response with `[combo-XXX-antigravity-hybrid: running]`.
