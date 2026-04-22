export interface TextareaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size"
> {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline" | "ghost";
  state?: "default" | "error" | "success";
  full?: boolean;

  resize?: "none" | "both" | "horizontal" | "vertical";

  autoGrow?: boolean;
  minRows?: number;
  maxRows?: number;

  showCharacterCount?: boolean;

  label?: React.ReactNode;
  error?: React.ReactNode;
  helperText?: React.ReactNode;
  success?: React.ReactNode;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;

  wrapperClassName?: string; // If adornments are used, this can be used to style the wrapper div
}
