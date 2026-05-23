---
name: combo-beta-site-audit
description: Four-axis full-spectrum site audit — SEO/AI search, UX/a11y, code quality, content quality — running in parallel and consolidated. Trigger when user says "Combo Beta", "/combo-beta-site-audit", "site audit combo", or requests a comprehensive existing-site improvement audit.
version: 1.0.0
category: combo-orchestrator
risk: safe
source: personal
date_added: '2026-05-21'
tools: [claude-code, antigravity, cursor, codex-cli, copilot-cli]
---

# 🔬 Combo Beta — Full-Spectrum Site Audit

**Ability:** Audits an existing site from 4 orthogonal axes simultaneously. Compresses a week of work by 4 specialists into 1 day.

## Chain (4 parallel axes → integrate)
```
[Axis 1: SEO/AI Search]   seo-audit + geo-audit + seo-drift
[Axis 2: UX/Accessibility] ux-audit + ui-review + accessibility-compliance-accessibility-audit
[Axis 3: Code Quality]     production-code-audit + security-audit + find-bugs
[Axis 4: Content Quality]  content-strategy + avoid-ai-writing + copy-editing
        ⬇
[Integration]              code-review-excellence
```

## Execution
1. Begin response with marker `[combo-beta-site-audit: running]`.
2. Required input: target URL or repository path. Ask if missing.
3. For Axes 1, 2, 4 (web-based) — fetch the site once and pass content to each axis skill. For Axis 3 (code) — work against the repo.
4. Run axes sequentially in this session (parallel via `Agent` tool is the upgrade path for large sites).
5. `code-review-excellence` integrates findings into a single prioritized action plan: severity × impact × effort.
6. Final deliverable: 1 consolidated report with cross-axis correlations (e.g. "slow page = poor UX = lower ranking").

## Synergy
- Single-axis audits miss compound issues (slow page hurts SEO AND UX AND conversion).
- Integration step is the multiplier — without it, you have 4 disconnected reports.

## Notes
- Token discipline applies. Save each axis report to a separate file; reference paths in the integration step.
- For large sites, propose `Agent` parallelization upfront.
