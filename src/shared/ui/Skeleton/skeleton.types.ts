/** Size tokens shared across all skeleton shapes. */
type SkeletonSize = "xs" | "sm" | "md" | "lg" | "xl";

/** Shape variant tokens for the base Skeleton. */
type SkeletonVariant = "text" | "avatar" | "image" | "icon";

/**
 * Base props for all skeleton components
 */
export interface BaseSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether to apply shimmer animation. Respects prefers-reduced-motion automatically. */
  animated?: boolean;
  /** Extra classes on the skeleton element */
  className?: string;
}

/**
 * Generic skeleton component accepting all variants
 */
export interface SkeletonProps extends BaseSkeletonProps {
  /** Shape variant. */
  variant?: SkeletonVariant;
  /** Size. */
  size?: SkeletonSize;
}

/**
 * Text skeleton for rendering placeholder text
 */
export interface SkeletonTextProps extends BaseSkeletonProps {
  /** Width of the text skeleton (e.g., "100%", "80%", "120px") */
  width?: string | number;
  /** Height of the text skeleton */
  height?: string | number;
  /** Size of the text skeleton (xs, sm, md, lg, xl) */
  size?: SkeletonSize;
}

/**
 * Avatar skeleton for rendering placeholder avatars
 */
export interface SkeletonAvatarProps extends BaseSkeletonProps {
  /** Size of the avatar skeleton (xs, sm, md, lg, xl) */
  size?: SkeletonSize;
  /** Shape of the avatar: "square" or "circle" */
  shape?: "square" | "circle";
}

/**
 * Image skeleton for rendering placeholder images
 */
export interface SkeletonImageProps extends BaseSkeletonProps {
  /** Width of the image skeleton */
  width?: string | number;
  /** Aspect ratio variant: "square" (1:1), "video" (16:9), "landscape" (4:3), or "portrait" (3:2) */
  aspectRatio?: "square" | "video" | "landscape" | "portrait";
}

/**
 * Icon skeleton for rendering placeholder icons
 */
export interface SkeletonIconProps extends BaseSkeletonProps {
  /** Size of the icon skeleton (xs, sm, md, lg, xl) */
  size?: SkeletonSize;
}

/**
 * Composed card skeleton with header, content, and optional footer
 */
export interface SkeletonCardProps extends BaseSkeletonProps {
  /** Whether to show header skeleton */
  withHeader?: boolean;
  /** Whether to show footer skeleton */
  withFooter?: boolean;
  /** Number of content lines to show (default: 3) */
  lines?: number;
  /** Custom children override default structure */
  children?: React.ReactNode;
}

/**
 * Composed table row skeleton
 */
export interface SkeletonTableRowProps extends BaseSkeletonProps {
  /** Number of columns or array of column sizes */
  columns?: number | ("xs" | "sm" | "md" | "lg" | "xl")[];
  /** Gap between columns */
  gap?: string;
}

/**
 * Composed field skeleton for form layouts
 */
export interface SkeletonFieldProps extends BaseSkeletonProps {
  /** Whether to show label skeleton */
  withLabel?: boolean;
  /** Whether to show helper text skeleton */
  withHelper?: boolean;
}
