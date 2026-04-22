import React from "react";

export interface DropdownItem {
  /** Display text for the menu item. */
  label: string;
  /** Icon rendered to the left of the label. */
  icon?: React.ReactNode;
  onClick: () => void;
  /** `danger` renders the item in destructive/error colour. */
  variant?: "default" | "danger";
  disabled?: boolean;
}

export type TriggerType = "kebab" | "meatball" | "bento" | "doner" | "hamburger" | React.ReactNode;

export interface DropdownProps {
  /** Menu items to render in the panel. */
  items: DropdownItem[];
  /**
   * Content rendered inside the trigger button.
   * Accepts a named preset (`"kebab"` ⋮, `"meatball"` …, `"bento"`, `"doner"`, `"hamburger"`) or any custom ReactNode.
   * Defaults to `"kebab"`.
   */
  trigger?: TriggerType;
  /** Horizontal alignment of the menu panel relative to the trigger button. */
  align?: "start" | "end";
  /** `aria-label` for the trigger button. Required when the trigger has no visible text. */
  triggerLabel?: string;
  disabled?: boolean;
  className?: string;
}
