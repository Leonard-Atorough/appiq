import { cva } from "class-variance-authority";

export const popoverVariants = cva(
  [
    "z-50 bg-surface border border-base rounded-lg",
    "shadow-md",
    "transition-all duration-200 ease-out",
    "focus:outline-none",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "p-sm min-w-[10rem]",
        md: "p-md min-w-[14rem]",
        lg: "p-lg min-w-[20rem]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const popoverOverlayVariants = cva(
  ["fixed inset-0 z-40", "bg-(--color-overlay)", "transition-opacity duration-200 ease-out"].join(
    " ",
  ),
);

export const popoverTriggerVariants = cva(
  [
    "inline-flex items-center justify-center",
    "cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-(--color-primary)",
    "transition-transform duration-200 ease-out",
    "active:scale-[0.98]",
  ].join(" "),
);
