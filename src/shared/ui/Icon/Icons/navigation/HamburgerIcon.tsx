/**
 * Hamburger Icon is a stack of three horizontal lines
 * Often used to represent a menu or navigation drawer
 */

export function HamburgerIcon() {
  const lineHeight = 2.5;
  const spacing = 2.5;
  const stackCount = 3;
  const totalHeight = lineHeight * stackCount + spacing * (stackCount - 1);
  const startY = (16 - totalHeight) / 2;

  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      {Array.from({ length: stackCount }).map((_, index) => (
        <rect
          key={index}
          x="3"
          y={startY + index * (lineHeight + spacing)}
          width="12"
          height={lineHeight}
          rx={lineHeight / 2}
        />
      ))}
    </svg>
  );
}
