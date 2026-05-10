import React, { useState } from "react";
import { cn } from "@shared/lib/cn";
import { Icon } from "../Icon";
import {
  alertVariants,
  alertTitleVariants,
  alertIconVariants,
  alertContentVariants,
} from "./alert.variants";
import type { AlertProps } from "./alert.types";

// Map alert types to appropriate icon names
const ICON_MAP: Record<string, string> = {
  success: "check-circle",
  error: "x-circle",
  warning: "alert-triangle",
  info: "info",
};

/**
 * Alert
 *
 * Simple, inline component for displaying persistent feedback messages.
 * Supports multiple alert types with semantic color coding and optional dismissal.
 *
 * Accessibility:
 * - Uses `role="alert"` for error/warning (time-sensitive)
 * - Uses `role="status"` for info/success (polite notifications)
 * - Includes semantic icons and title support
 * - Dismissible alerts include accessible close button
 *
 * @example
 * // Simple info alert
 * <Alert>This is an informational message</Alert>
 *
 * // Error alert with title and dismissible
 * <Alert type="error" title="Error" dismissible onDismiss={() => setShowAlert(false)}>
 *   Something went wrong. Please try again.
 * </Alert>
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      type = "info",
      borderless = false,
      title,
      children,
      dismissible = false,
      onDismiss,
      isOpen = true,
      className,
      ...props
    },
    ref,
  ) => {
    const [isDismissed, setIsDismissed] = useState(false);

    const handleDismiss = () => {
      setIsDismissed(true);
      onDismiss?.();
    };

    // Determine if alert should be shown
    const isVisible = isOpen && !isDismissed;

    if (!isVisible) {
      return null;
    }

    // Semantic role: alert for urgent messages, status for polite notifications
    const role = type === "error" || type === "warning" ? "alert" : "status";

    return (
      <div
        ref={ref}
        role={role}
        className={cn(alertVariants({ type, borderless }), className)}
        {...props}
      >
        {/* Icon */}
        <div className={alertIconVariants()}>
          <Icon name={ICON_MAP[type]} variant={type} size="sm" />
        </div>

        {/* Content */}
        <div className={alertContentVariants()}>
          {title && <div className={alertTitleVariants()}>{title}</div>}
          <div>{children}</div>
        </div>

        {/* Dismiss button */}
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="shrink-0 -mr-sm -my-sm p-sm hover:bg-black/5 rounded transition-colors"
            aria-label="Dismiss alert"
          >
            <Icon name="x" size="sm" />
          </button>
        )}
      </div>
    );
  },
);

Alert.displayName = "Alert";
