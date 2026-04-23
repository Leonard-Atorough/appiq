import React from "react";
import type { SelectProps } from "./select.types";
import { cn } from "@/shared/lib/cn";
import { selectVariants } from "./select.variants";
import { Field } from "@/shared/ui/Field";

/**
 * Select
 *
 * A native `<select>` element with integrated `Field` wrapper for label,
 * helper text, success, and error messaging. Mirrors the `Input` API for
 * consistency. Auto-generates a stable `id` when none is provided.
 * Supports start and end adornments and manages `aria-invalid` /
 * `aria-describedby` automatically based on `error`, `success`, and
 * `helperText` props.
 *
 * @example
 * <Select label="Status" error={errors.status}>
 *   <option value="applied">Applied</option>
 *   <option value="interview">Interview</option>
 * </Select>
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
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
      children,
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

    const selectEl =
      !startAdornment && !endAdornment ? (
        <select
          ref={ref}
          id={resolvedId}
          aria-invalid={!!error}
          aria-describedby={describedByIds}
          className={cn(selectVariants({ state: effectiveState, size }), className)}
          {...props}
        >
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
            id={resolvedId}
            aria-invalid={!!error}
            aria-describedby={describedByIds}
            className={cn(
              selectVariants({ state: effectiveState, size }),
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

    if (label || error || helperText || success) {
      return (
        <Field
          id={resolvedId}
          label={label}
          error={error}
          helperText={helperText}
          success={success}
        >
          {selectEl}
        </Field>
      );
    }

    return selectEl;
  },
);
Select.displayName = "Select";
