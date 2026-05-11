---
title: HTML attributes extension and CVA encapsulation in shared UI components
date: 2026-05-11
status: accepted
---

# 0010 - HTML attributes extension and CVA encapsulation

## Context

Two related problems emerged as the shared UI library matured:

**Problem 1 — Missing HTML passthrough.** Several components (e.g. `DragItem`) defined only the props they explicitly needed. Consumers could not pass `data-testid`, `aria-*` attributes, `style`, or standard event handlers without the component explicitly forwarding them. This created recurring friction: every such attribute had to be added to the interface by hand.

**Problem 2 — Leaking CVA types.** Components were using `VariantProps<typeof xyzVariants>` directly in their public interfaces — often via `extends VariantProps<...>` or `extends Omit<VariantProps<...>, "size">`. This coupled consumers to class-variance-authority internals:
- CVA's nullable types (`string | null | undefined`) are wider than the plain unions callers expect
- Renaming or restructuring a CVA config became a breaking public API change
- The variant key names (e.g. `variant`, `color`, `size`) were determined by the CVA config rather than by deliberate API design
- It made it non-obvious which props were intentional API vs. CVA implementation detail

## Decision

### Rule 1 — Extend HTML element attributes for styled-wrapper components

Any component that renders a single root HTML element and doesn't own the full layout should extend the corresponding HTML attributes interface. Omit only the attributes the component controls internally or redefines with a narrower type.

```ts
// ✓ Extends HTML attrs; omits only what the component controls
interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  variant?: ResponsiveValue<"primary" | "secondary" | "ghost" | "danger">;
  size?: ResponsiveValue<"sm" | "md" | "lg">;
}

// ✓ Omits drag internals the component owns; spreads ...rest to the div
interface DragItemProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "id" | "draggable" | "onDragStart" | "onDragEnd"
> {
  id: string;       // reused as the drag transfer id, not the DOM id
  disabled?: boolean;
}
```

The component implementation must spread `...props` onto the root element:

```tsx
export const DragItem = ({ id, type, disabled = false, className, ...props }: DragItemProps) => (
  <div draggable={!disabled} onDragStart={...} className={cn(..., className)} {...props}>
    {children}
  </div>
);
```

**What to omit:**

| Reason to omit | Example |
|---|---|
| Component controls it internally | `draggable` on DragItem (driven by `disabled`) |
| Component owns the handler | `onDragStart`, `onDrop` |
| Redefined with narrower/different type | `size` on Button (`"sm"\|"md"\|"lg"` vs HTML `number`) |
| Conflicts with render-prop children shape | `children` on DropTarget |
| Conflicts with component's `color` semantics | `color` on Tag (`HTMLElement.color` is a legacy string attr) |
| Conflicts with component's `onChange` signature | `onChange` on RadioGroup (`(value: string) => void` vs `ChangeEvent`) |

**Composition/orchestration components** (Paradigm 2 and some Paradigm 1, per ADR 0009) do not extend HTML attrs because they own the full DOM structure. They include `className?: string` instead.

---

### Rule 2 — Never expose `VariantProps<T>` in a public interface

CVA is an implementation detail. All public component interfaces must express their visual variant props as explicit TypeScript unions or `ResponsiveValue<T>`.

```ts
// ✗ Leaks CVA internals — don't do this
interface TooltipProps extends Omit<VariantProps<typeof tooltipVariants>, "size"> { ... }

// ✓ Explicit public API
interface TooltipProps {
  color?: TooltipColor;       // "default" | "dark" | "primary" | "success" | ...
  bordered?: boolean;
  size?: ResponsiveValue<"sm" | "md" | "lg">;
}
```

The component implementation still imports and calls the CVA function directly — that doesn't change:

```ts
// Inside Tooltip.tsx — CVA stays here, not in the types file
import { tooltipVariants } from "./tooltip.variants";
const classes = tooltipVariants({ color: resolvedColor, size: resolvedSize, bordered });
```

**Why this matters for `Omit<VariantProps<...>, ...>`:**  
Even a partially-omitted `VariantProps` leaks the remaining keys. An `Omit` that removes *all* variant keys (like EmptyState previously had) contributes nothing and should be removed entirely.

---

## Rationale

- **Consumer ergonomics**: Consumers get `data-testid`, `aria-label`, `style`, `onFocus`, etc. for free. Without HTML extension they have to file requests for each attribute.
- **API stability**: Explicit string unions decouple the public interface from CVA's internal shape. Refactoring variant class generation doesn't break calling code.
- **Readability**: Explicit props are immediately legible in IntelliSense and in stories. `VariantProps` requires opening the variants file to understand what's available.
- **Type safety**: CVA's generated types are `string | null | undefined`. Explicit unions correctly express that these are optional enum-like values, not nullable strings.

## Consequences

**Positive:**
- All shared UI components accept standard HTML attributes without extra forwarding work.
- The public API is self-describing and independent of CVA.
- Changing a CVA config (class names, compound variants) is never a breaking change to consumers.

**Negative:**
- Explicit prop declarations must be kept in sync with CVA config manually. If a variant key is added to CVA it won't automatically appear in the public interface.
- Slightly more boilerplate in the types file (explicit union vs. `VariantProps<T>`).

## Alternatives

- **Re-export `VariantProps` as a named alias**: Wraps the CVA type but doesn't solve the nullability or rename-coupling problems.
- **Generate types from CVA at build time**: Eliminates sync drift but adds build complexity that isn't justified at the current library size.
- **No HTML extension (pure props-only interfaces)**: Maximum control but unacceptable consumer ergonomics for wrapper components.

## Related

- [ADR 0009 — Component composition paradigms](0009-component-composition-paradigms.md)
- [ADR 0003 — Tailwind CSS tokens](0003-tailwind-css-tokens.md)
- `src/shared/lib/hooks/useResponsive.ts` — runtime `ResponsiveValue<T>` resolver
- `src/shared/ui/DragItem/dragitem.types.ts` — canonical HTML extension example
- `src/shared/ui/Tooltip/tooltip.types.ts` — canonical CVA encapsulation example
