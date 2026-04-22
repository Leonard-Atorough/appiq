import type { VariantProps } from "class-variance-authority";
import type { buttonVariants } from "./button.variants";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  /** Visual style. `primary` for the main CTA; `ghost`/`link` for low-emphasis actions. */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  /** Control height and padding. */
  size?: "sm" | "md" | "lg";
  /** Expands the button to 100% of its container width. */
  full?: boolean;
  /** Shows a spinner and blocks clicks. Children stay at `opacity-0` so the accessible name is preserved via `aria-busy`. */
  loading?: boolean;
}
