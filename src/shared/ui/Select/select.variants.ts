import { cva } from "class-variance-authority";

export const selectVariants = cva(
  [
    "appearance-none flex items-center rounded-md",
    "border border-(--color-border) bg-(--color-surface) text-(--color-text)",
    "px-(--spacing-md) py-(--spacing-sm) text-sm",
    "transition-colors transition-shadow duration-200 ease-out",
    "focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-1",
    "hover:shadow-md hover:border-(--color-primary)",
    "shadow-sm focus-visible:shadow-md active:shadow-lg",
    "active:scale-[0.98]",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-8 px-(--spacing-sm) text-(--font-size-xs)",
        md: "h-10 px-(--spacing-md) text-(--font-size-sm)",
        lg: "h-12 px-(--spacing-lg) text-(--font-size-base)",
      },
      state: {
        default: "focus-visible:ring-(--color-primary)",
        error: "border-2 border-(--color-error) focus-visible:ring-(--color-error)",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  },
);
