---
name: design-tokens
description: "Single source of truth for semantic colors, spacing, and typography. Use when: styling components, choosing colors, implementing dark mode, ensuring design consistency, or onboarding designers."
argument-hint: "Token lookup (e.g., color-primary, spacing-md) or design question"
user-invocable: true
---

# Design Tokens Reference

AppIQ's semantic design system powered by CSS variables + Tailwind. One source of truth for colors, spacing, and typography aligned with our **Modern Design Principles** (see [ADR 0005](../../docs/adrs/0005-modern-design-principles.md)).

## Modern Design Principles

Every component should apply these principles via tokens and utilities:

1. **Layered Depth & Elevation** — Use `shadow-sm`, `shadow-md`, and `hover:shadow-*` for interactive hierarchy
2. **Smooth Transitions & Micro-interactions** — Apply `transition-all duration-200` for smooth color/shadow/transform changes
3. **Refined Spacing & Sizing** — Consistent spacing tokens for clean, breathable layouts
4. **Color System** — Semantic color tokens with semantic foreground colors for dark mode
5. **Typography** — Clear hierarchy using font size and weight tokens
6. **Minimalism & Clarity** — Remove clutter; use whitespace and content for guidance
7. **Accessibility** — Color contrast, focus states, and keyboard navigation

## When to Use

- **"What color should I use?"** → Look up semantic color tokens
- **"How much padding?"** → Check spacing scale
- **"What font size for this?"** → Reference typography tokens
- **"What's the right corner radius?"** → Use radius tokens
- **"Does this meet dark mode?"** → Review dark mode overrides
- **"How do I add interactivity?"** → Use shadows + transitions + hover states
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
- Use `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-full` (all mapped in `tailwind.config.js`)

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

### ✅ DO: Use Tailwind Extended Config Class Names

All tokens are mapped in `tailwind.config.js`. Use the named Tailwind utilities — not CSS variable access syntax.

```tsx
// Colors, spacing, typography, and radius via Tailwind extended config
<button className="bg-primary-500 text-white px-md py-sm text-sm rounded-lg font-semibold">
  Click me
</button>

// Complete semantic styling
<div className="bg-surface p-md rounded-lg border border-base">
  <h3 className="text-lg font-semibold mb-md">
    Heading
  </h3>
  <p className="text-sm text-secondary leading-normal">
    Body text with proper typography tokens.
  </p>
</div>
```

**Token → Tailwind class quick reference** (from `tailwind.config.js`):

| Token                    | Tailwind class                                        |
| ------------------------ | ----------------------------------------------------- |
| `--color-bg`             | `bg-base`                                             |
| `--color-surface`        | `bg-surface`                                          |
| `--color-muted-bg`       | `bg-muted`                                            |
| `--color-text`           | `text-base` \*                                        |
| `--color-text-secondary` | `text-secondary`                                      |
| `--color-text-muted`     | `text-muted`                                          |
| `--color-text-light`     | `text-light`                                          |
| `--color-border`         | `border-base`                                         |
| `--color-border-muted`   | `border-muted`                                        |
| `--color-success`        | `bg-success` / `text-success`                         |
| `--color-error`          | `bg-error` / `text-error`                             |
| `--color-warning`        | `bg-warning` / `text-warning`                         |
| `--color-info`           | `bg-info` / `text-info`                               |
| `--spacing-{xs…5xl}`     | `p-md`, `px-sm`, `gap-lg`, `m-xl`…                    |
| `--radius-{sm…full}`     | `rounded-sm`, `rounded-lg`, `rounded-full`…           |
| `--font-size-{xs…4xl}`   | `text-xs`, `text-sm`, `text-lg`…                      |
| `--font-weight-{…}`      | `font-normal`, `font-semibold`, `font-bold`…          |
| `--line-height-{…}`      | `leading-tight`, `leading-normal`, `leading-relaxed`… |

\* `text-base` sets **both** `color: var(--color-text)` and `font-size: var(--font-size-base)`. Use `text-(--color-text)` when you only want the color with a different size.

### ✅ DO: Use CSS Variables Only for Unmapped Tokens

Some tokens have no Tailwind class mapping (hover/active states, foreground pairs, surface-hover). Use CSS var syntax only for these:

```tsx
// Unmapped tokens — CSS var syntax is correct here
<button
  className="bg-primary-500 hover:bg-(--color-primary-hover) active:bg-(--color-primary-active)"
>
  Click me
</button>

// Inline styles: use CSS vars when Tailwind utilities aren't applicable
<div
  style={{
    borderColor: "var(--color-border)",   // prefer border-base in className
    backgroundColor: "var(--color-surface-hover)",  // no Tailwind mapping
  }}
>
  Content
</div>
```

**Unmapped tokens (CSS var syntax required)**:

- `--color-primary` / `--color-primary-hover` / `--color-primary-active` / `--color-primary-foreground`
- `--color-secondary` / `--color-secondary-hover` / `--color-secondary-foreground`
- `--color-surface-hover`

### ✅ DO: Use Tokens in CVA (Class Variance Authority)

```tsx
// Use Tailwind extended class names from tailwind.config.js, not CSS var syntax
import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center",
    "font-semibold",
    "rounded-lg",
    "transition-all duration-200",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          // bg-primary-500 is the Tailwind mapped ramp class; hover uses unmapped token
          "bg-primary-500 text-white hover:bg-(--color-primary-hover)",
        outline: "border border-base text-(--color-text) hover:bg-muted",
      },
      size: {
        sm: "px-sm py-xs text-sm",
        md: "px-md py-sm text-base",
        lg: "px-lg py-md text-md",
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

The `tailwind.config.js` extends Tailwind's theme to map all design tokens to named utility classes. **Always prefer these class names over CSS variable access syntax.**

```javascript
// tailwind.config.js (simplified)
export default {
  theme: {
    extend: {
      backgroundColor: { base: "var(--color-bg)", surface: "var(--color-surface)", muted: "var(--color-muted-bg)" },
      textColor:       { base: "var(--color-text)", secondary: "var(--color-text-secondary)", muted: "var(--color-text-muted)", light: "var(--color-text-light)" },
      borderColor:     { base: "var(--color-border)", muted: "var(--color-border-muted)" },
      colors:          { success: "var(--color-success)", error: "var(--color-error)", warning: "var(--color-warning)", info: "var(--color-info)" },
      spacing:         { xs: "var(--spacing-xs)", sm: "var(--spacing-sm)", md: "var(--spacing-md)", lg: "var(--spacing-lg)", ... },
      borderRadius:    { sm: "var(--radius-sm)", md: "var(--radius-md)", lg: "var(--radius-lg)", ... },
      fontSize:        { xs: "var(--font-size-xs)", sm: "var(--font-size-sm)", base: "var(--font-size-base)", lg: "var(--font-size-lg)", ... },
      fontWeight:      { normal: "var(--font-weight-normal)", semibold: "var(--font-weight-semibold)", bold: "var(--font-weight-bold)" },
    },
  },
};
```

See [Tailwind Integration Reference](./references/tailwind-integration.md) for the complete class mapping table.

## Micro-Interactions: Standardized Active Scale

All interactive components use a **consistent `active:scale-[0.98]`** pattern for button press feedback. This simulates tactile interaction feedback and aligns with modern app standards (Material Design, Figma, Slack).

**Standard Pattern** (Buttons, Inputs, Dialogs):

```tsx
className="
  shadow-sm hover:shadow-md active:shadow-lg
  transition-all duration-200 ease-out
  active:scale-[0.98]
  focus-visible:ring-2 focus-visible:ring-(--color-primary)
"
```

Why `0.98`? — Subtle (noticeable but natural), matches Google Material Design and modern UX best practices. Tested extensively across device types for universal perceived smoothness.

**See**: [Micro-Interactions Reference](./references/micro-interactions.md) for complete pattern, rationale, component mapping, and testing guide.

## References

- [Color Tokens](./references/color-tokens.md) — All colors with swatches
- [Spacing Scale](./references/spacing-tokens.md) — All spacing values
- [Typography](./references/typography-tokens.md) — Font sizes and weights
- [Dark Mode Guide](./references/dark-mode-guide.md) — How system dark mode works
- [Tailwind + Tokens](./references/tailwind-integration.md) — Using tokens in utilities
- [Accessibility Notes](./references/accessibility.md) — Color contrast, semantics
- **[Micro-Interactions](./references/micro-interactions.md)** — Active state scale, transitions, and best practices

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
