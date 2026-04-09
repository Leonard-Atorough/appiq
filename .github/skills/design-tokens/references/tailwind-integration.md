# Tailwind Integration Guide

Design tokens are mapped to named Tailwind utilities in `tailwind.config.js`. **Always use the Tailwind class name, not CSS variable access syntax**, for tokens that have a mapping. This ensures IntelliSense, Tailwind's purge, and consistent naming all work correctly.

## Full Token → Tailwind Class Mapping

### Background Colors

| Token                   | Tailwind class          | Example                        |
| ----------------------- | ----------------------- | ------------------------------ |
| `--color-bg`            | `bg-base`               | `className="bg-base"`          |
| `--color-surface`       | `bg-surface`            | `className="bg-surface"`       |
| `--color-muted-bg`      | `bg-muted`              | `className="bg-muted"`         |
| `--color-success`       | `bg-success`            | `className="bg-success"`       |
| `--color-success-light` | `bg-success-light`      | `className="bg-success-light"` |
| `--color-warning`       | `bg-warning`            | `className="bg-warning"`       |
| `--color-warning-light` | `bg-warning-light`      | `className="bg-warning-light"` |
| `--color-error`         | `bg-error`              | `className="bg-error"`         |
| `--color-error-light`   | `bg-error-light`        | `className="bg-error-light"`   |
| `--color-info`          | `bg-info`               | `className="bg-info"`          |
| `--color-info-light`    | `bg-info-light`         | `className="bg-info-light"`    |
| `--green-{50–900}`      | `bg-primary-{50–900}`   | `className="bg-primary-500"`   |
| `--purple-{50–700}`     | `bg-secondary-{50–700}` | `className="bg-secondary-500"` |

### Text Colors

| Token                    | Tailwind class   | Note                         |
| ------------------------ | ---------------- | ---------------------------- |
| `--color-text`           | `text-base` \*   | Sets color **and** font-size |
| `--color-text-secondary` | `text-secondary` | Color only                   |
| `--color-text-muted`     | `text-muted`     | Color only                   |
| `--color-text-light`     | `text-light`     | Color only                   |
| `--color-success`        | `text-success`   |                              |
| `--color-error`          | `text-error`     |                              |
| `--color-warning`        | `text-warning`   |                              |

\* `text-base` applies BOTH `color: var(--color-text)` and `font-size: var(--font-size-base)`. Use `text-(--color-text)` if you only want the color with a different font size.

### Border Colors

| Token                  | Tailwind class |
| ---------------------- | -------------- |
| `--color-border`       | `border-base`  |
| `--color-border-muted` | `border-muted` |

### Spacing (works with all spacing utilities: `p-`, `m-`, `gap-`, `space-`, `w-`, `h-`)

| Token                    | Tailwind key | Example                   |
| ------------------------ | ------------ | ------------------------- |
| `--spacing-xs` (0.25rem) | `xs`         | `p-xs`, `gap-xs`, `mx-xs` |
| `--spacing-sm` (0.5rem)  | `sm`         | `p-sm`, `py-sm`, `gap-sm` |
| `--spacing-md` (1rem)    | `md`         | `p-md`, `px-md`, `gap-md` |
| `--spacing-lg` (1.5rem)  | `lg`         | `p-lg`, `py-lg`, `gap-lg` |
| `--spacing-xl` (2rem)    | `xl`         | `p-xl`, `m-xl`, `gap-xl`  |
| `--spacing-2xl` (3rem)   | `2xl`        | `p-2xl`, `gap-2xl`        |
| `--spacing-3xl` (4rem)   | `3xl`        | `p-3xl`                   |
| `--spacing-4xl` (6rem)   | `4xl`        | `p-4xl`                   |
| `--spacing-5xl` (8rem)   | `5xl`        | `p-5xl`                   |

### Border Radius

| Token           | Tailwind class |
| --------------- | -------------- |
| `--radius-sm`   | `rounded-sm`   |
| `--radius-md`   | `rounded-md`   |
| `--radius-lg`   | `rounded-lg`   |
| `--radius-xl`   | `rounded-xl`   |
| `--radius-2xl`  | `rounded-2xl`  |
| `--radius-full` | `rounded-full` |

### Typography

| Category       | Token                    | Tailwind class    |
| -------------- | ------------------------ | ----------------- |
| Font size      | `--font-size-xs`         | `text-xs`         |
| Font size      | `--font-size-sm`         | `text-sm`         |
| Font size      | `--font-size-base`       | `text-base` \*    |
| Font size      | `--font-size-md`         | `text-md`         |
| Font size      | `--font-size-lg`         | `text-lg`         |
| Font size      | `--font-size-xl`         | `text-xl`         |
| Font size      | `--font-size-2xl`        | `text-2xl`        |
| Font size      | `--font-size-3xl`        | `text-3xl`        |
| Font size      | `--font-size-4xl`        | `text-4xl`        |
| Font weight    | `--font-weight-normal`   | `font-normal`     |
| Font weight    | `--font-weight-medium`   | `font-medium`     |
| Font weight    | `--font-weight-semibold` | `font-semibold`   |
| Font weight    | `--font-weight-bold`     | `font-bold`       |
| Line height    | `--line-height-tight`    | `leading-tight`   |
| Line height    | `--line-height-snug`     | `leading-snug`    |
| Line height    | `--line-height-normal`   | `leading-normal`  |
| Line height    | `--line-height-relaxed`  | `leading-relaxed` |
| Line height    | `--line-height-loose`    | `leading-loose`   |
| Letter spacing | `--tracking-tight`       | `tracking-tight`  |
| Letter spacing | `--tracking-normal`      | `tracking-normal` |
| Letter spacing | `--tracking-wide`        | `tracking-wide`   |
| Font family    | `--font-sans`            | `font-sans`       |
| Font family    | `--font-heading`         | `font-heading`    |
| Font family    | `--font-mono`            | `font-mono`       |

## Unmapped Tokens (CSS var syntax required)

These tokens have no Tailwind class mapping. Use CSS variable syntax for them:

- `--color-primary` / `--color-primary-hover` / `--color-primary-active` / `--color-primary-foreground`
- `--color-secondary` / `--color-secondary-hover` / `--color-secondary-foreground`
- `--color-surface-hover`

```tsx
// ✅ Tailwind class for mapped token, CSS var for unmapped
<button className="bg-primary-500 text-white hover:bg-(--color-primary-hover) active:bg-(--color-primary-active)">
  Click me
</button>
```

## Using Tailwind Extended Classes

```tsx
// ✅ Correct: use Tailwind extended class names
<div className="bg-surface border border-base px-md py-sm rounded-lg">
  <button className="bg-primary-500 text-white hover:bg-(--color-primary-hover)">
    Click me
  </button>
</div>

// ✅ Typography tokens
<h2 className="text-lg font-semibold leading-normal">
  Section Heading
</h2>

// ✅ Combining all semantic tokens
<article className="bg-surface border border-base rounded-lg p-lg">
  <h3 className="text-md font-semibold mb-md">
    Article Title
  </h3>
  <p className="text-sm text-secondary leading-normal">
    Article content goes here.
  </p>
</article>

// ✔ Prefer extended classes over CSS var access syntax
// ❌ bg-(--color-surface) → ✅ bg-surface
// ❌ px-(--spacing-md)    → ✅ px-md
// ❌ rounded-(--radius-lg) → ✅ rounded-lg
// ❌ text-(--font-size-sm) → ✅ text-sm
// ❌ font-(--font-weight-semibold) → ✅ font-semibold
// ❌ border-(--color-border) → ✅ border-base
```

## When to Add a New Token

Before adding a new token, consider:

- Does this token serve a semantic purpose (e.g., status, hierarchy, emphasis)?
- Can it be derived from existing tokens (e.g., a lighter/darker variant)?
- Will it be reused across multiple components/features?
  If the answer is yes, then it may be a good candidate for a new token. Always aim to keep the token set minimal and focused on semantic meaning rather than specific use cases.

## Testing Dark Mode

Since our tokens automatically switch based on the `prefers-color-scheme` media query, you can test dark mode by toggling the setting in your browser's DevTools:

1. Open DevTools (F12 or right-click → Inspect)
2. Go to the **Rendering** tab
3. Find **Emulate CSS media feature prefers-color-scheme**
4. Toggle between `light` and `dark`
5. Observe how the colors update instantly without needing a page refresh

## Example: Status Badge Component

```tsx
function StatusBadge({ status }: { status: "success" | "warning" | "error" }) {
  const classMap = {
    success: "bg-success-light text-success", // Tailwind extended classes
    warning: "bg-warning-light text-warning",
    error: "bg-error-light text-error",
  };

  return (
    <span className={`px-sm py-xs rounded-full text-sm font-semibold ${classMap[status]}`}>
      {status}
    </span>
  );
}
```

## Example: Loading Skeleton

```tsx
<div className="space-y-2">
  {[...Array(5)].map((_, i) => (
    <div key={i} className="space-y-1">
      {/* --color-surface-hover has no Tailwind mapping — CSS var syntax is correct here */}
      <div className="h-4 bg-(--color-surface-hover) rounded animate-pulse" />
      <div className="h-3 bg-(--color-surface-hover) rounded w-4/5 animate-pulse" />
    </div>
  ))}
</div>
```

## References

- [Dark Mode Implementation Guide](./references/dark-mode-guide.md)
- [Color Tokens](./references/color-tokens.md)
- [Spacing Tokens](./references/spacing-tokens.md)
- [Typography Tokens](./references/typography-tokens.md)
- [Accessibility Notes](./references/accessibility.md)
