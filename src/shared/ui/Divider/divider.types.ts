import type React from "react";
import type { ResponsiveValue } from "@/shared/lib";

export interface DividerProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "role" | "style" | "color"
> {
  /** Direction of the divider line. Supports responsive values. @default "horizontal" */
  direction?: ResponsiveValue<"horizontal" | "vertical">;

  /** Whether the divider is decorative (visual only) or semantic (carries meaning).
   * Use `decorative={true}` for purely visual separators (will set `role="presentation"`).
   * Use `decorative={false}` for semantic dividers between sections. @default true */
  decorative?: boolean;

  /** Visual appearance: "solid" for single line, "dashed" for dashed, "dotted" for dots. Supports responsive values. @default "solid" */
  appearance?: ResponsiveValue<"solid" | "dashed" | "dotted">;

  /** Relative thickness/width of the divider. Supports responsive values. @default "sm" */
  size?: ResponsiveValue<"xs" | "sm" | "md" | "lg">;

  /** Spacing/margin around the divider. Supports responsive values. @default "md" */
  spacing?: ResponsiveValue<"none" | "xs" | "sm" | "md" | "lg" | "xl">;

  /** Color of the divider line. Supports responsive values. @default "base" (use design token: base, muted) */
  color?: ResponsiveValue<"base" | "muted">;

  /** Whether the divider is full-width (for horizontal) or full-height (for vertical). Supports responsive values. @default true */
  fullSize?: ResponsiveValue<boolean>;
}
