import type { BreadcrumbItemProps } from "./BreadcrumbItem";
import type { ResponsiveValue } from "@/shared/lib";

/**
 * Extended anchor element props compatible with router libraries.
 * Allows router-specific props like `to` (React Router), `href` (Next.js Link), etc.
 */
export interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  [key: string]: unknown;
}

/**
 * Breadcrumb navigation component props.
 * Displays a hierarchical navigation trail with optional collapsing for long paths.
 * Supports custom link components for seamless router library integration.
 *
 * @example
 * ```tsx
 * <Breadcrumb
 *   items={[
 *     { label: "Home", href: "/" },
 *     { label: "Applications", href: "/applications" },
 *     { label: "Job #123" },
 *   ]}
 *   maxItems={3}
 *   collapseFrom="start"
 * />
 * ```
 */
export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  /** Array of breadcrumb items. */
  items: BreadcrumbItemProps[];
  /** Maximum number of items to display before collapsing. Default: 3 */
  maxItems?: number;
  /** Which end to collapse from: "start" hides first items, "end" hides last items. Default: "start" */
  collapseFrom?: "start" | "end";
  /** When true, use Dropdown component for collapsed items. When false, use expandable button. Default: true */
  useDropdown?: boolean;
  /** Render last item as interactive link. When false (default), renders as non-interactive text (aria-current="page"). */
  lastItemAsLink?: boolean;
  /** Visual separator between items. Default: "/" */
  separator?: React.ReactNode;
  /** Custom link component for all items (e.g., TanStack Router Link, React Router Link). Can be overridden per-item. */
  linkComponent?: React.ComponentType<BreadcrumbLinkProps>;
  /** Size of text and icon for all items. Default: "md". Can be overridden per-item. Supports responsive values. */
  size?: ResponsiveValue<"sm" | "md" | "lg">;
}
