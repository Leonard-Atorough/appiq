import React from "react";

// Navigation icons
import { KebabIcon } from "./navigation/KebabIcon";
import { MeatballIcon } from "./navigation/MeatballIcon";
import { BentoIcon } from "./navigation/BentoIcon";
import { DonerIcon } from "./navigation/DonerIcon";
import { HamburgerIcon } from "./navigation/HamburgerIcon";
import { ChevronLeftIcon } from "./navigation/ChevronLeftIcon";
import { ChevronRightIcon } from "./navigation/ChevronRightIcon";

// Status icons
import { CheckCircleIcon } from "./status/CheckCircleIcon";
import { XCircleIcon } from "./status/XCircleIcon";
import { AlertTriangleIcon } from "./status/AlertTriangleIcon";
import { InfoIcon } from "./status/InfoIcon";

// UI icons
import { BellIcon } from "./ui/BellIcon";
import { CheckIcon } from "./ui/CheckIcon";
import { MinusIcon } from "./ui/MinusIcon";
import { XIcon } from "./ui/XIcon";
import { BriefcaseIcon } from "./ui/BriefcaseIcon";

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
  hamburger: HamburgerIcon,
  "chevron-left": ChevronLeftIcon,
  "chevron-right": ChevronRightIcon,

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
};

// Export individual icons for direct imports if needed
export * from "./navigation";
export * from "./status";
export * from "./ui";
