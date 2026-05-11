import { cn } from "@shared/lib/cn";
import {
  breadcrumbItemVariants,
  breadcrumbLinkVariants,
  breadcrumbTextVariants,
  breadcrumbIconVariants,
} from "./breadcrumbItem.variants";
import type { BreadcrumbItemComponentProps } from "./breadcrumbItem.types";

/**
 * Renders a single breadcrumb item as either a link or text.
 * Automatically determines whether to render as link based on href/onClick and item state.
 */
export function BreadcrumbItem({
  item,
  isLast,
  lastItemAsLink,
  linkComponent: globalLinkComponent,
  onItemClick,
  size = "md",
}: BreadcrumbItemComponentProps) {
  const { label, ariaLabel, disabled = false, icon, href, onClick, linkComponent, className } =
    item;

  // Determine link component: per-item > global > default <a>
  const LinkComponent = linkComponent || globalLinkComponent || "a";

  // Determine if should render as link
  const shouldRenderAsLink = !disabled && (!!href || !!onClick) && (!isLast || lastItemAsLink);

  const content = (
    <>
      {icon && <span className={breadcrumbIconVariants({ size })}>{icon}</span>}
      <span>{label}</span>
    </>
  );

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (onItemClick) onItemClick(item);
  };

  return (
    <li className={cn(breadcrumbItemVariants(), className)}>
      {shouldRenderAsLink ? (
        <LinkComponent
          href={href}
          onClick={handleClick}
          aria-label={ariaLabel || label}
          aria-disabled={disabled}
          className={breadcrumbLinkVariants({ disabled, size })}
        >
          {content}
        </LinkComponent>
      ) : (
        <span
          aria-label={ariaLabel || label}
          aria-disabled={disabled}
          aria-current={isLast ? "page" : undefined}
          className={breadcrumbTextVariants({ size })}
        >
          {content}
        </span>
      )}
    </li>
  );
}

BreadcrumbItem.displayName = "BreadcrumbItem";
