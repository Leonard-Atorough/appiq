import { cva } from "class-variance-authority";

export const headerVariants = cva("leading-tight", {
  variants: {
    size: {
      h1: "text-3xl md:text-4xl lg:text-5xl",
      h2: "text-2xl md:text-3xl lg:text-4xl",
      h3: "text-xl md:text-2xl lg:text-3xl",
      h4: "text-lg md:text-xl lg:text-2xl",
      h5: "text-base md:text-lg lg:text-xl",
      h6: "text-sm md:text-base lg:text-lg",
    },
    weight: {
      semibold: "font-semibold",
      bold: "font-bold",
    },
    color: {
      default: "text-primary",
      secondary: "text-secondary",
    },
  },
  defaultVariants: {
    weight: "semibold",
    color: "default",
  },
});
