import { cva } from "class-variance-authority";

export const textVariants = cva("", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
    weight: {
      normal: "font-normal",
      semibold: "font-semibold",
    },
    color: {
      default: "text-foreground",
      muted: "text-muted",
      secondary: "text-secondary",
    },
    truncate: {
      true: "truncate",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    weight: "normal",
    color: "default",
    truncate: false,
  },
});
