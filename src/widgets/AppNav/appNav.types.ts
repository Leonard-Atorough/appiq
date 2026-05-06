import type { IconName } from "@shared/ui";

export interface NavItem {
  label: string;
  path: string;
  icon: IconName;
}

export interface AppNavProps {
  items?: NavItem[];
  className?: string;
  /** Whether the mobile menu is open */
  isMenuOpen?: boolean;
  /** Callback when menu state changes (e.g., on mobile close after navigation) */
  onMenuOpenChange?: (open: boolean) => void;
}
