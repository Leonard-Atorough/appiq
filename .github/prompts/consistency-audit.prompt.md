---
description: "Scan component code for design consistency issues. Check for hard-coded colors, magic numbers, non-semantic spacing, design token usage, and modern design principle alignment."
argument-hint: "File path (e.g., src/features/applications/ui/ApplicationCard.tsx)"
---

# Design Consistency Audit

Analyze a component file for design consistency violations and improvement opportunities aligned with AppIQ's Modern Design Principles (ADR 0005).

## What This Checks

### ✅ Compliance

- [ ] Uses semantic color tokens (not `#ffffff`, `rgb(...)`)
- [ ] Uses spacing tokens (not `margin: 10px`)
- [ ] Uses design tokens for font sizes
- [ ] All colors accessible (sufficient contrast)
- [ ] Dark mode support (tokens automatically switch)
- [ ] **Layered depth** — shadows on interactive elements (`shadow-sm`, `hover:shadow-md`)
- [ ] **Micro-interactions** — smooth transitions (`transition-all duration-200`)
- [ ] **Focus states** — visible and accessible focus indicators

### ⚠️ Warnings

- Hard-coded colors detected
- Magic numbers in spacing/sizing
- CSS variable access syntax used where a Tailwind extended class exists (e.g., `bg-(--color-surface)` should be `bg-surface`)
- Missing semantic meaning in class names
- Focus states missing
- Accessibility attributes missing
- **Missing shadows** on interactive components (breaks depth principle)
- **No transitions** on hover/focus states (breaks micro-interaction principle)
- **Static interactions** that should have visual feedback

### 🔧 Suggestions

- "Use `bg-surface` instead of `bg-(--color-surface)` (mapped in tailwind.config.js)"
- "Use `px-md` instead of `px-(--spacing-md)` or `px-[10px]`"
- "Use `text-muted` instead of `text-(--color-text-muted)`"
- "Use `border-base` instead of `border-(--color-border)`"
- "Use `rounded-lg` instead of `rounded-(--radius-lg)`"
- "Add `shadow-sm hover:shadow-md` for depth on buttons"
- "Add `transition-all duration-200` for smooth micro-interactions"
- "Test with dark mode enabled"

## Example Report

```
📋 DESIGN CONSISTENCY AUDIT: ApplicationCard.tsx
═════════════════════════════════════════════════

OVERALL SCORE: 73% ⚠️ Needs Review

───────────────────────────────────────────────────
✅ COMPLIANT PATTERNS (8)
───────────────────────────────────────────────────

✓ Line 12: Uses var(--color-primary) for button background
✓ Line 18: Uses var(--color-text-muted) for secondary text
✓ Line 24: `px-md py-sm` for consistent spacing with Tailwind token classes
✓ Line 31: focus:outline-2 for keyboard accessibility
✓ Line 45: className for utility composition (not style attr)
✓ Line 52: Uses semantic <article> element
✓ Line 57: aria-label for status badge
✓ Line 65: shadow-sm hover:shadow-md for depth on interactive element (modern principle)
✓ Line 62: Dark mode support via tokens (automatic)

───────────────────────────────────────────────────
⚠️ WARNINGS (3)
───────────────────────────────────────────────────

⚠ Line 15: Hard-coded color '#cccccc'
  → Should use var(--color-border)

⚠ Line 28: Margin '15px' (magic number)
  → Should use Tailwind `my-md` (from tailwind.config.js spacing tokens)

⚠ Line 67: Missing focus state on interactive element
  → Buttons need focus:outline or focus-ring class

───────────────────────────────────────────────────
🔧 SUGGESTIONS (2)
───────────────────────────────────────────────────

1. Replace inline #cccccc with design token
   Current:   borderColor: '#cccccc'
   Recommended: borderColor: 'var(--color-border)'

2. Replace magic spacing
   Current:   margin: '15px'
   Recommended: className="my-md"

───────────────────────────────────────────────────
📱 DARK MODE VERIFICATION
───────────────────────────────────────────────────

✓ Light mode text contrast: 15:1 (AAA)
✓ Dark mode text contrast: 13:1 (AA)
✓ Primary color pops on dark background
⚠ Border color slightly hard to see in dark mode
  → Consider slightly lighter value in dark mode override

───────────────────────────────────────────────────
🎯 REFACTORED CODE (Auto-Fixes)
───────────────────────────────────────────────────

Line 15 - Color Fix:
  Before: <span style={{ borderColor: '#cccccc' }}>
  After:  <span style={{ borderColor: 'var(--color-border)' }}>

Line 28 - Spacing Fix:
  Before: <div style={{ margin: '15px' }}>
  After:  <div className="my-md">

───────────────────────────────────────────────────
✔️ NEXT STEPS
───────────────────────────────────────────────────

1. Replace hard-coded #cccccc on line 15
2. Use Tailwind spacing tokens for margin
3. Add focus state to button on line 67
4. Test in dark mode (Chrome DevTools)
5. Run tests to ensure functionality unaffected

Estimated time: 5 minutes
```

## How to Run

**In Chat:**

```
/consistency-audit src/features/applications/ui/ApplicationCard.tsx
```

**What It Returns:**

1. **Compliance score** (0-100%)
2. **Compliant patterns** (what's good)
3. **Warnings** (issues to fix)
4. **Suggestions** (how to fix)
5. **Dark mode verification**
6. **Refactored code snippets** (copy-paste solutions)
7. **Next steps** (action items)

## Key Checks

### Colors

```tsx
// ❌ Hard-coded
<div style={{ color: '#333333' }}>Text</div>

// ✅ Using Tailwind extended class
<div className="text-secondary">Text</div>

// ✅ CSS var only for unmapped tokens (hover states, foreground colors)
<button className="bg-primary-500 hover:bg-(--color-primary-hover)">Click</button>
```

### Spacing

```tsx
// ❌ Magic numbers
<div style={{ padding: '12px', margin: '8px' }}>Content</div>

// ✅ Tailwind spacing tokens from tailwind.config.js
<div className="p-md m-sm">Content</div>
```

### Accessibility

```tsx
// ❌ No focus state
<button className="bg-blue-600">Click</button>

// ✅ Focus visible + accessible, using Tailwind config classes
<button className="bg-primary-500 text-white
  focus:outline-2 focus:outline-offset-2
  focus:outline-(--color-primary)">
  Click
</button>
```

### Modern Design: Depth & Elevation

```tsx
// ❌ Flat buttons (no depth)
<button className="bg-primary-500 text-white px-md py-sm">
  Click
</button>

// ✅ Layered with shadows
<button className="bg-primary-500 text-white px-md py-sm
  shadow-sm hover:shadow-md
  transition-all duration-200">
  Click
</button>
```

### Modern Design: Micro-interactions

```tsx
// ❌ Static hover (instant color change)
<button className="bg-primary-500 hover:bg-(--color-primary-hover)">
  Click
</button>

// ✅ Smooth transitions
<button className="bg-primary-500 hover:bg-(--color-primary-hover)
  transition-all duration-200
  active:scale-[0.98]">
  Click
</button>
```

### Dark Mode

```tsx
// ❌ Light-only value
<div style={{ backgroundColor: '#ffffff' }}>

// ✅ Token handles both
<div style={{ backgroundColor: 'var(--color-surface)' }}>
/* Automatically switches to dark gray in dark mode */
```

## Common Issues & Fixes

| Issue                 | Pattern                                     | Fix                                                             |
| --------------------- | ------------------------------------------- | --------------------------------------------------------------- |
| Color not consistent  | `#fff`, `white`, `rgb(255,255,255)`         | Use `bg-surface` or `bg-base`                                   |
| CSS var access syntax | `bg-(--color-surface)`, `px-(--spacing-md)` | Use `bg-surface`, `px-md` (mapped in tailwind.config.js)        |
| Spacing varies        | `margin: 10px`, `padding: 1em`, `gap: 16px` | Use `mx-md`, `p-sm`, `gap-md`                                   |
| No dark mode          | Color blindly using light-only values       | Use semantic tokens                                             |
| Contrast too low      | Text on background < 4.5:1                  | Increase contrast ratio                                         |
| Missing focus         | Interactive elements unfocusable            | Add `focus:outline-2`                                           |
| Flat design           | No shadows on interactive elements          | Add `shadow-sm hover:shadow-md`                                 |
| No visual feedback    | Buttons have no hover/active states         | Add `transition-all duration-200` with hover/active styles      |
| Instant changes       | Color/shadow changes instantly              | Add `transition-all duration-200` for smooth micro-interactions |
| Missing depth         | All elements same visual hierarchy          | Use shadows and styling to create elevation                     |

## Integration

Run audit regularly:

- **Before PR**: `npm run lint` + consistency audit for token + design principle compliance
- **After styling changes**: Verify new code uses tokens and applies modern design principles
- **Onboarding**: Show examples of compliant components that follow [ADR 0005: Modern Design Principles](../../docs/adrs/0005-modern-design-principles.md)

---

**Related Skills & Docs**:

- [Design Tokens Skill](../skills/design-tokens/) - Token reference and modern principle guidelines
- [A11y Audit Skill](../skills/a11y-audit/) - Accessibility review
- [ADR 0005: Modern Design Principles](../../docs/adrs/0005-modern-design-principles.md) - Complete design philosophy
