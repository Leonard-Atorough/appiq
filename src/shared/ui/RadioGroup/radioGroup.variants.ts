import { cva } from "class-variance-authority";

export const radioGroupVariants = cva(
  [
    "space-y-md",
  ].join(" "),
  {
    variants: {
      direction: {
        vertical: "space-y-md",
        horizontal: "flex flex-wrap gap-lg",
      },
      disabled: {
        true: "opacity-disabled",
        false: "",
      },
    },
    defaultVariants: {
      direction: "vertical",
      disabled: false,
    },
  },
);

export const radioGroupLegendVariants = cva(
  [
    "text-sm",
    "font-semibold",
    "text-secondary",
    "mb-md",
  ].join(" "),
);

export const radioGroupDescriptionVariants = cva(
  [
    "text-xs",
    "text-muted",
    "mt-xs",
    "mb-md",
  ].join(" "),
);

export const radioGroupErrorVariants = cva(
  [
    "text-xs",
    "text-error",
    "mt-md",
  ].join(" "),
);
