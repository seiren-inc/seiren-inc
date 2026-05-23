---
name: dashboard-grill-me
description: Dashboard-specific version of grill-me — adversarial elicitation skill that converts vague dashboard wishes ("I want a dashboard for sales") into a fully-specified KPI / IA / data-source / refresh / alert spec covering 17 sections including anti-KPIs (information-overload prevention). Trigger when user says "dashboard-grill-me", "/dashboard-grill-me", or asks to nail down concrete decisions for a dashboard build.
version: 1.0.0
category: requirements-elicitation
risk: safe
source: personal
date_added: '2026-05-21'
tools: [claude-code, antigravity, cursor, codex-cli, copilot-cli]
---

# 📊🔥 dashboard-grill-me

**Ability:** Forces vague dashboard ideas into a complete spec — every KPI gets a formula, every chart gets a question it answers, every refresh policy gets a rationale. Includes anti-KPI section to prevent dashboard overload (the #1 dashboard failure mode).

## Methodology (3 stages)
1. **Grill** — refuse vague metrics. "Engagement" → "exact formula? sum/avg? over what window? denominator?"
2. **Question-first** — for every chart, force user to articulate the question it answers; charts with no question get cut.
3. **Anti-KPI test** — for every proposed KPI, ask "what decision does this enable?" If "just nice to know" → moved to anti-KPI list (excluded).

Skills used internally: `grill-me`, `jobs-to-be-done-analyst`, `competitive-landscape`, `kpi-dashboard-design`, `dashboard-structure`.

## Output: `dashboard-spec.md` — ALL 17 sections must be filled (no TBD)

### 1. Purpose ★Critical
- Primary mode: decision-support / monitoring / exploration / reporting
- One-sentence outcome: "After viewing this dashboard, the user will ____________"
- Time-to-insight target: ___ seconds (typical: 5-15s)

### 2. Top 5 Questions (the dashboard MUST answer)
1. ____________
2. ____________
3. ____________
4. ____________
5. ____________
(Any chart not mapped to one of these gets removed.)

### 3. KPI Inventory ★Critical (one row per KPI — all fields required)
| Name | Formula | Target | Source | Owner | Decision it enables |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

### 4. User Roles & Permissions
- Roles: viewer / analyst / admin / executive / external
- Field-level masking required: yes / no
- Row-level security required: yes / no

### 5. Drill-Down Depth
- Max levels: 1 / 2 / 3 (cap at 3 — deeper = analyst tool, not dashboard)
- Drill axes: time / geography / segment / cohort / custom

### 6. Filter Dimensions (max 5 — more = filter overload)
- ____________
- ____________
- ____________

### 7. Time Grain
- Default: minute / hour / day / week / month
- Supported alternatives: ____________
- Calendar: rolling-window / fixed-calendar / both

### 8. Refresh Strategy
- Real-time tier: hard (<1s) / soft (~30s) / batched (cron) / on-demand
- Cache TTL: ___ seconds per KPI
- Backfill strategy: ____________

### 9. Alert Thresholds (optional but ask explicitly)
- KPI X: alert if ____________
- Delivery channel: email / Slack / push / in-app
- De-duplication window: ___ minutes

### 10. Export Needs
- CSV: yes / no
- PDF: yes / no
- API access: yes / no
- Scheduled email reports: yes / no + frequency

### 11. Data Sources
- Primary DB: ____________ (Postgres / MySQL / Snowflake / BigQuery / etc.)
- External APIs: ____________
- Files / S3: yes / no
- Streaming (Kafka / Kinesis): yes / no

### 12. Sensitive Data Flags
- PII: yes / no
- Financial: yes / no
- Health (HIPAA): yes / no
- Compliance regimes: GDPR / CCPA / SOC2 / none

### 13. Mobile Responsiveness
- Mobile-essential / mobile-acceptable / desktop-only
- If essential: which views must work on mobile?

### 14. Embed Scenarios
- Standalone: yes / no
- Iframe embed: yes / no
- White-label: yes / no
- API-only headless: yes / no

### 15. Success Metrics (for the dashboard itself)
- Adoption: ___% of target users / week
- Time-to-insight: ___ seconds median
- Decisions taken: ___ per week attributed to dashboard
- Stale-data tolerance: ___ minutes

### 16. Anti-KPIs ★Critical — what we DON'T show
List metrics that were considered but excluded (and why). This is as important as the inclusion list.
- ____________ — excluded because: ____________
- ____________ — excluded because: ____________

### 17. Comparison Baselines (every KPI needs context)
- vs target: yes / no
- vs previous period: yes / no — period: ____________
- vs cohort/segment: yes / no
- vs forecast: yes / no

### Implementation Flags (downstream branching)
```yaml
dashboardType: internal-ops | customer-facing | analytics-self-serve | executive | monitoring
audience: technical | business | executive | external
realtimeRequirement: hard | soft | batched | on-demand
dataScale: <1M | 1M-100M | 100M-1B | >1B
needsExports: true | false
needsAlerts: true | false
needsEmbed: true | false
needsMobile: true | false
needsRLS: true | false
recommendedStack: nextjs+supabase | nextjs+convex | sveltekit+postgres | remix+planetscale
```

## Execution Protocol
1. Begin response with marker `[dashboard-grill-me: running]`.
2. Receive dashboardType & audience flags from parent combo (set by Phase 0). Do not re-ask.
3. Ask 2-3 grilling questions per round.
4. For every KPI proposed, ask "exact formula?" and "what decision does it enable?" — answers that fail the decision test go to Anti-KPIs list.
5. Force max 5 filters and max 3 drill levels — if user wants more, surface the cost (filter fatigue / analyst-tool boundary).
6. Save final spec to `./dashboard-spec.md` (or user-provided path).
7. Return ONLY: 5-line headline (purpose / top-3 KPIs / refresh / scale / anti-KPI count) + file path + YAML implementation flags block.

## Context Discipline
- Do not generate mock data or chart sketches in the response.
- Do not paste reference dashboard contents — name them only.
- Spec file goes to disk; never echo full spec back.
- Batch questions to reduce round trips.
- If user proposes >12 KPIs total, stop and force prioritization (12 = upper limit before dashboard becomes useless).
