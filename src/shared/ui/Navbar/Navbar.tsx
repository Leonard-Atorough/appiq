import React from "react";
import { cn } from "@shared/lib/cn";
import { navbarVariants, navbarMenuVariants } from "./navbar.variants";
import type { NavbarProps } from "./navbar.types";

/**
 * Navbar — Page header layout primitive
 *
 * Renders a `<header>` landmark. Provides slots for a toggle icon, title/branding,
 * a flexible menu area, and end actions. Works as a primary nav container (pair
 * the `menu` slot with `<NavMenu>`) or as a plain page header without navigation.
 *
 * The `<nav>` landmark lives inside `<NavMenu>`, so WCAG landmark requirements
 * are satisfied without wrapping the entire header in a `<nav>`.
 *
 * Accessibility Requirements:
 * - Pair with a `<main>` landmark on every page
 * - If menuIcon is rendered, it must be a `<button>` with
 *   `aria-label="Toggle navigation menu"` and `aria-expanded={boolean}`
 * - If multiple `<header>` elements exist on a page, disambiguate with `aria-label`:
 *   `<Navbar aria-label="Site header" />`
 *
 * @example
 * // Full nav header
 * <Navbar
 *   title={<Logo />}
 *   menu={<NavMenu items={navItems} />}
 *   menuPosition="center"
 *   menuEnd={<ProfileMenu />}
 *   position="sticky"
 * />
 *
 * @example
 * // Plain page header (no nav)
 * <Navbar title={<h1>Dashboard</h1>} menuEnd={<ThemeToggle />} />
 */
export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      title,
      menu,
      menuIcon,
      menuPosition = "left",
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
      <header ref={ref} className={cn(navbarVariants({ position, size }), className)} {...props}>
        {/* Slot 1: toggle icon (shrink-to-fit) */}
        {menuIcon && <div className="shrink-0 flex items-center">{menuIcon}</div>}
        {/* Slot 2: branding / title (shrink-to-fit) */}
        {title && <div className="shrink-0 flex items-center">{title}</div>}
        {/* Slot 3: navigation menu (flex-1 — takes all remaining space, alignment via menuPosition) */}
        {menu && <div className={navbarMenuVariants({ menuPosition })}>{menu}</div>}
        {!menu && <div className="flex-1" />}{" "}
        {/* Empty flex item to push menuEnd to the right if no menu */}
        {/* Slot 4: end actions — profile, search, CTAs (shrink-to-fit) */}
        {menuEnd && <div className="shrink-0 flex items-center gap-md">{menuEnd}</div>}
        {children}
      </header>
    );
  },
);

Navbar.displayName = "Navbar";
