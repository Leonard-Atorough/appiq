import { cn } from "@/shared/lib";
import React from "react";

import { avatarSkeletonVariants } from "./skeleton.variants";
import type { SkeletonAvatarProps } from "./skeleton.types";

/**
 * SkeletonAvatar
 *
 * Placeholder skeleton for avatar images. Renders as a shimmer-animated
 * square or circle with configurable size. Respects prefers-reduced-motion.
 *
 * @example
 * <SkeletonAvatar />
 * <SkeletonAvatar size="lg" shape="square" />
 * <SkeletonAvatar shape="circle" animated={false} />
 */
export const SkeletonAvatar = React.forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  (
    {
      className,
      size = "md",
      shape = "circle",
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
          avatarSkeletonVariants({ size, shape }),
          animatedClass,
          className,
        )}
        aria-hidden="true"
        {...props}
      />
    );
  },
);

SkeletonAvatar.displayName = "SkeletonAvatar";
