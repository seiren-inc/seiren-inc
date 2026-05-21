---
name: combo-sigma-app-mega-build
description: Mega-combo app development orchestrator — 10 phases from platform-selection through discovery, market analysis, product spec, architecture, design (via nested combo-delta), TDD implementation (via nested combo-disciplined-builder), platform-specific build, QA, marketing/launch, and deployment with monitoring. Uses isolated sub-agents at every phase (and nested meta-combos in Phase 5/6) to keep parent context ~10K regardless of total work volume. Heavy finance/marketing integration. Trigger when user says "Combo Sigma", "/combo-sigma-app-mega-build", "app mega combo", or requests an end-to-end app build from idea to ship-ready.
version: 1.0.0
category: meta-meta-orchestrator
risk: safe
source: personal
date_added: '2026-05-21'
tools: [claude-code, antigravity, cursor, codex-cli, copilot-cli]
---

# Σ Combo Sigma — App Mega Build (10-Phase Orchestrator)

**Ability:** Builds a tested, designed, marketing-ready app from a vague idea to ship-ready scaffold. Each phase runs in isolated sub-agent. Phase 5 nests `combo-delta-design-fullstack`, Phase 6 nests `combo-disciplined-builder`. Heavy monetization + marketing skills integrated.

## Architecture: ORCHESTRATOR ONLY (with nested meta-combos)

```
[Parent — ~10K]
   ├── Phase 0: Platform Selection         (PARENT asks user — sync, ~50 tok)
   ├── Phase 1: App Discovery & Grilling   (sub-agent, app-grill-me → ≤700 tok)
   ├── Phase 2: Market & Monetization      (sub-agent, 100K → ≤500 tok)
   ├── Phase 3: Product Spec               (sub-agent, 80K → ≤500 tok)
   ├── Phase 4: Stack & Architecture       (sub-agent, 100K → ≤500 tok)
   ├── Phase 5: Design System & UI         (sub-agent runs combo-delta — nested → ≤500 tok)
   ├── Phase 6: Core Implementation (TDD)  (sub-agent runs combo-disciplined-builder — nested, worktree → ≤500 tok)
   ├── Phase 7: Platform-Specific Build    (sub-agent, 150K, worktree → ≤500 tok)
   ├── Phase 8: Testing & QA               (sub-agent, 80K, worktree → ≤500 tok)
   ├── Phase 9: Marketing & Launch         (sub-agent, 80K → ≤500 tok)
   └── Phase 10: Deploy & Monitoring       (sub-agent, 80K → ≤500 tok)
        ↓
   Parent merges into 00-sigma-report.md
```

**Parent total cost: ~10K + 11×~500 tok ≈ 16K (200Kの 8%)**

## Required Inputs (collected by parent in Phase 0)
- **Platform**: iOS / Android / Both — ask via AskUserQuestion
- **Vague app idea** (one paragraph from user)
- **Workdir** (default `/tmp/combo-sigma-<timestamp>/`)
- **Repo path** (where to scaffold code — default `<workdir>/repo/`)
- **Quality bar**: prototype / beta / production (asked in Phase 1 if not specified)

If platform missing, **STOP and ask** before dispatching anything.

## Phase 0: Platform Selection (SYNCHRONOUS, parent-level)

Parent does NOT dispatch a sub-agent. Parent directly:
1. Marks `[combo-sigma-app-mega-build: running]`.
2. Uses AskUserQuestion to ask:
   - Q: "作りたいアプリのプラットフォームは？" Options: iOS only / Android only / Both (cross-platform) / Both (native-each)
3. Records answer to `<workdir>/00-platform.txt`.
4. Confirms vague idea and workdir.
5. Proceeds to Phase 1.

## Phase Dispatch Templates

Every sub-agent prompt enforces "Return ONLY: summary + path. Do NOT paste [thing]."

### Phase 1 — App Discovery & Grilling
> Invoke `app-grill-me` with platform=<from-00-platform.txt>. Save full spec to `<workdir>/01-app-spec.md`. Return ONLY: 5-line headline (identity / platform / feature loop / monetization / metric) + file path + YAML implementation flags block.

### Phase 2 — Market & Monetization Analysis
> Read `<workdir>/01-app-spec.md`. Invoke `startup-business-analyst-market-opportunity` + `startup-business-analyst-business-case` + `startup-business-analyst-financial-projections` + `pricing-strategy` + `monetization` + `competitive-landscape` + `startup-metrics-framework`. Save analysis to `<workdir>/02-market-money.md` and financial model to `<workdir>/02-financial-model.csv`. Return ONLY: TAM/SAM/SOM headline numbers, recommended pricing, break-even DAU, 300-word summary.

### Phase 3 — Product Spec
> Read `<workdir>/01` and `<workdir>/02`. Invoke `product-manager-toolkit` + `product-design` + `writing-plans` + `jobs-to-be-done-analyst`. Save full product spec (feature list, user flows, edge cases) to `<workdir>/03-product-spec.md`. Return ONLY: feature count, top-3 flows summary, 300-word summary.

### Phase 4 — Stack & Architecture
> Read `<workdir>/01-03`. Invoke `backend-architect` + `mobile-developer` + `system-design` + `database-architect` + `auth-implementation-patterns` + `payment-integration`. Decide stack matching platform=<>, complianceTags=<>, qualityTarget=<>. Save architecture doc + diagram (mermaid) to `<workdir>/04-architecture.md`. Return ONLY: chosen stack (mobile / backend / auth / payment / analytics), one-line rationale, 300-word summary.

### Phase 5 — Design System & UI ★Nested Meta-Combo
> Read `<workdir>/01-04`. Invoke `combo-delta-design-fullstack` with brief=<from-01> + style-constraints=<mobile + platform-HIG>. For iOS also invoke `hig-foundations` + `hig-platforms` + `hig-patterns`. For Android also invoke `mobile-design` (material). Save design artifacts to `<workdir>/05-design/`. Return ONLY: file tree of design system + 300-word summary. Do NOT paste tokens or components.

### Phase 6 — Core Implementation (TDD) ★Nested Meta-Combo
> Read `<workdir>/01-05`. Initialize repo at `<workdir>/repo/`. Invoke `combo-disciplined-builder` to scaffold and implement: (a) auth integration, (b) primary feature loop, (c) payment integration, (d) analytics SDK setup. For each feature, follow TDD red→green→refactor. Save implementation notes to `<workdir>/06-impl-notes.md`. Use isolation: worktree. Return ONLY: features implemented count, test coverage %, 400-word summary. Do NOT paste code.

### Phase 7 — Platform-Specific Build
> Read `<workdir>/01-06`. Based on platform flag, invoke ONE of:
> - **iOS**: `swiftui-expert-skill` + `swiftui-ui-patterns` + `swiftui-performance-audit` + `swiftui-view-refactor` + `expo-ui-swift-ui` (if Expo) + `macos-spm-app-packaging`
> - **Android**: `android-jetpack-compose-expert` + `kotlin-coroutines-expert` + `expo-ui-jetpack-compose` (if Expo)
> - **Both cross-platform**: `multi-platform-apps-multi-platform` + `expo-deployment` + `expo-cicd-workflows` OR `flutter-expert` + `flutter-ui-ux`
> - **Both native-each**: run both iOS and Android skill sets (heavier — warn user)
> Save platform-specific notes to `<workdir>/07-platform.md`. Use isolation: worktree. Return ONLY: artifacts produced, platform build status, 300-word summary.

### Phase 8 — Testing & QA
> Read `<workdir>/06-07`. Invoke `e2e-testing` + `e2e-testing-patterns` + `test-automator` + `tdd-workflow` + `accessibility-compliance-accessibility-audit` + `swiftui-performance-audit` (iOS) or perf tools (Android). Save QA report to `<workdir>/08-qa.md`. Return ONLY: pass/fail counts by category, top-5 issues, 300-word summary.

### Phase 9 — Marketing & Launch Prep
> Read `<workdir>/01-08`. Invoke `app-store-optimization` + `launch-strategy` + `viral-generator-builder` + `paid-ads` + `referral-program` + `lead-magnets` + `copywriting-psychologist` + `headline-psychologist` + `awareness-stage-mapper`. Produce: ASO package (title/subtitle/keywords/description per locale), launch playbook, paid-ad creative briefs, referral mechanism design. Save to `<workdir>/09-marketing/`. Return ONLY: deliverable count, launch date recommendation, 300-word summary.

### Phase 10 — Deploy & Monitoring
> Read `<workdir>/04-09`. Invoke `appdeploy` + `expo-cicd-workflows` (if Expo) + `analytics-product` + `analytics-tracking` + `posthog-automation` OR `amplitude-automation` OR `mixpanel-automation` + `churn-prevention` + `observability-monitoring-monitor-setup`. Set up: CI/CD pipeline config, analytics SDK init, dashboards spec, churn alerts. Save to `<workdir>/10-deploy/`. Return ONLY: CI status, analytics events instrumented count, 300-word summary.

### Final Merge
Parent reads only the 11 summaries (~6K total) and writes `<workdir>/00-sigma-report.md` cross-referencing all phases. Includes: deliverable map, deferred items, recommended next steps post-MVP.

## Context Discipline (CRITICAL)

| Rule | Enforcement |
|---|---|
| Forbid full-content return | Every sub-agent prompt contains "Return ONLY: ..." and "Do NOT paste [thing]" |
| Parent never reads artifact files directly | Only short summary lookups during merge |
| Filesystem is the bus | Every phase reads previous artifacts from disk, not from chat |
| 1K return cap | If a sub-agent return exceeds 1K tokens, parent asks for re-summarize |
| No silent retry | Phase failure → capture error, surface to user, ask retry or skip |
| Worktree for impl phases | 6/7/8 use `isolation: "worktree"` |
| Nested combos are bounded | Phase 5 (Delta) and Phase 6 (Disciplined Builder) each return summary only — their internal sub-agents stay isolated |

## Skip / Branch Logic

| Condition (from Phase 1 flags) | Action |
|---|---|
| `needsBackend: false` | Phase 4 skips backend-architect/database-architect |
| `needsPayments: false` | Phase 4 skips payment-integration; Phase 6 skips payment |
| `needsPush: false` | Phase 10 skips push setup |
| `qualityTarget: prototype` | Phase 8 (QA) reduces test coverage requirement to smoke tests only |
| `crossPlatformTech: native-each` | Phase 7 runs both iOS and Android branches (warn user about cost) |
| Phase 2 finds CAC > LTV with stated growth | STOP — surface monetization breakage to user before continuing |

## Marker
Begin response with `[combo-sigma-app-mega-build: running]`.

## Scope Disclaimer
This combo produces:
- ✅ Validated spec + market analysis + financial model
- ✅ Architecture decision record + diagram
- ✅ Design system (tokens + components) + key screens
- ✅ Working scaffold with auth + primary feature + payment + analytics, TDD-covered
- ✅ Platform-specific build artifacts
- ✅ ASO package + launch playbook + ad briefs + referral mechanism
- ✅ CI/CD config + analytics instrumentation

This combo does NOT produce:
- ❌ Every edge case handled (production-hardening is post-MVP)
- ❌ Full localization beyond ASO copy
- ❌ App store submission (user must run final review)
- ❌ Live deployment (CI is configured but human must trigger)

## Comparison

| Combo | Phases | Nested combos | Context safety | Output |
|---|---|---|---|---|
| `combo-alpha-product-launch` | 7 (sequential, no isolation) | none | risky | strategy doc |
| `combo-delta-design-fullstack` | 7 (all isolated) | none | safe | design + impl |
| `combo-omega-full-cycle` | 3 (all isolated) | none | safe | improvement cycle |
| **`combo-sigma-app-mega-build`** | **10 (all isolated)** | **2 nested meta-combos** | **safe** | **end-to-end app** |

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
