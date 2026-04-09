import { cva } from "class-variance-authority";

export const inputVariants = cva(
  [
    "flex items-center rounded-(--radius-md)",
    "border border-(--color-border) bg-(--color-surface)",
    "px-(--spacing-md) py-(--spacing-sm) text-(--font-size-sm)",
    "transition-colors transition-shadow duration-200 ease-out",
    "focus-within:ring-2 focus-within:ring-(--color-primary) focus-within:ring-offset-1",
    "shadow-sm focus-within:shadow-md active:shadow-lg",
    "active:scale-[0.98]",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-8 px-(--spacing-sm)",
        md: "h-10 px-(--spacing-md)",
        lg: "h-12 px-(--spacing-lg) text-base",
      },
      state: {
        default: "focus-within:ring-(--color-primary) hover:border-(--color-primary)",
        error:
          "border-(--color-error) focus-within:ring-(--color-error) focus-within:ring-offset-1",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  },
);
