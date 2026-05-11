import { cva } from "class-variance-authority";

/**
 * Visual checkbox box — styled as a sibling of a `peer` <input>.
 * Checked/focus/disabled states are driven by peer-* modifiers.
 */
export const checkboxBoxVariants = cva(
  [
    "relative flex items-center justify-center shrink-0",
    "rounded-xs border border-base bg-surface",
    "transition-all duration-normal",
    // Checked & indeterminate fill
    "peer-checked:bg-(--color-primary) peer-checked:border-(--color-primary)",
    "peer-[&:indeterminate]:bg-(--color-primary) peer-[&:indeterminate]:border-(--color-primary)",
    // Focus ring piped from the hidden input
    "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-(--color-primary)",
    // Disabled
    "peer-disabled:opacity-disabled peer-disabled:cursor-not-allowed",
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
export const checkboxIconVariants = cva("text-primary-foreground", {
  variants: {
    size: {
      sm: "h-2.5 w-2.5",
      md: "h-3 w-3",
      lg: "h-3.5 w-3.5",
    },
  },
  defaultVariants: { size: "md" },
});

export const checkboxLabelVariants = cva("font-medium text-primary select-none cursor-pointer", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-sm",
      lg: "text-base",
    },
    disabled: {
      true: "opacity-disabled cursor-not-allowed",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * Visual switch track — styled as a sibling of a `peer` <input>.
 * Checked/focus/disabled states are driven by peer-* modifiers.
 */
export const switchTrackVariants = cva(
  [
    "relative inline-flex align-center items-center justify-start shrink-0",
    "rounded-full border border-base bg-muted",
    "transition-all duration-normal",
    // Checked state
    "peer-checked:bg-(--color-primary) peer-checked:border-(--color-primary) peer-checked:justify-end",
    // Focus ring piped from the hidden input
    "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-(--color-primary)",
    // Disabled
    "peer-disabled:opacity-disabled peer-disabled:cursor-not-allowed",
    // Shadows for depth (ADR 0005)
    "shadow-sm peer-checked:shadow-md peer-focus-visible:shadow-md",
    "cursor-pointer",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-5 w-9 p-0.5",
        md: "h-6 w-11 p-0.5",
        lg: "h-7 w-14 p-0.5",
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

/**
 * Switch thumb/indicator — sliding dot inside the track.
 * Position driven by parent track's justify-content via flex (not peer-checked modifiers).
 */
export const switchThumbVariants = cva(
  ["rounded-full bg-surface", "transition-all duration-normal", "shadow-sm", "flex-shrink-0"].join(
    " ",
  ),
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: { size: "md" },
  },
);
