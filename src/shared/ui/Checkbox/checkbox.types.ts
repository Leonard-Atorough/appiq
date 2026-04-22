import type { VariantProps } from "class-variance-authority";
import type { checkboxBoxVariants } from "./checkbox.variants";

export interface CheckboxProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    VariantProps<typeof checkboxBoxVariants> {
  /**
   * Label text rendered next to the checkbox.
   */
  label?: React.ReactNode;

  /**
   * Helper or description text rendered below the label.
   */
  description?: string;

  /**
   * Error message rendered below the label. Also sets state="error" visually.
   */
  errorMessage?: string;

  /**
   * Indeterminate state — rendered as a dash. Sets `indeterminate` on the underlying <input> imperatively (not a native HTML attribute).
   */
  indeterminate?: boolean;
}
