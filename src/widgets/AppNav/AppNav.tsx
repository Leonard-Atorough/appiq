import { useContext, useState } from "react";
import { Sidebar } from "@shared/ui";
import { RouteContext } from "@app/providers/contexts/RouteContext";
import { AppNavItem } from "./AppNavItem";
import type { AppNavProps, NavItem } from "./appNav.types";

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: "Applications", path: "/applications", icon: "briefcase" },
  { label: "Job Boards", path: "/job-boards", icon: "bento" },
];

export function AppNav({ items = DEFAULT_NAV_ITEMS, className }: AppNavProps) {
  const [isOpen, setIsOpen] = useState(true);
  const { currentRoute, navigate } = useContext(RouteContext);

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
            isActive={currentRoute.startsWith(item.path)}
            isSidebarOpen={isOpen}
            onClick={() => navigate(item.path)}
          />
        ))}
      </nav>
    </Sidebar>
  );
}
