---
title: Standardise feature ui/ folder conventions
date: 2026-05-03
status: accepted
---

# 0008 - Standardise feature ui/ folder conventions

## Context

As the application grew beyond the initial `applications` feature, inconsistencies emerged in how each feature organised its `ui/` subfolder:

- `applications/ui/` used lowercase utility folders (`forms/`, `items/`) but PascalCase page folders.
- `dashboard/ui/` used PascalCase for component containers (`DashboardPage/`, `Items/`) with no `pages/` wrapper.
- `dashboard/model/` contained both a data-fetching hook (`useDashboardMetrics`) and a pure utility function (`calculateMetrics`), conflating two distinct responsibilities.
- The `items/` folder name was ambiguous — it didn't distinguish cards from other list items.
- Neither feature had a `ui/index.ts` barrel, making public API imports inconsistent.

These divergences made it harder to navigate the codebase and onboard new contributors.

## Decision

Adopt a single, enforced `ui/` layout for every feature:

```
features/<featureName>/
  ├─ index.ts                        # named exports only — public API
  ├─ data/                           # data-fetching & mutation hooks (+ co-located tests)
  ├─ lib/                            # pure utility functions only (no hooks, no JSX)
  ├─ model/                          # column definitions, table schemas (optional)
  └─ ui/
      ├─ index.ts                    # re-exports all public UI symbols
      ├─ pages/                      # one folder per route-level page
      │   └─ <FeatureName>Page/
      │       ├─ index.ts
      │       ├─ <FeatureName>Page.tsx
      │       ├─ views/              # alternate renderings (table, kanban…)
      │       └─ components/         # subcomponents private to this page
      └─ components/                 # components reused across 2+ pages in this feature
          ├─ forms/                  # modal / inline forms
          └─ cards/                  # list / card display items
```

### Key rules

| Folder | Rule |
|---|---|
| `pages/` | Route-bound components only |
| `components/` | Anything reused across 2+ pages within the feature |
| `data/` | Hooks that fetch or mutate data — no pure utilities |
| `lib/` | Pure functions only — no hooks, no JSX |
| `index.ts` (feature root) | Named exports only, no default re-exports |
| `ui/index.ts` | Named re-exports of all public UI symbols |

## Rationale

- A consistent layout means contributors always know where to look regardless of which feature they are working in.
- Separating `data/` (hooks) from `lib/` (pure functions) makes each layer independently testable and avoids mixed responsibilities inside `model/`.
- Using `components/cards/` and `components/forms/` is more descriptive and scalable than a flat `items/` folder.
- Named exports throughout the public API make tree-shaking straightforward and remove ambiguity.

## Consequences

- **Positive:** uniform navigation across all features; clearer ownership of each layer; easier to enforce via lint rules or code review checklists.
- **Positive:** `data/` and `lib/` separation enables targeted unit testing without rendering overhead.
- **Negative:** existing features required a one-time migration (folder renames, import path updates).
- **Negative:** contributors must learn the convention; mitigated by this ADR and the scaffold skill.

## Alternatives

- **Keep per-feature ad-hoc structure:** fastest short-term, but compounds confusion as more features are added.
- **Flat `ui/` with no subdirectories:** simple but does not scale once pages accumulate more than a handful of components.
- **Single `components/` at feature root (no `pages/` wrapper):** removes the distinction between route-level and shared components, making navigation harder as features grow.

## Migration applied

- `applications/ui/forms/` → `applications/ui/components/forms/`
- `applications/ui/items/` → `applications/ui/components/cards/`
- `dashboard/ui/DashboardPage/` → `dashboard/ui/pages/DashboardPage/`
- `dashboard/ui/Items/` → `dashboard/ui/components/cards/`
- `dashboard/model/useDashboardMetrics.ts` → `dashboard/data/` (hook, not a model)
- `dashboard/model/calculateMetrics.ts` → `dashboard/lib/` (pure function)
- Added `applications/ui/index.ts` and updated `dashboard/ui/index.ts`

All internal imports updated; TypeScript reports zero errors post-migration.

## Related

- [0001 - Feature-first structure](./0001-feature-first-structure.md)
- [Feature scaffold skill](../../.github/skills/feature-scaffold/SKILL.md)
