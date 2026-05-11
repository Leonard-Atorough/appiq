---
name: component-paradigm-reference
description: "Reference and decision guide for the four component composition paradigms (Slot-based, Mixed, Children-only, Floating Anchor) and interface extension patterns. Use when: designing a new component, reviewing component APIs, ensuring paradigm consistency, or onboarding on component conventions."
user-invocable: true
---

# Component Paradigm Reference & Decision Guide

Quick reference for AppIQ's four component composition paradigms and interface extension rules.

## Quick Decision Tree

**Does the component own a fixed, opinionated layout with named content regions?**
→ **Paradigm 1: Slot-based** (Tag, EmptyState, Toast, Dropdown)

**Does the component provide a structural frame (label, error, header) around free content?**
→ **Paradigm 2: Mixed** (Field, Card, DropTarget)

**Is the component purely a styled or behavioural wrapper?**
→ **Paradigm 3: Children-only** (Button, DragItem, Flex, Label)

**Does the component anchor a floating panel to an external trigger, managing open state and ARIA?**
→ **Paradigm 4: Floating Anchor** (Tooltip, Popover)

---

## Paradigm 1: Slot-based

### When to use
Visual components with a consistent structural skeleton. Content areas vary; layout does not.

### Interface shape
```ts
interface TagProps {
  label: React.ReactNode;           // Required slot
  startAdornment?: React.ReactNode;  // Optional slots
  deleteIcon?: React.ReactNode;
  actions?: TagAction[];
  color?: ResponsiveValue<"default" | "success" | "error" | "warning" | "info">;
  size?: ResponsiveValue<"sm" | "md" | "lg">;
  className?: string;  // Optional escape hatch
}
```

### Key rules
- No `children` in the interface
- All content comes via named slots
- Layout is fixed and not consumer-customizable
- Use explicit `ResponsiveValue<T>` or string unions for variants, never `VariantProps<>`

### Real examples
- `src/shared/ui/Tag/` — `label`, `startAdornment`, `deleteIcon`, `actions`
- `src/shared/ui/EmptyState/` — `title`, `description`, `icon`, `action`
- `src/shared/ui/Toast/` — `title`, `description` + auto-generated icon from `variant`
- `src/shared/ui/Dropdown/` — `trigger` (content for internal button), `items` (data-driven)

### Common mistakes
- Including both a `label` slot AND `children` (creates ambiguity)
- Allowing arbitrary `children` when the layout should be fixed (breaks predictability)
- Leaking `VariantProps<T>` in the interface (couples API to CVA config)

---

## Paradigm 2: Mixed (shell + children)

### When to use
The component provides consistent framing (chrome, labels, error messages) but the core payload is free content.

### Interface shape
```ts
interface FieldProps extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, "onChange"> {
  label?: React.ReactNode;
  error?: React.ReactNode;
  helperText?: React.ReactNode;
  success?: React.ReactNode;
  required?: boolean;
  children: React.ReactNode;  // The form control
  className?: string;
}
```

### Key rules
- `children` is the primary content
- Named props (`label`, `error`, etc.) describe the frame
- The component wires accessibility linkage (e.g., `htmlFor`, `aria-describedby`) between frame and content
- Consider extending HTML attributes if the frame maps to a semantic element (`<fieldset>`)

### Real examples
- `src/shared/ui/Field/` — owns label, error, helper wiring; `children` is the input
- `src/shared/ui/Card/` — owns header, footer, actions; `children` is the card body
- `src/shared/ui/DropTarget/` — owns droppable state; `children` is a render prop receiving drag state
- `src/shared/ui/Popover/` — owns trigger, side/align, open state; `children` is panel content

### Common mistakes
- Making frame props and `children` do the same job (e.g., both a `title` slot AND `children` label)
- Forgetting accessibility wiring between frame and content
- Treating as Floating Anchor when the component doesn't inject ARIA onto an external trigger

---

## Paradigm 3: Children-only

### When to use
Styled or behavioural pass-through components. The component's job is CSS/layout/events, not content orchestration.

### Interface shape
```ts
interface DragItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "id" | "draggable" | "onDragStart" | "onDragEnd"> {
  id: string;
  type?: string;
  disabled?: boolean;
  // `children` is inherited from HTMLAttributes<HTMLDivElement>
}
```

### Key rules
- **Extend the most semantically appropriate HTML element attributes**
- Omit only attributes the component controls or redefines
- Spread `...rest` onto the root element (so consumers can pass `data-testid`, `aria-*`, `style`, etc.)
- `children: React.ReactNode` (from the HTML extension)

### Omit these attributes when:
| Reason | Example |
|---|---|
| Component controls it internally | `draggable` on DragItem (driven by `disabled`) |
| Component owns the handler | `onDragStart`, `onDrop` |
| Redefined with narrower type | `size` on Button (`"sm"\|"md"\|"lg"` vs HTML `number`) |
| Conflicts with component semantics | `color` on Tag (HTML `color` is a legacy string attr) |
| Conflicts with render-prop shape | `children` on DropTarget (render prop, not `ReactNode`) |

### Real examples
- `src/shared/ui/Button/` — extends `ButtonHTMLAttributes<HTMLButtonElement>`, omits `size`
- `src/shared/ui/DragItem/` — extends `HTMLAttributes<HTMLDivElement>`, omits `id`, `draggable`, `onDragStart`, `onDragEnd`
- `src/shared/ui/Flex/` — extends `HTMLAttributes<HTMLDivElement>` (styled flexbox wrapper)
- `src/shared/ui/Label/` — extends `LabelHTMLAttributes<HTMLLabelElement>` (styled label)

### Common mistakes
- Forgetting to spread `...rest` (consumers can't pass standard HTML attrs)
- Not extending HTML attributes, making the component feel inconsistent with native elements
- Omitting too many attributes (e.g., omitting `className` instead of using `cn()`)
- Trying to be Slot-based when you should be Children-only (e.g., a Button that only needs styled content, not fixed layout)

---

## Paradigm 4: Floating Anchor

### When to use
The component anchors a floating panel (tooltip, popover) to an external trigger element. The component owns positioning, keyboard handling, and ARIA wiring. The trigger element is provided, not owned.

### Interface shape (form 1: cloneElement)
```ts
interface TooltipProps {
  label: React.ReactNode;        // Panel content
  children: React.ReactElement;  // Trigger element (will be cloned)
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  delay?: number;
  size?: ResponsiveValue<"sm" | "md" | "lg">;
  triggerClassName?: string;
  messageClassName?: string;
  wrapperClassName?: string;
}
```

### Interface shape (form 2: render prop)
```ts
interface PopoverProps {
  trigger: (props: PopoverTriggerProps) => React.ReactElement;  // Consumer injects props
  children: React.ReactNode;  // Panel content
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: "top" | "right" | "bottom" | "left";
  size?: ResponsiveValue<"sm" | "md" | "lg">;
}

interface PopoverTriggerProps {
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
  onClick?: React.MouseEventHandler;
  onFocus?: React.FocusEventHandler;
  // ... other handlers the component injects
}
```

### Key rules
- **Trigger must be a `React.ReactElement`** (not `ReactNode` or string)
- **Two forms:**
  - **cloneElement form** (Tooltip): Consumer passes a single element; component clones it to inject `aria-describedby`
  - **Render prop form** (Popover): Consumer receives handler/aria props and must spread them
- The component owns open state, portal positioning, keyboard handling (Escape, outside-click, focus-leave)
- Panel content is free (`label` on Tooltip, `children` on Popover)
- Use targeted className escape hatches (`triggerClassName`, `contentClassName`, `wrapperClassName`) instead of full HTML spread

### A11y responsibilities
- Inject `aria-describedby` (Tooltip) or `aria-expanded` + `aria-controls` (Popover) onto the trigger
- Apply `role="tooltip"` or `role="dialog"` to the panel
- Manage focus (Tooltip: immediately on focus; Popover: focus trap in modal mode)
- Handle Escape key to close and return focus

### Real examples
- `src/shared/ui/Tooltip/Tooltip.tsx` — cloneElement form; uses `createPortal` + `useLayoutEffect` for positioning
- `src/shared/ui/Popover/Popover.tsx` — render prop form; uses CSS absolute positioning + optional modal overlay

### Why Dropdown is NOT Floating Anchor
Dropdown owns its `<button>` trigger; `trigger` is content placed *inside* that button (Slot-based Paradigm 1). It doesn't accept an external trigger element.

### Common mistakes
- Mixing trigger forms inconsistently (some components use cloneElement, others use render prop with no clear reason)
- Forgetting to inject ARIA attributes or inject them incorrectly
- Not handling Escape / outside-click consistently
- Allowing trigger to be `ReactNode` when it must be `ReactElement` (breaks cloneElement pattern)

---

## Interface Extension & CVA Encapsulation

### Core rule
**Never expose `VariantProps<T>` or `Omit<VariantProps<...>, ...>` in a public interface.**

CVA is an implementation detail. Public component interfaces must express variant props as explicit string unions or `ResponsiveValue<T>`.

### Pattern 1: Styled HTML wrapper (Paradigm 3)

Extend HTML element attributes:

```ts
// ✅ Correct
interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  variant?: ResponsiveValue<"primary" | "secondary" | "ghost" | "danger">;
  size?: ResponsiveValue<"sm" | "md" | "lg">;
}

// ❌ Wrong
interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size">, 
                              VariantProps<typeof buttonVariants> {
}
```

**Inside the component:** Still call the CVA function directly:
```ts
const classes = buttonVariants({ variant: resolvedVariant, size: resolvedSize });
```

### Pattern 2: Composition/orchestration (Paradigms 1, 2, 4)

No HTML extension; use explicit props:

```ts
// ✅ Correct
interface TagProps {
  label: React.ReactNode;
  color?: ResponsiveValue<"default" | "success" | "error" | "warning" | "info">;
  size?: ResponsiveValue<"sm" | "md" | "lg">;
  className?: string;
}

// ❌ Wrong
interface TagProps extends VariantProps<typeof tagVariants> {
  label: React.ReactNode;
}
```

### Why this matters
- **Public API stability:** Renaming or restructuring the CVA config is never a breaking change
- **Type clarity:** Consumers see exactly which values are valid, not `string | null | undefined`
- **Tool support:** IntelliSense and autocomplete work correctly; no CVA implementation leakage

### Explicit variant example

Instead of:
```ts
type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];  // ❌ Leaks CVA
```

Define explicitly:
```ts
type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";  // ✅ Clear and stable
```

---

## When to Use `ResponsiveValue<T>`

Use `ResponsiveValue<T>` for props that control layout, sizing, or visual treatment that may reasonably differ at breakpoints:

| ✅ Use ResponsiveValue | ❌ Don't |
|---|---|
| `size` (controls padding, font size, spacing) | `label` (content, not layout) |
| `variant` (visual treatment like `"pill"`, `"underline"`) | `disabled` (semantic state, not visual) |
| `direction` / `orientation` (layout direction) | `id`, `required` |
| `fullWidth` (layout behavior) | `title`, `description` |

**Example:**
```ts
// ✅ Good: size varies at breakpoints
<Tabs size={{ base: "sm", md: "md", lg: "lg" }} />

// ❌ Bad: content doesn't change at breakpoints
<Field label={{ base: "Name", md: "Full Name" }} />
```

---

## Checklist: Creating a New Component

- [ ] **Determine paradigm** — Run through the quick decision tree above
- [ ] **Choose interface extension** — Paradigm 3 extends HTML; others use explicit props
- [ ] **No VariantProps** — Replace with explicit string unions or `ResponsiveValue<T>`
- [ ] **Document with JSDoc** — Especially `ResponsiveValue` props and slot purposes
- [ ] **Create `.variants.ts`** — CVA config (internal only)
- [ ] **Create `.types.ts`** — Public interface, no `VariantProps`
- [ ] **Create component.tsx** — Implementation, spread `...rest` if Paradigm 3
- [ ] **Create `index.ts`** — Named export of component and types
- [ ] **Write tests** — Test slot/prop combinations, accessibility
- [ ] **Write stories** — Show each paradigm usage pattern
- [ ] **Link to ADRs** — Reference [ADR 0009](../../docs/adrs/0009-component-composition-paradigms.md) and [ADR 0010](../../docs/adrs/0010-html-extension-and-cva-encapsulation.md)

---

## Real-World Reference Library

- **Paradigm 1 (Slot-based):** `src/shared/ui/Tag/`, `src/shared/ui/Dropdown/`
- **Paradigm 2 (Mixed):** `src/shared/ui/Field/`, `src/shared/ui/Card/`
- **Paradigm 3 (Children-only):** `src/shared/ui/Button/`, `src/shared/ui/DragItem/`
- **Paradigm 4 (Floating Anchor):** `src/shared/ui/Tooltip/`, `src/shared/ui/Popover/`

---

## Links to Full Specifications

- [ADR 0009 — Component composition paradigms](../../docs/adrs/0009-component-composition-paradigms.md)
- [ADR 0010 — HTML attributes extension and CVA encapsulation](../../docs/adrs/0010-html-extension-and-cva-encapsulation.md)
