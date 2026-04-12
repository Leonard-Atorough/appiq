import { cn } from "@shared/lib/cn";
import { emptyStateVariants, emptyStateIconVariants } from "./emptyState.variants";
import type { EmptyStateProps } from "./emptyState.types";

const DEFAULT_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="16" />
    <line x1="10" y1="14" x2="14" y2="14" />
  </svg>
);

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
      <span className={cn(emptyStateIconVariants({ size }), "text-muted")}>{resolvedIcon}</span>

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
