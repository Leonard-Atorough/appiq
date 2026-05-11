import type { ResponsiveValue } from "@/shared/lib";

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  /** Visual style. `primary` for the main CTA; `ghost`/`link` for low-emphasis actions. */
  variant?: ResponsiveValue<"primary" | "secondary" | "outline" | "ghost" | "link" | "danger">;
  /** Control height and padding. */
  size?: ResponsiveValue<"sm" | "md" | "lg">;
  /** Expands the button to 100% of its container width. */
  fullWidth?: boolean;
  /** Shows a spinner and blocks clicks. Children stay at `opacity-0` so the accessible name is preserved via `aria-busy`. */
  loading?: boolean;
}
