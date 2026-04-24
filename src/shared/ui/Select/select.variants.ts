import { cva } from "class-variance-authority";

export const selectVariants = cva(
  [
    "appearance-none flex items-center rounded-md",
    "border border-base bg-surface text-base",
    "px-md py-sm text-sm",
    "transition-all transition-shadow duration-200 ease-out",
    "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
    "hover:shadow-md hover:border-primary",
    "shadow-sm focus-visible:shadow-md",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "w-full",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-8 px-sm text-xs",
        md: "h-10 px-md text-sm",
        lg: "h-12 px-lg text-base",
      },
      state: {
        default: "focus-visible:ring-primary",
        error: "border-2 border-error focus-visible:ring-error",
        success: "border-2 border-success focus-visible:ring-success",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  },
);
