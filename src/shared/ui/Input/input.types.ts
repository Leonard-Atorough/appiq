import type { VariantProps } from "class-variance-authority";
import type { inputVariants } from "./input.variants";

export interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  /**
   * Visual feedback variant. Automatically derived from `error`/`success` props —
   * only set this explicitly when you need visual state without message text.
   */
  state?: "default" | "error" | "success";
  /** Control height and padding. */
  size?: "sm" | "md" | "lg";
  /** Rendered via `Field` with `htmlFor` wired to the input's id. */
  label?: React.ReactNode;
  /** Shown as `role="alert"` below the input. Automatically sets `state="error"` and `aria-invalid`. */
  error?: React.ReactNode;
  /** Persistent hint below the input. Always visible regardless of error/success state. */
  helperText?: React.ReactNode;
  /** Positive feedback below the input. Hidden when `error` is also present. */
  success?: React.ReactNode;
  /** Node positioned inside the input on the left (e.g. currency symbol, icon). */
  startAdornment?: React.ReactNode;
  /** Node positioned inside the input on the right (e.g. unit, shortcut hint). */
  endAdornment?: React.ReactNode;
  /** Applied to the adornment wrapper div. Has no effect when no adornments are used. */
  wrapperClassName?: string;
}
