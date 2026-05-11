import { cn } from "@shared/lib";
import { useResponsive } from "@/shared/lib";
import { tagVariants } from "./tag.variants";
import type { TagAction, TagProps } from "./tag.types";
import React from "react";
import { Icon } from "../Icon";

/**
 * Tag — Semantic chip/tag component
 *
 * Displays a dismissible, labeled chip with optional icon and actions.
 * Structure: [startAdornment] + label + [actions] + [deleteIcon]
 * Uses slot-based composition for fixed, predictable layout.
 *
 * Automatically adapts its root element based on provided props:
 * - Static label: renders as `<span>`
 * - Clickable (`onClick` only): renders as `<button>`
 * - With `onDismiss` or actions: renders as `<span>` container holding
 *   individual `<button>` elements — avoids invalid nested-button HTML.
 * Supports responsive styling via ResponsiveValue for size, variant, and rounded.
 *
 * @example
 * <Tag label="Applied" variant="success" />
 * <Tag
 *   label="Pending"
 *   variant="warning"
 *   startAdornment={<Icon />}
 *   onDismiss={() => remove(id)}
 *   deleteIcon={<CustomX />}
 * />
 * // Responsive: md=pill, lg=boxed
 * <Tag
 *   label="Status"
 *   size={{ base: "sm", md: "md", lg: "lg" }}
 *   variant={{ base: "default", lg: "success" }}
 * />
 */
export const Tag = React.forwardRef<HTMLElement, TagProps>(
  (
    {
      color = "default",
      outlined: outline,
      size,
      rounded,
      label,
      startAdornment,
      deleteIcon = <Icon name="x" size="sm" />,
      onDismiss,
      actions,
      onClick,
      className,
      ...props
    },
    ref,
  ) => {
    const resolvedColor = useResponsive(color);
    const resolvedSize = useResponsive(size);
    const resolvedRounded = useResponsive(rounded ?? false);
    const hasNestedButtons = onDismiss || (actions && actions.length > 0);

    // <button> is only safe as the outer tag when there are no nested interactive elements
    const Tag = hasNestedButtons ? "span" : onClick ? "button" : "span";

    return (
      <Tag
        ref={ref as React.Ref<HTMLButtonElement & HTMLSpanElement>}
        type={!hasNestedButtons && onClick ? "button" : undefined}
        className={cn(
          tagVariants({
            color: resolvedColor,
            outlined: outline,
            size: resolvedSize,
            rounded: resolvedRounded,
          }),
          "gap-xs",
          className,
        )}
        onClick={!hasNestedButtons ? onClick : undefined}
        {...props}
      >
        {startAdornment && <span className="flex items-center">{startAdornment}</span>}

        <span>{label}</span>

        {actions?.map((action: TagAction) => (
          <button
            key={action.id ?? action.label}
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

        {onDismiss && (
          <button
            type="button"
            className="ml-xs flex items-center justify-center rounded-sm hover:opacity-70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-(--color-primary)"
            aria-label="Dismiss badge"
            onClick={(e) => {
              e.stopPropagation();
              onDismiss?.();
            }}
          >
            <span aria-hidden="true">{deleteIcon}</span>
          </button>
        )}
      </Tag>
    );
  },
);

Tag.displayName = "Tag";
