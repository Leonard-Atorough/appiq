import { cva } from "class-variance-authority";

export const dividerVariants = cva("flex-shrink-0 bg-border-base", {
  variants: {
    direction: {
      horizontal: "h-[1px] w-full",
      vertical: "h-full w-[1px]",
    },
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
    },
    spacing: {
      none: "",
      xs: "my-xs",
      sm: "my-sm",
      md: "my-md",
      lg: "my-lg",
      xl: "my-xl",
    },
    color: {
      base: "bg-border-base",
      muted: "bg-border-muted",
    },
    appearance: {
      solid: "",
      dashed: "border-t border-t-border-base border-dashed",
      dotted: "border-t border-t-border-base border-dotted",
    },
    fullSize: {
      true: "",
      false: "",
    },
  },
  defaultVariants: {
    direction: "horizontal",
    size: "sm",
    spacing: "md",
    color: "base",
    appearance: "solid",
    fullSize: true,
  },
});
