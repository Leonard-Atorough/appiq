import { cn } from "@shared/lib/cn";
import { buttonVariants } from "./button.variants";
import type { ButtonProps } from "./button.types";
import React from "react";

/**
 * Button
 *
 * General-purpose interactive control supporting multiple variants, sizes, and states.
 * Defaults to `type="button"` to prevent accidental form submission.
 * Renders a visual loading spinner when `loading` is true while keeping the element
 * accessible and non-interactive.
 *
 * @example
 * <Button variant="primary" onClick={handleSave}>Save</Button>
 * <Button variant="ghost" loading>Saving...</Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, full, loading, className, disabled, onClick, ...props }, ref) => {
    const onClickDisabled = (e: React.MouseEvent) => e.preventDefault(); // Prevents any action when the button is disabled

    return (
      <button
        ref={ref}
        type="button" // Default to "button" to prevent accidental form submissions
        className={cn(
          buttonVariants({
            variant,
            size,
            full,
            loading,
          }),
          className,
        )}
        disabled={disabled}
        onClick={disabled || loading ? onClickDisabled : onClick}
        aria-disabled={disabled || loading || undefined} // Adds aria-disabled for accessibility when the button is disabled or loading
        aria-busy={loading || undefined}
        {...props}
      >
        <span className={loading ? "opacity-0" : undefined}>{props.children}</span>
        {loading && (
          <span
            aria-hidden="true"
            className="absolute animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"
          />
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
