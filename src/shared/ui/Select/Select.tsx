import React from "react";
import type { SelectProps } from "./select.types";
import { cn } from "@/shared/lib/cn";
import { selectVariants } from "./select.variants";

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      wrapperClassName,
      startAdornment,
      endAdornment,
      state = "default",
      size,
      children,
      ...props
    },
    ref,
  ) => {
    if (!startAdornment && !endAdornment) {
      return (
        <select
          ref={ref}
          className={cn(selectVariants({ state, size }), className)}
          {...props}
        >
          {children}
        </select>
      );
    }

    return (
      <div className={cn("flex items-center relative", wrapperClassName)}>
        {startAdornment && (
          <div className="pointer-events-none absolute left-3 inline-flex items-center text-primary">
            {startAdornment}
          </div>
        )}
        <select
          ref={ref}
          className={cn(
            selectVariants({ state, size }),
            startAdornment ? "pl-10" : "",
            endAdornment ? "pr-10" : "",
            className,
          )}
          {...props}
        >
          {children}
        </select>
        {endAdornment && (
          <div className="pointer-events-none absolute right-3 inline-flex items-center text-primary">
            {endAdornment}
          </div>
        )}
      </div>
    );
  },
);
Select.displayName = "Select";
