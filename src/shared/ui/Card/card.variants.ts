import { cva } from "class-variance-authority";

/**
 * Card component variants
 * Base styles, size variants, and interactive states
 * The card component is an interactive, versatile component that contains content and actions about a single subject. It is drag-drop enabled by default, fits into the established design system and customisable.
 */
export const cardVariants = cva(
  [
    "relative bg-surface border border-base rounded-lg shadow-sm",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-(--color-primary)",
    "hover:cursor-pointer hover:shadow-md active:scale-[0.98]",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "p-sm",
        md: "p-md",
        lg: "p-lg",
      },
      variant: {
        default: "bg-surface",
        elevated: "bg-surface shadow-md",
        outlined: "bg-transparent border-2 border-base",
      },
      interactive: {
        true: "cursor-pointer hover:shadow-md active:scale-[0.98]",
        false: "cursor-default",
      },
      status: {
        none: "border-l-4 border-l-(--color-base) bg-surface",
        success: "border-l-4 border-l-success bg-success-light",
        warning: "border-l-4 border-l-warning bg-warning-light",
        error: "border-l-4 border-l-error bg-error-light",
        info: "border-l-4 border-l-info bg-info-light",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
      interactive: true,
      status: "none",
    },
  },
);
