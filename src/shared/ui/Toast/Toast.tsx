import React from "react";
import type { ToastProps } from "./toast.types";
import { cn } from "@/shared/lib/cn";
import { toastVariants } from "./toast.variants";
import { Button } from "../Button";
import { Icon } from "../Icon";

/** Maps each variant to its accent color for the timer drain bar */
const timerBarClass: Record<string, string> = {
  default: "bg-(--color-border)",
  success: "bg-success",
  error: "bg-error",
  warning: "bg-warning",
  info: "bg-info",
};

/** Maps each toast variant to its corresponding icon */
const defaultIcons: Record<string, React.ReactNode> = {
  default: <Icon name="bell" aria-hidden={true} />,
  success: <Icon name="check-circle" variant="success" aria-hidden={true} />,
  error: <Icon name="x-circle" variant="error" aria-hidden={true} />,
  warning: <Icon name="alert-triangle" variant="warning" aria-hidden={true} />,
  info: <Icon name="info" variant="info" aria-hidden={true} />,
};

/**
 * Toast component for displaying transient notifications.
 * Supports different variants, auto-dismissal, and optional action buttons.
 * Designed with accessibility in mind, using ARIA roles and live regions.
 * The timer drain bar visually indicates the remaining time before auto-dismissal, with colors matching the toast variant.
 */
export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ title, description, action, variant, duration = 5000, onDismiss, icon, ...props }, ref) => {
    React.useEffect(() => {
      if (duration > 0) {
        const timer = setTimeout(() => {
          onDismiss?.();
        }, duration);
        return () => clearTimeout(timer);
      }
    }, [duration, onDismiss]);

    const iconToShow = icon ?? defaultIcons[variant || "default"];
    const showTimerBar = duration > 0;

    return (
      <div
        ref={ref}
        role="status"
        aria-live={variant === "error" ? "assertive" : "polite"}
        className={cn(toastVariants({ variant }), props.className)}
        {...props}
      >
        <div className="mr-md">{iconToShow}</div>
        <div className="flex-1">
          <div className="font-semibold">{title}</div>
          {description && <div className="text-sm text-muted">{description}</div>}
        </div>
        {action && (
          <div className="ml-md flex-shrink-0">
            <Button variant="outline" size="sm" onClick={action.onClick}>
              {action.label}
            </Button>
          </div>
        )}
        {onDismiss && (
          <div className="ml-md flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={onDismiss}
              aria-label="Dismiss notification"
              className="ml-sm"
            >
              <Icon name="x" aria-hidden={true} />
            </Button>
          </div>
        )}
        {showTimerBar && (
          <span
            className={cn(
              "absolute bottom-0 left-0 h-[3px] w-full origin-right animate-timer-drain",
              timerBarClass[variant ?? "default"],
            )}
            style={{ "--timer-duration": `${duration}ms` } as React.CSSProperties}
            aria-hidden="true"
          />
        )}
      </div>
    );
  },
);
Toast.displayName = "Toast";
