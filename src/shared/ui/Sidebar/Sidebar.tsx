import React, { useCallback, useEffect, useId, useState } from "react";
import type { SidebarProps } from "./sidebar.types";
import {
  sidebarVariants,
  sidebarWrapperVariants,
  sidebarHeaderVariants,
  sidebarContentVariants,
  sidebarFooterVariants,
  sidebarToggleVariants,
} from "./sidebar.variants";
import { cn } from "@/shared/lib";
import { Icon } from "@shared/ui";

/**
 * Sidebar
 *
 * A collapsible vertical navigation container supporting both controlled and uncontrolled
 * collapse state. Features sticky/fixed positioning, header/footer slots, responsive
 * auto-collapse on mobile, and customizable widths.
 *
 * Keyboard navigation: Escape closes the sidebar when collapsible.
 * Collapse state can be managed externally via `open` and `onOpenChange`, or internally.
 *
 * @example
 * <Sidebar collapsible header={<Logo />}>
 *   <NavLink href="/home">Home</NavLink>
 *   <NavLink href="/about">About</NavLink>
 * </Sidebar>
 */
export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      open: controlledOpen,
      defaultOpen = true,
      onOpenChange,
      collapsible = false,
      collapseMode = "mini",
      hideToggle = false,
      toggleLabel = "Toggle sidebar",
      width = "16rem",
      collapsedWidth = "4rem",
      position = "static",
      positionOffset = "0",
      autoCollapseOnMobile = false,
      mobileBreakpoint = 768,
      scrollable = true,
      header,
      footer,
      children,
      ariaLabel = "Sidebar",
      asideRole = "complementary",
      className,
      ...props
    },
    ref,
  ) => {
    const isControlled = controlledOpen !== undefined;
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const collapseWidthValue = collapseMode === "mini" ? collapsedWidth : "0";

    const setOpen = useCallback(
      (newOpen: boolean) => {
        if (!isControlled) {
          setInternalOpen(newOpen);
        }
        onOpenChange?.(newOpen);
      },
      [isControlled, onOpenChange],
    );

    useEffect(() => {
      if (!autoCollapseOnMobile) return;

      const mq = window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`);
      const handleChange = (e: MediaQueryListEvent) => {
        if (e.matches && isOpen) {
          setOpen(false);
        }
      };
      mq.addEventListener("change", handleChange);
      return () => mq.removeEventListener("change", handleChange);
    }, [autoCollapseOnMobile, mobileBreakpoint, isOpen, setOpen]);

    const handleToggle = () => {
      setOpen(!isOpen);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && collapsible) {
        setOpen(false);
      }
    };

    const positionOffsetPx =
      typeof positionOffset === "number" ? `${positionOffset}px` : positionOffset;
    const widthPx = typeof width === "number" ? `${width}px` : width;
    const collapsedWidthPx =
      typeof collapseWidthValue === "number" ? `${collapseWidthValue}px` : collapseWidthValue;

    const id = useId();

    return (
      <div
        className={sidebarWrapperVariants({ position })}
        style={{
          ...(position !== "static" && { [position]: positionOffsetPx }),
        }}
      >
        <aside
          ref={ref}
          id={id}
          role={asideRole}
          aria-label={ariaLabel}
          className={cn(sidebarVariants(), className)}
          style={{
            width: isOpen ? widthPx : collapsedWidthPx,
            transition: "width 0.2s ease-in-out",
          }}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {header && (
            <div className={sidebarHeaderVariants()}>
              <div className="flex items-center justify-between gap-md w-full">
                {isOpen && <div className="flex-1">{header}</div>}
                {collapsible && !hideToggle && (
                  <button
                    onClick={handleToggle}
                    aria-label={toggleLabel}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-content`}
                    className={sidebarToggleVariants()}
                    type="button"
                  >
                    <Icon name={isOpen ? "chevron-left" : "chevron-right"} size="md" />
                  </button>
                )}
              </div>
            </div>
          )}
          <div
            id={`${id}-content`}
            className={cn(sidebarContentVariants({ scrollable }), "px-md py-md")}
          >
            {children}
          </div>
          {footer && isOpen && <div className={sidebarFooterVariants()}>{footer}</div>}
        </aside>
      </div>
    );
  },
);

Sidebar.displayName = "Sidebar";
