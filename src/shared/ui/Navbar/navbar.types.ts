import type { ResponsiveValue } from "@/shared/lib";

export interface NavbarProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Menu toggle icon for mobile/collapsed states.
   *  Must be a button with aria-label="Toggle navigation menu" and aria-expanded={boolean}. */
  menuIcon?: React.ReactNode;
  /** Branding, logo, or page title. Rendered after menuIcon, shrinks to fit. */
  title?: React.ReactNode;
  /** Optional content area that takes up all remaining horizontal space.
   *  Pair with `<NavMenu>` for navigation, or pass any content for non-nav headers.
   *  Use menuPosition to control horizontal alignment of contents. */
  menu?: React.ReactNode;
  /** Controls horizontal alignment of menu contents within the available space.
   *  - left (default): contents sit at the left edge after title
   *  - center: contents are centered across the full available space
   *  - right: contents sit at the right edge before menuEnd */
  menuPosition?: ResponsiveValue<"left" | "center" | "right">;
  /** End slot for actions like profile, search, or CTAs. Shrinks to fit content. */
  menuEnd?: React.ReactNode;
  /** Navbar size. Can be static or responsive by breakpoint. */
  size?: ResponsiveValue<"sm" | "md" | "lg">;
  /** Navbar position. Defaults to "static". */
  position?: ResponsiveValue<"static" | "sticky" | "fixed">;
}
