import React from "react";

/**
 * Hamburger Icon is a stack of three horizontal lines
 * Often used to represent a menu or navigation drawer
 */
export function HamburgerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <rect x="3" y="4.5" width="18" height="3" rx="1.5" />
      <rect x="3" y="10.5" width="18" height="3" rx="1.5" />
      <rect x="3" y="16.5" width="18" height="3" rx="1.5" />
    </svg>
  );
}
