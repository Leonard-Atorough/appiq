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

- File tree: `IconButton/` with `IconButton.tsx`, `iconButton.types.ts`, `iconButton.variants.ts`, `index.ts`, `IconButton.test.tsx`
- Full contents for each file (TSX/TS/test)
- Usage example
- Accessibility notes

If the user requests a generator script, propose a simple Node script that writes the files from a template.
