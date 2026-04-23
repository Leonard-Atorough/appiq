import { cva } from "class-variance-authority";

/**
 * `color` variant tokens. Each sets a background, text colour, and a border colour
 * that becomes visible when `bordered` is true.
 */
export type TooltipColor =
  | "default"
  | "dark"
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "info";

export const tooltipVariants = cva(
  ["z-50 rounded-md shadow-md", "leading-snug", "focus:outline-none"].join(" "),
  {
    variants: {
      /**
       * Controls background, text, and border colour.
       * `default` matches the page surface; `dark` is the classic inverted tooltip style.
       */
      color: {
        default: "bg-surface text-base border-base",
        dark: "bg-(--gray-800) text-(--gray-50) border-(--gray-700)",
        primary: "bg-primary-500 text-(--color-primary-foreground) border-primary-600",
        success: "bg-success-light text-success-text border-success",
        warning: "bg-warning-light text-warning-text border-warning",
        error: "bg-error-light text-error-text border-error",
        info: "bg-info-light text-info-text border-info",
      },
      /** Controls padding, font size, and maximum width. */
      size: {
        sm: "px-xs py-xs text-xs max-w-[12rem]",
        md: "px-sm py-xs text-sm max-w-[16rem]",
        lg: "px-md py-sm text-sm max-w-[20rem]",
      },
      /**
       * Renders a 1px border using the colour set by the `color` variant.
       * Useful for `default` (surface) tooltips that need visual separation.
       */
      bordered: {
        true: "border",
        false: "",
      },
    },
    defaultVariants: {
      color: "default",
      size: "md",
      bordered: false,
    },
  },
);
