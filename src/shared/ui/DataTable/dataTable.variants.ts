import { cva } from "class-variance-authority";

/**
 * DataTable header cell variants
 * Sticky positioning, semantic colors, and size-based padding
 */
export const dataTableHeadVariants = cva(
  [
    "px-(--spacing-md) font-semibold text-(--color-text)",
    "bg-(--color-muted-bg) border-b border-(--color-border)",
    "text-left text-(--font-size-sm) uppercase tracking-(--tracking-wide)",
    "transition-colors duration-200",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "py-(--spacing-xs) text-(--font-size-xs)",
        md: "py-(--spacing-sm) text-(--font-size-sm)",
        lg: "py-(--spacing-md) text-(--font-size-base)",
      },
      variant: {
        default: "bg-(--color-muted-bg)",
        compact: "bg-(--color-muted-bg) py-(--spacing-xs)",
        minimal: "bg-transparent border-b-2 border-(--color-border)",
      },
      sticky: {
        true: "sticky top-0 z-10",
      },
      sortable: {
        true: "cursor-pointer hover:bg-(--color-border-muted) select-none",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
      sticky: true,
      sortable: false,
    },
  },
);

/**
 * DataTable body row variants
 * Striping, hover states, selection states, and focus indicators
 */
export const dataTableRowVariants = cva(
  ["border-b border-(--color-border)", "transition-colors duration-200"].join(" "),
  {
    variants: {
      variant: {
        default: "bg-(--color-surface)",
        compact: "bg-(--color-surface)",
        minimal: "bg-transparent",
      },
      striped: {
        true: "[&:nth-child(even)]:bg-(--color-muted-bg)",
      },
      hoverable: {
        true: "hover:bg-(--color-border-muted) cursor-pointer",
      },
      selected: {
        true: "bg-(--color-primary-light) hover:bg-(--color-primary-light)",
      },
      focused: {
        true: "ring-inset ring-2 ring-(--color-primary)",
      },
    },
    defaultVariants: {
      variant: "default",
      striped: false,
      hoverable: true,
      selected: false,
      focused: false,
    },
  },
);

/**
 * DataTable cell variants
 * Semantic colors, size-based padding, and text overflow handling
 */
export const dataTableCellVariants = cva(
  [
    "px-(--spacing-md) text-(--color-text) whitespace-nowrap overflow-hidden text-ellipsis",
    "transition-colors duration-200",
    "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-(--color-primary)",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "py-(--spacing-xs) text-(--font-size-xs)",
        md: "py-(--spacing-sm) text-(--font-size-sm)",
        lg: "py-(--spacing-md) text-(--font-size-base)",
      },
      variant: {
        default: "bg-inherit",
        compact: "bg-inherit py-(--spacing-xs)",
        minimal: "bg-inherit border-b border-(--color-border-muted)",
      },
      muted: {
        true: "text-(--color-text-muted)",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
      muted: false,
    },
  },
);

/**
 * DataTable wrapper (table element) variants
 * Controls table layout and border collapse
 */
export const dataTableVariants = cva(
  [
    "w-full border-collapse text-left",
    "bg-(--color-surface)",
    "rounded-(--radius-lg) overflow-hidden border border-(--color-border)",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "shadow-sm",
        compact: "shadow-xs",
        minimal: "border-transparent shadow-none",
      },
      stickyHeader: {
        true: "overflow-y-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      stickyHeader: false,
    },
  },
);
