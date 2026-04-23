import { cva } from "class-variance-authority";

/**
 * Base styles for the sidebar container.
 * Handles layout, transitions, and responsive sizing.
 */
export const sidebarVariants = cva(
  [
    "transition-all duration-200",
    "flex flex-col",
    "h-full",
    "border-r border-base",
    "bg-surface",
    "overflow-hidden",
  ].join(" "),
  {
    variants: {},
    defaultVariants: {},
  },
);

/**
 * Sidebar wrapper for positioning context (sticky/fixed).
 */
export const sidebarWrapperVariants = cva([], {
  variants: {
    position: {
      static: "",
      sticky: "sticky top-0",
      fixed: "fixed top-0 left-0 h-screen",
    },
  },
  defaultVariants: {
    position: "static",
  },
});

/**
 * Header slot styling.
 */
export const sidebarHeaderVariants = cva(
  ["flex-shrink-0", "border-b border-base", "px-md py-md"].join(" "),
  {
    variants: {},
    defaultVariants: {},
  },
);

/**
 * Content area (scrollable or flex-grow).
 */
export const sidebarContentVariants = cva(["flex-1", "flex flex-col"].join(" "), {
  variants: {
    scrollable: {
      true: "overflow-y-auto",
      false: "overflow-hidden",
    },
  },
  defaultVariants: {
    scrollable: true,
  },
});

/**
 * Footer slot styling.
 */
export const sidebarFooterVariants = cva(
  ["flex-shrink-0", "border-t border-base", "px-md py-md"].join(" "),
  {
    variants: {},
    defaultVariants: {},
  },
);

/**
 * Collapse toggle button styling.
 * Touch target: 44px × 44px (h-11 w-11 at 16px rem) meets WCAG AAA touch target size.
 */
export const sidebarToggleVariants = cva(
  [
    "inline-flex items-center justify-center",
    "h-11 w-11",
    "rounded-md",
    "transition-all duration-200",
    "hover:bg-muted",
    "active:scale-[0.98]",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
    "shadow-sm hover:shadow-md",
  ].join(" "),
  {
    variants: {},
    defaultVariants: {},
  },
);
