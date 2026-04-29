import { useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Button, Sidebar } from "@shared/ui";
import { AppNavItem } from "./AppNavItem";
import type { AppNavProps, NavItem } from "./appNav.types";

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", path: "/", icon: "home" },
  { label: "Applications", path: "/applications", icon: "briefcase" },
  { label: "Job Boards", path: "/job-boards", icon: "bento" },
  { label: "Interviews", path: "/interviews", icon: "calendar" },
  { label: "Contacts", path: "/contacts", icon: "users" },
  { label: "Analytics", path: "/analytics", icon: "chart-bar" },
  { label: "Settings", path: "/settings", icon: "settings" },
  { label: "Help", path: "/help", icon: "help-circle" },
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
      header={
        <div className="flex items-center gap-sm px-sm py-xs">
          <span className="text-lg font-bold">Appiq</span>
        </div>
      }
      footer={
          <Button variant="primary" full onClick={() => alert("Logout clicked")}>
            Logout
          </Button>
      }
    >
      <nav aria-label="Main navigation" className="flex flex-col gap-md p-sm">
        {items.map((item) => (
          <AppNavItem
            key={item.path}
            item={item}
            isActive={!isOpen ? false : pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path))}
            isSidebarOpen={isOpen}
            onClick={() => void navigate({ to: item.path })}
          />
        ))}
      </nav>
    </Sidebar>
  );
}
