import type React from "react";

export interface FieldProps {
  /** The id of the form control this field wraps. Used to wire htmlFor on the label and to generate aria IDs for messages. */
  id: string;
  /** Label content. Rendered via the shared Label component with htmlFor={id}. Accepts any ReactNode so you can pass a string, a JSX badge, etc. */
  label?: React.ReactNode;
  /** Error message. Rendered with role="alert" and id="${id}-error". Suppresses success when present. */
  error?: React.ReactNode;
  /** Helper text rendered below the control. Always visible. id="${id}-helper". */
  helperText?: React.ReactNode;
  /** Success message rendered below the control. Hidden when error is present. id="${id}-success". */
  success?: React.ReactNode;
  /** Marks the label with a required indicator. */
  required?: boolean;
  /** Additional className for the outer wrapper div. */
  className?: string;
  children: React.ReactNode;
}
