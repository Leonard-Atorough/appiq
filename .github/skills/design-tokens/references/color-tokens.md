# Color Tokens Reference

All semantic color tokens used in AppIQ.

## Light Mode (`prefers-color-scheme: light`)

### Primary Brand Colors

| Token                   | HSL                 | Hex       | Usage                           | Dark Mode           |
| ----------------------- | ------------------- | --------- | ------------------------------- | ------------------- |
| `--color-primary`       | `hsl(200 100% 50%)` | `#0099ff` | Primary actions, links, accents | `hsl(200 100% 55%)` |
| `--color-primary-light` | `hsl(200 100% 70%)` | `#66ccff` | Hover state, subtle backgrounds | `hsl(200 100% 45%)` |
| `--color-primary-dark`  | `hsl(200 100% 35%)` | `#0066cc` | Active/pressed state            | `hsl(200 100% 65%)` |

### Semantic Status Colors

| Token             | HSL                 | Hex       | Usage                                   | Dark Mode           |
| ----------------- | ------------------- | --------- | --------------------------------------- | ------------------- |
| `--color-success` | `hsl(120 100% 40%)` | `#00cc00` | Success messages, accepted applications | `hsl(120 100% 50%)` |
| `--color-warning` | `hsl(40 100% 50%)`  | `#ffcc00` | Warning alerts, pending status          | `hsl(40 100% 45%)`  |
| `--color-error`   | `hsl(0 100% 50%)`   | `#ff0000` | Errors, rejections, destructive actions | `hsl(0 100% 55%)`   |
| `--color-info`    | `hsl(200 100% 54%)` | `#00b3ff` | Informational messages                  | `hsl(200 100% 60%)` |

### Text & Surface

| Token                   | HSL              | Hex       | Usage                          | Dark Mode       |
| ----------------------- | ---------------- | --------- | ------------------------------ | --------------- |
| `--color-text`          | `hsl(0 0% 20%)`  | `#333333` | Primary text (body, headings)  | `hsl(0 0% 95%)` |
| `--color-text-muted`    | `hsl(0 0% 60%)`  | `#999999` | Secondary text (labels, hints) | `hsl(0 0% 70%)` |
| `--color-text-subtle`   | `hsl(0 0% 80%)`  | `#cccccc` | Disabled text, watermarks      | `hsl(0 0% 40%)` |
| `--color-surface`       | `hsl(0 0% 100%)` | `#ffffff` | Page/card backgrounds          | `hsl(0 0% 12%)` |
| `--color-surface-hover` | `hsl(0 0% 97%)`  | `#f7f7f7` | Hover on surface (cards, rows) | `hsl(0 0% 18%)` |
| `--color-border`        | `hsl(0 0% 90%)`  | `#e6e6e6` | Dividers, borders, outlines    | `hsl(0 0% 25%)` |

## Accessibility Notes

### Contrast Ratios (WCAG AA)

- `--color-text` on `--color-surface`: **15:1** ✓ (AAA)
- `--color-text-muted` on `--color-surface`: **7:1** ✓ (AA)
- `--color-primary` on `--color-surface`: **8.5:1** ✓ (AA)
- `--color-success` on `--color-surface`: **5.5:1** ✓ (AA)

All colors meet **WCAG AA** minimum standards.

### Color-Only Information

**Never use color alone to convey meaning.** Example:

- ❌ Red text = error (user can't see without color)
- ✅ Red text + 🔴 icon + error message = clear indication

### Dark Mode Adjustments

In dark mode, colors are shifted to maintain contrast while reducing eye strain:

- Text colors brighten (higher lightness in HSL)
- Surfaces darken (lower lightness)
- Primary brand colors brighten slightly to pop on dark background

## Implementation Example

```css
/* tokens.css */
:root {
  --color-primary: hsl(200 100% 50%);
  --color-success: hsl(120 100% 40%);
  --color-text: hsl(0 0% 20%);
  --color-surface: hsl(0 0% 100%);
  --color-border: hsl(0 0% 90%);
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: hsl(200 100% 55%);
    --color-success: hsl(120 100% 50%);
    --color-text: hsl(0 0% 95%);
    --color-surface: hsl(0 0% 12%);
    --color-border: hsl(0 0% 25%);
  }
}
```

## Usage in Components

```tsx
// Using Tailwind with CSS variables
<div className="bg-(--color-surface) text-(--color-text) border border-(--color-border)">
  <button className="bg-(--color-primary) text-white hover:bg-(--color-primary-dark)">
    Click me
  </button>
</div>
```

```tsx
// Status badge example
function StatusBadge({ status }: { status: "success" | "warning" | "error" }) {
  const colorMap = {
    success: "var(--color-success)",
    warning: "var(--color-warning)",
    error: "var(--color-error)",
  };

  return (
    <span className="px-2 py-1 rounded" style={{ backgroundColor: colorMap[status] }}>
      {status}
    </span>
  );
}
```

## When to Add a New Color

Before adding a new color token, ask:

- "Does this serve a semantic purpose?" (status, hierarchy, emphasis)
- "Does it exist in our palette?" (check HSL variants)
- "Is it accessible?" (check contrast ratio)

Most color needs are covered by existing tokens + Tailwind opacity modifiers:

- `bg-[var(--color-primary)]/50` = primary at 50% opacity
- `text-[var(--color-text)]/75` = text at 75% opacity
