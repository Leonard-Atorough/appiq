/**
 * Semantic Color Tokens
 * These are what components use. Consumers override these to customize the theme.
 */

// Backgrounds & Surfaces
type SemanticColorTokens =
  | "bg"
  | "surface"
  | "surface-hover"
  | "surface-active"
  | "muted-bg"
  | "secondary-bg"
  // Primary & Secondary
  | "foreground"
  | "primary"
  | "primary-hover"
  | "primary-active"
  | "primary-light"
  | "primary-foreground"
  | "secondary"
  | "secondary-hover"
  | "secondary-active"
  | "secondary-light"
  | "secondary-foreground"
  // Text
  | "text"
  | "text-secondary"
  | "text-light"
  | "text-dark"
  | "primary-text"
  // Borders
  | "border"
  | "border-muted"
  // Feedback (semantic)
  | "success"
  | "success-light"
  | "success-foreground"
  | "warning"
  | "warning-light"
  | "warning-foreground"
  | "error"
  | "error-light"
  | "error-foreground"
  | "info"
  | "info-light"
  | "info-foreground"
  // Skeleton & Loading
  | "skeleton";

/** Spacing scale: xs (4px) to 5xl (64px) */
type SpacingTokens = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";

/** Border radius: from sharp (0px) to full (9999px) */
type RadiusTokens = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";

/** Shadow depth levels */
type ShadowTokens = "sm" | "md" | "lg" | "xl" | "2xl";

/** Font size scale */
type FontSizeTokens = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

/** Font weight levels */
type FontWeightTokens = "normal" | "medium" | "semibold" | "bold";

/** Line height for text */
type LineHeightTokens = "tight" | "snug" | "normal" | "relaxed" | "loose";

/** Letter spacing (tracking) */
type LetterSpacingTokens = "tight" | "normal" | "wide";

/** Font family names (map to CSS custom props that hold the actual stack) */
type FontFamilyTokens = "sans" | "heading" | "mono";

/** Motion/animation durations */
type DurationTokens = "fast" | "normal" | "slow";

/** Animation easing functions */
type EasingTokens = "in" | "out" | "spring";

/** Stacking context (z-index) for overlays */
type ZIndexTokens = "dropdown" | "modal" | "toast" | "tooltip";

/** Container query breakpoints */
type ContainerTokens = "sm" | "md" | "lg" | "xl" | "max";

/** Opacity for disabled/muted states */
type OpacityTokens = "disabled" | "muted";

/**
 * Complete theme configuration.
 * All properties are optional — only override what you need.
 * Defaults will be provided by the library.
 */
export interface ThemeConfig {
  colors?: Partial<Record<SemanticColorTokens, string>>;
  spacing?: Partial<Record<SpacingTokens, string>>;
  radius?: Partial<Record<RadiusTokens, string>>;
  shadows?: Partial<Record<ShadowTokens, string>>;
  fontSize?: Partial<Record<FontSizeTokens, string>>;
  fontWeight?: Partial<Record<FontWeightTokens, number | string>>;
  lineHeight?: Partial<Record<LineHeightTokens, number | string>>;
  letterSpacing?: Partial<Record<LetterSpacingTokens, string>>;
  fontFamily?: Partial<Record<FontFamilyTokens, string>>;
  duration?: Partial<Record<DurationTokens, string>>;
  easing?: Partial<Record<EasingTokens, string>>;
  zIndex?: Partial<Record<ZIndexTokens, number>>;
  container?: Partial<Record<ContainerTokens, string>>;
  opacity?: Partial<Record<OpacityTokens, number | string>>;
}

/**
 * Inject a theme configuration into CSS custom properties.
 * Call this once at app root to apply theme overrides globally.
 *
 * @example
 * const myTheme: ThemeConfig = {
 *   colors: {
 *     primary: "#0066cc",
 *     "primary-hover": "#0052a3",
 *   },
 *   spacing: {
 *     md: "1.25rem",
 *   },
 * };
 * createTheme(myTheme);
 */
export function createTheme(config: ThemeConfig): void {
  const root = document.documentElement;

  // Map config property names to their CSS variable prefixes
  const prefixMap: Record<string, string> = {
    colors: "color",
    spacing: "spacing",
    radius: "radius",
    shadows: "shadow",
    fontSize: "font-size",
    fontWeight: "font-weight",
    lineHeight: "line-height",
    letterSpacing: "tracking",
    fontFamily: "font",
    duration: "duration",
    easing: "ease",
    zIndex: "z",
    container: "container",
    opacity: "opacity",
  };

  Object.entries(config).forEach(([category, values]) => {
    if (values) {
      const prefix = prefixMap[category] || kebabCase(category);
      Object.entries(values).forEach(([key, value]) => {
        root.style.setProperty(`--${prefix}-${key}`, String(value));
      });
    }
  });
}

/** Convert camelCase/PascalCase to kebab-case for dynamic prefixes */
function kebabCase(str: string): string {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase();
}
