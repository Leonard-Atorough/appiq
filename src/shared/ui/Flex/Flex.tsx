import React from "react";
import { cn, useResponsive } from "@/shared/lib";
import { flexVariants } from "./flex.variants";
import type { FlexProps } from "./flex.types";

/**
 * Flex - A flexible layout component that handles spacing and alignment.
 *
 * Replaces raw div layouts with a semantic, typed component that enforces
 * design system spacing and alignment rules. All layout props support responsive values.
 *
 * @example
 * // Simple horizontal layout with gap
 * <Flex gap="md" justify="center">
 *   <Item />
 *   <Item />
 * </Flex>
 *
 * @example
 * // Responsive props
 * <Flex
 *   direction={{ base: "column", lg: "row" }}
 *   gap={{ base: "sm", md: "md", lg: "lg" }}
 * >
 *   <Item />
 *   <Item />
 * </Flex>
 */
export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      direction,
      gap,
      padding,
      paddingX,
      paddingY,
      justify,
      align,
      wrap,
      fullWidth,
      className,
      ...props
    },
    ref,
  ) => {
    // Resolve responsive values to their current breakpoint value
    const resolvedDirection = useResponsive(direction ?? "row");
    const resolvedGap = useResponsive(gap ?? "md");
    const resolvedPadding = useResponsive(padding ?? undefined);
    const resolvedPaddingX = useResponsive(paddingX ?? undefined);
    const resolvedPaddingY = useResponsive(paddingY ?? undefined);
    const resolvedJustify = useResponsive(justify ?? "start");
    const resolvedAlign = useResponsive(align ?? "start");
    const resolvedWrap = useResponsive(wrap ?? false);

    return (
      <div
        ref={ref}
        className={cn(
          flexVariants({
            direction: resolvedDirection,
            gap: resolvedGap,
            padding: resolvedPadding,
            paddingX: resolvedPaddingX,
            paddingY: resolvedPaddingY,
            justify: resolvedJustify,
            align: resolvedAlign,
            wrap: resolvedWrap,
            fullWidth,
          }),
          className,
        )}
        {...props}
      />
    );
  },
);

Flex.displayName = "Flex";
