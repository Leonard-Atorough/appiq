import React from "react";

// Navigation icons
import {
  KebabIcon,
  MeatballIcon,
  BentoIcon,
  DonerIcon,
  HomeIcon,
  HamburgerIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "./navigation";

// Status icons
import { CheckCircleIcon, XCircleIcon, AlertTriangleIcon, InfoIcon } from "./status";

// UI icons
import {
  BellIcon,
  CheckIcon,
  MinusIcon,
  XIcon,
  BriefcaseIcon,
  SunIcon,
  MoonIcon,
  CalendarIcon,
  LocationIcon,
} from "./ui";

// Action icons
import { PlusIcon, DownloadIcon, DeleteIcon, EditIcon } from "./actions";

/**
 * Icon registry mapping icon names to their React components
 * When adding new icons, add them to this registry and the IconName type
 */
export const ICON_REGISTRY: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  // Navigation
  kebab: KebabIcon,
  meatball: MeatballIcon,
  bento: BentoIcon,
  doner: DonerIcon,
  home: HomeIcon,
  hamburger: HamburgerIcon,
  "chevron-left": ChevronLeftIcon,
  "chevron-right": ChevronRightIcon,
  "chevron-down": ChevronDownIcon,
  "chevron-up": ChevronUpIcon,

  // Status
  "check-circle": CheckCircleIcon,
  "x-circle": XCircleIcon,
  "alert-triangle": AlertTriangleIcon,
  info: InfoIcon,

  // UI
  bell: BellIcon,
  check: CheckIcon,
  minus: MinusIcon,
  x: XIcon,
  briefcase: BriefcaseIcon,
  sun: SunIcon,
  moon: MoonIcon,
  calendar: CalendarIcon,
  location: LocationIcon,
  // Actions
  plus: PlusIcon,
  download: DownloadIcon,
  delete: DeleteIcon,
  edit: EditIcon,
};

// Export individual icons for direct imports if needed
export * from "./navigation";
export * from "./status";
export * from "./ui";
export * from "./actions";
