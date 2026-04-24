import React from "react";

/**
 * Chevron Up Icon — points upward
 * Used for navigation or collapsing/expanding controls (expand direction)
 */
export function ChevronUpIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M4 12l4-4 4 4" />
    </svg>
  );
}
