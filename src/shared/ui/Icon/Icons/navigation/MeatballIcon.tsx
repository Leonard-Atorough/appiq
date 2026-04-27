import React from "react";

/**
 * Meatball Icon is a horizontal stack of three circles
 * Often used to represent a more options menu (⋯)
 */
export function MeatballIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <circle cx="5" cy="12" r="2.25" />
      <circle cx="12" cy="12" r="2.25" />
      <circle cx="19" cy="12" r="2.25" />
    </svg>
  );
}
