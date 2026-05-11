import { cva } from "class-variance-authority";

export const breadcrumbItemVariants = cva("inline-flex items-center", {
  variants: {},
  defaultVariants: {},
});

export const breadcrumbLinkVariants = cva(
  "text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      disabled: {
        true: "opacity-disabled cursor-not-allowed hover:text-muted",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  },
);

export const breadcrumbTextVariants = cva("", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const breadcrumbIconVariants = cva("inline-flex shrink-0", {
  variants: {
    size: {
      sm: "w-md h-md",
      md: "w-lg h-lg",
      lg: "w-xl h-xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});
