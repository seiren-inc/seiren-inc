---
name: combo-triple-layer-visibility
description: Three-layer SEO + GEO + monitoring stack. Optimizes simultaneously for Google, AI Overviews, ChatGPT search, Perplexity — plus drift/cannibalization monitoring. Trigger when user says "Combo Triple-Layer Visibility", "/combo-triple-layer-visibility", or requests full-spectrum search visibility audit/optimization.
version: 1.0.0
category: combo-orchestrator
risk: safe
source: personal
date_added: '2026-05-21'
tools: [claude-code, antigravity, cursor, codex-cli, copilot-cli]
---

# 🌐 Triple-Layer Visibility Stack

**Ability:** Full-spectrum search visibility — traditional SEO + generative AI search + continuous monitoring. Covers Google, AI Overviews, ChatGPT, Perplexity, Bing Copilot in one pass.

## Chain (3 layers, sequential between layers, parallel within)
```
[Layer 1: Traditional SEO]
  seo-audit + seo-technical + seo-content + seo-schema + seo-cluster
            ⬇
[Layer 2: AI Search / GEO]
  geo-audit + geo-citability + geo-llmstxt + geo-platform-optimizer + geo-brand-mentions
            ⬇
[Layer 3: Continuous Monitoring]
  seo-drift + seo-cannibalization-detector + seo-forensic-incident-response
```

## Execution
1. Begin response with marker `[combo-triple-layer-visibility: running]`.
2. Ask user for target URL/domain if not provided.
3. Run Layer 1 first (foundational data). Within a layer, run skills sequentially but treat outputs as parallel inputs to the synthesis.
4. Roll Layer 1 findings into Layer 2 (GEO) — citability and AI-platform optimization should reference SEO findings.
5. Layer 3 establishes baseline for ongoing monitoring; output should include a snapshot + drift watchlist.
6. Final consolidated report: prioritized actions by impact × effort.

## Synergy
- Traditional SEO ≠ AI search SEO. Combining both captures both audiences.
- Monitoring layer prevents regression — most audits ignore it.

## Notes
- Token discipline applies. Do not dump full SERP data into the response — reference only.
