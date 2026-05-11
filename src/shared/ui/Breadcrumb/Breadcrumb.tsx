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

    // Build slices: always show first + last, collapse middle
    const { startItems, endItems, hiddenItems } = React.useMemo(() => {
      if (!shouldCollapse) {
        return { startItems: items, endItems: [], hiddenItems: [] };
      }

      if (collapseFrom === "start") {
        // Collapse from start: show only first item, then hidden middle, then last (maxItems - 1) items
        const endSliceStartIdx = items.length - (maxItems - 1);
        return {
          startItems: [items[0]],
          endItems: items.slice(endSliceStartIdx),
          hiddenItems: items.slice(1, endSliceStartIdx),
        };
      } else {
        // collapseFrom === "end" (default): show first (maxItems - 1) items, then hidden middle, then last item
        const startSliceEndIdx = maxItems - 1;
        return {
          startItems: items.slice(0, startSliceEndIdx),
          endItems: [items[items.length - 1]],
          hiddenItems: items.slice(startSliceEndIdx, items.length - 1),
        };
      }
    }, [items, maxItems, collapseFrom, shouldCollapse]);

    return (
      <nav
        ref={ref}
        aria-label="breadcrumb"
        className={cn(breadcrumbNavVariants(), className)}
        {...props}
      >
        <ol className={breadcrumbListVariants()}>
          {/* Render start items with separators */}
          {startItems.map((item, idx) => {
            const isLastInStart = idx === startItems.length - 1;
            // Item is "last" overall only if there are no end items
            const isLastOverall = isLastInStart && endItems.length === 0;
            return (
              <React.Fragment key={`start-${idx}`}>
                <BreadcrumbItem
                  item={item}
                  isLast={isLastOverall}
                  lastItemAsLink={lastItemAsLink}
                  linkComponent={linkComponent}
                  size={resolvedSize}
                />
                {!isLastInStart && <li aria-hidden="true">{separator}</li>}
              </React.Fragment>
            );
          })}

          {/* Render collapsed dropdown/button + separator */}
          {shouldCollapse && hiddenItems.length > 0 && (
            <>
              {startItems.length > 0 && <li aria-hidden="true">{separator}</li>}
              {useDropdown ? (
                <li>
                  <Dropdown
                    trigger="meatball"
                    triggerLabel="More items"
                    items={hiddenItems.map((item) => ({
                      label: item.label,
                      disabled: item.disabled,
                      ariaLabel: item.ariaLabel || item.label,
                      onClick: () => {
                        if (item.onClick) item.onClick({} as React.MouseEvent<HTMLAnchorElement>);
                        if (item.href) window.location.href = item.href;
                      },
                    }))}
                  />
                </li>
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
              )}
              {endItems.length > 0 && <li aria-hidden="true">{separator}</li>}
            </>
          )}

          {/* Render end items with separators */}
          {endItems.map((item, idx) => {
            // Last item in endItems is always the last item overall (endItems includes the final item)
            const isLastOverall = idx === endItems.length - 1;
            return (
              <React.Fragment key={`end-${idx}`}>
                <BreadcrumbItem
                  item={item}
                  isLast={isLastOverall}
                  lastItemAsLink={lastItemAsLink}
                  linkComponent={linkComponent}
                  size={resolvedSize}
                />
                {!isLastOverall && <li aria-hidden="true">{separator}</li>}
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    );
  },
);

Breadcrumb.displayName = "Breadcrumb";
