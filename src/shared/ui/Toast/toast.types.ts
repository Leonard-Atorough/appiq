export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Semantic colour treatment. Default: "default". */
  variant?: "default" | "success" | "error" | "warning" | "info";
  /** Main notification message. */
  title: string;
  /** Optional supporting detail shown below the title. */
  description?: string;
  /** Inline CTA button rendered in the toast body. */
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Milliseconds before auto-dismiss. Set to `0` to disable auto-dismiss. */
  duration?: number;
  /** Overrides the default variant icon. */
  icon?: React.ReactNode;
  /** Fired when dismissed, either by timeout or user action. */
  onDismiss?: () => void;
}
