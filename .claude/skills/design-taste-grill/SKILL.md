---
name: design-taste-grill
description: Adversarial taste-elicitation skill — uses grill-me + taste families to convert vague design aspirations ("premium and modern") into a fully-specified, implementable style sheet covering typography, color, hero layout, motion language, scroll experience, 3D usage, and cursor behavior. Outputs implementation flags that downstream combos use for branching. Trigger when user says "design-taste-grill", "/design-taste-grill", or asks to nail down concrete design decisions from a vague brief.
version: 1.0.0
category: requirements-elicitation
risk: safe
source: personal
date_added: '2026-05-21'
tools: [claude-code, antigravity, cursor, codex-cli, copilot-cli]
---

# 🔥 design-taste-grill

**Ability:** Translates "I want something premium and modern" into a complete spec with numbers — font scale, hero variant, easing family, motion intensity, 3D level — by combining adversarial questioning with taste-based binary choices.

## Methodology (3 stages)
1. **Grill** — `grill-me` style adversarial questioning. Refuse vague answers.
2. **Taste-axis mapping** — `taste` + `gpt-taste` + `stitch-design-taste` map statements to aesthetic axes.
3. **Binary calibration** — for items the user cannot articulate, present A/B with named reference sites.

Skills used internally: `grill-me`, `taste`, `gpt-taste`, `stitch-design-taste`, `design-brief`.

## Output: `style-decisions.md` — ALL sections must be filled (no TBD)

### 1. Brand Voice
- Tone: formal / casual / irreverent / premium / technical / playful (pick 1-2)
- Energy: 1–5
- Trust signal: authoritative / approachable / cutting-edge

### 2. Typography
- Display font (+ fallback stack), Body font (+ fallback)
- Base size px, Scale ratio [1.125 / 1.25 / 1.333 / 1.414 / 1.5 / 1.618]
- Weight strategy, Line-height (tight/normal/loose), Letter-spacing strategy

### 3. Color
- Mood: dark / light / duotone / multi
- Primary, Accent, Neutral system (warm-gray / cool-gray / pure / saturated)
- Contrast level: high / medium / low

### 4. Hero Layout (pick ONE)
- Centered / Left-text+Right-image / Right-text+Left-image / Split50-50 / Full-bleed-image+overlay / Full-bleed-video / Asymmetric-3D / Asymmetric-collage
- Vertical section rhythm (px)

### 5. Grid
- Columns (4/6/8/12), Max content width (px), Gutter (px)

### 6. Imagery
- Style: photo / illustration / 3D / abstract / mixed / none
- Treatment: realistic / duotone / blurred / cropped / monochrome
- Source: stock / custom / generated

### 7. Motion Language ★Critical
- Intensity: none / subtle / moderate / dramatic
- Easing family: snappy / elastic / smooth / cinematic-bezier
- Duration ranges: micro (___ms) / standard (___ms) / hero (___ms)
- Trigger strategy: scroll / hover / idle / load / gesture
- Role: decorative / functional / narrative
- **JS animation lib budget: ___ KB max**

### 8. Scroll Experience
- Pattern: passive / parallax / pinned-sections / scrollytelling / horizontal-pan
- Density: 0 / 1 / 2-3 / 4+ moments

### 9. 3D Usage ★Conditional
- Level: none / accent / hero / immersive
- Style: photoreal / abstract / wireframe / particles / shader-art / generative
- Tech: threejs / spline / lottie-3d / video-fallback
- **3D asset budget: ___ MB max**

### 10. Cursor & Pointer
- Cursor: default / custom / magnetic / trail
- Hover patterns: scale / glow / displace / morph

### 11. Component Density
- Spacious / Comfortable / Dense

### 12. Reference Set (3-5 sites)
- Site 1, Site 2, Site 3 [+ optional 4-5]

### 13. Implementation Flags (downstream branching)
```yaml
needsMotionLayer: true | false
needs3D: true | false
needsScrollChoreography: true | false
recommendedStack: vanilla | framer-motion | gsap | threejs | spline | mixed
```

## Execution Protocol
1. Begin response with marker `[design-taste-grill: running]`.
2. Ask 2-3 grilling questions per round (not all at once). Refuse vague answers.
3. After each major axis, summarize back briefly and ask for confirmation.
4. For unclear items: present binary A/B with named reference sites (e.g. "Linear vs Stripe homepage?").
5. Save final spec to `./style-decisions.md` (or user-provided path).
6. Return ONLY: 5-line headline (tone/typography/color/hero/motion) + file path + implementation flags block.

## Context Discipline
- Do not generate mockups in the response — questions and decisions only.
- Do not paste reference site contents — name them only.
- Spec file goes to disk; never echo full spec back in conversation.
- Batch questions to reduce round trips.
