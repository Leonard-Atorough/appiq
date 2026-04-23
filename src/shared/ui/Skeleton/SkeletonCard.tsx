import { cn } from "@/shared/lib";
import React from "react";

import { SkeletonImage } from "./SkeletonImage";
import { SkeletonText } from "./SkeletonText";
import type { SkeletonCardProps } from "./skeleton.types";

/**
 * SkeletonCard
 *
 * Composed skeleton component for card layouts. Provides sensible defaults
 * (optional header + multiple content lines + optional footer) but accepts
 * children to override the structure completely.
 *
 * Respects prefers-reduced-motion.
 *
 * @example
 * <SkeletonCard />
 * <SkeletonCard withHeader withFooter lines={4} />
 * <SkeletonCard>
 *   <CustomSkeletonLayout />
 * </SkeletonCard>
 */
export const SkeletonCard = React.forwardRef<HTMLDivElement, SkeletonCardProps>(
  (
    {
      className,
      withHeader = false,
      withFooter = false,
      lines = 3,
      children,
      animated = true,
      ...props
    },
    ref,
  ) => {
    if (children) {
      return (
        <div ref={ref} className={cn("space-y-3", className)} {...props}>
          {children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "space-y-3 rounded-lg border border-(--color-border) bg-(--color-surface) p-4",
          className,
        )}
        {...props}
      >
        {withHeader && (
          <SkeletonImage aspectRatio="video" animated={animated} />
        )}

        <div className="space-y-2">
          {Array.from({ length: lines }).map((_, i) => {
            const isLast = i === lines - 1;
            const width = isLast ? "60%" : "100%";

            return (
              <SkeletonText
                key={i}
                width={width}
                size="md"
                animated={animated}
              />
            );
          })}
        </div>

        {withFooter && (
          <div className="flex gap-2 pt-2">
            <SkeletonText width="40%" size="sm" animated={animated} />
            <SkeletonText width="30%" size="sm" animated={animated} />
          </div>
        )}
      </div>
    );
  },
);

SkeletonCard.displayName = "SkeletonCard";
