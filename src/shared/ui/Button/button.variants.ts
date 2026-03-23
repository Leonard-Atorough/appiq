import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-(--color-primary) text-(--color-primary-foreground) hover:bg-(--color-primary-hover) active:bg-(--color-primary-active) focus-visible:ring-(--color-primary)",
        secondary:
          "bg-(--color-secondary) text-(--color-secondary-foreground) hover:bg-(--color-secondary-hover) active:bg-(--color-secondary-active) focus-visible:ring-(--color-secondary)",
        outline:
          "border border-(--color-border) text-(--color-text) bg-transparent hover:bg-muted active:bg-(--gray-200) focus-visible:ring-(--color-border)",
        ghost:
          "bg-transparent text-(--color-text) hover:bg-muted active:bg-(--gray-200) focus-visible:ring-(--color-text)",
        link: "bg-transparent text-(--color-primary) hover:underline active:text-(--color-primary-active) focus-visible:ring-(--color-primary)",
      },
      size: {
        sm: "px-sm py-xs text-sm rounded-md",
        md: "px-md py-sm text-base rounded-lg",
        lg: "px-lg py-md text-lg rounded-xl",
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
