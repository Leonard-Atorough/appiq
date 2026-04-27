import React from "react";

/** Download icon — arrow pointing down with a detached base line */
export function DownloadIcon(props: React.SVGProps<SVGSVGElement>) {
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
      {/* Vertical stem with arrowhead */}
      <path d="M12 3v11" />
      <polyline points="8 10 12 14 16 10" />
      {/* Detached base line */}
      <line x1="5" y1="20" x2="19" y2="20" />
    </svg>
  );
}
