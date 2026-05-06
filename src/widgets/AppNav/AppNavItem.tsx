import { Button, Flex, Icon, Tooltip } from "@shared/ui";
import type { NavItem } from "./appNav.types";

interface AppNavItemProps {
  item: NavItem;
  isActive: boolean;
  isSidebarOpen: boolean;
  isMobile: boolean;
  onClick: () => void;
}

export function AppNavItem({ item, isActive, isSidebarOpen, isMobile, onClick }: AppNavItemProps) {
  const button = (
    <Button
      onClick={onClick}
      variant="outline"
      size={isMobile ? "lg" : "md"}
      aria-current={isActive ? "page" : undefined}
      className={isSidebarOpen ? "justify-start" : "aspect-square p-0"}
    >
      <Flex gap="md" align="center">
        <Icon name={item.icon} size="md" aria-hidden />
        {isSidebarOpen && <span className="truncate">{item.label}</span>}
      </Flex>
    </Button>
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
