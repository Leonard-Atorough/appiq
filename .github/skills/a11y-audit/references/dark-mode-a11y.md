# A11y Dark mode reference

## Overview

Dark mode can impact accessibility if not implemented with care. This reference covers best practices for ensuring your dark mode designs remain accessible to all users.

## Key Principles

1. **Maintain Sufficient Contrast**: Ensure text and important elements have a contrast ratio of at least 4.5:1 against the background in both light and dark modes.
2. **Use Semantic Tokens**: Define colors using semantic tokens (e.g., `--color-text`, `--color-background`) that automatically adjust for dark mode.
3. **Test in Both Modes**: Always test your designs in both light and dark modes to catch any issues with readability or contrast.

## Common Issues & Fixes

| Issue                     | Pattern                                              | Fix                                                       |
| ------------------------- | ---------------------------------------------------- | --------------------------------------------------------- |
| Low contrast in dark mode | Text color too light on dark background              | Adjust token values to ensure 4.5:1 ratio                 |
| Hard-coded colors         | Using fixed hex values that don't adapt to dark mode | Use CSS variables                                         |
| Missing dark mode styles  | Only defining colors for light mode                  | Define overrides in `@media (prefers-color-scheme: dark)` |
| Inconsistent UI           | Some components look good in dark mode, others don't | Use shared tokens for all components                      |

## Implementation Tips

- Define your color tokens in CSS with light and dark mode values:

```css
:root {
  --color-text: hsl(0 0% 20%);
  --color-background: hsl(0 0% 100%);
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-text: hsl(0 0% 95%);
    --color-background: hsl(0 0% 12%);
  }
}
```

- When adjusting colors for dark mode, consider increasing the lightness slightly to maintain visibility against the darker background.
- Use tools like the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) to verify your color choices meet accessibility standards.

## Conclusion

By following these guidelines, you can ensure that your dark mode designs are not only visually appealing but also accessible to all users, regardless of their visual preferences or needs.

## References

- [Accessible Patterns](./references/accessible-patterns.md) — Code examples
- [WCAG 2.1 Quick Ref](./references/wcag-quick-ref.md) — Fast lookup
