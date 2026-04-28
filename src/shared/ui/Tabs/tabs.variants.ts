import { cva } from "class-variance-authority";

export const tabListVariants = cva("flex", {
  variants: {
    variant: {
      underline: "",
      pill: "gap-xs bg-muted p-xs rounded-lg",
      boxed: "border border-base rounded-lg overflow-hidden",
    },
    fullWidth: {
      true: "w-full",
    },
    orientation: {
      horizontal: "flex-row border-b border-base",
      vertical: "flex-col border-r border-base",
    },
  },
  compoundVariants: [
    // pill and boxed manage their own borders
    { variant: "pill", orientation: "horizontal", className: "border-b-0" },
    { variant: "pill", orientation: "vertical", className: "border-r-0" },
    { variant: "boxed", orientation: "horizontal", className: "border-b-0" },
    { variant: "boxed", orientation: "vertical", className: "border-r-0" },
    // fullWidth in vertical = fill height
    { fullWidth: true, orientation: "vertical", className: "h-full" },
  ],
  defaultVariants: {
    variant: "underline",
    orientation: "horizontal",
  },
});

export const tabTriggerVariants = cva(
  [
    "relative inline-flex items-center justify-center whitespace-nowrap font-medium",
    "transition-all duration-200 cursor-pointer select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ].join(" "),
  {
    variants: {
      variant: {
        underline: [
          // horizontal: bottom border indicator; vertical: right border indicator
          "border-transparent",
          "hover:border-base hover:text-base",
          "text-secondary hover:text-base",
          "aria-selected:text-base",
        ].join(" "),
        pill: [
          "rounded-md text-secondary",
          "hover:text-base hover:bg-surface",
          "aria-selected:bg-surface aria-selected:text-base aria-selected:shadow-sm",
        ].join(" "),
        boxed: [
          "text-secondary hover:bg-surface hover:text-base",
          "aria-selected:bg-surface aria-selected:text-base",
        ].join(" "),
      },
      size: {
        sm: "px-sm py-xs text-sm",
        md: "px-md py-sm text-md",
        lg: "px-lg py-md text-lg",
      },
      fullWidth: {
        true: "flex-1",
      },
      orientation: {
        horizontal: "border-b-2 -mb-px aria-selected:border-primary",
        vertical: "border-r-2 -mr-px text-left w-full aria-selected:border-primary",
      },
    },
    compoundVariants: [
      // pill doesn't use a border-based active indicator
      { variant: "pill", className: "border-0" },
      // boxed: horizontal separates tabs with right borders; vertical with bottom borders
      {
        variant: "boxed",
        orientation: "horizontal",
        className: "border-r border-base last:border-r-0",
      },
      {
        variant: "boxed",
        orientation: "vertical",
        className: "border-b border-base last:border-b-0",
      },
    ],
    defaultVariants: {
      variant: "underline",
      size: "md",
      orientation: "horizontal",
    },
  },
);
