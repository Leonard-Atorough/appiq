import { cva } from "class-variance-authority";

export const tagVariants = cva(
  [
    "inline-flex items-center font-medium",
    "transition-all duration-normal",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-(--color-primary)",
    "active:scale-[0.98]",
    "disabled:opacity-disabled disabled:cursor-not-allowed",
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
        variant: "success",
        className: "text-(--color-success-foreground)",
      },
      {
        outlined: false,
        variant: "warning",
        className: "text-(--color-warning-foreground)",
      },
      {
        outlined: false,
        variant: "error",
        className: "text-(--color-error-foreground)",
      },
      {
        outlined: false,
        variant: "info",
        className: "text-(--color-info-foreground)",
      },
      /* Outline variant foregrounds */
      {
        outlined: true,
        variant: "default",
        className: "border-base text-(--color-text) hover:bg-muted/5",
      },
      {
        outlined: true,
        variant: "success",
        className: "border-success text-success-text hover:bg-success/5",
      },
      {
        outlined: true,
        variant: "error",
        className: "border-error text-error-text hover:bg-error/5",
      },
      {
        outlined: true,
        variant: "warning",
        className: "border-warning text-warning-text hover:bg-warning/5",
      },
      {
        outlined: true,
        variant: "info",
        className: "border-info text-info-text hover:bg-info/5",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: true,
      outlined: false,
    },
  },
);
