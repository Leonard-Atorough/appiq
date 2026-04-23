import React from "react";
import { cn } from "@/shared/lib/cn";
import type { TabsProps } from "./tabs.types";
import { tabListVariants, tabTriggerVariants } from "./tabs.variants";

/**
 * Tabs
 *
 * An accessible tabbed navigation following the ARIA tab pattern
 * (`role="tablist"`, `role="tab"`, `role="tabpanel"`). Supports controlled
 * and uncontrolled active state, horizontal and vertical orientation,
 * and multiple visual variants.
 *
 * Keyboard navigation: Arrow keys cycle through enabled tabs;
 * Home/End jump to first/last tab in the list.
 * Each panel is linked to its trigger via `aria-controls` / `aria-labelledby`.
 *
 * @example
 * <Tabs
 *   tabs={[
 *     { id: "active", label: "Active", content: <ActiveList /> },
 *     { id: "archived", label: "Archived", content: <ArchivedList /> },
 *   ]}
 *   defaultTab="active"
 * />
 */
export function Tabs({
  tabs,
  activeTab: controlledActive,
  defaultTab,
  onChange,
  variant = "underline",
  size = "md",
  orientation = "horizontal",
  fullWidth = false,
  className,
}: TabsProps) {
  const isControlled = controlledActive !== undefined;
  const [internalActive, setInternalActive] = React.useState<string>(
    defaultTab ?? tabs.find((t) => !t.disabled)?.id ?? "",
  );

  const activeId = isControlled ? controlledActive : internalActive;

  const handleSelect = React.useCallback(
    (id: string) => {
      if (!isControlled) setInternalActive(id);
      onChange?.(id);
    },
    [isControlled, onChange],
  );

  const uid = React.useId();
  const getTabId = (id: string) => `${uid}-tab-${id}`;
  const getPanelId = (id: string) => `${uid}-panel-${id}`;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentId: string) => {
    const enabledTabs = tabs.filter((t) => !t.disabled);
    const enabledIndex = enabledTabs.findIndex((t) => t.id === currentId);
    let nextTab: (typeof tabs)[0] | undefined;

    switch (e.key) {
      case "ArrowRight":
        if (orientation === "horizontal") {
          e.preventDefault();
          nextTab = enabledTabs[(enabledIndex + 1) % enabledTabs.length];
        }
        break;
      case "ArrowDown":
        if (orientation === "vertical") {
          e.preventDefault();
          nextTab = enabledTabs[(enabledIndex + 1) % enabledTabs.length];
        }
        break;
      case "ArrowLeft":
        if (orientation === "horizontal") {
          e.preventDefault();
          nextTab = enabledTabs[(enabledIndex - 1 + enabledTabs.length) % enabledTabs.length];
        }
        break;
      case "ArrowUp":
        if (orientation === "vertical") {
          e.preventDefault();
          nextTab = enabledTabs[(enabledIndex - 1 + enabledTabs.length) % enabledTabs.length];
        }
        break;
      case "Home":
        e.preventDefault();
        nextTab = enabledTabs[0];
        break;
      case "End":
        e.preventDefault();
        nextTab = enabledTabs[enabledTabs.length - 1];
        break;
    }

    if (nextTab) {
      handleSelect(nextTab.id);
      document.getElementById(getTabId(nextTab.id))?.focus();
    }
  };

  const hasContent = tabs.some((t) => t.content !== undefined);

  return (
    <div className={cn("w-full", { "flex flex-row": orientation === "vertical" }, className)}>
      <div
        role="tablist"
        aria-orientation={orientation}
        className={cn(tabListVariants({ variant, fullWidth, orientation }))}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={getTabId(tab.id)}
            role="tab"
            type="button"
            aria-selected={tab.id === activeId}
            aria-controls={hasContent ? getPanelId(tab.id) : undefined}
            disabled={tab.disabled}
            tabIndex={tab.id === activeId ? 0 : -1}
            className={cn(tabTriggerVariants({ variant, size, fullWidth, orientation }))}
            onClick={() => handleSelect(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {hasContent && (
        <div className={orientation === "vertical" ? "flex-1" : "mt-md"}>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              id={getPanelId(tab.id)}
              role="tabpanel"
              aria-labelledby={getTabId(tab.id)}
              tabIndex={0}
              hidden={tab.id !== activeId}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) rounded-sm"
            >
              {tab.content}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Tabs.displayName = "Tabs";
