import { cva } from "class-variance-authority";

export const dialogVariants = cva(
  "relative bg-[var(--color-surface)] text-[var(--color-text)] shadow-lg rounded-lg focus:outline-none",
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
