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
 * Icon size variants using design token scale
 */
export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
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
