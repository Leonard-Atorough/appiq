# Typograpy token reference

All Semantic Typography Tokens with values and usage examples used in AppIQ.

## Typography Scale

Font sizes:
| Token | Value | Usage |
| ------------------ | ----------------- | ----------------------------------- |
| `--font-size-xs` | `0.75rem (12px)` | Captions, fine print, metadata |
| `--font-size-sm` | `0.875rem (14px)` | Secondary text, labels, hints |
| `--font-size-base` | `1rem (16px)` | Body text, paragraphs, default size |
| `--font-size-lg` | `1.125rem (18px)` | Subheadings, emphasized text |
| `--font-size-xl` | `1.25rem (20px)` | Headings, important text |
| `--font-size-2xl` | `1.5rem (24px)` | Large headings, titles |
| `--font-size-3xl` | `2rem (32px)` | Page titles, hero text |

Font weights:
| Token | Value | Usage |
| ------------------------ | ----- | ------------------------------ |
| `--font-weight-normal` | `400` | Regular text |
| `--font-weight-semibold` | `600` | Subheadings, emphasized text |
| `--font-weight-bold` | `700` | Headings, important text |
| `--font-weight-black` | `900` | Display text, hero sections |

Line heights:
| Token | Value | Usage |
| ------------------------ | ------ | ------------------------------ |
| `--line-height-tight` | `1.25` | Headings, compact text |
| `--line-height-normal` | `1.5` | Body text, paragraphs |
| `--line-height-relaxed` | `1.75` | Large text, looser spacing for readability |

## Usage Examples

### Colors

```tsx
// ❌ Magic numbers
<div style={{ fontSize: '18px', fontWeight: '600', lineHeight: '1.5' }}>Heading</div>
// ✅ Design tokens
<div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', lineHeight: 'var(--line-height-normal)' }}>Heading</div>
```

### Tailwind

```tsx
// ❌ Magic numbers
<div className="text-lg font-semibold leading-6">Heading</div>
// ✅ Design tokens
<div className="text-(--font-size-lg) font-semibold leading-(--line-height-normal)">Heading</div>
```

### CSS Classes (if pre-defined)

```tsx
// ❌ Magic numbers
<div className="text-lg font-semibold leading-6">Heading</div>
// ✅ Design tokens
<div className="text-(--font-size-lg) font-semibold leading-(--line-height-normal)">Heading</div>
```

## Dark Mode Adjustments

Typography tokens typically do not need to change for dark mode, as they are based on relative units (rem) and numeric values. However, if you have specific typography adjustments for dark mode (like larger font sizes for readability), you can define additional tokens or adjust existing ones in the `@media (prefers-color-scheme: dark)` block in `tokens.css`.

## Accessibility Notes

- Use relative units (rem) for font sizes to respect user preferences and accessibility settings.
- Ensure sufficient line height for readability, especially for body text. Use `--line-height-normal` or `--line-height-relaxed` for paragraphs.
- Use font weights to create a clear visual hierarchy, but avoid using too many different weights which can create visual clutter.
- Test typography in both light and dark modes to ensure it remains legible and visually balanced.

## References

- [Color Tokens](./color-tokens.md) — All colors with swatches
- [Spacing Tokens](./spacing-tokens.md) — Standardized spacing values
- [Dark Mode Guide](./dark-mode-guide.md) — How system dark mode works
