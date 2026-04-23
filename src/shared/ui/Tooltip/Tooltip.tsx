/**
 * Tooltip
 *
 * A lightweight floating label anchored to a trigger element.
 * Appears on hover (after a configurable delay) and immediately on keyboard focus,
 * satisfying WCAG 1.4.13 (Content on Hover or Focus).
 *
 * Rendered via a React portal so the panel is never clipped by `overflow: hidden` ancestors.
 * The trigger element receives `aria-describedby` pointing at the tooltip panel when visible.
 *
 * @example
 * <Tooltip message="Save changes">
 *   <Button>Save</Button>
 * </Tooltip>
 */

import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@shared/lib/cn";
import type { TooltipProps } from "./tooltip.types";
import { tooltipVariants } from "./tooltip.variants";

const SIDE_OFFSET = 8;
const HIDDEN_STYLES: React.CSSProperties = {
  position: "fixed",
  visibility: "hidden",
  top: 0,
  left: 0,
  pointerEvents: "none",
};

function getPositionStyles(
  side: NonNullable<TooltipProps["side"]>,
  align: NonNullable<TooltipProps["align"]>,
  triggerRect: DOMRect,
  contentEl: HTMLDivElement,
): React.CSSProperties {
  const cw = contentEl.offsetWidth;
  const ch = contentEl.offsetHeight;

  // Alignment on the axis perpendicular to `side`
  const alignH =
    align === "start"
      ? triggerRect.left
      : align === "end"
        ? triggerRect.right - cw
        : triggerRect.left + triggerRect.width / 2 - cw / 2;

  const alignV =
    align === "start"
      ? triggerRect.top
      : align === "end"
        ? triggerRect.bottom - ch
        : triggerRect.top + triggerRect.height / 2 - ch / 2;

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const boundAlignH = Math.min(Math.max(alignH, SIDE_OFFSET), viewportWidth - cw - SIDE_OFFSET);
  const boundAlignV = Math.min(Math.max(alignV, SIDE_OFFSET), viewportHeight - ch - SIDE_OFFSET);

  switch (side) {
    case "bottom":
      return { position: "fixed", top: triggerRect.bottom + SIDE_OFFSET, left: boundAlignH };
    case "top":
      return { position: "fixed", top: triggerRect.top - ch - SIDE_OFFSET, left: boundAlignH };
    case "right":
      return { position: "fixed", top: boundAlignV, left: triggerRect.right + SIDE_OFFSET };
    case "left":
      return { position: "fixed", top: boundAlignV, left: triggerRect.left - cw - SIDE_OFFSET };
  }
}

export const Tooltip: React.FC<TooltipProps> = ({
  message,
  children,
  side = "bottom",
  align = "center",
  delay = 300,
  disabled = false,
  size,
  bordered,
  color = "default",
  triggerClassName,
  messageClassName,
  wrapperClassName,
  ...props
}) => {
  const tooltipId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  // useRef avoids the extra re-render that useState would cause on every setTimeout call
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [positionStyles, setPositionStyles] = useState<React.CSSProperties>(HIDDEN_STYLES);

  // Tracks whether the pointer is over the portal panel — keeps tooltip open while user reads it
  const panelHoveredRef = useRef(false);

  useLayoutEffect(() => {
    if (!isOpen) {
      setPositionStyles(HIDDEN_STYLES);
      return;
    }
    if (!wrapperRef.current || !contentRef.current) return;
    const computed = getPositionStyles(
      side,
      align,
      wrapperRef.current.getBoundingClientRect(),
      contentRef.current,
    );
    setPositionStyles({ ...computed, visibility: "visible" });
  }, [isOpen, side, align]);

  // Clear the pending timer on unmount to prevent state updates on an unmounted component
  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const show = useCallback(() => {
    setIsOpen(true);
  }, []);

  const hide = useCallback(() => {
    if (panelHoveredRef.current) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    setIsOpen(false);
  }, []);

  const showWithDelay = useCallback(() => {
    if (disabled) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(show, delay);
  }, [disabled, delay, show]);

  const handleFocus = useCallback(() => {
    if (disabled) return;
    show();
  }, [disabled, show]);

  // e.relatedTarget is where focus moved to — if it's still inside the wrapper, keep the tooltip open
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      if (wrapperRef.current?.contains(e.relatedTarget as Node)) return;
      hide();
    },
    [hide],
  );

  //keyboard listener, hides tooltip on Escape key press when the tooltip is open
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        hide();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, hide]);

  // Inject aria-describedby onto the trigger and optionally merge triggerClassName
  const trigger = disabled
    ? children
    : React.cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
        "aria-describedby": isOpen ? tooltipId : undefined,
        ...(triggerClassName && {
          className: cn((children.props as { className?: string }).className, triggerClassName),
        }),
      });

  return (
    <div
      ref={wrapperRef}
      className={cn("inline-block", wrapperClassName)}
      onMouseEnter={showWithDelay}
      onMouseLeave={hide}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {trigger}
      {isOpen &&
        createPortal(
          <div
            ref={contentRef}
            id={tooltipId}
            role="tooltip"
            style={positionStyles}
            className={cn(tooltipVariants({ size, bordered, color }), messageClassName)}
            onMouseEnter={() => {
              panelHoveredRef.current = true;
            }}
            onMouseLeave={() => {
              panelHoveredRef.current = false;
              hide();
            }}
            {...props}
          >
            {message}
          </div>,
          document.body,
        )}
    </div>
  );
};

Tooltip.displayName = "Tooltip";
