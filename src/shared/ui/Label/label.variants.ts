import { cva } from "class-variance-authority";

export const labelVariants = cva("text-sm font-medium text-primary", {
  variants: {
    required: {
      true: "after:content-['*'] after:ml-0.5 after:text-error",
    },
  },
  defaultVariants: {
    required: false,
  },
});
