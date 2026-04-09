import type { VariantProps } from "class-variance-authority";
import type { badgeVariants } from "./badge.variants";

export interface BadgeAction {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/** Badge component props */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof badgeVariants> {
  variant?: "default" | "success" | "error" | "warning" | "info";
  outline?: boolean;
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  dismissable?: boolean;
  onDismiss?: () => void;
  rounded?: boolean;
  /** Inline action buttons rendered inside the badge */
  actions?: BadgeAction[];
}
