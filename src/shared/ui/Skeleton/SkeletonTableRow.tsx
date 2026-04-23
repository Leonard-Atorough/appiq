import { cn } from "@/shared/lib";
import React from "react";

import { SkeletonText } from "./SkeletonText";
import type { SkeletonTableRowProps } from "./skeleton.types";

/**
 * SkeletonTableRow
 *
 * Composed skeleton component for table rows. Renders a flex row with
 * skeleton cells matching the number of columns. Accepts either a number
 * of columns or an array of column sizes.
 *
 * Respects prefers-reduced-motion.
 *
 * @example
 * <SkeletonTableRow columns={4} />
 * <SkeletonTableRow columns={["sm", "md", "lg", "md"]} gap="md" />
 * <SkeletonTableRow columns={3} animated={false} />
 */
export const SkeletonTableRow = React.forwardRef<HTMLDivElement, SkeletonTableRowProps>(
  (
    { className, columns = 3, gap = "md", animated = true, ...props },
    ref,
  ) => {
    const columnArray = typeof columns === "number"
      ? Array.from({ length: columns }).fill("md")
      : columns;

    const gapClass = `gap-${gap}` as const;

    return (
      <div
        ref={ref}
        className={cn("flex", gapClass, className)}
        {...props}
      >
        {columnArray.map((size, i) => (
          <div key={i} className="flex-1">
            <SkeletonText size={size as any} animated={animated} width="100%" />
          </div>
        ))}
      </div>
    );
  },
);

SkeletonTableRow.displayName = "SkeletonTableRow";
