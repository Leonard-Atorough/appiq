import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center font-medium",
    "transition-all duration-normal ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
    "disabled:opacity-disabled disabled:cursor-not-allowed",
    "shadow-sm hover:shadow-md active:shadow-lg",
    "active:scale-[0.98]",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-primary hover:bg-primary-hover active:bg-primary-active",
          "text-primary-foreground",
          "focus-visible:ring-primary",
        ].join(" "),
        secondary: [
          "bg-secondary hover:bg-secondary-hover active:bg-secondary-active",
          "text-secondary-foreground",
          "focus-visible:ring-secondary",
        ].join(" "),
        outline: [
          "border border-base",
          "text-base bg-transparent",
          "hover:bg-muted",
          "active:bg-muted focus-visible:ring-base",
        ].join(" "),
        ghost: [
          "bg-transparent shadow-none",
          "text-base",
          "hover:bg-muted hover:shadow-none",
          "active:bg-muted active:shadow-none",
          "focus-visible:ring-base",
        ].join(" "),
        link: [
          "bg-transparent shadow-none",
          "text-primary-text",
          "hover:underline hover:shadow-none",
          "active:text-primary active:shadow-none",
          "focus-visible:ring-primary",
        ].join(" "),
        danger: [
          "bg-error hover:bg-error active:text-error-foreground",
          "text-error-foreground",
          "focus-visible:ring-error",
        ].join(" "),
      },
      size: {
        sm: "px-sm py-xs text-sm rounded-md",
        md: "px-md py-sm text-md rounded-lg",
        lg: "px-lg py-md text-lg rounded-xl",
      },
      fullWidth: {
        true: "w-full",
      },
      loading: {
        true: "cursor-wait opacity-muted",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);
