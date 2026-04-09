# Spacing tokens reference

All Semantic Spacing Tokens with values and usage examples used in AppIQ.

## Spacing Scale

We will use a consistent spacing scale based on a 4px grid, with semantic tokens for common sizes:

| Token           | Value  | Usage                                                 |
| --------------- | ------ | ----------------------------------------------------- |
| `--spacing-xs`  | `4px`  | Extra small gaps, tight spacing                       |
| `--spacing-sm`  | `8px`  | Small gaps, between closely related items             |
| `--spacing-md`  | `16px` | Default spacing for most layouts                      |
| `--spacing-lg`  | `24px` | Larger gaps, between distinct sections                |
| `--spacing-xl`  | `32px` | Extra large gaps, for major separation                |
| `--spacing-2xl` | `48px` | For very large separation, like between page sections |

## Usage Examples

### ❌ DON'T: Use Magic Numbers

```tsx
// Bad
<div style={{ padding: '12px', margin: '8px' }}>Content</div>
// Good
<div style={{ padding: 'var(--spacing-md)', margin: 'var(--spacing-sm)' }}>Content</div>
```

### ✅ DO: Use Tokens in Tailwind

```tsx
// Bad
<div className="p-4 m-2">Content</div>
// Good — use Tailwind extended class names from tailwind.config.js
<div className="p-md m-sm">Content</div>
```

## Adding New Spacing Tokens

When adding new spacing tokens:

1. Define the token in `:root` with a clear name and value.
2. Document the token in this reference with its intended use case.
3. Update Tailwind config if you want to use it in utilities.
4. Use the token in components instead of hard-coded values.

## Accessibility Notes

- Consistent spacing helps users with cognitive disabilities understand relationships between elements.
- Avoid using too small spacing that can make it hard to interact with elements, especially on touch devices. Use `--spacing-sm` or larger for interactive elements.
- Ensure sufficient spacing around text for readability, especially for users with dyslexia or low vision. Use `--spacing-md` or larger for text blocks.
- Test spacing in both light and dark modes to ensure it doesn't cause layout issues or overlap with other elements.

## References

- [Color Tokens](./color-tokens.md) — All colors with swatches
- [Typography](./typography-tokens.md) — Font sizes and weights
- [Dark Mode Guide](./dark-mode-guide.md) — How system dark mode works
