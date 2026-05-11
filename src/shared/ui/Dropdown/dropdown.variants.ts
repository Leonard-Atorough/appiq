import { cva } from "class-variance-authority";

export const dropdownMenuVariants = cva(
  [
    "z-dropdown min-w-[10rem]",
    "bg-surface border border-base rounded-lg shadow-lg",
    "py-xs",
    "focus:outline-none",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const dropdownItemVariants = cva(
  [
    "flex w-full items-center gap-sm",
    "px-sm py-xs text-base rounded-md",
    "transition-all duration-fast",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
    "disabled:opacity-disabled disabled:cursor-not-allowed",
    "cursor-pointer",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "hover:bg-muted",
        danger: "text-error hover:bg-error-light",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
