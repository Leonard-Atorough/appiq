import { cva } from "class-variance-authority";

/**
 * Base skeleton variants using CVA
 *
 * Does NOT include animate-shimmer — that's applied conditionally based on the animated prop.
 * Applies semantic gray token for background and rounded based on variant.
 */
export const skeletonVariants = cva(
  "bg-(--color-skeleton)",
  {
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
  },
);

/**
 * Text skeleton variants
 */
export const textSkeletonVariants = cva(
  "bg-(--color-skeleton) rounded-md",
  {
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
  },
);

/**
 * Avatar skeleton variants
 */
export const avatarSkeletonVariants = cva(
  "bg-(--color-skeleton)",
  {
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
  },
);

/**
 * Image skeleton variants with aspect ratio support
 */
export const imageSkeletonVariants = cva(
  "bg-(--color-skeleton) rounded-md w-full",
  {
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
  },
);

/**
 * Icon skeleton variants
 */
export const iconSkeletonVariants = cva(
  "bg-(--color-skeleton) rounded-sm",
  {
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
  },
);
