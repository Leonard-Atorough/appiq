import { cva } from "class-variance-authority";

export const breadcrumbNavVariants = cva("", {
  variants: {},
  defaultVariants: {},
});

export const breadcrumbListVariants = cva("flex items-center gap-xs md:gap-sm lg:gap-md", {
  variants: {},
  defaultVariants: {},
});

export const breadcrumbSeparatorVariants = cva(
  "text-muted select-none pointer-events-none",
  {
    variants: {},
    defaultVariants: {},
  },
);

export const breadcrumbCollapseButtonVariants = cva(
  "text-sm text-muted hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
  {
    variants: {},
    defaultVariants: {},
  },
);
