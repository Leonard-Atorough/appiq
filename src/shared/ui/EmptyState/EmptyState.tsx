import React from "react";
import { cn } from "@shared/lib/cn";
import { emptyStateVariants } from "./emptyState.variants";
import type { EmptyStateProps } from "./emptyState.types";
import { Icon, type IconSize } from "../Icon";
import { Button } from "../Button";

/**
 * EmptyState
 *
 * A placeholder displayed when a list or view has no content to show.
 * Provides a contextual icon, title, description, and an optional call-to-action.
 * Defaults to a briefcase icon sized proportionally to the `size` prop.
 * Renders with `role="status"` and `aria-label` for screen reader announcement.
 *
 * @example
 * <EmptyState
 *   title="No applications yet"
 *   action={<Button onClick={openForm}>Add Application</Button>}
 * />
 */
export function EmptyState({
  title = "No applications yet",
  description = "Track your job search from application to offer. Add your first application to get started.",
  icon,
  action,
  variant,
  size,
  className,
}: EmptyStateProps) {
  const iconSizeMap: Record<NonNullable<EmptyStateProps["size"]>, IconSize> = {
    sm: "md",
    md: "lg",
    lg: "xl",
  };

  const iconSize = iconSizeMap[size || "md"] satisfies IconSize;
  const resolvedIcon = icon ?? <Icon name="briefcase" size={iconSize} aria-hidden={true} />;

  return (
    <div
      role="status"
      aria-label={title}
      className={cn(emptyStateVariants({ variant, size }), className)}
    >
      {resolvedIcon}
      <div className="flex flex-col gap-xs w-full">
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="text-sm text-secondary leading-normal">{description}</p>
      </div>

      {action && (
        <div className="mt-sm">
          {typeof action === "object" && !React.isValidElement(action) && "label" in action ? (
            <Button onClick={action.onClick}>{action.label}</Button>
          ) : (
            action
          )}
        </div>
      )}
    </div>
  );
}
