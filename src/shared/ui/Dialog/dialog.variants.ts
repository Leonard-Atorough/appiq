import { cva } from "class-variance-authority";

export const dialogVariants = cva(
  [
    "relative bg-[var(--color-surface)] text-[var(--color-text)]",
    "rounded-lg",
    "shadow-lg hover:shadow-xl focus:shadow-2xl",
    "transition-shadow transition-transform duration-200 ease-out",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-2",
    "active:scale-[0.99]",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "w-72",
        md: "w-96",
        lg: "w-[40rem]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);
