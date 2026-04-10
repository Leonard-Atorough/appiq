export interface TextareaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size"
> {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline" | "ghost";
  full?: boolean;

  resize?: "none" | "both" | "horizontal" | "vertical";

  autoGrow?: boolean;
  minRows?: number;
  maxRows?: number;

  showCharacterCount?: boolean;

  label?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;

  wrapperClassName?: string; // If adornments are used, this can be used to style the wrapper div
}
