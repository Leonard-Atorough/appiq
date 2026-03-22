---
title: Client-side persistence: Dexie.js (IndexedDB)
date: 2026-03-22
status: accepted
---

# 0002 - Use Dexie.js for client-side persistence

## Context

The application must support offline-first workflows, local caching, and reliable storage of structured data in the browser.

## Decision

Adopt Dexie.js (a small wrapper on IndexedDB) as the primary client-side persistence mechanism.

## Rationale

- Dexie provides a friendly API over IndexedDB with transactions and query helpers.
- It is performant and well-tested in production apps.
- Works well with TypeScript and supports migrations.

## Consequences

- App data is persisted in IndexedDB via Dexie; repositories will wrap Dexie tables.
- A sync layer is required to reconcile local changes with server state.
- Need to design migration paths and versioned schemas.

## Alternatives

- localStorage: too limited for structured data and size.
- PouchDB: heavier and closer to CouchDB model; more complexity.
- SQLite via WASM: larger footprint and added complexity.

## Status

Accepted.

## Related

- `docs/Architecture.md` — Persistence & Offline section.
