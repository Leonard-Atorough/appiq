import React from "react";

/**
 * Chevron Up Icon — points upward
 * Used for navigation or collapsing/expanding controls (expand direction)
 */
export function ChevronUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M6 15l6-6 6 6" />
    </svg>
  );
}
