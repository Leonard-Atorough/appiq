import type { BadgeProps } from "./badge.types";
import { useResponsive } from "@/shared/lib";

import { badgeVariants } from "./badge.variants";
import { cn } from "@/shared/lib";

export function Badge({
  children,
  value,
  max,
  color = "default",
  size,
  style,
  shape,
  isVisible = true,
  className,
}: BadgeProps) {
  const displayValue =
    typeof value === "number" && max !== undefined && value > max ? `${max}+` : value;
  const resolvedSize = useResponsive(size);
  const resolvedStyle = useResponsive(style);
  const resolvedShape = useResponsive(shape);

  if (!isVisible) {
    return <>{children}</>;
  }

  return (
    <div className="relative inline-block">
      {children}
      <span
        className={cn(
          badgeVariants({
            color,
            size: resolvedSize,
            style: resolvedStyle,
            shape: resolvedShape,
          }),
          className,
        )}
      >
        {displayValue}
      </span>
    </div>
  );
}
