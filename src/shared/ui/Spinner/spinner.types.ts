import type React from "react";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Control spinner size. */
  size?: "sm" | "md" | "lg";
  /** Adds `aria-busy="true"` for accessibility. */
  busy?: boolean;
  /** Adds `aria-label` for accessibility. Defaults to "Loading". */
  label?: string;
}
