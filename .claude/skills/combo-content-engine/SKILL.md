---
name: combo-content-engine
description: End-to-end content production pipeline — ideation → keyword extraction → blog writing → SEO writing → proofreading → human polish. Trigger when user says "Combo Content Engine", "/combo-content-engine", or requests producing a publish-ready blog post or article from scratch.
version: 1.0.0
category: combo-orchestrator
risk: safe
source: personal
date_added: '2026-05-21'
tools: [claude-code, antigravity, cursor, codex-cli, copilot-cli]
---

# 📝 Content Engine

**Ability:** Ideation → publish-ready draft in one sweep. Combines ideation, keyword grounding, structured writing, and human polish.

## Chain (sequential)
```
brainstorming → keyword-extractor → blog-writing-guide
  → seo-content-writer → professional-proofreader → unslop
```

## Execution
1. Begin response with marker `[combo-content-engine: running]`.
2. Confirm: topic, audience, length target, tone, publication channel.
3. Run each skill in order. Each stage's output becomes the next stage's input verbatim — don't lose artifacts.
4. Final deliverable: publish-ready draft + suggested meta + 3 headline variants.

## Synergy
- Ideation without keyword grounding produces topics nobody searches for.
- SEO writing without proofreading produces ranking-but-awkward prose.
- `unslop` at the end removes AI-detection signals.

## Notes
- Token discipline applies. Save the draft to a file; reference path in response, do not paste full body.
