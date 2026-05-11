import type { ResponsiveValue } from "@/shared/lib";

export interface EmptyStateProps {
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
  /** Size can be responsive. */
  size?: ResponsiveValue<"sm" | "md" | "lg">;
  /** Variant can be responsive. */
  variant?: ResponsiveValue<"default" | "muted">;
}
