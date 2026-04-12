import { useCallback, useEffect, useId, useRef, useState } from "react";
import { cn } from "@shared/lib/cn";
import { dropdownItemVariants, dropdownMenuVariants } from "./dropdown.variants";
import type { DropdownProps } from "./dropdown.types";
import { KebabIcon, MeatballIcon, BentoIcon, HamburgerIcon, DonerIcon } from "./dropdown.icons";

function getDropdownTrigger(trigger: DropdownProps["trigger"]) {
  switch (trigger) {
    case "kebab":
      return <KebabIcon />;
    case "meatball":
      return <MeatballIcon />;
    case "bento":
      return <BentoIcon />;
    case "doner":
      return <DonerIcon />;
    case "hamburger":
      return <HamburgerIcon />;
    default:
      return trigger;
  }
}

export function Dropdown({
  items,
  trigger = "kebab",
  align = "end",
  triggerLabel = "Open menu",
  disabled,
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
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
          "text-(--color-text-muted) transition-colors duration-150",
          "hover:bg-muted hover:text-(--color-text)",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-1",
          "disabled:opacity-50 disabled:cursor-not-allowed",
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        {getDropdownTrigger(trigger)}
      </button>

      {open && (
        <ul
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label={triggerLabel}
          data-testid="dropdown-menu"
          className={cn(dropdownMenuVariants(), "top-full", align === "end" ? "right-0" : "left-0")}
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
        </ul>
      )}
    </div>
  );
}

Dropdown.displayName = "Dropdown";
