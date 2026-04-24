import React from "react";
import { cn } from "@shared/lib/cn";
import { navbarVariants, navbarStartVariants, navbarEndVariants } from "./navbar.variants";
import type { NavbarProps } from "./navbar.types";

/**
 * Navbar — Accessible navigation layout primitive
 *
 * Layout primitive for top navigation. Provides slots for title, menu, menuIcon, and end actions.
 * Consumer controls responsive behavior (e.g., showing/hiding menuIcon based on breakpoint).
 * Supports sticky and fixed positioning modes with configurable size.
 *
 * Accessibility Requirements:
 * - Always render within a page with a <main> landmark
 * - If menuIcon is rendered, provide aria-label:
 *   <button aria-label="Toggle navigation menu">☰</button>
 * - For responsive menus, track state with aria-expanded:
 *   <button aria-expanded={isOpen}>Menu</button>
 * - If multiple <nav> elements on page, use aria-label:
 *   <Navbar aria-label="Main site navigation" ... />
 * - Use aria-current="page" on active links in menu
 *
 * @example
 * // Accessible responsive navbar
 * const [isOpen, setIsOpen] = useState(false);
 * <Navbar
 *   aria-label="Main site navigation"
 *   title={<Logo />}
 *   menuIcon={
 *     <button
 *       aria-label="Toggle navigation menu"
 *       aria-expanded={isOpen}
 *       onClick={() => setIsOpen(!isOpen)}
 *     >
 *       ☰
 *     </button>
 *   }
 *   menu={isOpen ? <NavLinks /> : null}
 *   menuEnd={<Profile />}
 *   position="sticky"
 *   size="md"
 * />
 */
export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      title,
      menu,
      menuIcon,
      menuEnd,
      position = "static",
      size = "md",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <nav ref={ref} className={cn(navbarVariants({ position, size }), className)} {...props}>
        {/* Start slot: menuIcon + title + menu */}
        <div className={navbarStartVariants()}>
          {menuIcon}
          {title && <div className="shrink-0">{title}</div>}
          {menu && <div className="flex-1">{menu}</div>}
        </div>

        {/* End slot: actions, profile, etc. */}
        {menuEnd && <div className={navbarEndVariants()}>{menuEnd}</div>}

        {children}
      </nav>
    );
  },
);

Navbar.displayName = "Navbar";
