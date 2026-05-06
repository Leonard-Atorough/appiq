import React from "react";

export function HelpCircleIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 17.5v.5" />
      <path d="M9.5 9.5C9.5 7.57 10.57 6.5 12 6.5s2.5 1 2.5 2.5c0 2-2.5 2.5-2.5 4" />
    </svg>
  );
}
