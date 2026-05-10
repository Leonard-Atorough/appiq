import React from "react";
import { cn } from "@shared/lib/cn";
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
    const variantClasses = dividerVariants({
      direction,
      size,
      spacing,
      color,
      appearance,
      fullSize,
    });

    const baseClasses = cn(variantClasses, className);

    // Horizontal divider: use semantic <hr> for non-decorative, <div> for decorative
    // consumers will supply appropriate ARIA attributes based on decorative vs semantic usage
    if (direction === "horizontal") {
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
          direction === "vertical" && "my-0 mx-auto",
        )}
        {...props}
      />
    );
  },
);

Divider.displayName = "Divider";
