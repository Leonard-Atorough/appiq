import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center font-medium",
    "transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-(--color-primary)",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "shadow-sm hover:shadow-md active:shadow-lg",
    "active:scale-[0.98]",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          // Optionally use a gradient background if supported by your tokens
          "bg-gradient-to-br from-(--color-primary) to-(--color-primary-hover)",
          "text-(--color-primary-foreground)",
          "hover:from-(--color-primary-hover) hover:to-(--color-primary)",
          "active:bg-(--color-primary-active)",
          "focus-visible:ring-(--color-primary)",
        ].join(" "),
        secondary: [
          "bg-(--color-secondary)",
          "text-(--color-secondary-foreground)",
          "hover:bg-(--color-secondary-hover)",
          "active:bg-(--color-secondary-active)",
          "focus-visible:ring-(--color-secondary)",
        ].join(" "),
        outline: [
          "border border-base",
          "text-(--color-text)",
          "bg-transparent",
          "hover:bg-muted",
          "active:bg-(--color-border-muted)",
          "focus-visible:ring-(--color-border)",
        ].join(" "),
        ghost: [
          "bg-transparent",
          "text-(--color-text)",
          "hover:bg-muted",
          "active:bg-(--color-border-muted)",
          "focus-visible:ring-(--color-text)",
        ].join(" "),
        link: [
          "bg-transparent",
          "shadow-none",
          "text-(--color-primary-text)",
          "hover:underline hover:text-(--color-primary-text) hover:shadow-none",
          "active:text-(--color-primary-active) active:shadow-none",
          "focus-visible:ring-(--color-primary)",
        ].join(" "),
        danger: [
          "bg-(--color-error)",
          "text-(--color-error-foreground)",
          "hover:bg-(--color-error-hover)",
          "active:bg-(--color-error-active)",
          "focus-visible:ring-(--color-error)",
        ].join(" "),
      },
      size: {
        sm: "px-sm py-xs text-sm rounded-md",
        md: "px-md py-sm text-md rounded-lg",
        lg: "px-lg py-md text-md rounded-xl",
      },
      full: {
        true: "w-full",
      },
      loading: {
        true: "cursor-wait opacity-75",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

