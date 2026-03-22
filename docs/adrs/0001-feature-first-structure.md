---
title: Feature-first (vertical-slice) folder structure
date: 2026-03-22
status: accepted
---

# 0001 - Feature-first (vertical-slice) folder structure

## Context

Early in development we want maximum velocity and minimal friction when adding new features. Grouping by technical layer (components, services, etc.) tends to increase cross-team coordination and can make feature work span many folders.

## Decision

We adopt a feature-first (vertical-slice) folder structure. Each feature directory contains UI, data, state (model), and small feature-specific libraries. Shared code (UI atoms, api clients, storage adapters) lives under `src/shared/`.

Example layout:

```
features/<feature>/
  ├─ ui/
  ├─ data/
  ├─ model/
  └─ lib/
```

## Rationale

- Localizes feature concerns for easier reasoning and testing.
- Speeds iteration: feature work rarely requires touching many top-level folders.
- Simplifies onboarding: newcomers can find end-to-end code for a feature in one place.

## Consequences

- Positive: faster feature delivery, clearer ownership boundaries, simpler tests for feature flows.
- Negative: potential duplication of small utilities; requires discipline to keep `src/shared/` the place for truly reusable code.
- Migration cost: moving from a layer-based structure later involves refactoring; however, early velocity is prioritized.

## Alternatives considered

- Layered (technical) structure: components/, services/, stores/ — rejected for early-stage velocity.
- Hybrid: logical grouping for cross-cutting concerns while keeping most code feature-first — viable long-term, but adds complexity up-front.

## Status

Accepted on 2026-03-22.

## Related

- See `docs/Architecture.md` for higher-level reasoning about architecture and persistence choices.
