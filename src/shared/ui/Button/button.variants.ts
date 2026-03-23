import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)] focus-visible:ring-[var(--color-primary)]",
        secondary:
          "bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] hover:bg-[var(--color-secondary-hover)] active:bg-[var(--color-secondary-active)] focus-visible:ring-[var(--color-secondary)]",
        outline:
          "border border-[var(--color-border)] text-[var(--color-text)] bg-transparent hover:bg-muted active:bg-[var(--gray-200)] focus-visible:ring-[var(--color-border)]",
        ghost:
          "bg-transparent text-[var(--color-text)] hover:bg-muted active:bg-[var(--gray-200)] focus-visible:ring-[var(--color-text)]",
        link: "bg-transparent text-[var(--color-primary)] hover:underline active:text-[var(--color-primary-active)] focus-visible:ring-[var(--color-primary)]",
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
