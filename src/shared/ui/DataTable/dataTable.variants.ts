import { cva } from "class-variance-authority";

/**
 * DataTable header cell variants
 * Sticky positioning, semantic colors, and size-based padding
 */
export const dataTableHeadVariants = cva(
  [
    "px-md font-semibold text-secondary",
    "bg-muted border-b border-base",
    "text-left text-sm uppercase tracking-wide",
    "transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "py-xs text-xs",
        md: "py-sm text-sm",
        lg: "py-md text-base",
      },
      variant: {
        default: "bg-muted",
        compact: "bg-muted py-xs",
        minimal: "bg-transparent border-b-2 border-base",
      },
      sticky: {
        true: "sticky top-0 z-10",
      },
      sortable: {
        true: "cursor-pointer hover:bg-muted hover:shadow-sm select-none transition-shadow duration-200",
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
  ["border-b border-base", "transition-all duration-200"].join(" "),
  {
    variants: {
      variant: {
        default: "bg-surface",
        compact: "bg-surface",
        minimal: "bg-transparent",
      },
      striped: {
        true: "[&:nth-child(even)]:bg-muted",
      },
      hoverable: {
        true: "hover:bg-muted hover:shadow-sm cursor-pointer transition-shadow duration-200",
      },
      selected: {
        true: "bg-primary/10 hover:bg-primary/10 ring-2 ring-primary/50 ring-inset",
      },
      focused: {
        true: "ring-inset ring-2 ring-primary",
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
    "px-md text-secondary whitespace-nowrap overflow-hidden text-ellipsis",
    "transition-all duration-200",
    "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "py-xs text-xs",
        md: "py-sm text-sm",
        lg: "py-md text-base",
      },
      variant: {
        default: "bg-inherit",
        compact: "bg-inherit py-xs",
        minimal: "bg-inherit border-b border-muted",
      },
      muted: {
        true: "text-muted",
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
    "bg-surface",
    "rounded-lg overflow-hidden border border-base",
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
