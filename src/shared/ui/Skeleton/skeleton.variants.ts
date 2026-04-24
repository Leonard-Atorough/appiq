import { cva } from "class-variance-authority";

/**
 * Base skeleton variants using CVA
 *
 * Does NOT include animate-shimmer — that's applied conditionally based on the animated prop.
 * Applies semantic gray token for background and rounded based on variant.
 *
 * Size variants use intentionally varied proportions for realistic placeholder content:
 * - Heights (h-*) scale with semantic sizes (xs→xl) for visual hierarchy
 * - Widths (w-*) are varied to simulate natural content proportions
 *   E.g., md size = "h-6 w-24" creates a 16px×96px rectangle (6:1 ratio for typical text line)
 *
 * Width breakdown:
 * - xs: 12 (48px) — tiny labels, badges
 * - sm: 16 (64px) — small text snippets
 * - md: 24 (96px) — normal text lines (recommended default)
 * - lg: 32 (128px) — larger headings
 * - xl: 40 (160px) — hero/prominent text
 */
export const skeletonVariants = cva("bg-skeleton", {
  variants: {
    variant: {
      text: "rounded-md",
      avatar: "rounded-md",
      image: "rounded-md",
      icon: "rounded-sm",
    },
    size: {
      xs: "h-3 w-12",
      sm: "h-4 w-16",
      md: "h-6 w-24",
      lg: "h-8 w-32",
      xl: "h-10 w-40",
    },
  },
  defaultVariants: {
    variant: "text",
    size: "md",
  },
});

/**
 * Text skeleton variants
 *
 * Heights scale with text size tokens for semantic sizing.
 */
export const textSkeletonVariants = cva("bg-skeleton rounded-md", {
  variants: {
    size: {
      xs: "h-3",
      sm: "h-4",
      md: "h-6",
      lg: "h-8",
      xl: "h-10",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * Avatar skeleton variants
 */
export const avatarSkeletonVariants = cva("bg-skeleton", {
  variants: {
    size: {
      xs: "h-6 w-6",
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
      xl: "h-16 w-16",
    },
    shape: {
      square: "rounded-md",
      circle: "rounded-full",
    },
  },
  defaultVariants: {
    size: "md",
    shape: "circle",
  },
});

/**
 * Image skeleton variants with aspect ratio support
 */
export const imageSkeletonVariants = cva("bg-skeleton rounded-md w-full", {
  variants: {
    aspectRatio: {
      square: "aspect-square",
      video: "aspect-video",
      landscape: "aspect-[4/3]",
      portrait: "aspect-[3/2]",
    },
  },
  defaultVariants: {
    aspectRatio: "video",
  },
});

/**
 * Icon skeleton variants
 */
export const iconSkeletonVariants = cva("bg-skeleton rounded-sm", {
  variants: {
    size: {
      xs: "h-4 w-4",
      sm: "h-5 w-5",
      md: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-10 w-10",
    },
  },
  defaultVariants: {
    size: "md",
  },
});
