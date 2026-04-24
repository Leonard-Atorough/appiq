import { cn } from "@shared/lib";
import { badgeVariants } from "./badge.variants";
import type { BadgeProps } from "./badge.types";
import React from "react";

/**
 * Badge
 *
 * A compact label for status, category, or metadata display.
 * Automatically adapts its root element based on provided props:
 * - Static label: renders as `<span>`
 * - Clickable (`onClick` only): renders as `<button>`
 * - Dismissable or with actions: renders as `<span>` container holding
 *   individual `<button>` elements — avoids invalid nested-button HTML.
 *
 * @example
 * <Badge variant="success">Applied</Badge>
 * <Badge variant="warning" dismissable onDismiss={() => remove(id)}>Pending</Badge>
 */
export const Badge = React.forwardRef<HTMLElement, BadgeProps>(
  (
    {
      variant = "default",
      outline,
      size,
      rounded,
      icon,
      dismissable,
      onDismiss,
      actions,
      children,
      onClick,
      className,
      ...props
    },
    ref,
  ) => {
    const hasNestedButtons = dismissable || (actions && actions.length > 0);

    // <button> is only safe as the outer tag when there are no nested interactive elements
    const Tag = hasNestedButtons ? "span" : onClick ? "button" : "span";

    return (
      <Tag
        ref={ref as React.Ref<HTMLButtonElement & HTMLSpanElement>}
        type={!hasNestedButtons && onClick ? "button" : undefined}
        className={cn(badgeVariants({ variant, outline, size, rounded }), "gap-xs", className)}
        onClick={!hasNestedButtons ? onClick : undefined}
        {...props}
      >
        {icon && <span className="flex items-center">{icon}</span>}

        <span>{children}</span>

        {actions?.map((action, i) => (
          <button
            key={i}
            type="button"
            className="ml-xs rounded-sm text-xs underline hover:no-underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-(--color-primary)"
            onClick={(e) => {
              e.stopPropagation();
              action.onClick(e);
            }}
          >
            {action.label}
          </button>
        ))}

        {dismissable && (
          <button
            type="button"
            className="ml-xs flex items-center justify-center rounded-sm hover:opacity-70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-(--color-primary)"
            aria-label="Dismiss badge"
            onClick={(e) => {
              e.stopPropagation();
              onDismiss?.();
            }}
          >
            <span aria-hidden="true">✕</span>
          </button>
        )}
      </Tag>
    );
  },
);

Badge.displayName = "Badge";
