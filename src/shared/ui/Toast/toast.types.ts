import type { VariantProps } from "class-variance-authority";
import type { toastVariants } from "./toast.variants";

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof toastVariants> {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number; // Duration in milliseconds before auto-dismissal (0 for no auto-dismissal)
  icon?: React.ReactNode;
  onDismiss?: () => void; // Callback when the toast is dismissed (either by timeout or user action)
}
