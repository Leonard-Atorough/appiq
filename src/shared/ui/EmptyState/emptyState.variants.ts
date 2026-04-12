import { cva } from "class-variance-authority";

export const emptyStateVariants = cva(
  [
    "flex flex-col items-center justify-center text-center",
    "rounded-lg border border-dashed border-muted",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-surface",
        muted: "bg-muted",
      },
      size: {
        sm: "gap-sm p-lg",
        md: "gap-md p-2xl",
        lg: "gap-lg p-3xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export const emptyStateIconVariants = cva("", {
  variants: {
    size: {
      sm: "w-xl h-xl",
      md: "w-2xl h-2xl",
      lg: "w-3xl h-3xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});
