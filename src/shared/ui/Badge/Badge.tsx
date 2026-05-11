import type { BadgeProps } from "./badge.props";
import { useResponsive } from "@/shared/lib";

import { badgeVariants } from "./badge.variants";
import { cn } from "@/shared/lib";

export function Badge({
  children,
  value,
  max,
  color = "default",
  size,
  variant,
  shape,
  isVisible = true,
  className,
}: BadgeProps) {
  const displayValue =
    typeof value === "number" && max !== undefined && value > max ? `${max}+` : value;
  const resolvedSize = useResponsive(size);
  const resolvedVariant = useResponsive(variant);
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
            variant: resolvedVariant,
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
