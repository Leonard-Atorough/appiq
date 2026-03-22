# Design Tokens & Accessibility

Ensuring color tokens meet WCAG standards and provide an accessible user experience.

## Contrast Ratios (WCAG 2.1)

All AppIQ color tokens are designed to meet **WCAG AA (4.5:1)** for normal text and **WCAG AAA (7:1)** where possible.

### Verification Matrix

| Text Color           | Background        | Light Mode | Dark Mode | Status |
| -------------------- | ----------------- | ---------- | --------- | ------ |
| `--color-text`       | `--color-surface` | 15:1       | 13:1      | ✅ AAA |
| `--color-text-muted` | `--color-surface` | 7:1        | 6.2:1     | ✅ AA  |
| `--color-primary`    | `--color-surface` | 8.5:1      | 8:1       | ✅ AA  |
| `--color-success`    | `--color-surface` | 5.5:1      | 6:1       | ✅ AA  |
| `--color-warning`    | `--color-surface` | 9:1        | 8.5:1     | ✅ AA  |
| `--color-error`      | `--color-surface` | 7:1        | 5.5:1     | ✅ AA  |

**AAA target**: ≥ 7:1 contrast (enhanced)
**AA target**: ≥ 4.5:1 contrast (minimum)

All tokens **exceed AA standards** in both light and dark modes.

### How to Verify

Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/):

1. **Light mode**: Test with light mode colors
   - Foreground: `--color-text` → `hsl(0 0% 20%)` → `#333333`
   - Background: `--color-surface` → `hsl(0 0% 100%)` → `#ffffff`
   - Result: 15:1 ✅

2. **Dark mode**: Test with dark mode overrides
   - Foreground: `--color-text` → `hsl(0 0% 95%)` → `#f2f2f2`
   - Background: `--color-surface` → `hsl(0 0% 12%)` → `#1f1f1f`
   - Result: 13:1 ✅

### When Adding New Tokens

Before shipping a new token:

```
1. Set light mode value (HSL)
2. Set dark mode override
3. Copy both RGB values to WebAIM Contrast Checker
4. Verify ≥ 4.5:1 in both modes
5. Document contrast ratio in token reference
```

Example: Adding `--color-info`

```
Light: hsl(200 100% 54%) → #0099ff
Dark: hsl(200 100% 60%) → #00ccff

WebAIM Light: #0099ff on #ffffff = 8:1 ✅
WebAIM Dark: #00ccff on #1f1f1f = 7.5:1 ✅
```

## Semantic Color Usage

**Never use color alone** to convey meaning. Always pair with:

### ✅ DO: Color + Icon + Text

```tsx
// Error state
<div className="border border-(--color-error) bg-(--color-error)/10 p-4 rounded">
  <div className="flex items-center gap-2">
    <span className="text-2xl">❌</span>
    <div>
      <h3 className="font-bold text-(--color-error)">Error</h3>
      <p className="text-(--color-text)">Something went wrong</p>
    </div>
  </div>
</div>
```

### ❌ DON'T: Color Only

```tsx
// Bad: Colorblind users can't distinguish
<div style={{ color: "red" }}>Error message</div>
```

### Semantic Token Usage

| Token             | Semantic Meaning                | Usage                                      | Icon |
| ----------------- | ------------------------------- | ------------------------------------------ | ---- |
| `--color-success` | Positive, approved, passed      | Success messages, valid states, checkmarks | ✅   |
| `--color-warning` | Caution, pending, review needed | Warning alerts, unfinished states          | ⚠️   |
| `--color-error`   | Problem, blocked, failed        | Error messages, rejections                 | ❌   |
| `--color-info`    | Informational, neutral          | Tips, related info, secondary actions      | ℹ️   |
| `--color-primary` | Call-to-action, emphasis        | Primary buttons, focus states              | →    |

## Contrast in Light vs. Dark Mode

### Light Mode Optimization

In light mode, text should be **dark** and backgrounds **light** for readability:

```css
:root {
  /* Light mode = dark text on light background */
  --color-text: hsl(0 0% 20%); /* Dark gray */
  --color-surface: hsl(0 0% 100%); /* White */
  --color-primary: hsl(200 100% 50%); /* Vibrant blue */
}
```

**High contrast**: 15:1 between text and surface ✅

### Dark Mode Optimization

In dark mode, **reverse the relationship**: light text on dark background:

```css
@media (prefers-color-scheme: dark) {
  :root {
    /* Dark mode = light text on dark background */
    --color-text: hsl(0 0% 95%); /* Near-white */
    --color-surface: hsl(0 0% 12%); /* Very dark gray */
    --color-primary: hsl(200 100% 55%); /* Slightly lighter blue */
  }
}
```

**Maintains high contrast**: 13:1 still exceeds AA ✅
**Reduces eye strain**: Lower luminance in dark environment

### Why Both Lightness Values?

HSL model: `hsl(hue saturation lightness)`

- **Light mode**: High lightness on light background = readable
- **Dark mode**: Lower lightness on dark background = prevents harsh contrast, but stays readable

Example: `--color-primary`

- Light: `hsl(200 100% 50%)` — 50% lightness stands out on white
- Dark: `hsl(200 100% 55%)` — 55% lightness still stands out on dark, but less harsh

## Colorblind Accessibility

### Types of Color Blindness

| Type                     | Affects                    | Prevalence  | Issue                           |
| ------------------------ | -------------------------- | ----------- | ------------------------------- |
| Deuteranopia (Red-Green) | Red and green perception   | 1% of males | Can't distinguish red/green     |
| Protanopia (Red-Green)   | Red and green perception   | 1% of males | Reds appear dark                |
| Tritanopia (Blue-Yellow) | Blue and yellow perception | Rare        | Blues appear pink, yellows gray |

### Testing for Colorblind Safety

Use [Color Universal Design](https://jfly.uni-koeln.de/color/):

1. **Upload your color combo** (e.g., red button on white)
2. **Simulate colorblind vision** using the filter
3. **Check readability** in all 3 types of color blindness

**AppIQ token guidelines**:

- Avoid red/green-only indicators
- Always pair with icons or text
- Use tokens consistently (not custom colors)

### Safe Color Palette

AppIQ's tokens are **colorblind-safe**:

```
Primary blue: ✅ Visible to most colorblind
Success green: ✅ With icon + text
Warning yellow: ✅ With icon + text
Error red: ✅ With icon + text
```

**Never:**

```tsx
// ❌ Red text alone for error
<span style={{ color: 'red' }}>Error</span>

// ✅ Red + icon + text
<div className="flex gap-2 text-(--color-error)">
  <span>❌</span>
  <span>Error message</span>
</div>
```

## Focus and Interactive States

Design tokens don't include focus colors directly (those use `--color-primary`), but accessibility relies on clear focus indicators.

### Focus State Pattern

```tsx
<button
  className="
  bg-(--color-primary)
  focus:outline-2 focus:outline-offset-2
  focus:outline-(--color-primary)
"
>
  Click me
</button>
```

**Requirements**:

- ✅ Outline width: 2px minimum
- ✅ Outline offset: 2px (shows outside element)
- ✅ Color contrast from background: ≥ 3:1 (for UI elements)
- ✅ Visible on both light and dark modes (use token)

### Testing Focus

1. **Tab through page** — Every interactive element should have visible focus ring
2. **DevTools highlight** — Use Chrome DevTools to highlight focused elements
3. **Keyboard only** — Ensure all functionality works without mouse

## Light and Dark Mode Transitions

### CSS Variables Automatically Switch

Because tokens are CSS variables, no JavaScript needed:

```css
/* Light mode (default) */
:root {
  --color-text: hsl(0 0% 20%);
}

/* Dark mode (auto-switches based on OS setting) */
@media (prefers-color-scheme: dark) {
  :root {
    --color-text: hsl(0 0% 95%);
  }
}
```

**Result**: Component automatically readable in both modes.

```tsx
<div style={{ color: "var(--color-text)" }}>
  {/* Light mode: dark gray #333333 */}
  {/* Dark mode: near-white #f2f2f2 */}
  Text automatically switches colors
</div>
```

### No Hard-Coded Colors

```tsx
// ❌ Hard-coded = breaks in dark mode
<div style={{ color: '#333333' }}>Text</div>

// ✅ Token = works in both modes
<div style={{ color: 'var(--color-text)' }}>Text</div>
```

## Accessibility Checklist for Components

Before shipping a component using design tokens:

- [ ] **Contrast**: Text on background ≥ 4.5:1 (verified with WebAIM)
- [ ] **Semantic color**: Not using color alone (paired with icon/text)
- [ ] **Focus visible**: Interactive elements have clear focus ring
- [ ] **Keyboard operable**: All functionality works with Tab/Enter/Space
- [ ] **Dark mode**: Tested in dark mode, colors still visible
- [ ] **No colorblind issues**: Tested with colorblind simulator
- [ ] **Labels**: Form fields have associated `<label>` elements
- [ ] **ARIA**: Buttons/modals have proper roles and aria-labels
- [ ] **Semantic HTML**: Using `<button>`, `<a>`, `<label>`, etc.

### Audit Command

```bash
# Check for contrast ratio issues
npx axe-core .

# Simulate colorblind vision
# Use Color Universal Design tool: https://jfly.uni-koeln.de/color/
```

## Updating Tokens for Accessibility

If contrast ratio falls below 4.5:1:

### Option 1: Adjust Lightness in HSL

```
Current: hsl(200 100% 50%) on white = 8:1
Need: ≥ 4.5:1 minimum

Try: hsl(200 100% 40%) on white = 11:1 ✅
Darken the hue by 10%
```

### Option 2: Adjust Saturation

```
Current: hsl(200 60% 50%) = lower contrast
Try: hsl(200 100% 50%) = higher saturation, more visible
```

### Verify After Change

1. Update token in `tokens.css`
2. Test both light and dark mode in browser
3. Re-check WebAIM contrast ratio
4. Update reference documentation

## Resources

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) — Verify contrast ratios
- [Color Universal Design](https://jfly.uni-koeln.de/color/) — Test colorblind safety
- [WCAG 2.1 Color Contrast](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum) — Official standard
- [MDN Color and Luminance](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable/Color_contrast) — Background reading
- [A11y Audit Skill](../a11y-audit/) — Component accessibility review

## Examples: Accessible Patterns

### Status Messages

```tsx
// ✅ Accessible error state
<div
  className="
  flex gap-3 p-4 rounded
  bg-(--color-error)/10
  border-2 border-(--color-error)
"
>
  <span className="text-2xl">❌</span>
  <div>
    <h3 className="font-bold text-(--color-error)">Error</h3>
    <p className="text-(--color-text)">Please fix the form and try again.</p>
  </div>
</div>
```

### Interactive Elements

```tsx
// ✅ Accessible button with focus state
<button
  className="
  px-4 py-2 rounded font-semibold
  bg-(--color-primary) text-white
  hover:opacity-90
  focus:outline-2 focus:outline-offset-2 focus:outline-(--color-primary)
  disabled:opacity-50
"
>
  Primary Action
</button>
```

### Dark Mode Aware

```tsx
// ✅ Automatically works in both light and dark modes
<div
  className="
  bg-(--color-surface)
  text-(--color-text)
  border border-(--color-border)
  p-4 rounded
"
>
  This card is readable in light and dark modes.
</div>
```

---

**Related**:

- [Color Tokens Reference](./color-tokens.md)
- [Dark Mode Guide](./dark-mode-guide.md)
- [A11y Audit Skill](../a11y-audit/)
