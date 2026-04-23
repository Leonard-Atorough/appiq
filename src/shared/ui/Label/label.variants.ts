import { cva } from "class-variance-authority";

export const labelVariants = cva("font-medium text-base", {
  variants: {
    required: {
      true: "after:content-['*'] after:ml-0.5 after:text-error",
    },
  },
  defaultVariants: {
    required: false,
  },
});
