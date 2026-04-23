import { cn } from "@/shared/lib";
import React from "react";

import { iconSkeletonVariants } from "./skeleton.variants";
import type { SkeletonIconProps } from "./skeleton.types";

/**
 * SkeletonIcon
 *
 * Placeholder skeleton for icon placeholders. Renders as a small
 * shimmer-animated square with configurable size.
 * Respects prefers-reduced-motion.
 *
 * @example
 * <SkeletonIcon />
 * <SkeletonIcon size="lg" />
 * <SkeletonIcon size="sm" animated={false} />
 */
export const SkeletonIcon = React.forwardRef<HTMLDivElement, SkeletonIconProps>(
  ({ className, size = "md", animated = true, ...props }, ref) => {
    const animatedClass = animated ? "animate-pulse" : "";

    return (
      <div
        ref={ref}
        className={cn(
          iconSkeletonVariants({ size }),
          animatedClass,
          className,
        )}
        aria-hidden="true"
        {...props}
      />
    );
  },
);

SkeletonIcon.displayName = "SkeletonIcon";
