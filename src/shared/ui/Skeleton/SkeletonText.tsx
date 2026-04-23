import { cn } from "@/shared/lib";
import React from "react";

import { textSkeletonVariants } from "./skeleton.variants";
import type { SkeletonTextProps } from "./skeleton.types";

/**
 * SkeletonText
 *
 * Placeholder skeleton for text content. Renders as a pill-shaped
 * shimmer-animated div with configurable width and height.
 * Respects prefers-reduced-motion.
 *
 * @example
 * <SkeletonText />
 * <SkeletonText width="80%" height={4} />
 * <SkeletonText size="lg" width="100%" />
 */
export const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ className, size = "md", width = "100%", height, animated = true, ...props }, ref) => {
    const animatedClass = animated ? "animate-pulse" : "";
    const heightClass = height ? "" : textSkeletonVariants({ size });

    return (
      <div
        ref={ref}
        className={cn(
          "bg-(--color-skeleton) rounded-md",
          heightClass,
          animatedClass,
          className,
        )}
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: height ? (typeof height === "number" ? `${height}px` : height) : undefined,
        }}
        aria-hidden="true"
        {...props}
      />
    );
  },
);

SkeletonText.displayName = "SkeletonText";
