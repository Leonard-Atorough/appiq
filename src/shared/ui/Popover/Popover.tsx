import { useCallback, useEffect, useId, useRef, useState } from "react";
import type React from "react";
import { cn } from "@shared/lib/cn";
import {
  popoverVariants,
  popoverOverlayVariants,
  popoverTriggerVariants,
} from "./popover.variants";
import type { PopoverProps, PopoverSide, PopoverAlign } from "./popover.types";

const FOCUSABLE_SELECTORS = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

function getPanelPositionClasses(side: PopoverSide, align: PopoverAlign): string {
  const sideClass: Record<PopoverSide, string> = {
    bottom: "top-full",
    top: "bottom-full",
    right: "left-full",
    left: "right-full",
  };
  const alignClass: Record<PopoverSide, Record<PopoverAlign, string>> = {
    bottom: { start: "left-0", center: "left-1/2 -translate-x-1/2", end: "right-0" },
    top: { start: "left-0", center: "left-1/2 -translate-x-1/2", end: "right-0" },
    right: { start: "top-0", center: "top-1/2 -translate-y-1/2", end: "bottom-0" },
    left: { start: "top-0", center: "top-1/2 -translate-y-1/2", end: "bottom-0" },
  };
  return cn("absolute", sideClass[side], alignClass[side][align]);
}

function getSideOffsetStyle(side: PopoverSide, offset: number): React.CSSProperties {
  return {
    bottom: { marginTop: offset },
    top: { marginBottom: offset },
    right: { marginLeft: offset },
    left: { marginRight: offset },
  }[side];
}

export function Popover({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  trigger,
  openOn = "click",
  side = "bottom",
  align = "start",
  sideOffset = 8,
  modal = false,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  children,
  size,
  triggerClassName,
  contentClassName,
  triggerProps,
  contentProps,
}: PopoverProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = isControlled ? controlledOpen! : internalOpen;

  const panelId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const setOpen = useCallback(
    (val: boolean) => {
      if (!isControlled) setInternalOpen(val);
      onOpenChange?.(val);
    },
    [isControlled, onOpenChange],
  );

  const close = useCallback(() => setOpen(false), [setOpen]);

  // Capture focus target before opening; restore on close
  useEffect(() => {
    if (isOpen) {
      returnFocusRef.current = document.activeElement as HTMLElement;
    } else {
      returnFocusRef.current?.focus();
      returnFocusRef.current = null;
    }
  }, [isOpen]);

  // Scroll lock in modal mode
  useEffect(() => {
    if (modal) {
      document.body.style.overflow = isOpen ? "hidden" : "";
    }
    return () => {
      if (modal) document.body.style.overflow = "";
    };
  }, [modal, isOpen]);

  // Close on outside click (pointerdown so it fires before blur)
  useEffect(() => {
    if (!isOpen || !closeOnOutsideClick) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isOpen, closeOnOutsideClick, close]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeOnEscape, close]);

  // Focus trap (modal mode only)
  useEffect(() => {
    if (!isOpen || !modal) return;
    const panel = panelRef.current;
    if (!panel) return;
    let firstFocusable: HTMLElement | null = null;
    const rafId = requestAnimationFrame(() => {
      firstFocusable = panel.querySelector<HTMLElement>(FOCUSABLE_SELECTORS);
      if (firstFocusable) firstFocusable.focus();
    });
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleTab);
    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("keydown", handleTab);
    };
  }, [isOpen, modal]);

  // Interaction props split by concern to avoid redundant handlers
  const wrapperInteractionProps: React.HTMLAttributes<HTMLDivElement> =
    openOn === "hover"
      ? { onMouseEnter: () => setOpen(true), onMouseLeave: () => setOpen(false) }
      : openOn === "focus"
        ? {
            onBlur: (e) => {
              if (!wrapperRef.current?.contains(e.relatedTarget as Node)) close();
            },
          }
        : {};

  const buttonInteractionProps: React.ButtonHTMLAttributes<HTMLButtonElement> =
    openOn === "click"
      ? { onClick: () => setOpen(!isOpen) }
      : openOn === "focus"
        ? { onFocus: () => setOpen(true) }
        : {};

  // Panel: absolute when non-modal, fixed+centered when modal (avoids stacking context issues)
  const panelPositionClasses = modal
    ? "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    : getPanelPositionClasses(side, align);

  const panelStyle = modal ? undefined : getSideOffsetStyle(side, sideOffset);

  return (
    <div ref={wrapperRef} className="relative inline-block" {...wrapperInteractionProps}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={isOpen ? panelId : undefined}
        aria-haspopup={modal ? "dialog" : true}
        className={cn(popoverTriggerVariants(), triggerClassName)}
        {...buttonInteractionProps}
        {...triggerProps}
      >
        {trigger}
      </button>

      {isOpen && (
        <>
          {modal && (
            <div
              className={popoverOverlayVariants()}
              aria-hidden="true"
              onClick={closeOnOutsideClick ? close : undefined}
            />
          )}
          <div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal={modal || undefined}
            tabIndex={-1}
            style={panelStyle}
            className={cn(popoverVariants({ size }), panelPositionClasses, contentClassName)}
            {...contentProps}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
}
