import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@shared/lib/cn";
import { dropdownItemVariants, dropdownMenuVariants } from "./dropdown.variants";
import type { DropdownProps } from "./dropdown.types";
import { Icon } from "../Icon";

/**
 * Dropdown
 *
 * A context menu rendered via a React portal so the panel is never clipped
 * by `overflow: hidden` ancestors (e.g. inside table rows).
 * Supports preset trigger icons (kebab, meatball, bento, doner, hamburger)
 * or a custom trigger element. The menu position is calculated from the
 * trigger's `getBoundingClientRect()` at open time.
 *
 * Keyboard: ArrowDown/Up move focus, Home/End jump to first/last item,
 * Escape closes the menu and returns focus to the trigger.
 *
 * @example
 * <Dropdown
 *   trigger="kebab"
 *   items={[
 *     { label: "Edit", onClick: () => handleEdit(id) },
 *     { label: "Delete", onClick: () => handleDelete(id), intent: "danger" },
 *   ]}
 * />
 */
function getDropdownTrigger(trigger: DropdownProps["trigger"]) {
  switch (trigger) {
    case "kebab":
      return <Icon name="kebab" size="sm" aria-hidden={true} />;
    case "meatball":
      return <Icon name="meatball" size="sm" aria-hidden={true} />;
    case "bento":
      return <Icon name="bento" size="sm" aria-hidden={true} />;
    case "doner":
      return <Icon name="doner" size="sm" aria-hidden={true} />;
    case "hamburger":
      return <Icon name="hamburger" size="sm" aria-hidden={true} />;
    default:
      return trigger;
  }
}

export function Dropdown({
  items,
  trigger = "kebab",
  align = "start",
  triggerLabel = "Open menu",
  disabled,
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (
        !triggerRef.current?.contains(e.target as Node) &&
        !menuRef.current?.contains(e.target as Node)
      ) {
        close();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, close]);

  // Keyboard navigation: ArrowDown/Up, Home, End, Escape
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        triggerRef.current?.focus();
        return;
      }
      if (!menuRef.current) return;
      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>('[role="menuitem"]:not([disabled])'),
      );
      const idx = focusable.indexOf(document.activeElement as HTMLElement);

      if (e.key === "ArrowDown") {
        e.preventDefault();
        (idx < focusable.length - 1 ? focusable[idx + 1] : focusable[0])?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        (idx > 0 ? focusable[idx - 1] : focusable[focusable.length - 1])?.focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        focusable[0]?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        focusable[focusable.length - 1]?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  // Calculate portal position when menu opens
  useEffect(() => {
    if (!open || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setMenuStyle(
      align === "end"
        ? { position: "fixed", top: rect.bottom + 4, right: window.innerWidth - rect.right }
        : { position: "fixed", top: rect.bottom + 4, left: rect.left },
    );
  }, [open, align]);

  // Move focus to first enabled item when menu opens
  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => {
      menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]:not([disabled])')?.focus();
    });
  }, [open]);

  return (
    <div className={cn("relative inline-block", className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={triggerLabel}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center rounded-md p-xs",
          "text-(--color-text-muted) transition-all duration-150",
          "hover:bg-muted hover:text-(--color-text)",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-1",
          "disabled:opacity-50 disabled:cursor-not-allowed",
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        {getDropdownTrigger(trigger)}
      </button>

      {open &&
        createPortal(
          <ul
            ref={menuRef}
            id={menuId}
            role="menu"
            aria-label={triggerLabel}
            data-testid="dropdown-menu"
            style={menuStyle}
            className={cn(dropdownMenuVariants())}
          >
            {items.map((item, index) => (
              <li key={index} role="none">
                <button
                  type="button"
                  role="menuitem"
                  disabled={item.disabled}
                  aria-disabled={item.disabled}
                  tabIndex={-1}
                  className={cn(dropdownItemVariants({ variant: item.variant ?? "default" }))}
                  // Prevent blur-before-click so onClick fires reliably
                  onPointerDown={(e) => e.preventDefault()}
                  onClick={() => {
                    if (!item.disabled) {
                      item.onClick();
                      close();
                      triggerRef.current?.focus();
                    }
                  }}
                >
                  {item.icon && (
                    <span className="inline-flex shrink-0" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>,
          document.body,
        )}
    </div>
  );
}

Dropdown.displayName = "Dropdown";
