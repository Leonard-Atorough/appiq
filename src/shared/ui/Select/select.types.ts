import type { VariantProps } from "class-variance-authority";
import type { selectVariants } from "./select.variants";

export interface SelectProps
  extends
    Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof selectVariants> {
  state?: "default" | "error";
  size?: "sm" | "md" | "lg";
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  wrapperClassName?: string;
}
