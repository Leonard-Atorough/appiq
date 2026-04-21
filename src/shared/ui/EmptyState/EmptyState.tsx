import { cn } from "@shared/lib/cn";
import { emptyStateVariants } from "./emptyState.variants";
import type { EmptyStateProps } from "./emptyState.types";
import { Icon } from "../Icon";

const DEFAULT_ICON = <Icon name="briefcase" aria-hidden={true} />;

export function EmptyState({
  title = "No applications yet",
  description = "Track your job search from application to offer. Add your first application to get started.",
  icon,
  action,
  variant,
  size,
  className,
}: EmptyStateProps) {
  const resolvedIcon = icon ?? DEFAULT_ICON;

  return (
    <div
      role="status"
      aria-label={title}
      className={cn(emptyStateVariants({ variant, size }), className)}
    >
      {resolvedIcon}
      <div className="flex flex-col gap-xs w-full">
        <h3 className="text-base font-semibold text-(--color-text)">{title}</h3>
        <p className="text-sm text-secondary leading-normal">{description}</p>
      </div>

      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className={cn(
            "mt-sm inline-flex items-center justify-center gap-xs",
            "rounded-md px-md py-sm text-sm font-medium",
            "bg-gradient-to-br from-(--color-primary) to-(--color-primary-hover)",
            "text-(--color-primary-foreground)",
            "shadow-sm hover:shadow-md transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-(--color-primary)",
            "active:scale-[0.98]",
          )}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
