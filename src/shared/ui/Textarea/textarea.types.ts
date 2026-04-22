export interface TextareaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size"
> {
  /** Control padding and font size. */
  size?: "sm" | "md" | "lg";
  /** Background and border style. */
  variant?: "primary" | "secondary" | "outline" | "ghost";
  /**
   * Visual feedback variant. Automatically derived from `error`/`success` props —
   * only set this explicitly when you need visual state without message text.
   */
  state?: "default" | "error" | "success";
  /** Sets `w-full` on the textarea element. */
  full?: boolean;
  /** CSS `resize` behaviour. Defaults to `"vertical"`. */
  resize?: "none" | "both" | "horizontal" | "vertical";
  /** Imperatively adjusts height to fit content on every change. */
  autoGrow?: boolean;
  /** Minimum visible rows. Used as the fixed row count when `autoGrow` is false. */
  minRows?: number;
  /** Maximum rows before overflow scrolls. Only effective when `autoGrow` is true. */
  maxRows?: number;
  /** Shows current character count. Displays `{count} / {max}` when `maxLength` is also set. */
  showCharacterCount?: boolean;
  /** Rendered via `Field` with `htmlFor` wired to the textarea's id. */
  label?: React.ReactNode;
  /** Shown as `role="alert"` below the textarea. Automatically sets `state="error"` and `aria-invalid`. */
  error?: React.ReactNode;
  /** Persistent hint below the textarea. Always visible regardless of error/success state. */
  helperText?: React.ReactNode;
  /** Positive feedback below the textarea. Hidden when `error` is also present. */
  success?: React.ReactNode;
  /** Node positioned inside the textarea on the left. */
  startAdornment?: React.ReactNode;
  /** Node positioned inside the textarea on the right. */
  endAdornment?: React.ReactNode;
  /** Applied to the adornment wrapper div. Has no effect when no adornments are used. */
  wrapperClassName?: string;
}
