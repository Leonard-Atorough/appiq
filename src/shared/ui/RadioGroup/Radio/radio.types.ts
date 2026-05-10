import type React from "react";

export interface RadioProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> {
  /** Label text displayed next to the radio button */
  label?: React.ReactNode;

  /** Optional description or helper text displayed below the label */
  description?: React.ReactNode;

  /** Size variant for the radio button */
  size?: "sm" | "md" | "lg";

  /** Whether the radio is disabled */
  disabled?: boolean;

  /** Whether the radio is required */
  required?: boolean;

  /** Error message to display */
  error?: React.ReactNode;
}
