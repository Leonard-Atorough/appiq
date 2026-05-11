import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "absolute top-0 right-0 inline-flex items-center justify-center font-semibold rounded-full transition-colors transform translate-x-1/2 -translate-y-1/2 ",
  {
    variants: {
      color: {
        default: "bg-primary-400 text-primary-foreground",
        secondary: "bg-secondary-300 text-secondary-foreground",
        success: "bg-success-light text-dark",
        error: "bg-error-light text-dark",
        warning: "bg-warning-light text-dark",
        info: "bg-info-light text-dark",
      },
      size: {
        sm: "text-xs p-xs min-w-5 min-h-5 w-auto h-5",
        md: "text-sm p-sm min-w-6 min-h-6 w-auto h-6",
        lg: "text-md p-md min-w-7 min-h-7 w-auto h-7",
      },
      variant: {
        dot: "w-2 h-2 p-0",
        standard: "",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-md",
      },
    },
    compoundVariants: [
      // Dot variant uses size to control dot dimensions
      {
        variant: "dot",
        size: "sm",
        className: "w-2 h-2 min-w-2 min-h-2 px-0 py-0",
      },
      {
        variant: "dot",
        size: "md",
        className: "w-3 h-3 min-w-3 min-h-3 px-0 py-0",
      },
      {
        variant: "dot",
        size: "lg",
        className: "w-4 h-4 min-w-4 min-h-4 px-0 py-0",
      },
    ],
    defaultVariants: {
      color: "default",
      size: "md",
      variant: "standard",
      shape: "circle",
    },
  }
);
