import { cva } from "class-variance-authority";

export const selectVariants = cva(
  "flex items-center rounded-md border border-(--color-border) bg-(--color-surface) px-3 py-2 text-sm focus:ring-2 focus:ring-(--color-primary) focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 px-2",
        md: "h-10 px-3",
        lg: "h-12 px-4 text-base",
      },
      state: {
        default: "focus:ring-(--color-primary)",
        error: "border-(--color-error) focus:ring-(--color-error)",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  },
);
