# AGENTS.md — seiren-corporate

## Execution Flow
Analysis → Plan → Explicit Approval → Execution → Verification
Execution requires explicit approval.

## Core Objective
- Maintain Seiren as a high-trust, authoritative brand site
- Serve as the central hub for all service sites
- Preserve SEO, GEO, and brand integrity across all pages
- Optimize for Context Management and Token Save

## Non-Negotiables
- Do not break brand consistency or positioning
- Do not modify routing, metadata, canonical, sitemap, or structured data without approval
- No DB / auth / environment changes without approval
- No unsafe API exposure
- Type safety required (no `any`)

## Brand Protection
- Do not alter tone, messaging, or positioning without explicit request
- Maintain consistency across all service links and descriptions
- Do not introduce misleading or unverified claims

## Site Integrity
- Preserve relationships between corporate site and service sites
- Do not break internal linking structure
- Maintain correct navigation and hierarchy across pages

## Search Quality Protection
- Preserve structured data and indexable content quality
- Maintain entity clarity and brand authority
- Do not weaken SEO, GEO, or MEO signals
- Ensure consistency between corporate content and service site content

## Data / Security
- Never expose secrets or internal endpoints
- Validate all external data before use
- No PII in logs or external APIs

## UI Protection
- Do not change layout, spacing, typography, or visual hierarchy without explicit request
- Preserve visual quality and brand presentation

## Validation
- Build must pass
- No SEO / GEO / MEO regression
- No brand inconsistency across pages
- All service links must remain valid

## Stop Conditions
- Unclear requirements
- Brand impact uncertainty
- SEO / GEO / MEO impact uncertainty
- Cross-site consistency issues
- Navigation or hierarchy side effects

## Cursor Cloud specific instructions

Single Next.js 15 app (corporate site + aftercare MVP). **UI is placeholder-only** after design wipe (2026-06); implement new design from scratch. No Docker, database, or external services required for local dev.

### Commands (see `CLAUDE.md` / `package.json`)
- Install: `npm install`
- Dev server: `npm run dev` (port 3000)
- Lint: `npm run lint`
- Test gate: `npm test` (runs lint + build)

### First-time local setup (not in update script)
1. Copy `.env.example` → `.env.local` and set `AFTERCARE_ADMIN_ACCESS_KEY` if testing admin auth.
2. For aftercare token/admin flows, create `data/aftercare/cases.json` (gitignored; no seed script in repo). The directory and `submissions.json` are auto-created on first API write.

### Aftercare dev notes
- File-backed JSON under `data/aftercare/` (`cases.json`, `submissions.json`).
- When `AFTERCARE_ADMIN_ACCESS_KEY` is unset, admin routes are open; with a key set, use cookie login or `x-aftercare-admin-key` header on API routes.
- Corporate pages work with dev server only; aftercare E2E needs seeded `cases.json`.

### Dev server
Run `npm run dev` in a persistent session (tmux). Hot reload picks up most source changes; restart if env or `next.config` changes are not reflected.
