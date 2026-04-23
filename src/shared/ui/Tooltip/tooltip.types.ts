import type { VariantProps } from "class-variance-authority";
import type { tooltipVariants } from "./tooltip.variants";
export type { TooltipColor } from "./tooltip.variants";

export type TooltipSide = "top" | "right" | "bottom" | "left";

export type TooltipAlign = "start" | "center" | "end";

export interface TooltipProps extends VariantProps<typeof tooltipVariants> {
  /** The message to display within the tooltip. */
  message: React.ReactNode;

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
}
