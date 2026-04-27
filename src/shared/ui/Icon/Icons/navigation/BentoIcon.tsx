import React from "react";

/**
 * Bento Icon is a grid of circles
 * Often used to represent a menu with multiple options or categories
 */
export function BentoIcon(props: React.SVGProps<SVGSVGElement>) {
  const positions = [
    [4.5, 4.5],
    [12, 4.5],
    [19.5, 4.5],
    [4.5, 12],
    [12, 12],
    [19.5, 12],
    [4.5, 19.5],
    [12, 19.5],
    [19.5, 19.5],
  ];

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      {positions.map(([cx, cy], index) => (
        <circle key={index} cx={cx} cy={cy} r="2.25" />
      ))}
    </svg>
  );
}
