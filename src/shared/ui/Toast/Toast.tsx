import React from "react";
import type { ToastProps } from "./toast.types";
import { cn } from "@/shared/lib/cn";
import { toastVariants } from "./toast.variants";
import { Button } from "../Button";
import {
  BellIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertTriangleIcon,
  InfoIcon,
  XIcon,
} from "./toast.icons";

/** Maps each variant to its accent color for the timer drain bar */
const timerBarClass: Record<string, string> = {
  default: "bg-(--color-border)",
  success: "bg-success",
  error: "bg-error",
  warning: "bg-warning",
  info: "bg-info",
};

const defaultIcons: Record<string, React.ReactNode> = {
  default: <BellIcon />,
  success: <CheckCircleIcon />,
  error: <XCircleIcon />,
  warning: <AlertTriangleIcon />,
  info: <InfoIcon />,
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
        role={variant === "error" ? "alert" : "status"}
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
              <XIcon />
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
