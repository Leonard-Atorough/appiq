import type React from "react";
import type { VariantProps } from "class-variance-authority";
import type { popoverVariants } from "./popover.variants";

/** Which interaction opens the popover. */
export type PopoverOpenOn = "click" | "hover" | "focus";

/** Which side of the trigger the panel prefers to appear on. */
export type PopoverSide = "top" | "right" | "bottom" | "left";

/** Alignment of the panel along the chosen side. */
export type PopoverAlign = "start" | "center" | "end";

export interface PopoverProps extends VariantProps<typeof popoverVariants> {
  // --- Open state (controlled / uncontrolled) ---
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;

  // --- Trigger ---
  /** Render prop that receives trigger props. Spread them onto your interactive element. */
  trigger: (props: PopoverTriggerProps) => React.ReactElement;
  /** Interaction that opens the popover. Defaults to "click". */
  openOn?: PopoverOpenOn;

  // --- Positioning ---
  /** Preferred side relative to the trigger. Defaults to "bottom". */
  side?: PopoverSide;
  /** Alignment along the chosen side. Defaults to "start" (mirrors Dropdown). */
  align?: PopoverAlign;
  /** Gap in px between the trigger and the panel. Defaults to 8. */
  sideOffset?: number;

  // --- Behaviour ---
  /** Renders a backdrop and traps focus, turning the popover into a modal. Defaults to false. */
  modal?: boolean;
  /** Close when clicking outside the panel. Defaults to true. */
  closeOnOutsideClick?: boolean;
  /** Close on Escape keypress. Defaults to true. */
  closeOnEscape?: boolean;

  // --- Content ---
  children: React.ReactNode;

  // --- DOM escape hatches (targeted, not a root HTML spread) ---
  /** Extra class(es) merged onto the trigger element's className. */
  triggerClassName?: string;
  /** Extra classes on the panel. */
  contentClassName?: string;
  /** Extra props on the panel div. */
  contentProps?: Omit<React.HTMLAttributes<HTMLDivElement>, "id">;
}

export interface PopoverTriggerProps {
  onClick?: React.MouseEventHandler;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  onFocus?: React.FocusEventHandler;
  onBlur?: React.FocusEventHandler;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
  "aria-haspopup"?: boolean | "dialog";
  className?: string;
}
