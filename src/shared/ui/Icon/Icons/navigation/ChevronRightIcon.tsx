import React from "react";

/**
 * Chevron Right Icon — points rightward
 * Used for navigation or collapsing/expanding controls (expand direction)
 */
export function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M5 12l6-4-6-4" />
    </svg>
  );
}
