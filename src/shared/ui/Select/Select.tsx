import React from "react";
import type { SelectProps } from "./select.types";
import { cn } from "@/shared/lib/cn";
import { selectVariants } from "./select.variants";

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      wrapperClassName,
      label,
      startAdornment,
      endAdornment,
      state = "default",
      size,
      children,
      ...props
    },
    ref,
  ) => {
    const selectEl =
      !startAdornment && !endAdornment ? (
        <select ref={ref} className={cn(selectVariants({ state, size }), className)} {...props}>
          {children}
        </select>
      ) : (
        <div className={cn("flex items-center relative", wrapperClassName)}>
          {startAdornment && (
            <div className="pointer-events-none absolute left-(--spacing-sm) inline-flex items-center text-(--color-text-muted)">
              {startAdornment}
            </div>
          )}
          <select
            ref={ref}
            className={cn(
              selectVariants({ state, size }),
              startAdornment ? "pl-(--spacing-lg)" : "",
              endAdornment ? "pr-(--spacing-lg)" : "",
              className,
            )}
            {...props}
          >
            {children}
          </select>
          {endAdornment && (
            <div className="pointer-events-none absolute right-(--spacing-sm) inline-flex items-center text-(--color-text-muted)">
              {endAdornment}
            </div>
          )}
        </div>
      );

    if (label) {
      return (
        <label className="flex flex-col gap-xs">
          <span className="text-sm font-medium text-secondary">{label}</span>
          {selectEl}
        </label>
      );
    }

    return selectEl;
  },
);
Select.displayName = "Select";
