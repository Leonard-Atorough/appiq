import type { VariantProps } from "class-variance-authority";
import type { checkboxBoxVariants } from "./toggle.variants";

export interface ToggleProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    VariantProps<typeof checkboxBoxVariants> {
  /**
   * Label text rendered next to the toggle.
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
   * Only applies when type="checkbox".
   */
  indeterminate?: boolean;

  /**
   * Control type: "checkbox" renders a square box with check/minus icon;
   * "switch" renders a track with sliding thumb. Defaults to "checkbox".
   */
  type?: "checkbox" | "switch";
}
