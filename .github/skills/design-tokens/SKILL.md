---
name: design-tokens
description: "Single source of truth for semantic colors, spacing, and typography. Use when: styling components, choosing colors, implementing dark mode, ensuring design consistency, or onboarding designers."
argument-hint: "Token lookup (e.g., color-primary, spacing-md) or design question"
user-invocable: true
---

# Design Tokens Reference

AppIQ's semantic design system powered by CSS variables + Tailwind. One source of truth for colors, spacing, and typography.

## When to Use

- **"What color should I use?"** → Look up semantic color tokens
- **"How much padding?"** → Check spacing scale
- **"Does this meet dark mode?"** → Review dark mode overrides
- **Brand consistency check** → Ensure all components use tokens, not magic numbers
- **Onboarding designers** → Show Figma/design mapping to code tokens

## Token Categories

### Colors

[Complete color reference](./references/color-tokens.md) with:

- Semantic names: `--color-primary`, `--color-success`, `--color-text`, `--color-surface`
- HSL values for each token
- Light and dark mode variants
- Visual swatches (usage in browser)
- Accessibility notes (contrast ratios)

### Spacing

[Spacing scale](./references/spacing-tokens.md):

- Consistent scale: `xs` (0.25rem), `sm` (0.5rem), `md` (1rem), `lg` (1.5rem), `xl` (2rem), `2xl` (3rem)
- Used in padding, margins, gaps
- Mobile-first responsive values if needed

### Typography

[Typography scale](./references/typography-tokens.md):

- `--font-size-sm`, `--font-size-base`, `--font-size-lg`, `--font-size-xl`
- `--font-weight-normal`, `--font-weight-semibold`, `--font-weight-bold`
- `--line-height-tight`, `--line-height-normal`, `--line-height-relaxed`

## CSS Variables in tokens.css

Location: `src/styles/tokens.css`

All design tokens are defined as CSS variables:

```css
:root {
  /* Colors - Light mode */
  --color-primary: hsl(200 100% 50%);
  --color-success: hsl(120 100% 40%);
  --color-warning: hsl(40 100% 50%);
  --color-error: hsl(0 100% 50%);
  --color-text: hsl(0 0% 20%);
  --color-text-muted: hsl(0 0% 60%);
  --color-surface: hsl(0 0% 100%);
  --color-border: hsl(0 0% 90%);

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;

  /* Typography */
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-text: hsl(0 0% 95%);
    --color-surface: hsl(0 0% 12%);
    --color-border: hsl(0 0% 25%);
  }
}
```

## Using Tokens in Components

### Method 1: Tailwind Utilities

```tsx
<button className="bg-[var(--color-primary)] text-white px-4 py-2">Click me</button>
```

### Method 2: CSS Classes (if pre-defined)

```tsx
<div className="text-primary bg-surface rounded-md p-md">Content</div>
```

### Method 3: Inline CSS (exception)

```tsx
<div style={{ color: "var(--color-text)" }}>Text</div>
```

Prefer Method 1 (Tailwind) for consistency.

## Dark Mode Strategy

Dark mode is handled via `prefers-color-scheme: dark` media query in `tokens.css`.

**No special class needed** — CSS variables automatically switch when system dark mode is enabled.

Testing in browser DevTools:

1. DevTools → Rendering tab → `prefers-color-scheme`
2. Toggle between `light` and `dark`
3. Observe color changes without page reload

[Dark mode implementation guide](./references/dark-mode-guide.md)

## Tailwind Integration

Tailwind config (`tailwind.config.js`) reads CSS variables:

```javascript
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "var(--color-primary)",
      success: "var(--color-success)",
      // ...
    },
    spacing: {
      xs: "var(--spacing-xs)",
      sm: "var(--spacing-sm)",
      md: "var(--spacing-md)",
      // ...
    },
  },
};
```

## References

- [Color Tokens](./references/color-tokens.md) — All colors with swatches
- [Spacing Scale](./references/spacing-tokens.md) — All spacing values
- [Typography](./references/typography-tokens.md) — Font sizes and weights
- [Dark Mode Guide](./references/dark-mode-guide.md) — How system dark mode works
- [Tailwind + Tokens](./references/tailwind-integration.md) — Using tokens in utilities
- [Accessibility Notes](./references/accessibility.md) — Color contrast, semantics

## Procedure: Add a New Token

1. **Identify the token**: semantic name (e.g., `--color-info`)
2. **Set light mode value** in `:root { }`
3. **Set dark mode override** in `@media (prefers-color-scheme: dark) { }`
4. **Document in reference** with use case and swatches
5. **Update Tailwind config** if Tailwind-exposed
6. **Test in both light and dark modes**

Example:

```css
/* In tokens.css */
:root {
  --color-info: hsl(200 100% 54%);
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-info: hsl(200 100% 60%);
  }
}

/* In Tailwind config */
theme: {
  colors: {
    info: "var(--color-info)";
  }
}
```

## Quick Lookup

**Need a color?** → [color-tokens.md](./references/color-tokens.md)
**Need spacing?** → [spacing-tokens.md](./references/spacing-tokens.md)
**Dark mode question?** → [dark-mode-guide.md](./references/dark-mode-guide.md)
**Accessibility check?** → [accessibility.md](./references/accessibility.md)
