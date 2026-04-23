import { cva } from "class-variance-authority";

export const fieldMessageVariants = cva("text-sm mt-sm", {
  variants: {
    intent: {
      helper: "text-muted",
      error: "text-error-text font-medium",
      success: "text-success-text",
    },
  },
});
