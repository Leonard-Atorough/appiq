# Dark Mode Implementation Guide

AppIQ uses `prefers-color-scheme: dark` CSS media query for system-level dark mode support. No JavaScript needed.

## How It Works

1. **System setting**: User's OS (Windows, macOS, iOS, etc.) has a light/dark mode preference
2. **CSS variable override**: When dark mode is active, `tokens.css` overrides color CSS variables
3. **Automatic**: All components using CSS variables get dark mode "for free"

## CSS Structure

```css
/* Light mode (default) */
:root {
  --color-text: hsl(0 0% 20%);
  --color-surface: hsl(0 0% 100%);
  --color-border: hsl(0 0% 90%);
}

/* Dark mode override */
@media (prefers-color-scheme: dark) {
  :root {
    --color-text: hsl(0 0% 95%);
    --color-surface: hsl(0 0% 12%);
    --color-border: hsl(0 0% 25%);
  }
}
```

## Testing Dark Mode

### Chrome DevTools

1. Open DevTools (`F12`)
2. Go to **Rendering** tab
3. Find **Emulate CSS media feature prefers-color-scheme**
4. Toggle between `light` and `dark`
5. Page updates instantly (no refresh needed)

### macOS / iOS

- Settings → Display → **Dark Mode** → Enable
- Browser automatically respects system setting

### Windows

- Settings → Personalization → Colors → **Dark mode**
- Browser automatically respects system setting

### Firefox DevTools

1. Open DevTools
2. Go to **Inspector** → **Rules** panel
3. Search for `:root`
4. Use Developer Toolbar to inspect computed colors at different schemes

## Best Practices

### ✅ DO: Use CSS Variables for All Colors

```tsx
const Card = ({ children }) => (
  <div
    style={{
      backgroundColor: "var(--color-surface)",
      color: "var(--color-text)",
      borderColor: "var(--color-border)",
    }}
  >
    {children}
  </div>
);
```

### ✅ DO: Test Both Light and Dark Modes

Before shipping, verify:

- Text readability in both modes
- Sufficient contrast (WCAG AA minimum 4.5:1)
- Icons/images look good in both schemes

### ❌ DON'T: Hard-code Colors

```tsx
// Bad
<div style={{ color: '#333333' }}>Text</div>

// Good
<div style={{ color: 'var(--color-text)' }}>Text</div>
```

### ❌ DON'T: Use `prefers-color-scheme` for UI Toggles

```tsx
// Wrong approach (don't do this)
const [darkMode, setDarkMode] = useState(false);
```

Dark mode should follow **system preference**, not app state. If you want a manual toggle later, use CSS classes + JavaScript, but keep the default respecting system setting.

## Adding New Tokens for Dark Mode

When adding a new semantic color:

1. **Define in light mode** (default `:root`)
2. **Override in dark mode** (inside `@media (prefers-color-scheme: dark)`)
3. **Test both modes**

Example: Adding `--color-muted-bg` for disabled states

```css
/* tokens.css */
:root {
  /* Light mode */
  --color-muted-bg: hsl(0 0% 85%);
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Dark mode */
    --color-muted-bg: hsl(0 0% 20%);
  }
}
```

## Color Adjustment Guidelines

When finding dark mode values, think about **lightness** in HSL:

| Light Mode                     | Dark Mode                     | Reason                                 |
| ------------------------------ | ----------------------------- | -------------------------------------- |
| `hsl(200 100% 50%)` →          | `hsl(200 100% 55%)`           | Slightly brighter to stand out on dark |
| `hsl(0 0% 100%)` (white) →     | `hsl(0 0% 12%)` (dark gray)   | Inverted brightness                    |
| `hsl(0 0% 90%)` (light gray) → | `hsl(0 0% 25%)` (medium gray) | Inverted, but less extreme             |

**Saturation typically stays the same** — only adjust lightness and sometimes hue slightly.

## Verifying Contrast

For each token pair used together (e.g., text + background), verify WCAG compliance:

1. Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
2. Input light mode colors → check ratio
3. Input dark mode colors → check ratio
4. Both should meet **WCAG AA (4.5:1 minimum)**

Example:

- Light: `#333333` on `#ffffff` = 15:1 ✓
- Dark: `#f2f2f2` on `#1f1f1f` = 13:1 ✓
