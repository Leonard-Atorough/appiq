import type { VariantProps } from "class-variance-authority";
import type { badgeVariants } from "./badge.variants";

export interface BadgeAction {
  /** Button label text. */
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface BadgeProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof badgeVariants> {
  /** Color treatment matching semantic intent. */
  variant?: "default" | "success" | "error" | "warning" | "info";
  /** Renders border-only with no fill. */
  outline?: boolean;
  /** Controls padding and font size. */
  size?: "sm" | "md" | "lg";
  /** Node rendered to the left of the label text. */
  icon?: React.ReactNode;
  /** Renders a dismiss (×) button; fires `onDismiss` when clicked. */
  dismissable?: boolean;
  /** Required when `dismissable` is true. */
  onDismiss?: () => void;
  /** `true` = pill shape; `false` = default corner radius. */
  rounded?: boolean;
  /** Inline action buttons inside the badge. Rendered as `<button>` elements inside a `<span>` container to avoid invalid nested-button HTML. */
  actions?: BadgeAction[];
  
}
