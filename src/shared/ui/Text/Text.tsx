import React from "react";
import { cn } from "@shared/lib/cn";
import { useResponsive } from "@/shared/lib";
import { textVariants } from "./text.variants";
import type { TextProps } from "./text.types";

/**
 * Text
 *
 * A semantic text rendering component for body copy, labels, and non-heading content.
 * Supports responsive sizing, weight, color, and truncation via ResponsiveValue.
 * Renders as `<p>` by default but can be configured to render as `<span>` or `<div>`.
 *
 * @example
 * <Text size="sm">Small text</Text>
 * <Text weight="semibold" color="secondary">Emphasized label</Text>
 * // Responsive sizing
 * <Text size={{ base: "sm", md: "md", lg: "lg" }}>Responsive body</Text>
 * // Custom element with truncation
 * <Text as="span" truncate>Truncated single line…</Text>
 */

const TextComponent = React.forwardRef<
  HTMLParagraphElement | HTMLSpanElement | HTMLDivElement,
  TextProps
>(
  (
    {
      size = "md",
      weight = "normal",
      color = "default",
      truncate = false,
      as: Component = "p",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const resolvedSize = useResponsive(size);
    const resolvedWeight = useResponsive(weight);
    const resolvedColor = useResponsive(color);
    const resolvedTruncate = useResponsive(truncate);

    return (
      <Component
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        className={cn(
          textVariants({
            size: resolvedSize,
            weight: resolvedWeight,
            color: resolvedColor,
            truncate: resolvedTruncate,
          }),
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

TextComponent.displayName = "Text";

// Overload signatures for proper ref type narrowing
export const Text = TextComponent as {
  (props: TextProps & { as: "p" }, ref?: React.Ref<HTMLParagraphElement>): React.ReactElement;
  (props: TextProps & { as: "span" }, ref?: React.Ref<HTMLSpanElement>): React.ReactElement;
  (props: TextProps & { as: "div" }, ref?: React.Ref<HTMLDivElement>): React.ReactElement;
  (props: TextProps, ref?: React.Ref<HTMLParagraphElement | HTMLSpanElement | HTMLDivElement>): React.ReactElement;
};
