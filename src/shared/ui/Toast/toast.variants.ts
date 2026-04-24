import { cva } from "class-variance-authority";

export const toastVariants = cva(
  [
    "relative flex items-center justify-between overflow-hidden rounded-md",
    "bg-surface text-base",
    "shadow-lg hover:shadow-xl focus:shadow-2xl",
    "transition-shadow transition-transform duration-200 ease-out",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
    "p-md",
    "border border-base",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        success: "border-success bg-success-light",
        error: "border-error bg-error-light",
        warning: "border-warning bg-warning-light",
        info: "border-info bg-info-light",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
