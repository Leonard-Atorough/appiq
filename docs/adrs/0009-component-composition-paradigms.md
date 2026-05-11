---
title: Component composition paradigms — Slot-based, Mixed, Children-only, and Floating Anchor
date: 2026-05-11
status: accepted
---

# 0009 - Component composition paradigms

## Context

As the shared UI library grew, components adopted different strategies for accepting content from consumers. Some components own a fixed internal layout and expose named "slots" (e.g. `label`, `startAdornment`). Others are transparent wrappers that pass `children` straight through. A third group orchestrates a structural shell while letting consumers fill the body via `children`.

Without a deliberate naming convention, the three approaches were informally mixed — some components had both `label` props and a `children` prop doing similar jobs, and it was unclear which pattern to follow when building a new component.

A fourth pattern emerged from analysis of `Tooltip` and `Popover`: components that manage behavioral state between an externally-provided trigger element and a floating panel, owning neither the trigger's DOM structure nor the panel's visual layout.

## Decision

Classify every shared UI component into exactly one of four paradigms and apply its rules consistently.

---

### Paradigm 1 — Slot-based

The component owns a fixed, opinionated layout. Content areas are exposed as named props ("slots"). `children` is either absent or omitted from the HTML extension.

**When to use:** The component always renders the same structural skeleton and consumers only vary the content of specific regions.

**Rules:**

- Name slots descriptively: `label`, `startAdornment`, `deleteIcon`, `actions`, `icon`, `description`
- `children` is omitted from the interface (or typed as `never`)
- The component is the single source of layout truth; consumers cannot re-order slots

**Examples:**

| Component    | Slots                                                         |
| ------------ | ------------------------------------------------------------- |
| `Tag`        | `label` (required), `startAdornment`, `deleteIcon`, `actions` |
| `EmptyState` | `title`, `description`, `icon`, `action`                      |
| `Toast`      | `title`, `description`, `icon` (auto from `variant`)          |
| `Tooltip`    | `label` (the tooltip body), `children` (the trigger element)  |

```tsx
<Tag
  label="In Review"
  color="warning"
  startAdornment={<Icon name="clock" />}
  onDismiss={() => removeTag(id)}
/>
```

---

### Paradigm 2 — Mixed (shell + children)

The component owns a structural outer shell and exposes named props for the surrounding chrome, but the primary content area is filled with `children`.

**When to use:** The component provides consistent framing (label, error messages, a card border) but the core payload changes per use site.

**Rules:**

- Named props describe the frame: `label`, `error`, `helperText`, `header`, `footer`
- `children` fills the main content region
- The component is responsible for wiring up accessibility linkage between frame and content (e.g. `htmlFor`, `aria-describedby`)

**Examples:**

| Component    | Shell props                                           | Content                                       |
| ------------ | ----------------------------------------------------- | --------------------------------------------- |
| `Field`      | `label`, `error`, `helperText`, `success`, `required` | `children` (any form control)                 |
| `Card`       | `header`, `footer`, `actions`                         | `children`                                    |
| `DropTarget` | `droppableId`, `accept`, `onDrop`, `disabled`         | `children` render prop `(state) => ReactNode` |

```tsx
<Field id="email" label="Email address" error={errors.email} required>
  <Input id="email" {...register("email")} />
</Field>
```

---

### Paradigm 3 — Children-only (transparent wrapper)

The component is a styled or behavioural pass-through. `children` is the entire content. The component adds CSS, accessibility roles, or event wiring but does not own any content structure.

**When to use:** The component's purpose is purely styling, layout, or behaviour injection — not content orchestration.

**Rules:**

- `children: React.ReactNode` (or `children?: React.ReactNode` for optional-content containers)
- Extend the appropriate HTML element attributes and spread `...rest`
- No named content slots

**Examples:**

| Component            | Purpose                                       |
| -------------------- | --------------------------------------------- |
| `Button`             | Styled `<button>` with variant classes        |
| `DragItem`           | Adds drag behaviour to any content            |
| `Flex`               | Responsive flexbox layout wrapper             |
| `Label`              | Styled `<label>` with required indicator      |
| `Badge` _(reserved)_ | Positional numeric overlay on a child element |

```tsx
<DragItem id={app.id} type="application-card">
  <ApplicationCard application={app} />
</DragItem>
```

---

### Paradigm 4 — Floating Anchor

The component owns behavioral state (open/close, positioning, keyboard/focus handling) and wires bidirectional accessibility attributes between a trigger element and a floating panel. It does not own the trigger's DOM structure — the trigger is provided externally.

**When to use:** The component's primary job is anchoring a floating panel to an external trigger, and it must inject ARIA attributes onto that trigger to maintain accessibility correctness.

**Rules:**

- The trigger is always an externally-provided `React.ReactElement` or a render prop — never a plain `ReactNode` that the component wraps in its own button
- The component injects a11y attributes onto the trigger via `React.cloneElement` or render prop arguments (`aria-describedby`, `aria-expanded`, `aria-controls`)
- Named props describe the panel content: `label` (Tooltip), `children` (Popover)
- The behavioral shell is invisible — no structural chrome, just state, positioning logic, and event handlers
- Escape, outside-click, and focus-leave handling is owned entirely by the component
- Targeted className escape hatches (`triggerClassName`, `wrapperClassName`, `contentClassName`) are provided instead of a full HTML spread

**Trigger slot shapes — two valid approaches:**

| Approach                                               | When to use                                                                | Example                                                                     |
| ------------------------------------------------------ | -------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `children: React.ReactElement`                         | Trigger is passively observed; a11y props injected via `cloneElement`      | `Tooltip` — trigger is read-only, no state injection needed by the consumer |
| `trigger: (props: TriggerProps) => React.ReactElement` | Trigger must actively spread interaction props (onClick, onFocus, aria-\*) | `Popover` — consumer's element must receive and spread handler props        |

**Examples:**

| Component | Trigger slot                       | Panel content         | Wiring mechanism                                                  |
| --------- | ---------------------------------- | --------------------- | ----------------------------------------------------------------- |
| `Tooltip` | `children: React.ReactElement`     | `label: ReactNode`    | `cloneElement` injects `aria-describedby`                         |
| `Popover` | `trigger: (props) => ReactElement` | `children: ReactNode` | Render prop args carry `aria-expanded`, `aria-controls`, handlers |

```tsx
// Tooltip — trigger via children
<Tooltip label="Save changes">
  <Button>Save</Button>
</Tooltip>

// Popover — trigger via render prop
<Popover
  trigger={(props) => <Button {...props}>Filters</Button>}
  side="bottom"
>
  <FilterForm onSubmit={applyFilters} />
</Popover>
```

**Why Dropdown is NOT Floating Anchor:**
Dropdown owns its trigger `<button>` element — `trigger` is content placed _inside_ that button, not an external anchor element. It is classified as **Slot-based** (Paradigm 1).

---

## Rationale

- **Explicitness over flexibility**: Slot-based components prevent consumers from accidentally breaking a component's accessibility or visual structure by inserting content in the wrong place.
- **Separation of concerns**: Mixed components keep frame logic (label, error wiring, spacing) out of the business component and out of the consumer.
- **Predictability**: Knowing a component's paradigm immediately tells you how to use it — whether to pass `label=` or write content inside JSX tags.
- **Accessibility correctness**: Slot-based and Mixed components are the right place to own `aria-labelledby`, `aria-describedby`, and `htmlFor` linkage, because they control the full DOM structure.
- **Floating Anchor centralises interaction complexity**: open state, portal positioning, keyboard handling, and bidirectional ARIA wiring live in one place. Consumers provide only the trigger element and panel content.

## Consequences

**Positive:**

- Consistent authoring experience across the library — engineers immediately know the shape of any new component.
- Accessibility wiring is centralised inside the component, not repeated at every call site.
- Slot-based components are easy to story-book and snapshot-test because every region is independently injectable.

**Negative:**

- Slot-based components require an upfront decision about which regions exist. Adding a new slot is a breaking change if not nullable.
- Mixed components can grow complex if the number of frame props increases — consider splitting into a Slot-based component at that point.
- Floating Anchor components that use `React.cloneElement` require the trigger to be a single `React.ReactElement` (not a string or fragment). This constraint must be documented clearly. The render-prop form avoids this but requires consumers to remember to spread the injected props.

## Alternatives

- **Single `children`-only approach**: Maximum flexibility but loses accessibility wiring guarantees and creates inconsistent APIs.
- **React compound component pattern** (`<Tabs.List>`, `<Tabs.Item>`): Compositionally powerful but adds indirection and is harder to document and constrain.
- **Headless UI / Radix primitives**: The Floating Anchor pattern is inspired by these libraries. A future migration to Radix Floating UI for positioning would not change the paradigm classification.

## Related

- [ADR 0008 — Standardise feature ui/ folder conventions](0008-feature-ui-folder-conventions.md)
- [ADR 0010 — HTML attributes extension and CVA encapsulation](0010-html-extension-and-cva-encapsulation.md)
- `src/shared/ui/Tag/tag.types.ts` — canonical Slot-based example
- `src/shared/ui/Field/field.types.ts` — canonical Mixed example
- `src/shared/ui/DragItem/dragitem.types.ts` — canonical Children-only example
- `src/shared/ui/Tooltip/Tooltip.tsx` — canonical Floating Anchor (`cloneElement` form)
- `src/shared/ui/Popover/Popover.tsx` — canonical Floating Anchor (render-prop form)
