import type { VariantProps } from "class-variance-authority";
import type { emptyStateVariants } from "./emptyState.variants";

export interface EmptyStateProps extends VariantProps<typeof emptyStateVariants> {
  /** Primary heading. */
  title?: string;
  /** Supporting text shown below the title. */
  description?: string;
  /** Illustrative icon displayed above the title. */
  icon?: React.ReactNode;
  /** Primary CTA button. Provide `label` and `onClick`. */
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}
