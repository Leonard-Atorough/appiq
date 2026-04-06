import { cn } from "@shared/lib";
import { badgeVariants } from "./badge.variants";
import type { BadgeProps } from "./badge.types";
import React from "react";

/** Badge component for displaying status, labels, or counts with optional dismiss functionality */
export const Badge = React.forwardRef<HTMLButtonElement, BadgeProps>(
  ({ variant, outline, size, rounded, icon, dismissable, onDismiss, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(badgeVariants({ variant, outline, size, rounded }), "gap-(--spacing-xs)")}
        disabled={dismissable ? false : undefined}
        {...props}
      >
        {icon && <span className="flex items-center">{icon}</span>}
        <span>{children}</span>
        {dismissable && (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              onDismiss?.();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onDismiss?.();
              }
            }}
            className="ml-(--spacing-xs) flex items-center justify-center hover:opacity-70 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-(--color-primary)"
            aria-label="Dismiss badge"
          >
            ✕
          </span>
        )}
      </button>
    );
  },
);

Badge.displayName = "Badge";
