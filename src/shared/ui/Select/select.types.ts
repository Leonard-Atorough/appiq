import type { ResponsiveValue } from "@/shared/lib";

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  /**
   * Visual feedback variant. Automatically derived from `error`/`success` props —
   * only set this explicitly when you need visual state without message text.
   */
  state?: "default" | "error" | "success";
  /** Control height and font size. */
  size?: ResponsiveValue<"sm" | "md" | "lg">;
  /** Rendered via `Field` with `htmlFor` wired to the select's id. */
  label?: React.ReactNode;
  /** Shown as `role="alert"` below the select. Automatically sets `state="error"` and `aria-invalid`. */
  error?: React.ReactNode;
  /** Persistent hint below the select. Always visible regardless of error/success state. */
  helperText?: React.ReactNode;
  /** Positive feedback below the select. Hidden when `error` is also present. */
  success?: React.ReactNode;
  /** Node positioned inside the select on the left (e.g. search icon). */
  startAdornment?: React.ReactNode;
  /** Node positioned inside the select on the right (e.g. custom chevron). */
  endAdornment?: React.ReactNode;
  /** Applied to the adornment wrapper div. Has no effect when no adornments are used. */
  wrapperClassName?: string;
}
