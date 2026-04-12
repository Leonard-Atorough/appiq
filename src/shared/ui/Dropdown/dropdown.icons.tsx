/**
 * Kebab Icon is a vertical stack of three circles, often used to represent a more options menu.
 * @returns JSX.Element
 */
export function KebabIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <circle cx="8" cy="3" r="1.5" />
      <circle cx="8" cy="8" r="1.5" />
      <circle cx="8" cy="13" r="1.5" />
    </svg>
  );
}

/**
 * Meatball Icon is a horizontal stack of three circles, often used to represent a more options menu.
 * @returns JSX.Element
 */
export function MeatballIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <circle cx="3" cy="8" r="1.5" />
      <circle cx="8" cy="8" r="1.5" />
      <circle cx="13" cy="8" r="1.5" />
    </svg>
  );
}

/**
 * Bento Icon is a grid of circles, often used to represent a menu with multiple options or categories.
 * @param variant - "2x2" for a 2x2 grid (4 circles), "3x3" for a 3x3 grid (9 circles). Defaults to "3x3".
 * @returns JSX.Element
 */
export function BentoIcon({ variant = "3x3" }: { variant?: "2x2" | "3x3" }) {
  const positions =
    variant === "2x2"
      ? [
          [5, 5],
          [11, 5],
          [5, 11],
          [11, 11],
        ]
      : [
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
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      {positions.map(([cx, cy], index) => (
        <circle key={index} cx={cx} cy={cy} r="1.5" />
      ))}
    </svg>
  );
}

/**
 * Doner Icon is a vertical stack of three rectangles gradually decreasing in size, often used to represent a more options menu.
 * @returns JSX.Element
 */
export function DonerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <rect x="3" y="2" width="10" height="3" rx="1.5" />
      <rect x="4" y="6.5" width="8" height="3" rx="1.5" />
      <rect x="5" y="11" width="6" height="3" rx="1.5" />
    </svg>
  );
}

/**
 * Hamburger Icon is a stack of three horizontal lines, often used to represent a menu or navigation drawer.
 * @returns JSX.Element
 */
export function HamburgerIcon({
  variant = "default",
  stackCount = 3,
}: {
  variant?: "default" | "thin";
  stackCount?: 2 | 3;
}) {
  const lineHeight = variant === "thin" ? 1 : 2;
  const spacing = 4;
  const totalHeight = lineHeight * stackCount + spacing * (stackCount - 1);
  const startY = (16 - totalHeight) / 2;
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      {Array.from({ length: stackCount }).map((_, index) => (
        <rect
          key={index}
          x="3"
          y={startY + index * (lineHeight + spacing)}
          width="10"
          height={lineHeight}
          rx={lineHeight / 2}
        />
      ))}
    </svg>
  );
}
