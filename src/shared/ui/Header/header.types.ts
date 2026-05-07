import type { ResponsiveValue } from "@/shared/lib";

export interface HeaderProps extends Omit<
  React.HTMLAttributes<HTMLHeadingElement>,
  "children" | "color"
> {
  /** Semantic heading level (h1-h6). Determines the rendered element. */
  level: 1 | 2 | 3 | 4 | 5 | 6;
  /** Visual heading size. Responsive across breakpoints. Defaults to matching the semantic `level`. */
  size?: ResponsiveValue<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">;
  /** Font weight. Defaults to "semibold". */
  weight?: ResponsiveValue<"semibold" | "bold">;
  /** Text color. Defaults to "default". */
  color?: ResponsiveValue<"default" | "secondary">;
  /** Content to render. */
  children: React.ReactNode;
  /** Extra classes applied to the element. Overrides variant classes. */
  className?: string;
}
