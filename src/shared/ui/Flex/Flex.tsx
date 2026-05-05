import React from "react";
import { cn } from "@/shared/lib/cn";
import { flexVariants } from "./flex.variants";
import type { FlexProps } from "./flex.types";

/**
 * Flex - A flexible layout component that handles spacing and alignment.
 *
 * Replaces raw div layouts with a semantic, typed component that enforces
 * design system spacing and alignment rules. For responsive overrides, pass
 * Tailwind responsive variants directly via the `className` prop.
 *
 * @example
 * // Simple horizontal layout with gap
 * <Flex gap="md" justify="center">
 *   <Item />
 *   <Item />
 * </Flex>
 *
 * @example
 * // Responsive with className override
 * <Flex
 *   direction="column"
 *   gap="sm"
 *   className="lg:flex-row lg:gap-lg"
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
    return (
      <div
        ref={ref}
        className={cn(
          flexVariants({
            direction,
            gap,
            padding,
            paddingX,
            paddingY,
            justify,
            align,
            wrap,
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
