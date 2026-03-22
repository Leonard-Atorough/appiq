---
title: Dark mode strategy - Tailwind 'class' mode
date: 2026-03-22
status: accepted
---

# 0004 - Use Tailwind dark mode 'class' strategy

## Context

The UI needs an explicit, user-controllable dark mode toggle and predictable theming that can be persisted per user preference.

## Decision

Configure Tailwind with `darkMode: 'class'` and toggle the `dark` class on the document root to switch themes.

## Rationale

- `class` mode allows an explicit toggle (via a button or user preference) and persistence (store preference in localStorage).
- `media` mode reacts to OS-level settings but gives less control and is harder to override per user.

## Consequences

- The app must manage the `dark` class on `document.documentElement` (or `body`).
- CSS tokens must provide `.dark` overrides for variables, which is already in `src/styles/tokens.css`.

## Alternatives

- `media` (prefers-color-scheme): automatically follows OS preference but is not user-controllable.

## Status

Accepted.
