import type { ResponsiveValue } from "@/shared/lib";

export interface BadgeProps {
  /** The content to wrap with the badge. */
  children: React.ReactNode;
  /** The content to display inside the badge. Can be a number or string. */
  value: string | number;
  /** If `value` is a number and exceeds this threshold, it will display as `{max}+`. */
  max?: number;
  /** The color theme of the badge. Defaults to "default". */
  color?: "default" | "secondary" | "success" | "error" | "warning" | "info";
  /** The size of the badge. */
  size?: ResponsiveValue<"sm" | "md" | "lg">;
  /** The variant of the badge. */
  variant?: ResponsiveValue<"dot" | "standard">;
  /** The shape of the badge. */
  shape?: ResponsiveValue<"circle" | "square">;
  /** Whether the badge is visible. */
  isVisible?: boolean;
  /** Additional class names for styling the badge. */
  className?: string;
}
