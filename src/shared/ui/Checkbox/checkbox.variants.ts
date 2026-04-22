import { cva } from "class-variance-authority";

/**
 * Visual checkbox box — styled as a sibling of a `peer` <input>.
 * Checked/focus/disabled states are driven by peer-* modifiers.
 */
export const checkboxBoxVariants = cva(
  [
    "relative flex items-center justify-center shrink-0",
    "rounded-xs border border-base bg-surface",
    "transition-all duration-200",
    // Checked & indeterminate fill
    "peer-checked:bg-(--color-primary) peer-checked:border-(--color-primary)",
    "peer-[&:indeterminate]:bg-(--color-primary) peer-[&:indeterminate]:border-(--color-primary)",
    // Focus ring piped from the hidden input
    "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-(--color-primary)",
    // Disabled
    "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
    // Shadows for depth (ADR 0005 — Layered Depth & Elevation)
    "shadow-sm peer-checked:shadow-md peer-focus-visible:shadow-md",
    // Micro-interaction: active press scale (ADR 0005 — Smooth Transitions)
    "active:scale-[0.92]",
    "cursor-pointer",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
      state: {
        default: "",
        error: "border-error peer-focus-visible:ring-(--color-error)",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  },
);

/** Icon inside the checked box */
export const checkboxIconVariants = cva("text-(--color-primary-foreground)", {
  variants: {
    size: {
      sm: "h-2.5 w-2.5",
      md: "h-3 w-3",
      lg: "h-3.5 w-3.5",
    },
  },
  defaultVariants: { size: "md" },
});

export const checkboxLabelVariants = cva("font-medium text-base select-none cursor-pointer", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-sm",
      lg: "text-base",
    },
    disabled: {
      true: "opacity-50 cursor-not-allowed",
    },
  },
  defaultVariants: {
    size: "md",
  },
});
