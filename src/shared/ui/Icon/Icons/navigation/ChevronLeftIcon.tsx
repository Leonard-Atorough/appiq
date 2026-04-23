import React from "react";

/**
 * Chevron Left Icon — points leftward
 * Used for navigation or collapsing/expanding controls (collapse direction)
 */
export function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M11 12L5 8l6-4" />
    </svg>
  );
}
