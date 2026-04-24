import { cva } from "class-variance-authority";

export const textareaVariants = cva(
  [
    "block w-full font-medium transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "min-h-[2.5rem]",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-base border border-base text-base focus-visible:ring-primary",
        secondary:
          "bg-secondary border border-base text-secondary-foreground focus-visible:ring-secondary",
        outline:
          "bg-transparent border border-base text-base focus-visible:ring-primary",
        ghost:
          "bg-transparent border-none text-base focus-visible:ring-primary",
      },
      size: {
        sm: "text-sm px-sm py-xs rounded-md",
        md: "text-base px-md py-sm rounded-lg",
        lg: "text-lg px-lg py-md rounded-xl",
      },
      full: {
        true: "w-full",
      },
      state: {
        default: "",
        error: "border-error focus-visible:ring-error",
        success: "border-success focus-visible:ring-success",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      state: "default",
    },
  },
);
