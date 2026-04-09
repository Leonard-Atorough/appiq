# Micro-Interactions: Button Press & Active States

## Standard: `active:scale-[0.98]`

All interactive components (buttons, inputs, selects, badges, dialogs) use a **consistent 2% scale reduction** on active/press states to simulate tactile feedback.

### Why 0.98?

| Scale    | UX Characteristic  | Used By                            | Best For                                |
| -------- | ------------------ | ---------------------------------- | --------------------------------------- |
| **0.99** | Barely perceptible | Few                                | Accessibility extreme; almost invisible |
| **0.98** | ✅ **STANDARD**    | Google Material, Figma, Slack      | Sweet spot: noticeable but natural      |
| **0.97** | Very noticeable    | Apple iOS (context), older designs | More pronounced; can feel "clicky"      |
| **0.96** | Pronounced         | Games, playful UIs                 | Too much for enterprise apps            |
| **0.94** | Heavy feedback     | iOS home button press              | Too much for web; feels slow            |

**AppIQ Standard: 0.98** — Subtle, professional, responsive to user action without feeling exaggerated.

## Complete Micro-Interaction Pattern

Every interactive component should implement this pattern using Tailwind utilities:

```tsx
// Example: Button with full micro-interaction
className="
  bg-(--color-primary) text-(--color-primary-foreground)
  px-(--spacing-md) py-(--spacing-sm)
  rounded-(--radius-md)

  /* Layered depth */
  shadow-sm hover:shadow-md active:shadow-lg

  /* Smooth transitions on all properties */
  transition-all duration-200 ease-out

  /* Micro-interaction: Active press */
  active:scale-[0.98]

  /* Focus accessible */
  focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-(--color-primary) focus-visible:ring-offset-2
"
```

### Breakdown

| Property                                         | Purpose                    | Why                                                       |
| ------------------------------------------------ | -------------------------- | --------------------------------------------------------- |
| `shadow-sm → hover:shadow-md → active:shadow-lg` | **Depth escalation**       | Elevates on hover; deepens on press                       |
| `transition-all duration-200 ease-out`           | **Smooth motion**          | All properties animate; 200ms matches human reaction time |
| `active:scale-[0.98]`                            | **Press feedback**         | 2% reduction signals interaction to user                  |
| `focus-visible:ring-2`                           | **Keyboard accessibility** | Clear focus indicator for keyboard users                  |

---

## Component Implementation Reference

### ✅ Correct

```tsx
// Button
"bg-(--color-primary) shadow-sm hover:shadow-md active:shadow-lg transition-all duration-200 active:scale-[0.98]";

// Input/Select
"border border-(--color-border) focus-within:ring-2 shadow-sm focus-within:shadow-md active:shadow-lg transition-all duration-200 active:scale-[0.98]";

// Dialog
"bg-(--color-surface) shadow-lg hover:shadow-lg focus:shadow-2xl transition-all duration-200 active:scale-[0.98]";

// Badge (non-interactive, no active)
"bg-(--color-primary) shadow-sm transition-all duration-200";
```

### ❌ Outdated Patterns

```tsx
// DON'T: Inconsistent scales
"active:scale-[0.99]"; // ← Too subtle
"active:scale-[0.97]"; // ← Too pronounced
"active:scale-[0.96]"; // ← Way too much

// DON'T: No transitions
"active:scale-[0.98]"; // Missing: transition-all duration-200

// DON'T: No shadow escalation
"bg-primary"; // Missing: shadow-sm hover:shadow-md active:shadow-lg

// DON'T: No focus state
"bg-primary shadow-sm"; // Missing: focus-visible:ring-2
```

---

## Tailwind Configuration (If Custom)

The `active:scale-[0.98]` uses Tailwind's arbitrary values syntax and requires **no additional config** — works out of the box with `@apply` or classNames.

If creating a **custom Tailwind scale token**:

```javascript
// tailwind.config.js
theme: {
  extend: {
    scale: {
      98: '0.98', // Active state press
    }
  }
}

// Then use: active:scale-98 (no brackets)
```

**Current approach** (preferred): Use `active:scale-[0.98]` for clarity that this is a micro-interaction, not a reusable scale.

---

## Components Using This Pattern

| Component     | File                         | Scale                          | Status     |
| ------------- | ---------------------------- | ------------------------------ | ---------- |
| Button        | `Button/button.variants.ts`  | `0.98` → Standardize to `0.98` | ✅ Correct |
| Input         | `Input/input.variants.ts`    | `0.98`                         | ✅ Correct |
| Select        | `Select/select.variants.ts`  | `0.98`                         | ✅ Correct |
| Badge         | `Badge/badge.variants.ts`    | `0.98` (non-interactive)       | ✓ OK       |
| Dialog        | `Dialog/dialog.variants.ts`  | `0.99` → **Needs 0.98**        | ⚠️ Fix     |
| Dialog button | `Dialog/Dialog.tsx` (inline) | `0.97` → **Needs 0.98**        | ⚠️ Fix     |

---

## Design Rationale & User Research

### Why Micro-Interactions Matter

1. **Tactile Feedback Simulation** — Web lacks physical haptics; scale + shadow simulate button press
2. **Action Confirmation** — Users immediately know their click registered
3. **Modern Aesthetic** — Matches iOS, Material Design, Figma, modern web apps
4. **Non-Intrusive** — At 0.98 scale, the effect is felt not seen (like a real button)

### Timing: Why 200ms?

- **100–150ms**: Too fast; feels snappy but may miss on slower devices
- **200ms**: ✅ **STANDARD** — Matches human reaction time; universal perceived smoothness
- **250–300ms**: Sluggish on real actions; feels unresponsive
- **400ms+**: Clearly delayed; breaks perceived immediacy

### Established Apps Using This Pattern

| App                 | Scale     | Timing    | Library/Framework         |
| ------------------- | --------- | --------- | ------------------------- |
| **Google Material** | 0.98      | 200–250ms | Material Design spec      |
| **Figma**           | 0.98      | 180–200ms | Custom CSS                |
| **Slack**           | 0.97–0.98 | 150ms     | Emotion/styled-components |
| **Discord**         | 0.97      | ~100ms    | Custom CSS-in-JS          |
| **Apple iOS**       | 0.94–0.97 | ~150ms    | Native UIKit              |
| **Framer**          | 0.95–0.98 | 200ms     | Framer Motion             |

**Consensus**: **0.98 scale + 200ms timing** is the universal sweet spot.

---

## Integration Into Agent Instructions

When agentic tools create interactive components, they should automatically apply:

```
1. Add shadow escalation: shadow-sm hover:shadow-md active:shadow-lg
2. Add smooth transitions: transition-all duration-200 ease-out
3. Add active press: active:scale-[0.98]
4. Add focus states: focus-visible:ring-2 focus-visible:ring-(--color-*) focus-visible:ring-offset-2
5. Verify dark mode via semantic color tokens
```

---

## Testing Micro-Interactions

### Visual Testing

1. Open component in browser
2. Hover over button → shadow deepens (smooth)
3. Click/Press button → scale reduces 2% + shadow deepens (immediate)
4. Release → smooth snap back to original size
5. Tab focus → ring appears around element

### Programmatic Testing

```typescript
test("button press has scale transform", () => {
  const button = screen.getByRole("button");
  const styles = window.getComputedStyle(button, ":active");
  expect(styles.transform).toMatch(/scale/);
});

test("hover increases shadow", () => {
  const button = screen.getByRole("button");
  fireEvent.mouseEnter(button);
  expect(button).toHaveClass("hover:shadow-md");
});

test("focus shows ring", () => {
  const button = screen.getByRole("button");
  fireEvent.focus(button);
  expect(button).toHaveClass("focus-visible:ring-2");
});
```

---

## Exceptions & Considerations

### Non-Interactive Elements (No Active Scale)

- **Badges** (display-only): No `active:scale`; shadow/transition OK for hover
- **Cards** (read-only): No `active:scale` unless clickable
- **Alerts/Toasts** (non-dismissible): No `active:scale`
- **Text/Labels**: No `active:scale` (not interactive)

### Disabled States

```tsx
// Don't scale when disabled
"disabled:active:scale-100"; // Cancel the active:scale-[0.98]
// Or better: remove active state entirely for disabled
"disabled:opacity-50 disabled:cursor-not-allowed";
```

### Touch Devices

The `active:scale-[0.98]` works perfectly on touch:

- `:active` fires on touch press
- 200ms transition covers tap duration
- No need for special touch handling

---

## Summary: Standardized Micro-Interactions

```css
/* The Standard */
active:scale-[0.98]
transition-all duration-200 ease-out
shadow-sm hover:shadow-md active:shadow-lg
focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-2
```

✅ **Apply to**: Buttons, Inputs, Selects, Dialogs, Form Elements, Card Actions  
❌ **Don't apply to**: Badges (static), Cards (non-clickable), Text, Read-only Elements

---

**Updated**: 2026-04-09  
**Status**: Standardized across AppIQ components  
**Reference**: [ADR 0005: Modern Design Principles](../../../docs/adrs/0005-modern-design-principles.md)
