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
  px-md py-sm rounded-lg font-semibold
  bg-primary-500 text-white
  hover:bg-(--color-primary-hover) active:opacity-75
  focus:outline-2 focus:outline-offset-2 focus:outline-(--color-primary)
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-opacity duration-200
">
  Click me
</button>

// As link (href)
<a href="/applications" className="
  inline-block px-md py-sm rounded-lg font-semibold
  bg-primary-500 text-white
  hover:bg-(--color-primary-hover) active:opacity-75
  focus:outline-2 focus:outline-offset-2 focus:outline-(--color-primary)
  transition-opacity duration-200
">
  View Applications
</a>

// Large button
<button className="
  px-lg py-md rounded-lg font-semibold text-lg
  bg-primary-500 text-white
  ...
">
  Large button
</button>

// Loading state
<button className="
  px-md py-sm rounded-lg font-semibold
  bg-primary-500 text-white opacity-75
  cursor-wait flex items-center gap-sm
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
  rounded-lg border border-base
  bg-surface
  p-lg
">
  <h2 className="text-lg font-bold">
    Card title
  </h2>
  <p className="text-sm text-muted">
    Card content
  </p>
</div>

// Hoverable card (clickable)
<div className="
  rounded-lg border border-base
  bg-surface
  p-lg
  hover:shadow-md hover:border-(--color-primary)
  transition-all duration-200
  cursor-pointer
">
  {/* content */}
</div>

// Card with divider
<div className="
  rounded-lg border border-base
  bg-surface
  overflow-hidden
">
  <div className="p-lg border-b border-base">
    Header
  </div>
  <div className="p-lg">
    Body
  </div>
  <div className="p-lg border-t border-base">
    Footer
  </div>
</div>
```

## Example: Form Input

```tsx
// Text input with label & error
<div className="flex flex-col gap-sm">
  <label htmlFor="title" className="
    text-sm font-semibold
  ">
    Title
    <span className="text-error">*</span>
  </label>

  <input
    id="title"
    type="text"
    placeholder="Enter title"
    aria-invalid="false"
    className="
      px-md py-sm rounded-md
      border-2 border-base
      bg-surface
      text-sm
      placeholder:text-muted
      focus:outline-none focus:border-(--color-primary)
      disabled:opacity-50 disabled:cursor-not-allowed
      transition-all duration-200
    "
  />

  <span className="text-xs text-muted" id="title-help">
    Helper text
  </span>
</div>

// With error
<div className="flex flex-col gap-sm">
  {/* label ... */}
  <input
    aria-invalid="true"
    aria-describedby="title-error"
    className="
      px-md py-sm rounded-md
      border-2 border-error
      ...
      focus:border-error
    "
  />
  <span
    id="title-error"
    className="text-sm text-error"
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
  px-md py-xs rounded-full text-sm font-semibold
  ${
    status === 'success'
      ? 'bg-success-light text-success'
      : status === 'warning'
        ? 'bg-warning-light text-warning'
        : status === 'error'
          ? 'bg-error-light text-error'
          : 'bg-info-light text-info'
  }
`}>
  {status}
</span>

// Dismissible chip
<div className="
  inline-flex items-center gap-sm px-md py-xs rounded-full
  bg-primary-100 text-primary-700
">
  <span className="text-sm font-semibold">{label}</span>
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
          border-b border-base
          hover:bg-(--color-surface-hover)
          cursor-pointer
          transition-all duration-200
        "
      >
        <td className="p-md">
          {item.name}
        </td>
        <td className="p-md text-right text-muted">
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
          border-b border-base
          ${idx % 2 === 0 ? 'bg-surface' : 'bg-(--color-surface-hover)'}
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
  border-b border-base
  p-lg
"
>
  <h2 id="modal-title" className="text-xl font-bold">
    Modal Title
  </h2>
  <button
    onClick={onClose}
    className="
      p-1 rounded
      text-muted
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
  via-surface to-(--color-surface-hover)
  animate-pulse
" />

// Multiple skeleton rows
<div className="space-y-3">
  {[...Array(5)].map((_, idx) => (
    <div key={idx} className="space-y-2">
      {/* --color-surface-hover has no Tailwind mapping — CSS var syntax is correct here */}
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

<div className="bg-surface">{/* Works in both light and dark mode */}</div>
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
