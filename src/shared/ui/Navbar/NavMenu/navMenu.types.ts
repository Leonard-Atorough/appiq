import type React from "react";

export interface NavMenuItem {
  /** Unique identifier for this item. Also used as the React key. */
  id: string;
  /** Route path this item navigates to. Also used as the active-state key. */
  href: string;
  /** Visible link label. */
  label: string;
  /** Optional icon rendered to the left of the label. */
  icon?: React.ReactNode;
}

export interface NavMenuProps extends React.HTMLAttributes<HTMLElement> {
  /** Ordered list of navigation items to render. */
  items: NavMenuItem[];
  /**
   * Override the navigation handler. Use this when upgrading to react-router-dom or
   * TanStack Router — pass the router's `navigate` function here instead of the
   * default RouteContext handler.
   *
   * @example
   * // TanStack Router
   * const navigate = useNavigate();
   * <NavMenu items={items} onNavigate={(href) => navigate({ to: href })} />
   *
   * // react-router-dom
   * const navigate = useNavigate();
   * <NavMenu items={items} onNavigate={navigate} />
   */
  onNavigate?: (href: string) => void;
}
