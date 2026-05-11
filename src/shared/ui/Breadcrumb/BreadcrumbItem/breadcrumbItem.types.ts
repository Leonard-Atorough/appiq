import type { BreadcrumbLinkProps } from "../breadcrumb.types";

/**
 * Individual breadcrumb item configuration.
 */
export interface BreadcrumbItemProps {
  /** Display label for the item. */
  label: string;
  /** Optional custom aria-label. Defaults to label. */
  ariaLabel?: string;
  /** When true, item is non-interactive and displays as disabled text. */
  disabled?: boolean;
  /** Optional icon/element to display before label. */
  icon?: React.ReactNode;
  /** Link props (href, onClick, router-specific props like `to`). Omit to render as text. */
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  /** Custom link component for this item only. Overrides global linkComponent. */
  linkComponent?: React.ComponentType<BreadcrumbLinkProps>;
  /** Additional CSS classes for this item. */
  className?: string;
  /** Size of text and icon. Default: "md" */
  size?: "sm" | "md" | "lg";
}

/**
 * BreadcrumbItem component props (internal).
 */
export interface BreadcrumbItemComponentProps {
  item: BreadcrumbItemProps;
  isLast: boolean;
  lastItemAsLink: boolean;
  linkComponent?: React.ComponentType<BreadcrumbLinkProps>;
  onItemClick?: (item: BreadcrumbItemProps) => void;
  size?: "sm" | "md" | "lg";
}
