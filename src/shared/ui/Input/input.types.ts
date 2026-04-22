import type { VariantProps } from "class-variance-authority";
import type { inputVariants } from "./input.variants";

export interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  state?: "default" | "error" | "success";
  size?: "sm" | "md" | "lg";
  label?: React.ReactNode;
  error?: React.ReactNode;
  helperText?: React.ReactNode;
  success?: React.ReactNode;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  wrapperClassName?: string; // className for the outer wrapper, to allow styling the adornments. does nothing if no adornments are used.
}
