import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center font-medium",
    "transition-colors transition-shadow transition-transform duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-(--color-primary)",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "shadow-sm hover:shadow-md active:shadow-lg",
    "rounded-(--radius-2xl)",
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
          "border border-(--color-border)",
          "text-(--color-text)",
          "bg-transparent",
          "hover:bg-(--color-muted-bg)",
          "active:bg-(--color-border-muted)",
          "focus-visible:ring-(--color-border)",
        ].join(" "),
        ghost: [
          "bg-transparent",
          "text-(--color-text)",
          "hover:bg-(--color-muted-bg)",
          "active:bg-(--color-border-muted)",
          "focus-visible:ring-(--color-text)",
        ].join(" "),
        link: [
          "bg-transparent",
          "shadow-none",
          "text-(--color-primary)",
          "hover:underline hover:text-(--color-primary-hover) hover:shadow-none",
          "active:text-(--color-primary-active) active:shadow-none",
          "focus-visible:ring-(--color-primary)",
        ].join(" "),
      },
      size: {
        sm: "px-(--spacing-sm) py-(--spacing-xs) text-(--font-size-sm) rounded-(--radius-md)",
        md: "px-(--spacing-md) py-(--spacing-sm) text-(--font-size-base) rounded-(--radius-lg)",
        lg: "px-(--spacing-lg) py-(--spacing-md) text-(--font-size-md) rounded-(--radius-xl)",
      },
      full: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);
