---
title: Styling system: Tailwind + CSS tokens
date: 2026-03-22
status: accepted
---

# 0003 - Tailwind CSS + design tokens (CSS variables)

## Context

We need a fast developer experience for styling, a consistent design system, and runtime theming (dark mode, color adjustments).

## Decision

Use Tailwind CSS for utility-driven styling combined with a small set of CSS variables (HSL-based tokens) for semantic colors and themeability.

## Rationale

- Tailwind speeds building UIs with consistent utilities and small bundle sizes when purged.
- CSS variables enable runtime theming and dark-mode overrides.
- HSL tokens make it easy to adjust hue/lightness for accessible color variants.

## Consequences

- Colors and tokens live in `src/styles/tokens.css` and are exposed to Tailwind via `tailwind.config.js`.
- Developers use Tailwind utilities and a small set of semantic classes/components.

## Alternatives

- CSS-in-JS solutions: more runtime overhead and less native CSS integration.
- Pure CSS variables without Tailwind: slower iteration for layouts and spacing.

## Status

Accepted.

## Related

- `src/styles/tokens.css`
- `tailwind.config.js`
