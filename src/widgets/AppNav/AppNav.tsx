import React, { useState } from "react";
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

export function AppNav({
  items = DEFAULT_NAV_ITEMS,
  className,
  isMenuOpen = false,
  onMenuOpenChange,
}: AppNavProps) {
  const [isDesktopOpen, setIsDesktopOpen] = useState(true);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 1023px)").matches : false,
  );

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleNavigate = (path: string) => {
    void navigate({ to: path });
    if (isMenuOpen) onMenuOpenChange?.(false);
  };

  const open = isMobile ? isMenuOpen : isDesktopOpen;
  const onOpenChange = isMobile ? onMenuOpenChange : setIsDesktopOpen;

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => onMenuOpenChange?.(false)}
          aria-hidden="true"
        />
      )}

      <Sidebar
        open={open}
        onOpenChange={onOpenChange}
        collapsible
        collapseMode="mini"
        position={isMobile ? "fixed" : "static"}
        collapsedWidth={isMobile ? "0" : "100%"}
        width={isMobile ? "100vw" : "16rem"}
        ariaLabel="Application navigation"
        className={isMobile ? "z-50" : className}
        header={
          <div className="flex items-center gap-sm px-sm py-xs">
            <span className="text-lg font-bold">Appiq</span>
          </div>
        }
        footer={
          <Button variant="primary" fullWidth onClick={() => alert("Logout clicked")}>
            Logout
          </Button>
        }
      >
        <nav aria-label="Main navigation" className={`flex flex-col gap-md ${open ? "p-sm" : "px-xs py-sm"}`}>
          {items.map((item) => (
            <AppNavItem
              key={item.path}
              item={item}
              isActive={
                !open
                  ? false
                  : pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path))
              }
              isSidebarOpen={open}
              isMobile={isMobile}
              onClick={() => handleNavigate(item.path)}
            />
          ))}
        </nav>
      </Sidebar>
    </>
  );
}
