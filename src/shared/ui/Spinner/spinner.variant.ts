import { cva } from "class-variance-authority";

export const spinnerVariants = cva(
  "animate-spin rounded-full border-solid border-current border-t-transparent",
  {
    variants: {
      size: {
        sm: "h-lg w-lg border-2",
        md: "h-xl w-xl border-4",
        lg: "h-2xl w-2xl border-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);
