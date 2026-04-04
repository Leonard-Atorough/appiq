# Typograpy token reference

All Semantic Typography Tokens with values and usage examples used in AppIQ.

## Typography Scale

Font sizes:
| Token | Value | Usage |
| ------------------ | --------------------- | ----------------------------------- |
| `--font-size-xs` | `0.75rem (12px)` | Captions, fine print, metadata |
| `--font-size-sm` | `0.875rem (14px)` | Secondary text, labels, hints |
| `--font-size-base` | `1rem (16px)` | Body text, paragraphs, default size |
| `--font-size-md` | `1.125rem (18px)` | Larger body text, comfortable reading |
| `--font-size-lg` | `1.25rem (20px)` | Subheadings, emphasized text |
| `--font-size-xl` | `1.5rem (24px)` | Headings, important text |
| `--font-size-2xl` | `1.875rem (30px)` | Large headings, titles |
| `--font-size-3xl` | `2.25rem (36px)` | Page titles, hero text |
| `--font-size-4xl` | `3rem (48px)` | Display text, hero sections |

Font weights:
| Token | Value | Usage |
| ------------------------ | ----- | ------------------------------ |
| `--font-weight-normal` | `400` | Regular text |
| `--font-weight-medium` | `500` | Medium emphasis text |
| `--font-weight-semibold` | `600` | Subheadings, emphasized text |
| `--font-weight-bold` | `700` | Headings, important text |

Line heights:
| Token | Value | Usage |
| ----------------------- | ------ | ------------------------------ |
| `--line-height-tight` | `1.15` | Headings, compact text |
| `--line-height-snug` | `1.275` | Subheadings, tight spacing |
| `--line-height-normal` | `1.45` | Body text, paragraphs |
| `--line-height-relaxed` | `1.625` | Large text, looser spacing for readability |
| `--line-height-loose` | `2` | UI labels with breathing room |

Letter spacing:
| Token | Value | Usage |
| -------------------- | -------- | ------------------------------ |
| `--tracking-tight` | `-0.04em` | Large display headings |
| `--tracking-normal` | `0.01em` | Body text |
| `--tracking-wide` | `0.05em` | Uppercase labels, badges |

## Usage Examples

### ❌ DON'T: Use Hardcoded Tailwind Sizes

```tsx
// Magic hardcoded sizes
<div className="text-sm font-semibold leading-6">Heading</div>
// Hard to maintain and doesn't respect design tokens
```

### ✅ DO: Use Typography Tokens in Tailwind

```tsx
// Using design tokens
<div className="text-(--font-size-md) font-(--font-weight-semibold) leading-(--line-height-normal)">
  Heading
</div>
```

### ✅ DO: Use Typography Tokens in CSS

```tsx
<div
  style={{
    fontSize: "var(--font-size-md)",
    fontWeight: "var(--font-weight-semibold)",
    lineHeight: "var(--line-height-normal)",
  }}
>
  Heading
</div>
```

### ✅ DO: Combine with Color Tokens

```tsx
// Complete semantic styling
<p className="text-(--font-size-base) font-(--font-weight-normal) leading-(--line-height-normal) text-(--color-text)">
  Body paragraph with consistent typography and colors.
</p>
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
