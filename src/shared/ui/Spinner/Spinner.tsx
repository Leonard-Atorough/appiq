import React from "react";
import { cn } from "@shared/lib/cn";
import { spinnerVariants } from "./spinner.variant";
import type { SpinnerProps } from "./spinner.types";

/**
 * Spinner
 *
 * A loading indicator showing an animated spinning circle.
 * Communicates to users that content is loading or processing.
 *
 * Accessibility:
 * - Sets `aria-busy={busy}` to communicate loading state
 * - Accepts `label` prop for `aria-label` (defaults to "Loading")
 * - Uses semantic HTML and ARIA attributes
 *
 * @example
 * <Spinner size="md" busy />
 * <Spinner label="Fetching data..." />
 */
export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = "md", busy = true, label = "Loading", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(spinnerVariants({ size }), className)}
        aria-busy={busy}
        aria-label={label}
        role="status"
        {...props}
      />
    );
  },
);

Spinner.displayName = "Spinner";
