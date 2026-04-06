import type { VariantProps } from "class-variance-authority";
import type { badgeVariants } from "./badge.variants";

/** Badge component props */
export interface BadgeProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof badgeVariants> {
  variant?: "default" | "success" | "error" | "warning" | "info";
  outline?: boolean;
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  dismissable?: boolean;
  onDismiss?: () => void;
  rounded?: boolean;
}
