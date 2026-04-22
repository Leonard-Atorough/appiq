import type React from "react";
import type { VariantProps } from "class-variance-authority";
import type { tabTriggerVariants } from "./tabs.variants";

export interface TabItem {
  /** Unique identifier used to track the active tab. */
  id: string;
  /** Content rendered inside the tab trigger button. */
  label: React.ReactNode;
  /** Panel content shown when this tab is active. */
  content?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends VariantProps<typeof tabTriggerVariants> {
  /** Tab definitions. Each item requires a unique `id` and a `label`. */
  tabs: TabItem[];
  /** Controlled active tab id. Pair with `onChange` to manage state externally. */
  activeTab?: string;
  /** Initial active tab id for uncontrolled mode. Ignored when `activeTab` is provided. */
  defaultTab?: string;
  /** Fired when the active tab changes. Receives the new tab's `id`. */
  onChange?: (id: string) => void;
  /** Stretches tabs to fill the container width with equal sizing. */
  fullWidth?: boolean;
  /** Layout direction of the tab triggers. Defaults to `"horizontal"`. */
  orientation?: "horizontal" | "vertical";
  /** Extra classes on the root wrapper element. */
  className?: string;
}
