import React from "react";
import type { InputProps } from "./input.types";
import { cn } from "@/shared/lib/cn";
import { inputVariants } from "./input.variants";

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      wrapperClassName,
      startAdornment,
      endAdornment,
      state = "default",
      size,
      type = "text",
      ...props
    },
    ref,
  ) => {
    if (!startAdornment && !endAdornment) {
      return (
        <input
          ref={ref}
          type={type}
          className={cn(inputVariants({ state, size }), className)}
          {...props}
        />
      );
    }

    return (
      <div className={cn("flex items-center", wrapperClassName)}>
        {startAdornment && (
          <div className="pointer-events-none absolute left-sm inline-flex items-center text-(--color-primary)">
            {startAdornment}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            inputVariants({ state, size }),
            startAdornment ? "pl-lg" : "",
            endAdornment ? "pr-lg" : "",
            className,
          )}
          {...props}
        />
        {endAdornment && (
          <div className="pointer-events-none absolute right-sm inline-flex items-center text-(--color-primary)">
            {endAdornment}
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";
