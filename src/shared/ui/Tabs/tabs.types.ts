import type React from "react";
import type { VariantProps } from "class-variance-authority";
import type { tabTriggerVariants } from "./tabs.variants";

export interface TabItem {
  id: string;
  label: React.ReactNode;
  content?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends VariantProps<typeof tabTriggerVariants> {
  /**
   * An array of tab items to be rendered. Each item should have a unique `id`, a `label` for the tab trigger, optional `content` to be displayed when the tab is active, and an optional `disabled` flag to indicate if the tab is interactive.
   */
  tabs: TabItem[];
  /**
   * Controlled active tab id. If provided, the Tabs component will be controlled and will not manage its own state. The parent component is responsible for updating this value in response to user interactions.
   */
  activeTab?: string;

  /**
   * Default active tab id for uncontrolled mode. This sets the initial active tab when the component is first rendered. Ignored if `activeTab` prop is provided (controlled mode).
   */
  defaultTab?: string;

  /**
   * Callback fired when the active tab changes. Receives the id of the newly active tab as an argument.
   */
  onChange?: (id: string) => void;

  /**
   * If true, tabs will stretch to fill the full width of their container, and each tab will have equal width. Otherwise, tabs will only take up as much space as needed by their content.
   */
  fullWidth?: boolean;

  /**
   * The orientation of the tabs, which can be either "horizontal" (the default) or "vertical". This determines the layout of the tab triggers and panels.
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Additional class name to apply to the root wrapper of the Tabs component, allowing for custom styling and overrides.
   */
  className?: string;
}
