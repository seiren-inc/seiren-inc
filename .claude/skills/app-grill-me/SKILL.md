---
name: app-grill-me
description: App-development version of grill-me — adversarial elicitation skill that converts vague app ideas ("I want a habit-tracking app") into a fully-specified app-spec covering target platform, core feature loop, monetization, persona, compliance, and 13 other implementable decisions. Includes finance and marketing decision axes. Trigger when user says "app-grill-me", "/app-grill-me", or asks to nail down concrete decisions for an app build.
version: 1.0.0
category: requirements-elicitation
risk: safe
source: personal
date_added: '2026-05-21'
tools: [claude-code, antigravity, cursor, codex-cli, copilot-cli]
---

# 📱🔥 app-grill-me

**Ability:** Converts "I want to build a [vague] app" into a 17-section spec covering monetization, persona, compliance, scale assumption, and platform decisions — refusing vague answers and using binary calibration with named competitor apps.

## Methodology (3 stages)
1. **Grill** — `grill-me` adversarial questioning. Refuse "users", "modern", "simple". Force naming, numbers, comparators.
2. **Market mapping** — `customer-psychographic-profiler` + `awareness-stage-mapper` + `competitive-landscape` to map statements to known apps.
3. **Binary calibration** — for fuzzy items, present A/B with named existing apps ("Like Duolingo's streak system, or like Strava's leaderboards?").

Skills used internally: `grill-me`, `customer-psychographic-profiler`, `awareness-stage-mapper`, `competitive-landscape`, `jobs-to-be-done-analyst`, `pricing-strategy`, `monetization`.

## Output: `app-spec.md` — ALL 17 sections must be filled (no TBD)

### 1. App Identity
- Name (working): ____________
- One-liner (≤12 words): ____________
- Elevator pitch (≤60 words): ____________

### 2. Target Platform (set by Phase 0 of parent combo, recorded here)
- Platform: iOS / Android / Both
- If Both → tech: Flutter / React Native / Expo / Native-each
- Min OS version: iOS ___ / Android API ___

### 3. Core Feature Loop ★Critical
- The single action a user performs most often: ____________
- Frequency: per session / per day / per week / per month
- Time-to-value: ___ seconds from app open to first benefit

### 4. MVP Features (top 3, ranked)
1. ____________
2. ____________
3. ____________
Out of scope (explicitly excluded): ____________

### 5. Differentiation vs 3 Named Competitors
- Competitor 1 (App name): ____________ — we differ by: ____________
- Competitor 2: ____________ — we differ by: ____________
- Competitor 3: ____________ — we differ by: ____________

### 6. Monetization Model ★Critical
- Model: free / ads / freemium / subscription / one-time / IAP / hybrid
- Pricing concept: ___ JPY/USD per ___
- Conversion target: ___% from free to paid
- LTV assumption: ___ JPY/USD
- CAC ceiling: ___ JPY/USD
- Break-even DAU: ___

### 7. Target User
- Primary persona: age / income / context / device habits
- JTBD (functional + emotional + social): ____________
- Awareness stage at install: unaware / problem-aware / solution-aware / product-aware

### 8. Initial Scale Assumption
- DAU range at launch: 10s / 100s / 1Ks / 10Ks / 100Ks+
- Concurrent peak: ___
- Backend infra implications: serverless / managed BaaS / custom

### 9. Auth Model
- Required: anonymous-first / required-from-start
- Methods: email / social (Apple/Google/Twitter) / phone / passkey
- Account recovery strategy

### 10. Data & Sync
- Offline behavior: read-only / write-queue / full-offline
- Sync strategy: realtime / on-app-open / manual
- Storage: local-only / cloud-backed / both

### 11. Permissions
- Required: ____________ (location / camera / mic / contacts / health / photos / notifications)
- Optional: ____________
- Just-in-time vs upfront

### 12. Push Notification Strategy
- Categories: transactional / engagement / promotional
- Frequency cap: ___ per day
- Opt-in moment: install / first-action / after-value

### 13. Compliance ★Critical
- GDPR / CCPA / HIPAA / PCI / COPPA (under-13) / age-gate
- Data residency: any / US / EU / JP
- Privacy policy + data deletion endpoint required

### 14. Tech Stack Constraints
- User-mandated stack (if any): ____________
- Backend preference: Supabase / Firebase / Convex / custom-Node / custom-Python / none
- Payment: Stripe / Apple IAP / Google Play Billing / RevenueCat
- Analytics: PostHog / Amplitude / Mixpanel / Firebase / multiple

### 15. Timeline & Budget
- MVP target ship date: ____________
- Budget bracket: solo / small-team / funded
- Quality bar: prototype / beta / production

### 16. Success Metrics (top 3)
- Activation: ____________ (e.g. "completed first session within 5 min")
- Retention: ____________ (e.g. "D7 retention ≥ 25%")
- Monetization: ____________ (e.g. "5% trial-to-paid conversion")

### 17. Identified Risks (top 3)
- Risk 1: ____________ — mitigation: ____________
- Risk 2: ____________ — mitigation: ____________
- Risk 3: ____________ — mitigation: ____________

### Implementation Flags (downstream branching)
```yaml
platforms: [ios, android]      # from Phase 0
crossPlatformTech: expo        # null if native-each
needsBackend: true
needsPayments: true
needsPush: true
needsOfflineFirst: false
complianceTags: [gdpr]
qualityTarget: beta            # prototype | beta | production
```

## Execution Protocol
1. Begin response with marker `[app-grill-me: running]`.
2. Receive `platforms` flag from parent combo (set by Phase 0). Do not re-ask.
3. Ask 2-3 grilling questions per round (not all at once). Refuse vague answers — "users" → "what age/income/context"; "modern" → "like which named app".
4. For unclear items, use binary calibration with named existing apps.
5. Surface monetization math explicitly: ask LTV, CAC, conversion — calculate break-even DAU live and confront the user with whether their growth assumption supports it.
6. Save final spec to `./app-spec.md` (or user-provided path).
7. Return ONLY: 5-line headline (identity / platform / feature loop / monetization / metric) + file path + the YAML implementation flags block.

## Context Discipline
- Do not generate code or mockups — only questions and decisions.
- Do not paste competitor app contents — name them only.
- Spec file goes to disk; never echo full spec back.
- Batch questions to reduce round trips.
- Stop and ask user if a constraint is being violated (e.g. unrealistic CAC vs LTV).
