import type { VariantProps } from "class-variance-authority";
import type { selectVariants } from "./select.variants";

export interface SelectProps
  extends
    Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof selectVariants> {
  state?: "default" | "error" | "success";
  size?: "sm" | "md" | "lg";
  label?: React.ReactNode;
  error?: React.ReactNode;
  helperText?: React.ReactNode;
  success?: React.ReactNode;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  wrapperClassName?: string;
}
