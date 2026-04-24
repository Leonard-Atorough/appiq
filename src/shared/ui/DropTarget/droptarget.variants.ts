import { cva } from "class-variance-authority";

export const dropTargetVariants = cva("relative rounded border-2 border-dashed transition-colors", {
  variants: {
    isActive: {
      true: "border-(--color-primary) bg-(--color-primary/10)",
      false: "border-transparent hover:border-(--color-primary/50) hover:bg-(--color-primary/5)",
    },
    disabled: {
      true: "border-transparent bg-transparent cursor-not-allowed opacity-50",
      false: "",
    },
  },
  defaultVariants: {
    isActive: false,
    disabled: false,
  },
});
