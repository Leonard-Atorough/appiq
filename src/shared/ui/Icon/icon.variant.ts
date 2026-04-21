import { cva } from "class-variance-authority";

export const iconVariants = cva("", {
  variants: {
    size: {
      xs: "w-xs h-xs",
      sm: "w-sm h-sm",
      md: "w-md h-md",
      lg: "w-lg h-lg",
      xl: "w-xl h-xl",
      xxl: "w-2xl h-2xl",
      xxxl: "w-3xl h-3xl",
    },
    variant: {
      default: "text-(--color-text)",
      muted: "text-(--color-text-muted)",
      primary: "text-primary",
      secondary: "text-secondary",
      success: "text-success",
      error: "text-error",
      warning: "text-warning",
      info: "text-info",
    },
  },
  defaultVariants: { size: "md", variant: "default" },
});
