# Architecture

This document describes the high-level architecture and design decisions for AppIQ, a job-application tracking app. It explains the system's goals, primary components, data flow, persistence strategy, and non-functional considerations (security, testing, deployment, observability).

## Goals

- Provide a calm, low-friction experience for tracking job applications.
- Keep the codebase modular and easy to iterate on during early product development.
- Support offline-first workflows and sync to server when available.
- Make the UI themeable and accessible.

## Guiding Principles

- Feature-first (vertical-slice) organization: group code by feature/domain rather than technical layer.
- Small, well-tested surface area per feature: each feature owns its UI, state, data access, and side effects.
- Composition over inheritance: prefer small reusable primitives (hooks, UI atoms) composed into feature UIs.
- Semantic design tokens (CSS variables + Tailwind): single source of truth for colors, spacing, typography.

## High-level Architecture

- Client: Single Page Application (React + TypeScript + Vite). Responsible for UI, local storage, client-side business logic, and offline support.
- API / Sync: Thin sync layer (could be a serverless function or lightweight REST endpoint) to persist and reconcile client state with server-side storage.
- External Integrations: Adapters per service (e.g., job boards) to normalize different vendor APIs into internal models.

Diagram (conceptual):

```
Browser (AppIQ SPA)
    ├─ UI (pages, widgets)
    ├─ Features/* (applications, jobBoards, cvBuilder)
    ├─ Shared/* (ui, api, storage, hooks)
    └─ Local DB (Dexie / IndexedDB)

Sync / API Layer <-> Server / Cloud Storage
        └─ Integrations (Greenhouse, Lever, etc.)
```

## Folder structure (recommended)

Top-level folders and their responsibilities:

```
src/
    ├─ features/       # Feature verticals (applications, jobBoards, cvBuilder, ...)
    ├─ entities/       # Pure domain models and validation
    ├─ shared/         # Reusable UI atoms, hooks, api clients, storage adapters
    │   ├─ ui/
    │   ├─ api/
    │   ├─ storage/
    │   ├─ hooks/
    │   └─ types/
    ├─ pages/          # Route-level containers
    ├─ widgets/        # Layout pieces (AppShell, Header, Sidebar)
    ├─ styles/         # tokens.css, Tailwind entry
    └─ main.tsx        # App bootstrap
```

## Feature structure (example)

Each feature should be a self-contained vertical slice:

```
features/applications/
    ├─ ui/       # Presentational components (cards, lists)
    ├─ data/     # API hooks, adapters
    ├─ model/    # State hooks, commands, selectors
    └─ lib/      # Small helpers / view models
```

This keeps logic close to the UI that uses it and simplifies reasoning and testing.

## State Management & Data Flow

- Local component state: `useState`, `useReducer` for ephemeral UI state.
- Feature-level state: custom hooks (e.g., `useApplicationsModel`) exposing commands, selectors, and derived state.
- Cross-feature/global needs: minimal Contexts or a tiny store (Zustand) if necessary — avoid premature global stores.

Unidirectional flow:

1. UI triggers a command (user action).
2. Feature model updates local state and/or writes to local DB.
3. Side effects (API calls, sync) are handled by data hooks/adapters.
4. UI reacts to updated state.

## Persistence & Offline

- Primary client-side persistence: Dexie.js (IndexedDB) for application data and caching.
- Repositories wrap Dexie to provide a clear API surface for features.
- Sync strategy: optimistic local writes; a background sync process reconciles with server when online.
- Conflict resolution: last-writer-wins for simple fields, or domain-specific merge handlers for complex cases.

## API & Integrations

- `shared/api/` contains a thin HTTP client and retry/backoff policies.
- Integrations are implemented as adapters that map external schemas to internal entities (normalization layer).
- Adapters are isolated per integration and tested independently.

## UI & Design System

- Design tokens live in `src/styles/tokens.css` and are exposed to Tailwind via CSS variables.
- Shared UI atoms live under `shared/ui/` and are small, accessible, and theme-aware.
- Components favor composition: small presentational components wrapped by feature-specific containers.

## Authentication & Security

- Authentication is handled by the server/API layer (JWT or session tokens).
- Client stores only non-sensitive data; tokens are kept in secure storage (e.g., HttpOnly cookies or secure storage strategies).
- All server communication should use HTTPS and follow standard OWASP guidance.

## Testing Strategy

- Unit tests: functions, hooks, and pure utilities.
- Component tests: React Testing Library for behavior-driven UI tests.
- Integration tests: end-to-end flows (Vitest + Playwright / Cypress) for critical user journeys (apply, sync, import CV).

## Observability & Telemetry

- Client-side: capture errors, user-facing exceptions, and key metrics (sync success/failure rates). Use a lightweight telemetry service or Sentry for error reporting.
- Server-side: request metrics, error rates, and background job health.

## Deployment & Infrastructure

- Static frontend bundle served from CDN (Vite build artifacts).
- Server / API can be serverless functions or a small containerized service (depending on scale).
- Storage: server-side persistent storage (Postgres / managed database) and blob storage for attachments.

## Performance Considerations

- Lazy-load feature bundles (route-based code splitting).
- Cache frequently-read data in Dexie and invalidate on sync.
- Keep UI renders minimal via memoization and selective subscriptions to state.

## Extensibility & Browser Extension

- The extension (if present) should reuse the same `shared/*` modules where possible (API adapters, types, and storage adapters).
- Keep extension integration decoupled through an explicit adapter interface so the web app can remain independent.

## Security & Privacy

- Minimize personal data stored on the server; store only what is necessary for the product.
- Provide a clear privacy policy and allow users to export/delete their data.

## Decision Log (short)

- Feature-first folder structure: chosen for rapid iteration and small-team velocity.
- Dexie.js: chosen for reliable client-side persistence and offline-first UX.
- Tailwind + CSS tokens: chosen for fast, consistent styling and easy theming.

## Next steps / Recommendations

- Add a lightweight architecture diagram (Mermaid) to the repo for onboarding.
- Define a small set of conventions for feature boundaries and public feature APIs (README inside each feature).
- Create a `DECISIONS.md` or ADRs folder for major architectural decisions.

---

This document is intended to be a living artifact. Update it as the product and technical choices evolve.
