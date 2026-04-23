import { cn } from "@/shared/lib";
import React from "react";

import { skeletonVariants } from "./skeleton.variants";
import type { SkeletonProps } from "./skeleton.types";

/**
 * Skeleton
 *
 * Generic base skeleton component for creating placeholder UI.
 * Renders as a shimmer-animated div that respects prefers-reduced-motion.
 * Use individual Skeleton* components (SkeletonText, SkeletonAvatar, etc.)
 * for most use cases, or use this directly for custom skeletons.
 *
 * @example
 * <Skeleton variant="text" size="md" />
 * <Skeleton variant="avatar" size="lg" shape="circle" />
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    { className, variant = "text", size = "md", animated = true, ...props },
    ref,
  ) => {
    const animatedClass = animated ? "animate-pulse" : "";

    return (
      <div
        ref={ref}
        className={cn(
          skeletonVariants({ variant, size }),
          animatedClass,
          className,
        )}
        aria-hidden="true"
        {...props}
      />
    );
  },
);

Skeleton.displayName = "Skeleton";
