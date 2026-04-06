import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  [
    "inline-flex items-center font-medium",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-(--color-primary)",
    "active:scale-[0.98]",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "rounded-(--radius-full)",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-(--color-muted-bg) text-white shadow-sm hover:shadow-md hover:brightness-110",
        success: "bg-(--color-success) text-white shadow-sm hover:shadow-md hover:brightness-110",
        error: "bg-(--color-error) text-white shadow-sm hover:shadow-md hover:brightness-110",
        warning: "bg-(--color-warning) text-white shadow-sm hover:shadow-md hover:brightness-110",
        info: "bg-(--color-info) text-white shadow-sm hover:shadow-md hover:brightness-110",
      },
      outline: {
        true: "bg-transparent border hover:bg-opacity-5",
        false: "",
      },
      size: {
        sm: "px-(--spacing-xs) py-(--spacing-2xs) text-(--font-size-xs)",
        md: "px-(--spacing-sm) py-(--spacing-xs) text-(--font-size-sm)",
        lg: "px-(--spacing-md) py-(--spacing-sm) text-(--font-size-base)",
      },
      rounded: {
        true: "rounded-(--radius-full)",
        false: "rounded-(--radius-md)",
      },
    },
    compoundVariants: [
      {
        outline: true,
        variant: "default",
        className:
          "border-(--color-border) text-(--color-text) hover:border-opacity-100 hover:bg-(--color-muted-bg) hover:bg-opacity-5",
      },
      {
        outline: true,
        variant: "success",
        className:
          "border-(--color-success) text-(--color-success) hover:bg-(--color-success) hover:bg-opacity-5",
      },
      {
        outline: true,
        variant: "error",
        className:
          "border-(--color-error) text-(--color-error) hover:bg-(--color-error) hover:bg-opacity-5",
      },
      {
        outline: true,
        variant: "warning",
        className:
          "border-(--color-warning) text-(--color-warning) hover:bg-(--color-warning) hover:bg-opacity-5",
      },
      {
        outline: true,
        variant: "info",
        className:
          "border-(--color-info) text-(--color-info) hover:bg-(--color-info) hover:bg-opacity-5",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: true,
      outline: false,
    },
  },
);
