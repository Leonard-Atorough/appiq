import React from "react";

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Whether the sidebar is open. Controlled mode; pair with `onOpenChange`. */
  open?: boolean;
  /** Initial open state for uncontrolled mode. Defaults to `true`. Ignored if `open` is provided. */
  defaultOpen?: boolean;
  /** Callback fired when collapse state changes. */
  onOpenChange?: (open: boolean) => void;

  /** Enables collapse/expand toggle. Defaults to `false`. */
  collapsible?: boolean;
  /** Collapse mode: "mini" (reduce width) or "hide" (completely hide). Defaults to "mini". */
  collapseMode?: "mini" | "hide";
  /** Hides the collapse toggle button even when `collapsible={true}`. Defaults to `false`. */
  hideToggle?: boolean;
  /** Accessible label for the collapse toggle button. */
  toggleLabel?: string;

  /** CSS width when sidebar is expanded. Can be CSS value or number (px). Defaults to "16rem". */
  width?: string | number;
  /** CSS width when sidebar is collapsed. Defaults to "4rem". */
  collapsedWidth?: string | number;

  /** Positioning mode: "static", "sticky", or "fixed". Defaults to "static". */
  position?: "static" | "sticky" | "fixed";
  /** Applied only when `position="sticky"` or `position="fixed"`. Defaults to "0". */
  positionOffset?: string | number;

  /** Auto-collapse sidebar on mobile breakpoints. Defaults to `false`. */
  autoCollapseOnMobile?: boolean;
  /** Breakpoint width (px) below which auto-collapse triggers. Defaults to 768. */
  mobileBreakpoint?: number;

  /** Allow internal scrolling of sidebar content. Defaults to `true`. */
  scrollable?: boolean;

  /** Content rendered at the top of the sidebar. Typically a logo or branding. */
  header?: React.ReactNode;
  /** Content rendered at the bottom of the sidebar. Typically user menu or footer links. */
  footer?: React.ReactNode;

  /** Accessible name for the sidebar region. Defaults to "Sidebar". */
  ariaLabel?: string;
  /** Accessible landmark role. Defaults to "complementary". */
  asideRole?: string;
}
