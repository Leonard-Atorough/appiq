import React from "react";

/** Filled circle — used as the indicator inside the Radio control */
export function CircleFillIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 8 8"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <circle cx="4" cy="4" r="4" />
    </svg>
  );
}
