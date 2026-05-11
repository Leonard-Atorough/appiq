import React from "react";
import { cn } from "@shared/lib/cn";
import { useResponsive } from "@/shared/lib";
import { dividerVariants } from "./divider.variants";
import type { DividerProps } from "./divider.types";

/**
 * Divider
 *
 * A flexible divider component for separating content visually or semantically.
 * Can be horizontal or vertical, with customizable styling and accessibility options.
 *
 * Accessibility:
 * - When `decorative={true}`, sets `role="presentation"` to hide from screen readers
 * - When `decorative={false}`, renders semantic `<hr>` for horizontal dividers
 * - Use `decorative={false}` to mark meaningful content boundaries
 *
 * @example
 * // Purely visual horizontal divider
 * <Divider decorative />
 *
 * // Semantic divider between sections
 * <Divider decorative={false} />
 *
 * // Vertical divider with custom styling
 * <Divider direction="vertical" color="muted" />
 */
export const Divider = React.forwardRef<
  HTMLHRElement | HTMLDivElement,
  DividerProps
>(
  (
    {
      direction = "horizontal",
      decorative = true,
      appearance = "solid",
      size = "sm",
      spacing = "md",
      color = "base",
      fullSize = true,
      className,
      ...props
    },
    ref,
  ) => {
    const resolvedDirection = useResponsive(direction);
    const resolvedAppearance = useResponsive(appearance);
    const resolvedSize = useResponsive(size);
    const resolvedSpacing = useResponsive(spacing);
    const resolvedColor = useResponsive(color);
    const resolvedFullSize = useResponsive(fullSize);

    const variantClasses = dividerVariants({
      direction: resolvedDirection,
      size: resolvedSize,
      spacing: resolvedSpacing,
      color: resolvedColor,
      appearance: resolvedAppearance,
      fullSize: resolvedFullSize,
    });

    const baseClasses = cn(variantClasses, className);

    // Horizontal divider: use semantic <hr> for non-decorative, <div> for decorative
    // consumers will supply appropriate ARIA attributes based on decorative vs semantic usage
    if (resolvedDirection === "horizontal") {
      if (!decorative) {
        return (
          <hr
            ref={ref as React.Ref<HTMLHRElement>}
            className={cn("border-none", baseClasses)}
            {...props}
          />
        );
      }

      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          role="presentation"
          className={baseClasses}
          {...props}
        />
      );
    }

    // Vertical divider: always a <div> (no semantic equivalent)
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        role={decorative ? "presentation" : undefined}
        className={cn(
          baseClasses,
          resolvedDirection === "vertical" && "my-0 mx-auto",
        )}
        {...props}
      />
    );
  },
);

Divider.displayName = "Divider";
