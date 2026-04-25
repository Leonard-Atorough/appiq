import React, { useContext } from "react";
import { cn } from "@shared/lib/cn";
import { RouteContext } from "@app/providers/RouteProvider";
import { navMenuLinkVariants } from "./navMenu.variants";
import type { NavMenuProps } from "./navMenu.types";

/**
 * NavMenu — Horizontal navigation link list for use inside Navbar.
 *
 * Integrates with the app's RouteContext to highlight the active route via
 * `aria-current="page"`. Pass `onNavigate` to swap in a third-party router
 * (react-router-dom, TanStack Router) without changing this component.
 *
 * @example
 * <Navbar
 *   title={<Logo />}
 *   menu={
 *     <NavMenu
 *       items={[
 *         { href: "/", label: "Dashboard" },
 *         { href: "/applications", label: "Applications" },
 *       ]}
 *     />
 *   }
 *   menuPosition="center"
 * />
 */
export function NavMenu({ items, onNavigate, className, ...props }: NavMenuProps) {
  const { currentRoute, navigate } = useContext(RouteContext);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(href);
    } else {
      navigate(href);
    }
  };

  return (
    <nav aria-label="Main menu" className={cn("flex items-center gap-md", className)} {...props}>
      <ul role="list" className="flex items-center gap-md list-none p-0 m-0">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              aria-current={currentRoute === item.href ? "page" : undefined}
              onClick={(e) => handleClick(e, item.href)}
              className={navMenuLinkVariants({ active: currentRoute === item.href })}
            >
              {item.icon}
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
