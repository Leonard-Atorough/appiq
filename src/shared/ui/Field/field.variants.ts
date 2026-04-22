import { cva } from "class-variance-authority";

export const fieldMessageVariants = cva("text-sm", {
  variants: {
    intent: {
      helper: "text-muted",
      error: "text-error-text",
      success: "text-success-text",
    },
  },
});
