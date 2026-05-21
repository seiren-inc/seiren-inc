---
name: combo-kappa-dashboard-build
description: Dashboard mega-combo — 10 phases from type/audience selection through KPI grilling, data model design, information architecture, visualization strategy, dashboard-tuned design system, TDD frontend implementation, backend with realtime, performance/QA with realistic data scale, and deploy with meta-monitoring. Uses isolated sub-agents at every phase (Phase 6 nests combo-disciplined-builder). Heavy focus on data correctness, viz quality, and anti-overload discipline. Trigger when user says "Combo Kappa", "/combo-kappa-dashboard-build", "dashboard combo", or requests an end-to-end dashboard build (SaaS dashboard, ops dashboard, customer-facing analytics, etc.).
version: 1.0.0
category: meta-meta-orchestrator
risk: safe
source: personal
date_added: '2026-05-21'
tools: [claude-code, antigravity, cursor, codex-cli, copilot-cli]
---

# κ Combo Kappa — Dashboard Mega Build (10 Phases)

**Ability:** Builds a working, well-designed, fast dashboard from a vague KPI wish list. Data-correctness-first philosophy. Includes anti-KPI discipline (what NOT to show) to prevent dashboard overload — the #1 failure mode.

## Architecture: ORCHESTRATOR ONLY

```
[Parent — ~10K]
   ├── Phase 0: Type & Audience Selection   (PARENT asks user — sync, ~80 tok)
   ├── Phase 1: KPI Grilling                (sub-agent runs dashboard-grill-me → ≤700 tok)
   ├── Phase 2: Data Model & Query Design   (sub-agent, 100K → ≤500 tok)
   ├── Phase 3: Information Architecture    (sub-agent, 80K → ≤500 tok)
   ├── Phase 4: Visualization Strategy      (sub-agent, 80K → ≤500 tok)
   ├── Phase 5: Design System (dashboard-tuned) (sub-agent, 100K → ≤500 tok)
   ├── Phase 6: Frontend Impl (TDD)         (sub-agent runs combo-disciplined-builder, worktree → ≤500 tok)
   ├── Phase 7: Backend & Realtime          (sub-agent, 100K, worktree → ≤500 tok)
   ├── Phase 8: Performance & QA            (sub-agent, 80K → ≤500 tok)
   └── Phase 9: Deploy & Meta-Monitoring    (sub-agent, 80K → ≤500 tok)
        ↓
   Parent merges into 00-kappa-report.md
```

**Parent total cost: ~10K + 10×~500 tok ≈ 15K (200Kの 7.5%)**

## Phase 0: Type & Audience Selection (SYNCHRONOUS, parent-level)

Parent asks via AskUserQuestion:

1. **Dashboard type**: internal-ops / customer-facing / analytics-self-serve / executive / monitoring
2. **Primary audience**: technical / business / executive / external customer
3. **Real-time requirement**: hard (<1s) / soft (~30s) / batched (daily) / on-demand
4. **Data scale**: <1M rows / 1M–100M / 100M–1B / >1B

Records answers to `<workdir>/00-type-audience.txt`. Confirms vague brief and workdir before dispatching Phase 1.

## Phase Dispatch Templates

Every sub-agent prompt enforces "Return ONLY: summary + path. Do NOT paste [thing]."

### Phase 1 — KPI Grilling
> Invoke `dashboard-grill-me` with `dashboardType=<>`, `audience=<>`, `realtimeRequirement=<>`, `dataScale=<>` (from `<workdir>/00-type-audience.txt`). Save full spec to `<workdir>/01-dashboard-spec.md`. Return ONLY: 5-line headline (purpose / top-3 KPIs / refresh / scale / anti-KPI count) + file path + YAML implementation flags block.

### Phase 2 — Data Model & Query Design
> Read `<workdir>/01-dashboard-spec.md`. Invoke `database-architect` + `database-design` + `database-optimizer` + `sql-optimization-patterns` + `sql-pro` + `data-engineering-data-pipeline` + `data-quality-frameworks` (if dataScale ≥ 100M, add: `postgresql-optimization` + `nosql-expert` + `vector-database-engineer` if vector data, `snowflake-development` if Snowflake). Output: schema DDL, query patterns per KPI with EXPLAIN plans, ETL design (if needed). Save to `<workdir>/02-data-layer/`. Return ONLY: table count, top-3 query patterns, estimated query latency p95, 300-word summary. Do NOT paste DDL.

### Phase 3 — Information Architecture
> Read `<workdir>/01-02`. Invoke `dashboard-structure` + `kpi-dashboard-design` + `design-with-claude:information-architect` + `site-architecture`. Produce: page tree (max depth 3), section ordering by question priority, drill-path map. Save to `<workdir>/03-ia.md` with mermaid diagram. Return ONLY: page count, drill-depth used, 300-word summary.

### Phase 4 — Visualization Strategy
> Read `<workdir>/01-03`. Invoke `ui-design:data-visualization` + `design-with-claude:data-visualization-specialist` + `data-storytelling` + `design-with-claude:table-designer` + `claude-d3js-skill` (if custom charts needed) + `plotly` (if Python eval). For EACH KPI in the spec, decide chart type with rationale (line/bar/heatmap/gauge/sparkline/table/KPI-card/funnel/cohort-matrix). Define color encoding rules and comparison baselines. Save to `<workdir>/04-viz-strategy.md`. Return ONLY: chart-to-KPI mapping count, 300-word summary.

### Phase 5 — Design System (dashboard-tuned)
> Read `<workdir>/01-04`. Invoke `design-with-claude:dashboard-designer` + `design-with-claude:dark-mode-specialist` + `design-with-claude:empty-loading-states-specialist` + `design-tokens-color` + `ui-design:typography-scale` + `ui-design:spacing-system` + `design-systems:component-spec` + `design-systems:design-token` + `radix-ui-design-system` + `shadcn` + `design-with-claude:responsive-design-specialist` (if needsMobile). Produce tokens, component library spec (KPI-card / chart-wrapper / data-table / filter-bar / empty-state / loading-skeleton / error-boundary), dark+light themes. Save to `<workdir>/05-design-system/`. Return ONLY: token count, component count, 300-word summary.

### Phase 6 — Frontend Implementation (TDD) ★Nested
> Read `<workdir>/01-05`. Initialize repo at `<workdir>/repo/`. Invoke `combo-disciplined-builder` to scaffold and implement: (a) routing + auth, (b) KPI cards w/ skeleton states, (c) chart components w/ chosen libs, (d) data table w/ virtualization, (e) filter system, (f) drill-down navigation. Pair with `react-best-practices` + `tanstack-query-expert` + `react-component-performance` + `nextjs-app-router-patterns` + `tailwind-design-system`. Save implementation notes to `<workdir>/06-impl-notes.md`. Use isolation: worktree. Return ONLY: features implemented, test coverage %, bundle size, 400-word summary. Do NOT paste code.

### Phase 7 — Backend & Realtime
> Read `<workdir>/02, 06`. Based on flags, invoke: `backend-architect` + ONE of (`supabase` / `convex` / `firebase` / `cloudflare-workers-expert`). Implement: query endpoints with caching tier (Redis / edge / KV depending on stack), realtime channel (WebSocket / SSE / Supabase Realtime) if `realtimeRequirement` ∈ {hard, soft}, row-level security if `needsRLS`, alert engine if `needsAlerts`. Save backend notes to `<workdir>/07-backend.md`. Use isolation: worktree. Return ONLY: endpoint count, cache strategy, p95 latency target, 300-word summary.

### Phase 8 — Performance & QA
> Read `<workdir>/06-07`. Generate realistic test data at `dataScale` (use seed script). Invoke `web-performance-optimization` + `performance-engineer` + `e2e-testing` + `e2e-testing-patterns` + `accessibility-compliance-accessibility-audit` + `screen-reader-testing` + `k6-load-testing` (if soft/hard realtime). Test against TTI / INP / LCP budgets AND query p95 latency. Save QA report to `<workdir>/08-qa.md`. Return ONLY: pass/fail by category, top-5 issues, perf headroom, 300-word summary.

### Phase 9 — Deploy & Meta-Monitoring
> Read `<workdir>/all`. Invoke `appdeploy` + `vercel-deployment` (if Next.js) + `analytics-product` + `analytics-tracking` + `posthog-automation` OR `mixpanel-automation` + `slo-implementation` + `observability-monitoring-monitor-setup` + `ab-test-setup`. Configure: CI/CD pipeline, dashboard-usage analytics (meta: dashboard about the dashboard), SLOs (uptime, query p95, data freshness), error tracking. Save to `<workdir>/09-deploy/`. Return ONLY: CI status, SLO targets, top-3 usage events instrumented, 300-word summary.

### Final Merge
Parent reads only the 10 summaries (~5K total) and writes `<workdir>/00-kappa-report.md` cross-referencing: data layer ↔ chart choices ↔ perf measurements ↔ usage instrumentation.

## Context Discipline (CRITICAL)

| Rule | Enforcement |
|---|---|
| Forbid full-content return | Every sub-agent prompt: "Return ONLY: ..." + "Do NOT paste [thing]" |
| Parent never reads artifact files directly | Only brief summary lookups in final merge |
| Filesystem is the bus | Each phase reads previous artifacts from disk |
| 1K return cap | Re-summarize requested if exceeded |
| Worktree isolation for Phase 6-7 | Code work stays isolated from main repo |
| Nested combo bounded (Phase 6) | combo-disciplined-builder returns ≤500 tok summary regardless of internal complexity |

## Skip / Branch Logic

| Condition | Action |
|---|---|
| `realtimeRequirement: batched/on-demand` | Phase 7 skips WebSocket/SSE setup |
| `needsAlerts: false` | Phase 7 skips alert engine; Phase 9 skips alert delivery |
| `needsExports: false` | Phase 6 skips CSV/PDF export UI |
| `dataScale: <1M` | Phase 8 skips load testing (smoke tests only) |
| `dashboardType: customer-facing` AND `needsRLS: false` | STOP — confirm with user (likely RLS gap risk) |
| Phase 2 finds query p95 > realtime tier budget | STOP — surface data-model breakage before continuing |

## Anti-Overload Discipline ★Unique to Kappa

Three guards built into the orchestrator (not just sub-agents):
1. **KPI ceiling: 12.** If Phase 1 returns >12 KPIs total, parent requests prioritization before Phase 2.
2. **Filter ceiling: 5.** Same as above for filters.
3. **Drill depth ceiling: 3.** Phase 3 cannot produce >3 drill levels — anything deeper is flagged as "this is an analyst tool, not a dashboard."

These guards exist because the #1 failure mode of dashboards is information overload, not under-coverage.

## Marker
Begin response with `[combo-kappa-dashboard-build: running]`.

## Scope Disclaimer
This combo produces:
- ✅ Validated KPI spec + anti-KPI list
- ✅ Optimized data model with query plans
- ✅ IA + viz strategy with rationale per chart
- ✅ Dashboard-tuned design system (dark mode, empty states, loading skeletons)
- ✅ Working frontend with virtualized tables, charts, filters, drill-down
- ✅ Backend with caching, optional realtime, optional alerts, optional RLS
- ✅ Performance-tested at declared data scale
- ✅ CI/CD + meta-monitoring (usage analytics + SLOs)

Does NOT produce:
- ❌ Production data migration (user's existing data → new schema)
- ❌ Custom data pipeline beyond ETL design (use `data-engineering-data-pipeline` directly for complex ETL)
- ❌ Multi-tenant infra hardening (engage `saas-multi-tenant` separately)

## Comparison

| Combo | Specialty | Phases | Nested |
|---|---|---:|---:|
| `combo-sigma-app-mega-build` | mobile app | 10 | 2 |
| **`combo-kappa-dashboard-build`** | **dashboard** | **10** | **1 (Disciplined Builder)** |
| `combo-delta-design-fullstack` | landing/marketing design | 7 | 0 |
| `combo-omega-full-cycle` | site improvement loop | 3 | 0 |

Kappa differs from Sigma by replacing mobile/native phases with data-model + viz-strategy phases, and by introducing anti-overload guards specific to dashboards.

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
