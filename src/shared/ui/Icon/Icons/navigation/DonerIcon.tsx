/**
 * Doner Icon is a vertical stack of three rectangles gradually decreasing in size
 * Often used to represent a more options menu
 */
export function DonerIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <rect x="3" y="2" width="10" height="3" rx="1.5" />
      <rect x="4" y="6.5" width="8" height="3" rx="1.5" />
      <rect x="5" y="11" width="6" height="3" rx="1.5" />
    </svg>
  );
}
