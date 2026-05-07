import React from "react";
import { cn } from "@shared/lib/cn";
import { useResponsive } from "@/shared/lib";
import { headerVariants } from "./header.variants";
import type { HeaderProps } from "./header.types";

/**
 * Header
 *
 * A semantic heading component supporting h1–h6 elements with responsive sizing.
 * The `level` prop is required and determines the semantic HTML element rendered.
 * The optional `size` prop controls visual styling and supports responsive values,
 * allowing you to render an h2 that looks like an h1, or adjust heading size by breakpoint.
 *
 * @example
 * <Header level={1}>Main Page Title</Header>
 * <Header level={2} weight="bold">Section Heading</Header>
 * // Semantic h2, styled as h1 visually
 * <Header level={2} size="h1">Large Secondary Heading</Header>
 * // Responsive sizing: small on mobile, large on desktop
 * <Header level={1} size={{ base: "h2", md: "h1" }}>Adaptive Title</Header>
 * // Custom styling via className (wins cascade)
 * <Header level={3} className="text-purple-600">Custom color</Header>
 */
export const Header = React.forwardRef<HTMLHeadingElement, HeaderProps>(
  (
    {
      level,
      size,
      weight = "semibold",
      color = "default",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    // Default size to semantic level if not provided
    const defaultSize = `h${level}` as const;
    const resolvedSize = useResponsive(size ?? defaultSize);
    const resolvedWeight = useResponsive(weight);
    const resolvedColor = useResponsive(color);

    const Tag = `h${level}` as const;

    return (
      <Tag
        ref={ref}
        className={cn(
          headerVariants({
            size: resolvedSize,
            weight: resolvedWeight,
            color: resolvedColor,
          }),
          className,
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);

Header.displayName = "Header";
