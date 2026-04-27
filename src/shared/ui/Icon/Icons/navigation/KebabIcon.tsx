import React from "react";

/**
 * Kebab Icon is a vertical stack of three circles
 * Often used to represent a more options menu (⋮)
 */
export function KebabIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <circle cx="12" cy="5" r="2.25" />
      <circle cx="12" cy="12" r="2.25" />
      <circle cx="12" cy="19" r="2.25" />
    </svg>
  );
}
