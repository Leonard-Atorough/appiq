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

### Radii

[Border radius scale](./references/radii-tokens.md):

- `--radius-sm` (4px), `--radius-md` (6px), `--radius-lg` (8px), `--radius-xl` (12px), `--radius-2xl` (16px), `--radius-full` (9999px)
- Use `rounded-sm`, `rounded-md`, etc. in Tailwind or `var(--radius-*)` in CSS

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

## CSS Variables in tokens/

Location: `src/styles/tokens/` (split by category)

| File | Contents |
|------|----------|
| `colors.css` | Primitive ramps (green, purple, gray) + semantic color tokens |
| `spacing.css` | Named spacing scale xs–5xl |
| `typography.css` | Font families, sizes, weights, line heights, tracking |
| `radii.css` | Border radius scale sm–full |
| `themes.css` | Dark mode overrides under `.dark` |
| `index.css` | Single import entrypoint |

All token files are imported via `src/styles/tokens/index.css`:

```css
/* src/styles/tokens/colors.css */
:root {
  /* Colors - Light mode */
  --color-primary: hsl(119 43% 52%);
  --color-success: hsl(119 43% 45%);
  --color-warning: hsl(45 93% 56%);
  --color-error:   hsl(0 84% 60%);
  --color-text:    hsl(210 12% 18%);
  --color-text-muted: hsl(210 10% 52%);
  --color-surface: hsl(210 20% 100%);
  --color-border:  hsl(210 16% 90%);

  /* Spacing */
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;

  /* Typography */
  --font-sans: system-ui, "Segoe UI", sans-serif;
  --font-size-base: 1rem;
  --font-size-md:   1.125rem;

  /* Radii */
  --radius-sm:   0.25rem;
  --radius-md:   0.375rem;
  --radius-lg:   0.5rem;
  --radius-full: 9999px;
}

/* src/styles/tokens/themes.css */
.dark {
  --color-text:    hsl(210 20% 96%);
  --color-surface: hsl(210 15% 12%);
  --color-border:  hsl(210 10% 32%);
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

Dark mode is controlled by Tailwind's **`darkMode: 'class'`** strategy. Add or remove the `.dark` class on `<html>` to switch themes. The color overrides live in `src/styles/tokens/themes.css`.

```js
// Toggle dark mode
document.documentElement.classList.toggle('dark');

// Restore persisted preference on load
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
}
```

This gives users explicit control independent of their OS preference.

Testing in browser DevTools:

1. DevTools → Console: `document.documentElement.classList.add('dark')`
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
