import type { IconName } from "@shared/ui";

export interface NavItem {
  label: string;
  path: string;
  icon: IconName;
}

export interface AppNavProps {
  items?: NavItem[];
  className?: string;
}
