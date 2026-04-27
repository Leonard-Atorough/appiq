import React from "react";

/**
 * Doner Icon is a vertical stack of three rectangles gradually decreasing in size
 * Often used to represent a more options menu
 */
export function DonerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <rect x="4" y="3" width="16" height="4" rx="2" />
      <rect x="6" y="10" width="12" height="4" rx="2" />
      <rect x="8" y="17" width="8" height="4" rx="2" />
    </svg>
  );
}
