/**
 * Bento Icon is a grid of circles
 * Often used to represent a menu with multiple options or categories
 */

export function BentoIcon() {
  const positions = [
    [3, 3],
    [8, 3],
    [13, 3],
    [3, 8],
    [8, 8],
    [13, 8],
    [3, 13],
    [8, 13],
    [13, 13],
  ];

  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      {positions.map(([cx, cy], index) => (
        <circle key={index} cx={cx} cy={cy} r="1.5" />
      ))}
    </svg>
  );
}
