import React from "react";
import type { ToastProps } from "./toast.types";
import { cn } from "@/shared/lib/cn";
import { toastVariants } from "./toast.variants";
import { Button } from "../Button";

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

    const defaultIcons: Record<string, React.ReactNode> = {
      default: "🔔",
      success: "✅",
        error: "❌",
        warning: "⚠️",
        info: "ℹ️",
    }; // To be replace with actual icons from your icon library

    const iconToShow = icon ?? defaultIcons[variant || "default"];

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
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
              ✕
            </Button>
          </div>
        )}
      </div>
    );
  },
);
Toast.displayName = "Toast";
