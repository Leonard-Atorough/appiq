import type { VariantProps } from "class-variance-authority";
import type { ResponsiveValue } from "@/shared/lib";
import type { tagVariants } from "./tag.variants";

export interface TagAction {
  /** Stable identifier for React reconciliation. Defaults to `label` if not provided. */
  id?: string;
  /** Button label text. */
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Tag — Semantic chip/tag component with slot-based composition
 *
 * Structure: [startAdornment] + label + [actions] + [deleteIcon]
 * - Orchestrates a fixed layout with optional visual embellishments
 * - Semantically equivalent to MUI Chip component
 */
export interface TagProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, "children">,
    Omit<VariantProps<typeof tagVariants>, "variant" | "size" | "rounded"> {
  /** Color treatment matching semantic intent. */
  variant?: ResponsiveValue<"default" | "success" | "error" | "warning" | "info">;
  /** Renders border-only with no fill. */
  outlined?: boolean;
  /** Controls padding and font size. */
  size?: ResponsiveValue<"sm" | "md" | "lg">;
  /** Badge text content (required). */
  label: React.ReactNode;
  /** Optional icon/avatar rendered to the left of the label. */
  startAdornment?: React.ReactNode;
  /** Callback fired when the delete button is clicked. Hides the delete button if not provided. */
  onDismiss?: () => void;
  /** Custom delete button content. Defaults to "✕". Only rendered when `onDismiss` is provided. */
  deleteIcon?: React.ReactNode;
  /** `true` = pill shape; `false` = default corner radius. */
  rounded?: ResponsiveValue<boolean>;
  /** Inline action buttons inside the tag. Rendered as `<button>` elements inside a `<span>` container to avoid invalid nested-button HTML. */
  actions?: TagAction[];
}
