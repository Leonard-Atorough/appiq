import { cn } from "@/shared/lib";
import React from "react";

import { SkeletonText } from "./SkeletonText";
import type { SkeletonFieldProps } from "./skeleton.types";

/**
 * SkeletonField
 *
 * Composed skeleton component for form field layouts. Renders an optional
 * label skeleton, input/control skeleton, and optional helper text skeleton.
 * Provides a layout matching the Field component structure.
 *
 * Respects prefers-reduced-motion.
 *
 * @example
 * <SkeletonField />
 * <SkeletonField withLabel withHelper />
 * <SkeletonField withLabel animated={false} />
 */
export const SkeletonField = React.forwardRef<HTMLDivElement, SkeletonFieldProps>(
  (
    { className, withLabel = true, withHelper = false, animated = true, ...props },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {withLabel && (
          <SkeletonText width="120px" size="sm" animated={animated} />
        )}

        <SkeletonText width="100%" size="md" animated={animated} />

        {withHelper && (
          <SkeletonText width="80%" size="xs" animated={animated} />
        )}
      </div>
    );
  },
);

SkeletonField.displayName = "SkeletonField";
