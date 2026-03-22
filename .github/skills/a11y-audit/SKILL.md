---
name: a11y-audit
description: "Accessibility (WCAG) audit for components and pages. Use when: reviewing component code for accessibility, ensuring keyboard navigation works, checking color contrast, verifying ARIA attributes, or onboarding accessibility practices."
argument-hint: "Component/page path or feature name (e.g., ApplicationCard.tsx, applications)"
user-invocable: true
---

# Accessibility Audit

Ensure AppIQ components and features meet WCAG 2.1 AA standards for inclusive design.

## When to Use

- **Component review**: "Is this button accessible?"
- **Feature audit**: "Does this form work with keyboard only?"
- **Dark mode test**: "Does this component have enough contrast?"
- **Onboarding**: "Show me accessibility best practices"
- **Compliance check**: "Which components need fix?"

## WCAG 2.1 Level AA Checklist

### Perceivable

- [ ] **1.4.3 Contrast**: Text/background ratio ≥ 4.5:1 (normal), ≥ 3:1 (large)
- [ ] **1.4.11 Non-text contrast**: UI components ≥ 3:1
- [ ] **1.4.5 Images of text**: Use actual text, not text in images
- [ ] **1.3.1 Info & relationships**: Semantic structure (headings, lists, labels)

### Operable

- [ ] **2.1.1 Keyboard**: All functionality available via keyboard
- [ ] **2.1.2 No keyboard trap**: Focus can move to/from all elements
- [ ] **2.4.3 Focus order**: Logical tab order (top→bottom, left→right)
- [ ] **2.4.7 Focus visible**: Clear focus indicator (outline, highlight)

### Understandable

- [ ] **3.2.4 Consistent identification**: Same components work the same way
- [ ] **3.3.2 Labels**: All form inputs have associated labels
- [ ] **3.3.3 Error suggestions**: Clear error messages with fixes

### Robust

- [ ] **4.1.2 Name, role, value**: ARIA correctly describes elements
- [ ] **4.1.3 Status messages**: Live regions announce changes

## Quick Audit Procedure

### Step 1: Visual Inspection

Open the component in browser. Check:

- [ ] Text is readable (not too small, sufficient contrast)
- [ ] Interactive elements (buttons, links) are obvious
- [ ] Dark mode doesn't break contrast
- [ ] Layout is clean and organized

### Step 2: Keyboard Navigation

Unplug mouse. Navigate using **Tab**, **Shift+Tab**, **Enter**, **Space**, **Arrow keys**.

- [ ] Can reach every interactive element with Tab?
- [ ] Focus ring is visible on all focusable elements?
- [ ] No keyboard traps (elements you can't escape)?
- [ ] Can operate buttons with Enter/Space?
- [ ] Can operate links with Enter?
- [ ] Can operate forms and select dropdowns?

### Step 3: Screen Reader Test

Use browser's built-in screen reader:

**Windows (Narrator)**:

- Win + Ctrl + N to start

**macOS (VoiceOver)**:

- Cmd + F5 to start

**Check**:

- [ ] All text is read aloud (not just images)
- [ ] Buttons announce their purpose ("Submit Form", not "Button")
- [ ] Forms announce field labels
- [ ] Errors announce clearly
- [ ] Dynamic updates announced (live regions)

### Step 4: Contrast Check

Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/):

- [ ] Text on background: ≥ 4.5:1
- [ ] Large text (18pt+): ≥ 3:1
- [ ] Non-text UI elements: ≥ 3:1

### Step 5: Code Review

[Code patterns](./references/accessible-patterns.md) for:

- Semantic HTML elements
- ARIA attributes
- Focus management
- Live regions

## Common Issues & Fixes

| Issue                | Fix                                 | Test                          |
| -------------------- | ----------------------------------- | ----------------------------- |
| No focus indicator   | Add `outline` or `focus-ring` class | Tab to element                |
| Button uses `<div>`  | Use `<button>`                      | Tab + keyboard                |
| Missing form labels  | Add `<label htmlFor="input">`       | Screen reader                 |
| Color-only indicator | Add icon + text + semantic color    | Check with colorblind filter  |
| Image missing alt    | Add `alt="description"`             | Screen reader                 |
| Low contrast text    | Use design tokens (higher contrast) | Contrast checker or dark mode |
| Modal not trapped    | Add `role="dialog"` + focus trap    | Tab through modal             |

## Tools & Resources

**Browser Extensions**:

- [axe DevTools](https://www.deque.com/axe/devtools/) — Automated a11y scanning
- [WAVE](https://wave.webaim.org/extension/) — Visual feedback, structural analysis
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) — Built-in to Chrome

**Online Checkers**:

- [WebAIM Contrast](https://webaim.org/resources/contrastchecker/)
- [Color Universal Design](https://jfly.uni-koeln.de/color/)
- [WAVE](https://wave.webaim.org/)

**Reference**:

- [WCAG 2.1 Spec](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM Articles](https://webaim.org/articles/)

## AppIQ-Specific Recommendations

### 1. Semantic HTML

Always use semantic elements:

```tsx
// Good
<header>
  <nav>/* navigation */</nav>
</header>
<main>
  <section>
    <article>/* feature content */</article>
  </section>
</main>
<footer>/* footer */</footer>

// Bad
<div className="header">
  <div className="nav">/* nav */</div>
</div>
<div className="main">
  <div className="section">/* content */</div>
</div>
```

### 2. Form Labels

Always associate labels with inputs:

```tsx
// Good
<label htmlFor="application-title">Application Title</label>
<input id="application-title" type="text" />

// Bad
<label>Application Title</label>
<input type="text" />
```

### 3. Button & Link Types

Be explicit:

```tsx
// Links navigate
<a href="/applications">View Applications</a>

// Buttons perform actions
<button onClick={handleSave}>Save</button>

// Not: <div onClick={...}>Click me</div>
```

### 4. ARIA for Complex Components

Use ARIA when semantic HTML isn't enough:

```tsx
// Dropdown with ARIA
<select>
  <option>Pending</option>
  <option>Interview</option>
  <option>Offer</option>
</select>

// Or with custom select:
<div role="combobox" aria-expanded={isOpen}>
  <button aria-haspopup="listbox">
    {selected}
  </button>
</div>
```

### 5. Focus Management

Manage focus for modals and dynamic content:

```tsx
function Modal({ isOpen, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <div
      ref={modalRef}
      role="dialog"
      tabIndex={-1}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      {/* modal content */}
    </div>
  );
}
```

## Audit Checklist Template

Use this when auditing a feature:

```markdown
## {FeatureName} Accessibility Audit

### Semantic Structure

- [ ] Uses semantic HTML (`<button>`, `<label>`, etc.)
- [ ] Headings hierarchy correct (h1 → h2 → h3)
- [ ] Form fields have associated labels

### Keyboard Navigation

- [ ] All interactive elements reachable by Tab
- [ ] Focus order is logical
- [ ] No keyboard traps
- [ ] Focus indicator visible

### Contrast & Color

- [ ] Text contrast ≥ 4.5:1 (light mode)
- [ ] Text contrast ≥ 4.5:1 (dark mode)
- [ ] UI elements have ≥ 3:1 contrast
- [ ] No color-only indicators

### ARIA & Screen Readers

- [ ] Buttons announce their purpose
- [ ] Form errors clear and associated
- [ ] Images have alt text
- [ ] Live regions announce changes

### Mobile & Touch

- [ ] Touch targets ≥ 44px × 44px
- [ ] Zoom works (not disabled)

### Issues Found

- [ ] Issue 1: ... (Fix: ...)
- [ ] Issue 2: ... (Fix: ...)

### Status: ✅ Pass / ⚠️ Review / ❌ Fail
```

## References

- [Accessible Patterns](./references/accessible-patterns.md) — Code examples
- [WCAG 2.1 Quick Ref](./references/wcag-quick-ref.md) — Fast lookup
- [Dark Mode & A11y](./references/dark-mode-a11y.md) — Color contrast in dark theme
