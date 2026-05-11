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
    "transition-all duration-normal focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
  ].join(" "),
  {
    variants: {
      textSize: {
        sm: "py-xs text-sm",
        md: "py-sm text-base",
        lg: "py-md text-lg",
      },
      style: {
        default: "",
        minimal: "border-b border-muted",
        full: "border border-base",
      },
      sticky: {
        true: "sticky top-0 z-10",
      },
      sortable: {
        true: "cursor-pointer hover:bg-muted hover:shadow-sm select-none transition-shadow duration-normal",
      },
    },
    defaultVariants: {
      textSize: "md",
      style: "default",
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
  ["border-b border-base", "transition-all duration-normal"].join(" "),
  {
    variants: {
      style: {
        default: "",
        minimal: "border-b border-muted",
        full: "border border-base [&:first-child]:border-t-0 [&:last-child]:border-b-0",
      },
      hoverable: {
        true: "hover:bg-muted hover:shadow-sm cursor-pointer transition-shadow duration-normal",
      },
      selected: {
        true: "bg-primary/10 hover:bg-primary/10 ring-2 ring-primary/50 ring-inset",
      },
      focused: {
        true: "ring-inset ring-2 ring-primary",
      },
    },
    defaultVariants: {
      style: "default",
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
    "px-md whitespace-nowrap overflow-hidden text-ellipsis",
    "transition-all duration-normal",
    "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
  ].join(" "),
  {
    variants: {
      textSize: {
        sm: "py-xs text-xs",
        md: "py-sm text-sm",
        lg: "py-md text-base",
      },
      style: {
        default: "",
        minimal: "border-b border-muted",
        full: "border border-base [&:first-child]:border-t-0 [&:last-child]:border-b-0",
      },
      // For cells that should have muted/less prominent text (e.g. secondary info columns)
       
      muted: {
        true: "text-muted",
      },
    },
    defaultVariants: {
      textSize: "md",
      style: "default",
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
      style: {
        default: "",
        minimal: "border-none",
        full: "border-spacing-0 [&_td]:border [&_td]:border-base [&_th]:border [&_th]:border-base [&_td:first-child]:border-l-0 [&_td:last-child]:border-r-0 [&_th:first-child]:border-l-0 [&_th:last-child]:border-r-0",
      },
      density: {
        condensed: "[&_td]:py-xs [&_th]:py-xs",
        normal: "[&_td]:py-sm [&_th]:py-sm",
        spacious: "[&_td]:py-md [&_th]:py-md",
      },
      striped: {
        true: "[&_tr:nth-child(even)]:bg-muted",
      },
      stickyHeader: {
        true: "overflow-y-auto",
      },
    },
    defaultVariants: {
      style: "default",
      density: "normal",
      stickyHeader: false,
    },
  },
);
