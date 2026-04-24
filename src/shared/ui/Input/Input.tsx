import React from "react";
import type { InputProps } from "./input.types";
import { cn } from "@/shared/lib/cn";
import { inputVariants } from "./input.variants";
import { Field } from "@/shared/ui/Field";

/**
 * Input
 *
 * An accessible text input with integrated `Field` wrapper for label,
 * helper text, success, and error messaging. Auto-generates a stable `id`
 * when none is provided. Supports start and end adornments (icons or text).
 * Manages `aria-invalid` and `aria-describedby` automatically based on
 * `error`, `success`, and `helperText` props.
 *
 * @example
 * <Input label="Search" placeholder="Search jobs…" startAdornment={<Icon name="search" />} />
 * <Input label="Email" type="email" error="Invalid address" />
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      wrapperClassName,
      label,
      error,
      helperText,
      success,
      startAdornment,
      endAdornment,
      state = "default",
      size,
      type = "text",
      id: idProp,
      "aria-describedby": externalDescribedBy,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const resolvedId = idProp ?? generatedId;

    const effectiveState = error ? "error" : success ? "success" : state;

    const describedByIds =
      [
        helperText ? `${resolvedId}-helper` : null,
        success && !error ? `${resolvedId}-success` : null,
        error ? `${resolvedId}-error` : null,
        externalDescribedBy,
      ]
        .filter(Boolean)
        .join(" ") || undefined;

    const inputEl =
      !startAdornment && !endAdornment ? (
        <input
          ref={ref}
          id={resolvedId}
          type={type}
          aria-invalid={!!error}
          aria-describedby={describedByIds}
          className={cn(inputVariants({ state: effectiveState, size }), className)}
          {...props}
        />
      ) : (
        <div className={cn("relative flex w-full items-center", wrapperClassName)}>
          {startAdornment && (
            <div className="pointer-events-none absolute left-sm inline-flex items-center text-(--color-primary)">
              {startAdornment}
            </div>
          )}
          <input
            ref={ref}
            id={resolvedId}
            type={type}
            aria-invalid={!!error}
            aria-describedby={describedByIds}
            className={cn(
              inputVariants({ state: effectiveState, size }),
              "w-full",
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

    if (label || error || helperText || success) {
      return (
        <Field
          id={resolvedId}
          label={label}
          error={error}
          helperText={helperText}
          success={success}
        >
          {inputEl}
        </Field>
      );
    }

    return inputEl;
  },
);

Input.displayName = "Input";
