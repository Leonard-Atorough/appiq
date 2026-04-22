import React from "react";
import { cn } from "@/shared/lib/cn";
import { Label } from "@/shared/ui/Label";
import { fieldMessageVariants } from "./field.variants";
import type { FieldProps } from "./field.types";

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
