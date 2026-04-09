---
description: "Generate copy-paste Tailwind + token styling recipes for common UI patterns."
argument-hint: "Pattern name and options (e.g., button primary, card dark-mode, form-group)"
---

# Tailwind + Token Styling Recipe

Quick styling patterns for common UI components using AppIQ's design system.

## Patterns Included

- **Button** (variants: primary, secondary, danger, loading)
- **Card** (minimal, with hover, dark mode)
- **Badge/Chip** (status colors, dismissible)
- **Form Group** (input, label, error, helper text)
- **Header** (page title, subtitle, actions)
- **Table Row** (clickable, selectable, alternating)
- **Modal Header** (title, close button)
- **Link** (external, internal, underline)
- **Loading State** (skeleton, spinner, shimmer)

## Example: Primary Button

**Input:**

```
Pattern: button primary
Options: href, disabled, size
```

**Output:**

```tsx
// Default button
<button className="
  px-(--spacing-md) py-(--spacing-sm) rounded-(--radius-lg) font-(--font-weight-semibold)
  bg-(--color-primary) text-white
  hover:opacity-90 active:opacity-75
  focus:outline-2 focus:outline-offset-2 focus:outline-(--color-primary)
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-opacity duration-200
">
  Click me
</button>

// As link (href)
<a href="/applications" className="
  inline-block px-(--spacing-md) py-(--spacing-sm) rounded-(--radius-lg) font-(--font-weight-semibold)
  bg-(--color-primary) text-white
  hover:opacity-90 active:opacity-75
  focus:outline-2 focus:outline-offset-2 focus:outline-(--color-primary)
  transition-opacity duration-200
">
  View Applications
</a>

// Large button
<button className="
  px-(--spacing-lg) py-(--spacing-md) rounded-(--radius-lg) font-(--font-weight-semibold) text-(--font-size-lg)
  bg-(--color-primary) text-white
  ...
">
  Large button
</button>

// Loading state
<button className="
  px-(--spacing-md) py-(--spacing-sm) rounded-(--radius-lg) font-(--font-weight-semibold)
  bg-(--color-primary) text-white opacity-75
  cursor-wait flex items-center gap-(--spacing-sm)
"
  disabled>
  <span className="animate-spin">⏳</span>
  Loading...
</button>
```

## Example: Card

```tsx
// Basic card
<div className="
  rounded-(--radius-lg) border border-(--color-border)
  bg-(--color-surface)
  p-(--spacing-lg)
">
  <h2 className="text-(--font-size-lg) font-(--font-weight-bold) text-(--color-text)">
    Card title
  </h2>
  <p className="text-(--font-size-sm) text-(--color-text-muted)">
    Card content
  </p>
</div>

// Hoverable card (clickable)
<div className="
  rounded-(--radius-lg) border border-(--color-border)
  bg-(--color-surface)
  p-(--spacing-lg)
  hover:shadow-md hover:border-(--color-primary)
  transition-all duration-200
  cursor-pointer
">
  {/* content */}
</div>

// Card with divider
<div className="
  rounded-(--radius-lg) border border-(--color-border)
  bg-(--color-surface)
  overflow-hidden
">
  <div className="p-(--spacing-lg) border-b border-(--color-border)">
    Header
  </div>
  <div className="p-(--spacing-lg)">
    Body
  </div>
  <div className="p-(--spacing-lg) border-t border-(--color-border)">
    Footer
  </div>
</div>
```

## Example: Form Input

```tsx
// Text input with label & error
<div className="flex flex-col gap-(--spacing-sm)">
  <label htmlFor="title" className="
    text-(--font-size-sm) font-(--font-weight-semibold) text-(--color-text)
  ">
    Title
    <span className="text-(--color-error)">*</span>
  </label>

  <input
    id="title"
    type="text"
    placeholder="Enter title"
    aria-invalid="false"
    className="
      px-(--spacing-md) py-(--spacing-sm) rounded-(--radius-md)
      border-2 border-(--color-border)
      bg-(--color-surface)
      text-(--font-size-base) text-(--color-text)
      placeholder-(--color-text-muted)
      focus:outline-none focus:border-(--color-primary)
      disabled:opacity-50 disabled:cursor-not-allowed
      transition-colors duration-200
    "
  />

  <span className="text-(--font-size-xs) text-(--color-text-muted)" id="title-help">
    Helper text
  </span>
</div>

// With error
<div className="flex flex-col gap-(--spacing-sm)">
  {/* label ... */}
  <input
    aria-invalid="true"
    aria-describedby="title-error"
    className="
      px-(--spacing-md) py-(--spacing-sm) rounded-(--radius-md)
      border-2 border-(--color-error)
      ...
      focus:border-(--color-error)
    "
  />
  <span
    id="title-error"
    className="text-(--font-size-sm) text-(--color-error)"
    role="alert"
  >
    Title is required
  </span>
</div>
```

## Example: Status Badge

```tsx
// Color-coded status
<span className={`
  px-(--spacing-md) py-(--spacing-xs) rounded-(--radius-full) text-(--font-size-sm) font-(--font-weight-semibold)
  ${
    status === 'success'
      ? 'bg-(--color-success)/10 text-(--color-success)'
      : status === 'warning'
        ? 'bg-(--color-warning)/10 text-(--color-warning)'
        : status === 'error'
          ? 'bg-(--color-error)/10 text-(--color-error)'
          : 'bg-(--color-info)/10 text-(--color-info)'
  }
`}>
  {status}
</span>

// Dismissible chip
<div className="
  inline-flex items-center gap-(--spacing-sm) px-(--spacing-md) py-(--spacing-xs) rounded-(--radius-full)
  bg-(--color-primary)/10 text-(--color-primary)
">
  <span className="text-(--font-size-sm) font-(--font-weight-semibold)">{label}</span>
  <button
    onClick={onDismiss}
    className="focus:outline-none hover:text-(--color-primary)"
    aria-label={`Remove ${label}`}
  >
    ✕
  </button>
</div>
```

## Example: Table Row

```tsx
// Table with hover state
<table className="w-full border-collapse">
  <tbody>
    {items.map((item) => (
      <tr
        key={item.id}
        onClick={() => handleSelect(item.id)}
        className="
          border-b border-(--color-border)
          hover:bg-(--color-surface-hover)
          cursor-pointer
          transition-colors duration-200
        "
      >
        <td className="p-3 text-(--color-text)">
          {item.name}
        </td>
        <td className="p-3 text-right text-(--color-text-muted)">
          {item.value}
        </td>
      </tr>
    ))}
  </tbody>
</table>

// With alternating rows
<table>
  <tbody>
    {items.map((item, idx) => (
      <tr
        key={item.id}
        className={`
          border-b border-(--color-border)
          ${idx % 2 === 0 ? 'bg-(--color-surface)' : 'bg-(--color-surface-hover)'}
        `}
      >
        {/* cells */}
      </tr>
    ))}
  </tbody>
</table>
```

## Example: Modal Header

```tsx
<div
  className="
  flex items-center justify-between gap-4
  border-b border-(--color-border)
  p-6
"
>
  <h2
    id="modal-title"
    className="
    text-xl font-bold text-(--color-text)
  "
  >
    Modal Title
  </h2>
  <button
    onClick={onClose}
    className="
      p-1 rounded
      text-(--color-text-muted)
      hover:bg-(--color-surface-hover)
      focus:outline-2 focus:outline-(--color-primary)
    "
    aria-label="Close modal"
  >
    ✕
  </button>
</div>
```

## Example: Loading Skeleton

```tsx
// Skeleton loader (shimmer effect)
<div className="
  h-6 rounded
  bg-gradient-to-r from-(--color-surface-hover)
  via-(--color-surface) to-(--color-surface-hover)
  animate-pulse
" />

// Multiple skeleton rows
<div className="space-y-3">
  {[...Array(5)].map((_, idx) => (
    <div key={idx} className="space-y-2">
      <div className="h-4 bg-(--color-surface-hover) rounded animate-pulse" />
      <div className="h-3 bg-(--color-surface-hover) rounded w-4/5 animate-pulse" />
    </div>
  ))}
</div>
```

## Dark Mode Testing

All recipes automatically work in dark mode via CSS variables:

```tsx
// Light mode: white background, black text
// Dark mode: dark background, light text
// No code changes needed!

<div className="bg-(--color-surface) text-(--color-text)">
  {/* Works in both light and dark mode */}
</div>
```

To test:

1. Chrome DevTools → Rendering → `prefers-color-scheme: dark`
2. Or use this button to toggle:

```tsx
function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.style.colorScheme = "light";
    }
  }, [isDark]);

  return <button onClick={() => setIsDark(!isDark)}>{isDark ? "☀️ Light" : "🌙 Dark"}</button>;
}
```

## Copy-Paste Tips

1. **Find the pattern** (e.g., "button primary")
2. **Copy the whole className string** (everything inside `className=""`)
3. **Paste into your component**
4. **Modify text/content as needed**
5. **Test in light and dark mode**

## When to Create a Component vs. Use a Recipe

**Use recipe if:**

- It's a one-off use
- You need it in multiple features
- It's simple enough

**Create a component if:**

- You use it in 3+ places
- It has internal state logic
- It needs callbacks/events

**Example: After using recipe 3 times, extract to component**

```tsx
// Create shared/ui/StatusBadge.tsx
export function StatusBadge({ status, onDismiss }) {
  // Use the recipe pattern inside
}

// Then use everywhere:
<StatusBadge status="success" onDismiss={onDismiss} />;
```

---

**Related Skills**:

- [Design Tokens](../skills/design-tokens/) - Token reference
- [A11y Audit](../skills/a11y-audit/) - Accessibility patterns
