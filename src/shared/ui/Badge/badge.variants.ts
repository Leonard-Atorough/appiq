import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  [
    "inline-flex items-center font-medium",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-(--color-primary)",
    "active:scale-[0.98]",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "rounded-full",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-muted shadow-sm hover:shadow-md hover:brightness-110",
        success: "bg-success shadow-sm hover:shadow-md hover:brightness-110",
        error: "bg-error shadow-sm hover:shadow-md hover:brightness-110",
        warning: "bg-warning shadow-sm hover:shadow-md hover:brightness-110",
        info: "bg-info shadow-sm hover:shadow-md hover:brightness-110",
      },
      outline: {
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
      {
        outline: true,
        variant: "default",
        className: "border-base text-(--color-text) hover:bg-muted/5",
      },
      {
        outline: true,
        variant: "success",
        className: "border-success text-success hover:bg-success/5",
      },
      {
        outline: true,
        variant: "error",
        className: "border-error text-error hover:bg-error/5",
      },
      {
        outline: true,
        variant: "warning",
        className: "border-warning text-warning hover:bg-warning/5",
      },
      {
        outline: true,
        variant: "info",
        className: "border-info text-info hover:bg-info/5",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: true,
      outline: false,
    },
  },
);
