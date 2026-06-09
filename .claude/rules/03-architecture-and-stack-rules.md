# 03 — Architecture and Stack Rules

> Repo: seiren-corporate | Applies to: Claude Code, Codex, Antigravity
> Stack: Next.js 15 / React 19 / TypeScript / Tailwind CSS v3 (minimal) / npm / No database

## Directory Conventions

```
src/
  app/           ← Pages, layouts, API routes
  lib/           ← Utilities (seo, aftercare, etc.)
  types/         ← Type definitions
  constants/     ← Shared constants
```

UI components are not preset. Add `src/components/` when implementing the new design.

## Component Rules

- Server Component is the default. Use `"use client"` only when browser APIs or form state are required.
- Path alias: `@/*` → `./src/*`

## TypeScript Rules

- `any` type is forbidden. Use `unknown` and narrow.
- All functions must have explicit return types where the project already uses them.

## Aftercare

- Business logic: `src/lib/aftercare/*`
- Data: `data/aftercare/*.json` (gitignored)
- API: `src/app/api/aftercare/*`
