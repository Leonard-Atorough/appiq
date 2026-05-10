import type React from "react";

export interface DividerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "role" | "style"> {
  /** Direction of the divider line. @default "horizontal" */
  direction?: "horizontal" | "vertical";

  /** Whether the divider is decorative (visual only) or semantic (carries meaning).
   * Use `decorative={true}` for purely visual separators (will set `role="presentation"`).
   * Use `decorative={false}` for semantic dividers between sections. @default true */
  decorative?: boolean;

  /** Visual appearance: "solid" for single line, "dashed" for dashed, "dotted" for dots. @default "solid" */
  appearance?: "solid" | "dashed" | "dotted";

  /** Relative thickness/width of the divider. @default "sm" */
  size?: "xs" | "sm" | "md" | "lg";

  /** Spacing/margin around the divider. @default "md" */
  spacing?: "none" | "xs" | "sm" | "md" | "lg" | "xl";

  /** Color of the divider line. @default "base" (use design token: base, muted) */
  color?: "base" | "muted";

  /** Whether the divider is full-width (for horizontal) or full-height (for vertical). @default true */
  fullSize?: boolean;
}
