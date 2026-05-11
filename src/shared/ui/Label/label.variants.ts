import { cva } from "class-variance-authority";

export const labelVariants = cva("font-medium text-primary", {
  variants: {
    required: {
      true: "after:content-['*'] after:ml-xs after:text-error",
    },
  },
  defaultVariants: {
    required: false,
  },
});
