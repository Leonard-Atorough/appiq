import { cva } from "class-variance-authority";

export const dropdownMenuVariants = cva(
  [
    "z-50 min-w-[10rem]",
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
    "px-sm py-xs text-sm rounded-md",
    "transition-all duration-100",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "cursor-pointer",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "text-base hover:bg-muted",
        danger: "text-error hover:bg-error-light",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
