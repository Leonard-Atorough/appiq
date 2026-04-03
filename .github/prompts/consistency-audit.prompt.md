---
description: "Scan component code for design consistency issues. Check for hard-coded colors, magic numbers, non-semantic spacing, and design token usage."
argument-hint: "File path (e.g., src/features/applications/ui/ApplicationCard.tsx)"
---

# Design Consistency Audit

Analyze a component file for design consistency violations and improvement opportunities.

## What This Checks

### ✅ Compliance
- [ ] Uses semantic color tokens (not `#ffffff`, `rgb(...)`)
- [ ] Uses spacing tokens (not `margin: 10px`)
- [ ] Uses design tokens for font sizes
- [ ] All colors accessible (sufficient contrast)
- [ ] Dark mode support (tokens automatically switch)

### ⚠️ Warnings
- Hard-coded colors detected
- Magic numbers in spacing/sizing
- Missing semantic meaning in class names
- Focus states missing
- Accessibility attributes missing

### 🔧 Suggestions
- "Use `var(--color-primary)` instead of `#0099ff`"
- "Replace `px-[10px]` with `px-md` (from tokens)"
- "Add `var(--spacing-md)` for consistency"
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
✓ Line 24: Tailwind px-4 py-2 for consistent spacing
✓ Line 31: focus:outline-2 for keyboard accessibility
✓ Line 45: className for utility composition (not style attr)
✓ Line 52: Uses semantic <article> element
✓ Line 57: aria-label for status badge
✓ Line 62: Dark mode support via tokens (automatic)

───────────────────────────────────────────────────
⚠️ WARNINGS (3)
───────────────────────────────────────────────────

⚠ Line 15: Hard-coded color '#cccccc'
  → Should use var(--color-border)

⚠ Line 28: Margin '15px' (magic number)
  → Should use Tailwind my-(--spacing-md) (1rem)

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
   Recommended: className="my-(--spacing-md)"

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
  After:  <div className="my-(--spacing-md)">

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

// ✅ Using token
<div style={{ color: 'var(--color-text)' }}>Text</div>

// ✅ Using Tailwind
<div className="text-(--color-text)">Text</div>
```

### Spacing
```tsx
// ❌ Magic numbers
<div style={{ padding: '12px', margin: '8px' }}>Content</div>

// ✅ Design tokens
<div className="p-(--spacing-md) m-(--spacing-sm)">Content</div>
```

### Accessibility
```tsx
// ❌ No focus state
<button className="bg-blue-600">Click</button>

// ✅ Focus visible
<button className="bg-(--color-primary)
  focus:outline-2 focus:outline-offset-2
  focus:outline-(--color-primary)">
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

| Issue | Pattern | Fix |
|-------|---------|-----|
| Color not consistent | `#fff`, `white`, `rgb(255,255,255)` | Use `var(--color-surface)` |
| Spacing varies | `margin: 10px`, `padding: 1em`, `gap: 16px` | Use `mx-(--spacing-md)` |
| No dark mode | Color blindly using light-only values | Use semantic tokens |
| Contrast too low | Text on background < 4.5:1 | Increase contrast ratio |
| Missing focus | Interactive elements unfocusable | Add `focus:outline-2` |

## Integration

Run audit regularly:
- **Before PR**: `npm run lint` + consistency audit
- **After styling changes**: Verify new code uses tokens
- **Onboarding**: Show examples of compliant components

---

**Related Skills**:
- [Design Tokens Skill](../skills/design-tokens/) - Token reference
- [A11y Audit Skill](../skills/a11y-audit/) - Accessibility review
