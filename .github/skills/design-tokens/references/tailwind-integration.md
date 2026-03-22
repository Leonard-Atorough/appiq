# Tailwind Integration Guide

This reference explains how to use design tokens with Tailwind CSS in our projects. Tailwind is configured to read CSS variables defined in our `tokens.css` file, allowing us to use semantic tokens in our utility classes.

## Tailwind Config

Our `tailwind.config.js` is set up to map CSS variables to Tailwind's theme:

```javascript
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "var(--color-primary)",
      success: "var(--color-success)",
      // Add more color tokens as needed
    },
    spacing: {
      xs: "var(--spacing-xs)",
      sm: "var(--spacing-sm)",
      md: "var(--spacing-md)",
      // Add more spacing tokens as needed
    },
    // Extend other theme properties (fontSize, borderRadius, etc.) similarly
  },
};
```

## Using Tokens in Tailwind Utilities

You can use tokens in Tailwind utility classes by referencing the CSS variable:

```tsx
// ✅ Using token in Tailwind
<div className="bg-(--color-surface) text-(--color-text) border border-(--color-border)">
  <button className="bg-(--color-primary) text-white hover:bg-(--color-primary-dark)">
    Click me
  </button>
</div>
```

This approach keeps your styling consistent and leverages the benefits of design tokens while still using Tailwind's utility-first classes.

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

Here's how you might create a status badge component that uses color tokens:

```tsx
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

This component uses inline styles to apply the appropriate background color based on the status prop, while still benefiting from the design tokens defined in `tokens.css`.

## Example: Loading Skeleton

You can also use tokens for non-semantic elements like loading skeletons:

```tsx
<div className="space-y-2">
  {[...Array(5)].map((_, i) => (
    <div key={i} className="space-y-1">
      <div className="h-4 bg-(--color-surface-hover) rounded animate-pulse" />
      <div className="h-3 bg-(--color-surface-hover) rounded w-4/5 animate-pulse" />
    </div>
  ))}
</div>
```

This creates a loading skeleton that automatically adapts to light and dark modes through the use of CSS variables.

## References

- [Dark Mode Implementation Guide](./references/dark-mode-guide.md)
- [Color Tokens](./references/color-tokens.md)
- [Spacing Tokens](./references/spacing-tokens.md)
- [Typography Tokens](./references/typography-tokens.md)
- [Accessibility Notes](./references/accessibility.md)
