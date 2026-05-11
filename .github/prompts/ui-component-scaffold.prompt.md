---
description: This prompt helps scaffold a new UI component in the repository following existing conventions.
argument-hint: Provide a short spec for the component including name, props, variants, accessibility requirements, and whether to include tests/stories.
---

# Goal

Help the developer scaffold a new UI component in this repository following existing conventions (example: `src/shared/ui/Button`).

## Usage

Provide a short spec when calling the prompt. At minimum include:

- Component name (PascalCase)
- Props (name: type, optional default)
- Variants (optional: e.g., "primary", "ghost")
- Accessibility requirements (e.g., role, aria props)
- Whether tests, stories, and CSS tokens should be included

When given the spec, produce:

1. A recommended file tree with filenames.
2. Full file contents for each file listed (TSX/TS/test files). Keep to the repo's TypeScript + React + testing-library patterns.
3. A short usage example showing how to import and render the component.
4. A brief note on accessibility and test coverage suggestions.

## Constraints / Conventions

### Paradigm Selection

Before scaffolding, determine which composition paradigm applies:

1. **Does the component own a fixed, opinionated layout?** → Slot-based (Paradigm 1)
   - Examples: Tag, Button, EmptyState, Dropdown
   - Use named slots: `label`, `startAdornment`, `icon`, `actions`
   - No `children`

2. **Does the component provide a structural shell (frame props) around free content?** → Mixed (Paradigm 2)
   - Examples: Field (label + error around a form control), Card (header/footer around content)
   - Wire accessibility linkage (e.g., `htmlFor`, `aria-describedby`)
   - `children` fills the main payload

3. **Is the component purely a styled or behavioural pass-through?** → Children-only (Paradigm 3)
   - Examples: Button, DragItem, Flex, Label
   - Extend HTML element attributes, omit only what you control
   - Spread `...rest` for consumer ergonomics (data-*, aria-*, style, etc.)

4. **Does the component anchor a floating panel to an external trigger, injecting ARIA?** → Floating Anchor (Paradigm 4)
   - Examples: Tooltip, Popover
   - Trigger is `React.ReactElement` (via cloneElement) or a render prop
   - Owns open state, positioning, keyboard/focus handling

See [ADR 0009](../../docs/adrs/0009-component-composition-paradigms.md) for decision trees and detailed rules.

### Interface Extension & CVA

**Never expose `VariantProps<T>` in a public interface.** CVA is an implementation detail.

**For Paradigm 3 (styled HTML wrapper):**
```ts
interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  variant?: ResponsiveValue<"primary" | "secondary" | "ghost">;
  size?: ResponsiveValue<"sm" | "md" | "lg">;
}
```
- Omit only props the component controls or redefines
- Spread `...rest` onto the root element

**For Paradigms 1, 2, 4 (composition/orchestration):**
```ts
interface TagProps {
  label: React.ReactNode;
  color?: ResponsiveValue<"default" | "success" | "error" | "warning" | "info">;
  className?: string;  // Escape hatch
}
```
- No HTML extension (component owns structure)
- Use explicit string unions or `ResponsiveValue<T>`, never `VariantProps<...>`

See [ADR 0010](../../docs/adrs/0010-html-extension-and-cva-encapsulation.md) for extended rules.

### Standard Constraints

- Use TypeScript and named exports where the repo expects them.
- Keep code consistent with the `src/shared/ui/Button` folder structure: component file, types, variants, index, test file, and any variant helpers.
- Tests should use `@testing-library/react` style assertions and be concise. vitest snapshots will be used for snapshot testing.
- Ask clarifying questions if required information is missing (e.g., prop types or variants).
- Do not modify unrelated files.

## Example Input

Component name: `IconButton`
Props:

- `icon: React.ReactNode`
- `ariaLabel: string` (required)
- `size?: 'sm' | 'md' | 'lg'` (default: 'md')
  Variants: `primary`, `ghost`
  Include tests: yes

## Example Output (summary)

- File tree: `IconButton/` with `IconButton.tsx`, `iconButton.types.ts`, `iconButton.variants.ts`, `index.ts`, `IconButton.test.tsx`, and `IconButton.stories.tsx`
- Full contents for each file (TSX/TS/test)
- Usage example
- Accessibility notes

If the user requests a generator script, propose a simple Node script that writes the files from a template.
