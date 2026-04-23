import React from "react";
import { cn } from "@/shared/lib/cn";
import { Label } from "@/shared/ui/Label";
import { fieldMessageVariants } from "./field.variants";
import type { FieldProps } from "./field.types";

/**
 * Field
 *
 * A form field wrapper that composes a `Label` with helper, success, and
 * error messages for any form control passed as `children`.
 * Generates stable id-based references (`${id}-helper`, `${id}-success`,
 * `${id}-error`) so inner controls can reference them via `aria-describedby`.
 * The error message renders with `role="alert"` for immediate announcement.
 *
 * @example
 * <Field id="email" label="Email address" error={errors.email} required>
 *   <Input id="email" type="email" />
 * </Field>
 */
export const Field: React.FC<FieldProps> = ({
  id,
  label,
  error,
  helperText,
  success,
  required,
  className,
  children,
}) => {
  return (
    <div className={cn("flex flex-col gap-xs", className)}>
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      {children}
      {helperText && (
        <p id={`${id}-helper`} className={fieldMessageVariants({ intent: "helper" })}>
          {helperText}
        </p>
      )}
      {success && !error && (
        <p id={`${id}-success`} className={fieldMessageVariants({ intent: "success" })}>
          {success}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className={fieldMessageVariants({ intent: "error" })}>
          {error}
        </p>
      )}
    </div>
  );
};

Field.displayName = "Field";
