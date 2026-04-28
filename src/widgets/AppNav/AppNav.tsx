import { useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Sidebar } from "@shared/ui";
import { AppNavItem } from "./AppNavItem";
import type { AppNavProps, NavItem } from "./appNav.types";

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: "Applications", path: "/applications", icon: "briefcase" },
  { label: "Job Boards", path: "/job-boards", icon: "bento" },
];

export function AppNav({ items = DEFAULT_NAV_ITEMS, className }: AppNavProps) {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sidebar
      open={isOpen}
      onOpenChange={setIsOpen}
      collapsible
      collapseMode="mini"
      position="static"
      ariaLabel="Application navigation"
      className={className}
    >
      <nav aria-label="Main navigation" className="flex flex-col gap-xs p-sm">
        {items.map((item) => (
          <AppNavItem
            key={item.path}
            item={item}
            isActive={pathname === item.path}
            isSidebarOpen={isOpen}
            onClick={() => void navigate({ to: item.path })}
          />
        ))}
      </nav>
    </Sidebar>
  );
}
