import { cn } from "@shared/lib/cn";
import { buttonVariants } from "./button.variants";
import type { ButtonProps } from "./button.types";
import React from "react";

/**
 * A versatile Button component that supports multiple variants, sizes, and states.
 * It can be used for various actions in the application, such as submitting forms,
 * triggering events, or navigating to different pages. The component is designed
 * to be easily customizable through props and can be extended with additional styles or functionality as needed.
 *
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
        onClick={disabled ? onClickDisabled : onClick}
        aria-disabled={disabled || undefined} // Adds aria-disabled for accessibility when the button is disabled
        {...props}
      >
        {/* Keep children in DOM during loading so layout/scroll anchors are preserved */}
        <span className={loading ? "invisible" : undefined}>{props.children}</span>
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
