import type { VariantProps } from "class-variance-authority";
import type { ResponsiveValue } from "@/shared/lib";
import type { badgeVariants } from "./badge.variants";

export interface BadgeAction {
  /** Stable identifier for React reconciliation. Defaults to `label` if not provided. */
  id?: string;
  /** Button label text. */
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLElement>, never>,
    Omit<VariantProps<typeof badgeVariants>, "variant" | "size" | "rounded"> {
  /** Color treatment matching semantic intent. */
  variant?: ResponsiveValue<"default" | "success" | "error" | "warning" | "info">;
  /** Renders border-only with no fill. */
  outline?: boolean;
  /** Controls padding and font size. */
  size?: ResponsiveValue<"sm" | "md" | "lg">;
  /** Node rendered to the left of the label text. */
  icon?: React.ReactNode;
  /** Required when `dismissable` is true. */
  onDismiss?: () => void;
  /** `true` = pill shape; `false` = default corner radius. */
  rounded?: ResponsiveValue<boolean>;
  /** Inline action buttons inside the badge. Rendered as `<button>` elements inside a `<span>` container to avoid invalid nested-button HTML. */
  actions?: BadgeAction[];
}
