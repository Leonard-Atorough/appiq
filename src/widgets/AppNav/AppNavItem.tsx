import { Icon, Tooltip } from "@shared/ui";
import { cn } from "@shared/lib/cn";
import type { NavItem } from "./appNav.types";

interface AppNavItemProps {
  item: NavItem;
  isActive: boolean;
  isSidebarOpen: boolean;
  onClick: () => void;
}

export function AppNavItem({ item, isActive, isSidebarOpen, onClick }: AppNavItemProps) {
  const button = (
    <button
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "w-full flex items-center gap-sm px-sm py-sm rounded-md",
        "text-sm font-medium transition-colors duration-150",
        "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        isActive ? "bg-muted text-primary-text" : "text-secondary",
      )}
    >
      <Icon name={item.icon} size="md" aria-hidden />
      {isSidebarOpen && <span className="truncate">{item.label}</span>}
    </button>
  );

  if (!isSidebarOpen) {
    return (
      <Tooltip message={item.label} side="right">
        {button}
      </Tooltip>
    );
  }

  return button;
}
