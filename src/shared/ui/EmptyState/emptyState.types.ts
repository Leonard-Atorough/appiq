import type { VariantProps } from "class-variance-authority";
import type { emptyStateVariants } from "./emptyState.variants";

export interface EmptyStateProps extends VariantProps<typeof emptyStateVariants> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}
