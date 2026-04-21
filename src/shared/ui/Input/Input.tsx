import React from "react";
import type { InputProps } from "./input.types";
import { cn } from "@/shared/lib/cn";
import { inputVariants } from "./input.variants";

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      wrapperClassName,
      label,
      startAdornment,
      endAdornment,
      state = "default",
      size,
      type = "text",
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const resolvedId = props.id ?? generatedId;


    const inputEl =
      !startAdornment && !endAdornment ? (
        <input
          ref={ref}
          id={resolvedId}
          type={type}
          className={cn(inputVariants({ state, size }), className)}
          {...props}
        />
      ) : (
        <div className={cn("flex relative items-center", wrapperClassName)}>
          {startAdornment && (
            <div className="pointer-events-none absolute left-sm inline-flex items-center text-(--color-primary)">
              {startAdornment}
            </div>
          )}
          <input
            ref={ref}
            id={resolvedId}
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

    if (label) {
      return (
        <label htmlFor={resolvedId} className="flex flex-col gap-xs">
          <span className="text-sm font-medium text-secondary">{label}</span>
          {inputEl}
        </label>
      );
    }

    return inputEl;
  },
);
Input.displayName = "Input";
