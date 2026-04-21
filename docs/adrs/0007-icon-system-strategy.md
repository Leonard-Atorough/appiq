---
title: In-House Icon System with Hybrid Approach
date: 2026-04-14
status: accepted
---

# In-House Icon System with Hybrid Approach

## Context

AppIQ needs a consistent, scalable approach to managing SVG icons across the design system. Currently, icons are scattered across multiple files (`dropdown.icons.tsx`, `toast.icons.tsx`, inline in components) with no centralized registry or consistent sizing/styling.

Three approaches were evaluated:

1. **Standardized In-House Library**: Build a comprehensive, curated icon library with tooling
2. **External Icon Library**: Use Lucide, Heroicons, or similar (500+ pre-built icons)
3. **Hybrid In-House System**: Minimal, intentionally-scoped icon registry with a reusable wrapper component

### Key Constraints

- **MVP stage**: No need for 500+ icons; ~15-20 essential icons cover current UI patterns
- **Design tokens**: Icons must integrate natively with Tailwind + CSS variables for theming
- **Accessibility**: ARIA attributes should be handled consistently
- **Maintenance**: Minimize external dependencies and maintenance burden during early product development
- **Dark mode**: Automatic theming via `currentColor` + existing design tokens

## Decision

**Adopt a hybrid in-house icon system** with:

1. Centralized `src/shared/ui/Icon/` folder for all icon components
2. Icon registry + base `Icon` wrapper component for consistent sizing, color, and ARIA handling
3. Organized subfolders by category (actions, status, navigation, UI)
4. TypeScript union type (`IconName`) for autocomplete and type safety
5. Tailwind variants (CVA) for responsive sizing and semantic colors
6. Incremental growth: start with 15-20 essential icons, extend as features demand

## Rationale

### Why Hybrid over Pure In-House?

Building a full icon system with tooling (generation, curation, optimization) is premature at MVP. The hybrid approach defers that investment until proven necessary:

- **Faster iteration**: No build tooling, no separate icon process
- **Lower maintenance**: Only icons you actually use
- **Intentionality**: Each icon addition is a deliberate feature decision
- **Consistency**: All icons follow the same pattern (CVA, props, ARIA)

### Why Hybrid over External Library?

External libraries (Lucide, Heroicons) introduce unnecessary complexity:

- **Bundle bloat**: 500+ icons when you use 20; tree-shaking helps but still overhead
- **Design friction**: Opinionated stroke widths, sizing may not match your brand
- **Dark mode overhead**: Extra CSS or theming setup needed for seamless integration with tokens
- **Dependency risk**: Breaking changes, API opinions, update overhead
- **Over-engineering**: Solving problems you don't have yet

### Why Hybrid is Right for AppIQ

- **Matches your architecture**: Aligns with feature-first, composition-over-inheritance principles
- **Design token native**: Icons use `currentColor`; Tailwind scales them via size variants
- **Type safety**: Union type registry prevents typos; enables IDE autocomplete
- **Single source of truth**: One place to audit, extend, or refactor all icons
- **Easy future migration**: If you scale to 100+ icons, swap internals for Lucide without changing consuming code

## Consequences

### Positive

- **Type-safe icon usage**: `<Icon name="kebab" />` vs `<KebabIcon />`; IDE helps you discover available icons
- **Consistent sizing**: All icons respect design token scales (xs, sm, md, lg, xl)
- **Semantic colors**: Icons inherit app theme via Tailwind color variants or design tokens
- **Namespace collapse**: No need to import 20 different icon components; one import, 20 names
- **Dark mode automatic**: Icons use `currentColor`; theming happens at CSS variable level (no component changes)
- **Accessibility consistent**: Base wrapper handles common ARIA attributes
- **Extensible**: Adding a new icon is a 3-line component + 1 name in the registry

### Negative

- **Maintenance responsibility**: You own icon design, consistency, optimization
- **No icon management UI**: Can't browse a Figma/Storybook gallery of 500 icons (by design)
- **Manual scaling**: As icon count grows (50+), you may want to build tooling (batch export from Figma, naming conventions, etc.)
- **No automatic updates**: When trends shift (e.g., thinner strokes), you update manually, not via dependency bump

## Alternatives

### Alternative A: Lucide React / Heroicons

**Why rejected**: Over-engineered for MVP. 500+ icons, opinionated design, extra CSS setup for dark mode, dependency updates. Trade-off: faster initial feature development vs. long-term maintenance and bundle size.

**Fallback**: If you reach 100+ icons, Lucide integration is straightforward (drop-in replacement; Icon wrapper remains the same).

### Alternative B: Pure In-House with Tooling

**Why rejected**: Building icon generation, optimization, and curation tooling is a distraction at MVP. Defer until proven need (e.g., 200+ icons, design system maturity, multiple platforms).

**Fallback**: Hybrid approach naturally evolves into this if demand grows.

## Implementation Plan

### Phase 1: Foundation (1-2 hours)

1. Create `src/shared/ui/Icon/` folder structure
2. Build `Icon.tsx` wrapper with size/color variants
3. Create `icon.types.ts` with `IconName` union
4. Create `icon.variants.ts` (CVA) for sizing, colors
5. Set up icon registry

### Phase 2: Migration (30 mins–1 hour)

1. Move existing icons (Dropdown, Toast, EmptyState) into organized subfolders
2. Update imports across codebase
3. Verify tests still pass

### Phase 3: Documentation (15 mins)

1. Add Icon usage guide to Component Showcase
2. Document naming conventions in `ICON_NAMING.md` or README
3. Add to contributing guidelines

### Phase 4: Ongoing

- Add icons incrementally as features demand (search, filter, sync, etc.)
- Review icon consistency quarterly
- If 50+ icons accumulate, evaluate icon generation tooling

## Related

- [Architecture.md](../Architecture.md) — Feature-first, composition-over-inheritance principles
- [ADR 0005 — Modern Design Principles](./0005-modern-design-principles.md) — Design token strategy
- [ADR 0003 — Tailwind CSS + Tokens](./0003-tailwind-css-tokens.md) — Design token implementation

## Questions / Decision Gate

- **Q: What if we need Lucide later?** → Easy drop-in: Icon wrapper stays the same, just swap internals
- **Q: How do we prevent icon sprawl?** → Code review discipline; maintain a fixed icon inventory in `icon.types.ts`
- **Q: Can we use Figma exports?** → Yes, but manual SVG copy/pasta for now; automate if 50+ icons appear
- **Q: What about icon animation?** → Keep in wrapper or per-icon; use Tailwind keyframes or inline CSS-in-JS
