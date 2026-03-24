import { cva } from "class-variance-authority";

export const textareaVariants = cva(
  [
    "block w-full font-medium transition-colors duration-250 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "rounded-lg",
    "min-h-[2.5rem]",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: "bg-(--color-bg) border border-(--color-border) text-(--color-text) focus-visible:ring-(--color-primary)",
        secondary: "bg-(--color-secondary) border border-(--color-secondary-border) text-(--color-secondary-foreground) focus-visible:ring-(--color-secondary)",
        outline: "bg-transparent border border-(--color-border) text-(--color-text) focus-visible:ring-(--color-border)",
        ghost: "bg-transparent border-none text-(--color-text) focus-visible:ring-(--color-primary)",
      },
      size: {
        sm: "text-sm px-sm py-xs rounded-md",
        md: "text-base px-md py-sm rounded-lg",
        lg: "text-lg px-lg py-md rounded-xl",
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
