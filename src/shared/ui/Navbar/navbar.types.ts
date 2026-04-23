import type { VariantProps } from "class-variance-authority";
import type { navbarVariants } from "./navbar.variants";

export interface NavbarProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title">,
    VariantProps<typeof navbarVariants> {
  /** Left-side content, typically branding or logo. Appears left of menu. */
  title?: React.ReactNode;
  /** Start slot for navigation links. Consumer controls visibility (e.g., via media query). */
  menu?: React.ReactNode;
  /** Menu toggle icon. Consumer controls when to render (mobile breakpoint, ResizeObserver, etc.). */
  menuIcon?: React.ReactNode;
  /** End slot for actions like profile menu, search, CTAs. Always visible. */
  menuEnd?: React.ReactNode;
}
