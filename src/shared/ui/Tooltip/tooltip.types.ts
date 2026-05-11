import type React from "react";
import type { ResponsiveValue } from "@/shared/lib";
import type { TooltipColor } from "./tooltip.variants";
export type { TooltipColor } from "./tooltip.variants";

export type TooltipSide = "top" | "right" | "bottom" | "left";

export type TooltipAlign = "start" | "center" | "end";

export interface TooltipProps {
  /** The message to display within the tooltip. */
  label: React.ReactNode;

  /** The element that triggers the tooltip on hover or focus. */
  children: React.ReactElement;

  /** The side of the element to render the tooltip. */
  side?: TooltipSide;

  /** The alignment of the tooltip relative to the element. */
  align?: TooltipAlign;

  /** The delay in milliseconds before showing the tooltip. */
  delay?: number;

  /** Whether the tooltip is disabled. */
  disabled?: boolean;

  /** Extra class(es) merged onto the trigger element's className. */
  triggerClassName?: string;

  /** Extra classes on the tooltip message. */
  messageClassName?: string;

  /** Extra class(es) merged onto the wrapper element that contains both the trigger and the tooltip.*/
  wrapperClassName?: string;

  /** Semantic colour treatment of the tooltip surface. */
  color?: TooltipColor;
  /** Renders a 1px border in the colour set by `color`. Useful for default (surface) tooltips. */
  bordered?: boolean;
  /** Controls padding, font size, and max-width. */
  size?: ResponsiveValue<"sm" | "md" | "lg">;
}
