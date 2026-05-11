import React from "react";
import { cn } from "@shared/lib/cn";
import { useResponsive } from "@/shared/lib";
import type { BreadcrumbProps } from "./breadcrumb.types";
import {
  breadcrumbNavVariants,
  breadcrumbListVariants,
  breadcrumbCollapseButtonVariants,
} from "./breadcrumb.variants";
import { BreadcrumbItem } from "./BreadcrumbItem";
import { Dropdown } from "../Dropdown";
import { Button } from "../Button";

/**
 * Breadcrumb
 *
 * Displays a hierarchical navigation trail with optional item collapsing.
 * - Last item renders as non-interactive text by default (aria-current="page")
 * - Exceeding maxItems triggers collapsing with dropdown or expandable button
 * - Supports custom link components for router integration
 *
 * @example
 * ```tsx
 * <Breadcrumb
 *   items={[
 *     { label: "Home", href: "/" },
 *     { label: "Applications", href: "/applications" },
 *     { label: "Job #123" },
 *   ]}
 *   maxItems={3}
 *   collapseFrom="start"
 * />
 * ```
 */
export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      items,
      maxItems = 3,
      collapseFrom = "start",
      useDropdown = true,
      lastItemAsLink = false,
      separator = "/",
      linkComponent,
      size = "md",
      className,
      ...props
    },
    ref,
  ) => {
    const [expandedCollapsed, setExpandedCollapsed] = React.useState(false);
    const resolvedSize = useResponsive(size);

    const shouldCollapse = React.useMemo(() => items.length > maxItems, [items.length, maxItems]);

    const { visibleItems, hiddenItems } = React.useMemo(() => {
      if (!shouldCollapse) {
        return { visibleItems: items, hiddenItems: [] };
      }

      if (collapseFrom === "start") {
        // Always show first item + last (maxItems - 1) items
        return {
          visibleItems: [items[0], ...items.slice(-(maxItems - 1))],
          hiddenItems: items.slice(1, -(maxItems - 1)),
        };
      } else {
        // collapseFrom === "end"
        // Always show first (maxItems - 1) items + last item
        return {
          visibleItems: [...items.slice(0, maxItems - 1), items[items.length - 1]],
          hiddenItems: items.slice(maxItems - 1, -1),
        };
      }
    }, [items, maxItems, collapseFrom, shouldCollapse]);

    // Build collapsed items UI (including right separator logic)
    const collapsedContent =
      shouldCollapse && hiddenItems.length > 0 ? (
        useDropdown ? (
          <>
            <li>
              <Dropdown
                trigger="meatball"
                triggerLabel="More items"
                items={hiddenItems.map((item) => ({
                  label: item.label,
                  disabled: item.disabled,
                  onClick: () => {
                    if (item.onClick) item.onClick({} as React.MouseEvent<HTMLAnchorElement>);
                    if (item.href) window.location.href = item.href;
                  },
                }))}
              />
            </li>
            {collapseFrom === "start" && <li aria-hidden="true">{separator}</li>}
          </>
        ) : (
          <>
            <li>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpandedCollapsed(!expandedCollapsed)}
                className={breadcrumbCollapseButtonVariants()}
              >
                {expandedCollapsed ? "Hide" : `Show ${hiddenItems.length} more`}
              </Button>
            </li>
            {!expandedCollapsed && collapseFrom === "start" && (
              <li aria-hidden="true">{separator}</li>
            )}
            {expandedCollapsed &&
              hiddenItems.map((item, idx) => (
                <React.Fragment key={`collapsed-${idx}`}>
                  <li aria-hidden="true">{separator}</li>
                  <BreadcrumbItem
                    item={item}
                    isLast={false}
                    lastItemAsLink={lastItemAsLink}
                    linkComponent={linkComponent}
                    size={resolvedSize}
                  />
                </React.Fragment>
              ))}
          </>
        )
      ) : null;

    return (
      <nav
        ref={ref}
        aria-label="breadcrumb"
        className={cn(breadcrumbNavVariants(), className)}
        {...props}
      >
        <ol className={breadcrumbListVariants()}>
          {visibleItems.map((item, idx) => {
            // Item is last if it's the final item in the original items array
            const isLast = items[items.length - 1] === item;
            // For start collapse, show dropdown after first item
            const showCollapsedAfter =
              collapseFrom === "start" && idx === 0 && hiddenItems.length > 0;
            // For end collapse, show dropdown before last item
            const showCollapsedBefore = collapseFrom === "end" && isLast && hiddenItems.length > 0;

            return (
              <React.Fragment key={idx}>
                {showCollapsedBefore && collapsedContent}

                <BreadcrumbItem
                  item={item}
                  isLast={isLast}
                  lastItemAsLink={lastItemAsLink}
                  linkComponent={linkComponent}
                  size={resolvedSize}
                />

                {!isLast && !showCollapsedAfter && !showCollapsedBefore && (
                  <li aria-hidden="true">{separator}</li>
                )}

                {showCollapsedAfter && collapsedContent}
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    );
  },
);

Breadcrumb.displayName = "Breadcrumb";
