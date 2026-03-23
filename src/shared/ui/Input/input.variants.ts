import { cva } from "class-variance-authority";

export const inputVariants = cva(
  "flex items-center rounded-md border border-(--color-border) bg-(--color-surface) px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-(--color-primary) focus-within:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 px-2",
        md: "h-10 px-3",
        lg: "h-12 px-4 text-base",
      },
      state: {
        default: "focus-within:ring-(--color-primary)",
        error: "border-(--color-error) focus-within:ring-(--color-error)",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  },
);
