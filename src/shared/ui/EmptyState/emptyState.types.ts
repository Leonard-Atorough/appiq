import type { VariantProps } from "class-variance-authority";
import type { emptyStateVariants } from "./emptyState.variants";

export interface EmptyStateProps extends VariantProps<typeof emptyStateVariants> {
  /** Primary heading. */
  title?: string;
  /** Supporting text shown below the title. */
  description?: string;
  /** Illustrative icon displayed above the title. */
  icon?: React.ReactNode;
  /** Primary CTA. Pass action node or use object with label + onClick for convenience. */
  action?: React.ReactNode | { label: string; onClick: () => void };
  /** Additional CSS classes to apply to the root element. */
  className?: string;
}
