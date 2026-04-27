/**
 * Available icon names in the AppIQ icon system
 * Organized by category: navigation, status, ui
 */
export type IconName =
  // Navigation menu icons
  | "kebab"
  | "meatball"
  | "bento"
  | "doner"
  | "hamburger"
  | "chevron-left"
  | "chevron-right"
  | "chevron-down"
  | "chevron-up"
  // Status indicator icons
  | "check-circle"
  | "x-circle"
  | "alert-triangle"
  | "info"
  // UI utility icons
  | "bell"
  | "check"
  | "minus"
  | "x"
  | "briefcase"
  // Action icons
  | "plus"
  | "download"
  | "delete"
  | "edit"
  | string; // Allow string for custom icons not in the registry

/**
 * Icon semantic color variants aligned with design tokens
 */
export type IconVariant =
  | "default"
  | "muted"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "info";

/**
 * Explicit light/dark text color override, independent of semantic variant.
 * Use when the icon sits on a colored or inverted surface.
 * - `"default"` — inherits no forced color (semantic variant applies)
 * - `"light"` — forces `--color-text-light` (gray-500)
 * - `"dark"` — forces `--color-text` (gray-800 in light mode)
 */
export type IconColor = "default" | "light" | "dark";

/**
 * Icon size variants using design token scale
 */
export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The icon name or component to render
   */
  name: IconName;

  /**
   * Size variant using design token scale
   * @default "md"
   */
  size?: IconSize;

  /**
   * Color variant aligned with design tokens
   * @default "default"
   */
  variant?: IconVariant;

  /**
   * Explicit light/dark text color override.
   * Overrides the `variant` color when set to `"light"` or `"dark"`.
   * @default "default"
   */
  color?: IconColor;

  /**
   * Optional CSS class for additional styling
   */
  className?: string;

  /**
   * Accessibility label for screen readers
   * Leave empty or set aria-hidden=true for decorative icons
   */
  "aria-label"?: string;

  /**
   * Hide from screen readers for decorative icons
   */
  "aria-hidden"?: boolean;
}
