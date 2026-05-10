import { cva } from "class-variance-authority";

/**
 * Visual radio box — styled as a sibling of a `peer` <input type="radio">.
 * Checked and focus states are driven by peer-* modifiers.
 */
export const radioBoxVariants = cva(
  [
    "relative flex items-center justify-center shrink-0",
    "rounded-full border-2 border-base bg-surface",
    "transition-all duration-normal",
    /* Checked state — border and background change */
    "peer-checked:border-primary peer-checked:bg-primary",
    /* Focus ring from the hidden input */
    "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-primary",
    /* Disabled state */
    "peer-disabled:opacity-disabled peer-disabled:cursor-not-allowed",
    /* Shadows for depth (ADR 0005 — Layered Depth & Elevation) */
    "shadow-sm peer-checked:shadow-md peer-focus-visible:shadow-md",
    /* Micro-interaction: active press scale (ADR 0005 — Smooth Transitions) */
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
        error: "border-error peer-focus-visible:ring-error",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  },
);

/** Icon inside the checked radio */
export const radioIconVariants = cva("text-surface", {
  variants: {
    size: {
      sm: "h-2 w-2",
      md: "h-2.5 w-2.5",
      lg: "h-3 w-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const radioDescriptionVariants = cva(
  [
    "text-xs",
    "text-muted",
    "mt-xs",
  ].join(" "),
);

export const radioErrorVariants = cva(
  [
    "text-xs",
    "text-error",
    "mt-xs",
  ].join(" "),
);
