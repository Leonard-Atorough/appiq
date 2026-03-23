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
  ({ variant, size, full, className, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({
            variant,
            size,
            full,
          }),
          className,
        )}
        disabled={disabled}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
