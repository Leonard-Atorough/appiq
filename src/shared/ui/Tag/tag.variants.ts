import { cva } from "class-variance-authority";

export const tagVariants = cva(
  [
    "inline-flex items-center font-medium",
    "transition-all duration-normal",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-(--color-primary)",
    "active:scale-[0.98]",
    "disabled:opacity-disabled disabled:cursor-not-allowed",
    "rounded-full",
    "shadow-sm hover:shadow-md hover:brightness-110",
  ].join(" "),
  {
    variants: {
      color: {
        default: "bg-muted",
        success: "bg-success",
        error: "bg-error",
        warning: "bg-warning",
        info: "bg-info",
      },
      outlined: {
        true: "bg-transparent border",
        false: "",
      },
      size: {
        sm: "px-sm py-xs text-xs",
        md: "px-sm py-xs text-sm",
        lg: "px-md py-xs text-base",
      },
      rounded: {
        true: "rounded-full",
        false: "rounded-md",
      },
    },
    compoundVariants: [
      /* Solid variant foregrounds */
      {
        outlined: false,
        color: "success",
        className: "text-success-foreground",
      },
      {
        outlined: false,
        color: "warning",
        className: "text-warning-foreground",
      },
      {
        outlined: false,
        color: "error",
        className: "text-error-foreground",
      },
      {
        outlined: false,
        color: "info",
        className: "text-info-foreground",
      },
      /* Outline variant foregrounds */
      {
        outlined: true,
        color: "default",
        className: "border-base text-base hover:bg-muted/5",
      },
      {
        outlined: true,
        color: "success",
        className: "border-success text-success hover:bg-success/5",
      },
      {
        outlined: true,
        color: "error",
        className: "border-error text-error hover:bg-error/5",
      },
      {
        outlined: true,
        color: "warning",
        className: "border-warning text-warning hover:bg-warning/5",
      },
      {
        outlined: true,
        color: "info",
        className: "border-info text-info hover:bg-info/5",
      },
    ],
    defaultVariants: {
      color: "default",
      size: "md",
      rounded: true,
      outlined: false,
    },
  },
);
