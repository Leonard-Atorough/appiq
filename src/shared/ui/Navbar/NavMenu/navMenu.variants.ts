import { cva } from "class-variance-authority";

/**
 * Styles for individual nav link items.
 * The `active` variant reflects `aria-current="page"` state.
 */
export const navMenuLinkVariants = cva(
  [
    "flex items-center gap-sm",
    "text-sm font-medium",
    "rounded-sm",
    "transition-colors duration-150",
    "hover:text-primary",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
  ].join(" "),
  {
    variants: {
      active: {
        true: "text-primary",
        false: "text-secondary",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);
