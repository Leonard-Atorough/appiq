import { cn } from "@/shared/lib";
import React from "react";

import { imageSkeletonVariants } from "./skeleton.variants";
import type { SkeletonImageProps } from "./skeleton.types";

/**
 * SkeletonImage
 *
 * Placeholder skeleton for images. Renders as a shimmer-animated rectangle
 * with common aspect ratio variants (square, video, landscape, portrait).
 * No aspect-ratio CSS locking — content shift on load is expected.
 * Respects prefers-reduced-motion.
 *
 * @example
 * <SkeletonImage aspectRatio="video" />
 * <SkeletonImage aspectRatio="square" width="200px" />
 * <SkeletonImage animated={false} />
 */
export const SkeletonImage = React.forwardRef<HTMLDivElement, SkeletonImageProps>(
  (
    {
      className,
      width = "100%",
      aspectRatio = "video",
      animated = true,
      ...props
    },
    ref,
  ) => {
    const animatedClass = animated ? "animate-pulse" : "";

    return (
      <div
        ref={ref}
        className={cn(
          imageSkeletonVariants({ aspectRatio }),
          animatedClass,
          className,
        )}
        style={{
          width: typeof width === "number" ? `${width}px` : width,
        }}
        aria-hidden="true"
        {...props}
      />
    );
  },
);

SkeletonImage.displayName = "SkeletonImage";
