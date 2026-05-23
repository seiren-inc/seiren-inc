---
name: combo-content-to-rank
description: Content production pipeline optimized for search ranking — keyword strategy → cluster → programmatic generation → writing → meta optimization → snippet hunting. Trigger when user says "Combo Content-to-Rank", "/combo-content-to-rank", or requests an end-to-end ranking-focused content production workflow.
version: 1.0.0
category: combo-orchestrator
risk: safe
source: personal
date_added: '2026-05-21'
tools: [claude-code, antigravity, cursor, codex-cli, copilot-cli]
---

# 📈 Content-to-Rank Pipeline

**Ability:** Keyword design → bulk page generation → featured-snippet capture, in one chain.

## Chain (sequential)
```
seo-keyword-strategist → seo-cluster → programmatic-seo
  → seo-content-writer → seo-meta-optimizer → seo-snippet-hunter
```

## Execution
1. Begin response with marker `[combo-content-to-rank: running]`.
2. Ask user for seed topic / domain / target persona if missing.
3. Run each skill in order, passing artifacts forward (keyword list → cluster map → page structure → drafts → optimized meta → snippet candidates).
4. Final deliverable: a ranked publish queue with predicted impact.

## Synergy
- Each stage compounds: a sharper keyword list yields a denser cluster, which feeds programmatic templates, which feed the writer with structured prompts.
- Snippet hunting at the end captures the highest-CTR placements.

## Notes
- Token discipline applies. Do not paste full keyword lists or article bodies — reference saved files.
