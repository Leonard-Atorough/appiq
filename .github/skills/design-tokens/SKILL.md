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
- **"What font size for this?"** → Reference typography tokens
- **"What's the right corner radius?"** → Use radius tokens
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

### Typography

[Typography scale](./references/typography-tokens.md):

- **Font sizes**: `--font-size-xs`, `--font-size-sm`, `--font-size-base`, `--font-size-md`, `--font-size-lg`, `--font-size-xl`, `--font-size-2xl`, `--font-size-3xl`, `--font-size-4xl`
- **Font weights**: `--font-weight-normal`, `--font-weight-medium`, `--font-weight-semibold`, `--font-weight-bold`
- **Line heights**: `--line-height-tight`, `--line-height-snug`, `--line-height-normal`, `--line-height-relaxed`, `--line-height-loose`
- **Letter spacing**: `--tracking-tight`, `--tracking-normal`, `--tracking-wide`

### Spacing

[Spacing scale](./references/spacing-tokens.md):

- Consistent scale: `xs` (0.25rem), `sm` (0.5rem), `md` (1rem), `lg` (1.5rem), `xl` (2rem), `2xl` (3rem), `3xl` (4rem), `4xl` (6rem), `5xl` (8rem)
- Used in padding, margins, gaps
- Always prefer token values over hardcoded pixels

### Radii

[Border radius scale](./references/radii-tokens.md):

- `--radius-sm` (0.25rem), `--radius-md` (0.375rem), `--radius-lg` (0.5rem), `--radius-xl` (0.75rem), `--radius-2xl` (1rem), `--radius-full` (9999px)
- Use `rounded-(--radius-*)` in Tailwind or `var(--radius-*)` in CSS

## CSS Variables in tokens/

Location: `src/styles/tokens/` (split by category)

| File             | Contents                                                      |
| ---------------- | ------------------------------------------------------------- |
| `colors.css`     | Primitive ramps (green, purple, gray) + semantic color tokens |
| `spacing.css`    | Named spacing scale xs–5xl                                    |
| `typography.css` | Font families, sizes, weights, line heights, tracking         |
| `radii.css`      | Border radius scale sm–full                                   |
| `themes.css`     | Dark mode overrides under `.dark`                             |
| `index.css`      | Single import entrypoint                                      |

All token files are imported via `src/styles/tokens/index.css`:

```css
/* src/styles/tokens/colors.css */
:root {
  /* Colors - Light mode */
  --color-primary: hsl(119 43% 52%);
  --color-success: hsl(119 43% 45%);
  --color-warning: hsl(45 93% 56%);
  --color-error: hsl(0 84% 60%);
  --color-text: hsl(210 12% 18%);
  --color-text-muted: hsl(210 10% 52%);
  --color-surface: hsl(210 20% 100%);
  --color-border: hsl(210 16% 90%);

  /* Spacing */
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;

  /* Typography */
  --font-sans: system-ui, "Segoe UI", sans-serif;
  --font-size-base: 1rem;
  --font-size-md: 1.125rem;

  /* Radii */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-full: 9999px;
}

/* src/styles/tokens/themes.css */
.dark {
  --color-text: hsl(210 20% 96%);
  --color-surface: hsl(210 15% 12%);
  --color-border: hsl(210 10% 32%);
}
```

## Using Tokens in Components

### ❌ DON'T: Use Hardcoded Sizes or Magic Numbers

```tsx
// Hardcoded sizes – hard to maintain and breaks design consistency
<button className="bg-green-500 text-white px-4 py-2 text-sm rounded-lg">
  Click me
</button>

// Magic colors – inconsistent across dark mode
<div style={{ color: '#333333', backgroundColor: '#f0f0f0', padding: '12px' }}>
  Content
</div>
```

### ✅ DO: Use Tailwind Utilities with Design Tokens

```tsx
// Colors, spacing, typography, and radius all from design tokens
<button className="bg-(--color-primary) text-(--color-primary-foreground) px-(--spacing-md) py-(--spacing-sm) text-(--font-size-sm) rounded-(--radius-lg) font-(--font-weight-semibold)">
  Click me
</button>

// Complete semantic styling
<div className="bg-(--color-surface) text-(--color-text) p-(--spacing-md) rounded-(--radius-lg) border border-(--color-border)">
  <h3 className="text-(--font-size-lg) font-(--font-weight-semibold) mb-(--spacing-md)">
    Heading
  </h3>
  <p className="text-(--font-size-base) text-(--color-text-secondary) leading-(--line-height-normal)">
    Body text with proper typography tokens.
  </p>
</div>
```

### ✅ DO: Use CSS Variables for Inline Styles

```tsx
// When Tailwind isn't ideal, reference tokens directly
<div
  style={{
    color: "var(--color-text)",
    backgroundColor: "var(--color-surface)",
    padding: "var(--spacing-md)",
    fontSize: "var(--font-size-base)",
    borderRadius: "var(--radius-lg)",
  }}
>
  Content with semantic tokens
</div>
```

### ✅ DO: Use Tokens in CVA (Class Variance Authority)

```tsx
// Component variant definitions should use tokens
import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center",
    "font-(--font-weight-semibold)",
    "rounded-(--radius-lg)",
    "transition-colors duration-200",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-(--color-primary) text-(--color-primary-foreground) hover:bg-(--color-primary-hover)",
        outline: "border border-(--color-border) text-(--color-text) hover:bg-(--color-muted-bg)",
      },
      size: {
        sm: "px-(--spacing-sm) py-(--spacing-xs) text-(--font-size-sm)",
        md: "px-(--spacing-md) py-(--spacing-sm) text-(--font-size-base)",
        lg: "px-(--spacing-lg) py-(--spacing-md) text-(--font-size-md)",
      },
    },
  },
);
```

Prefer Tailwind utilities (Method 1) for consistency.

## Dark Mode Strategy

Dark mode is controlled by Tailwind's **`darkMode: 'class'`** strategy. Add or remove the `.dark` class on `<html>` to switch themes. The color overrides live in `src/styles/tokens/themes.css`.

```js
// Toggle dark mode
document.documentElement.classList.toggle("dark");

// Restore persisted preference on load
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
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
