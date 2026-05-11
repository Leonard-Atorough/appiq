import { cva } from "class-variance-authority";

export const dividerVariants = cva("flex-shrink-0 bg-border-base", {
  variants: {
    direction: {
      horizontal: "h-[1px] w-full",
      vertical: "w-[1px] h-full",
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
      solid: "border-t",
      dashed: "border-t border-t-border-base border-dashed",
      dotted: "border-t border-t-border-base border-dotted",
    },
    fullSize: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    // Vertical dividers with appearance variants should use border-l instead of border-t
    {
      direction: "vertical",
      appearance: "solid",
      className: "border-t-0 border-l border-l-border-base",
    },
    {
      direction: "vertical",
      appearance: "dashed",
      className: "border-t-0 border-l border-l-border-base border-dashed",
    },
    {
      direction: "vertical",
      appearance: "dotted",
      className: "border-t-0 border-l border-l-border-base border-dotted",
    },
  ],
  defaultVariants: {
    direction: "horizontal",
    size: "sm",
    spacing: "md",
    color: "base",
    appearance: "solid",
    fullSize: true,
  },
});
