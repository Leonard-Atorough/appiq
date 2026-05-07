import type { ResponsiveValue } from "@/shared/lib";

export interface TextProps extends Omit<React.HTMLAttributes<HTMLElement>, "children" | "color"> {
  /** Font size. Defaults to "md". */
  size?: ResponsiveValue<"xs" | "sm" | "md" | "lg">;
  /** Font weight. Defaults to "normal". */
  weight?: ResponsiveValue<"normal" | "semibold">;
  /** Text color. Defaults to "default". */
  color?: ResponsiveValue<"default" | "muted" | "secondary">;
  /** Truncate text to single line with ellipsis. */
  truncate?: ResponsiveValue<boolean>;
  /** Rendered element. Defaults to `<p>`. */
  as?: "p" | "span" | "div";
  /** Content to render. */
  children: React.ReactNode;
  /** Extra classes applied to the element. */
  className?: string;
}