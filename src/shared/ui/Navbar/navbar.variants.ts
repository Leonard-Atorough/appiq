import { cva } from "class-variance-authority";

export const navbarVariants = cva(
  [
    "flex items-center gap-md",
    "border-b border-border",
    "bg-surface",
    "transition-all duration-200 ease-out",
  ].join(" "),
  {
    variants: {
      position: {
        static: "static",
        sticky: "sticky top-0 z-40",
        fixed: "fixed top-0 left-0 right-0 z-40",
      },
      size: {
        sm: "px-md py-sm",
        md: "px-lg py-md",
        lg: "px-2xl py-lg",
      },
    },
    defaultVariants: {
      position: "static",
      size: "md",
    },
  },
);

export const navbarMenuVariants = cva("flex-1 flex items-center", {
  variants: {
    menuPosition: {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
    },
  },
  defaultVariants: {
    menuPosition: "left",
  },
});
