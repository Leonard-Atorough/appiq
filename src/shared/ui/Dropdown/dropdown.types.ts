import React from "react";

export interface DropdownItem {
  label: string;
  /** Optional icon rendered to the left of the label. */
  icon?: React.ReactNode;
  onClick: () => void;
  /** `danger` renders the item in error/destructive colour. */
  variant?: "default" | "danger";
  disabled?: boolean;
}

export type TriggerType = "kebab" | "meatball" | "bento" | "doner" | "hamburger" | React.ReactNode;

export interface DropdownProps {
  items: DropdownItem[];
  /**
   * Content rendered inside the trigger button.
   * Defaults to a vertical kebab (⋮) icon.
   * Options include "kebab" (⋮), "meatball" (…), "bento" (☰), "doner" (≡), "hamburger" (☰), or any custom React node.
   */
  trigger?: TriggerType;
  /** Horizontal alignment of the menu panel relative to the trigger button. */
  align?: "start" | "end";
  /** `aria-label` for the trigger button. */
  triggerLabel?: string;
  /** Disables the trigger button. */
  disabled?: boolean;
  className?: string;
}
