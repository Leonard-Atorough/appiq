import { forwardRef, useCallback, useEffect, useId, useRef } from "react";
import { cn } from "@shared/lib/cn";
import { dialogVariants } from "./dialog.variants";
import type { DialogProps } from "./dialog.types";

/**
 * Accessible Dialog component supporting modal and non-modal modes.
 * - `open` and `onOpenChange` control visibility
 * - `modal` determines whether an overlay is rendered and `aria-modal` is set
 */
export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      open,
      onOpenChange,
      modal = true,
      modalOverlayClassName,
      title,
      description,
      size = "md",
      className,
      children,
      focusRef = null,
      buttonRow,
      showClose,
      ...props
    },
    ref,
  ) => {
    useEffect(() => {
      if (typeof document !== "undefined") {
        if (open && modal) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
      }
      return () => {
        if (typeof document !== "undefined") document.body.style.overflow = "";
      };
    }, [open, modal]);

    useEffect(() => {
      if (open && focusRef?.current) {
        focusRef.current.focus();
      } else if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      }
    }, [open, focusRef]);

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape" && open) {
          onOpenChange?.(false);
        }
      };
      if (open) {
        document.addEventListener("keydown", handleKeyDown);
      }
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [open, onOpenChange]);

    const dialogId = useId();
    const titleId = `${dialogId}-title`;
    const descId = `${dialogId}-desc`;

    const closeButtonRef = useRef<HTMLButtonElement>(null); // Ref for the close button to return focus when the dialog opens
    const returnFocusRef = useRef<HTMLElement | null>(null); // Ref to store the element that triggered the dialog, to return focus on close

    const shouldShowClose = showClose ?? !buttonRow;

    // Internal ref for the dialog panel, merged with the forwarded ref
    const internalRef = useRef<HTMLDivElement>(null);
    const mergedRef = useCallback(
      (node: HTMLDivElement | null) => {
        internalRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    useEffect(() => {
      if (open) {
        returnFocusRef.current = document.activeElement as HTMLElement;
      } else {
        returnFocusRef.current?.focus();
        returnFocusRef.current = null;
      }
    }, [open]);

    // Focus trap: keep Tab/Shift+Tab inside the dialog panel
    useEffect(() => {
      if (!open) return;
      const panel = internalRef.current;
      if (!panel) return;

      const FOCUSABLE = [
        "a[href]",
        "button:not([disabled])",
        "input:not([disabled])",
        "select:not([disabled])",
        "textarea:not([disabled])",
        '[tabindex]:not([tabindex="-1"])',
      ].join(", ");

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;
        const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (focusable.length === 0) return;
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
      return () => document.removeEventListener("keydown", handleTab);
    }, [open]);

    if (!open) return null;

    return (
      <div className={cn("fixed inset-0 z-50 flex items-center justify-center p-md")}>
        {modal && (
          <div
            className={cn("fixed inset-0 bg-(--color-text)/0.5", modalOverlayClassName ?? "")}
            aria-hidden="true"
            data-testid="dialog-overlay"
            onClick={() => onOpenChange?.(false)}
          />
        )}

        <div
          ref={mergedRef}
          role="dialog"
          aria-modal={modal}
          tabIndex={-1}
          aria-labelledby={title ? titleId : undefined}
          aria-describedby={description ? descId : undefined}
          className={cn(dialogVariants({ size }), className)}
          {...props}
        >
          {title && (
            <div className="px-md py-sm border-b border-base">
              <h2 id={titleId} className="text-lg font-semibold">
                {title}
              </h2>
            </div>
          )}

          {description && (
            <div className="px-md py-xs text-sm text-muted" id={descId}>
              {description}
            </div>
          )}

          <div className="p-md">{children}</div>

          {shouldShowClose && (
            <div className="px-md py-sm border-t border-base text-right">
              <button
                ref={closeButtonRef}
                type="button"
                className="px-md py-sm rounded-md bg-(--color-secondary) text-(--color-secondary-foreground) shadow-sm hover:shadow-md active:shadow-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-(--color-secondary) active:scale-[0.98]"
                onClick={() => onOpenChange?.(false)}
              >
                Close
              </button>
            </div>
          )}
          {buttonRow && <div className="px-md py-sm border-t border-base">{buttonRow}</div>}
        </div>
      </div>
    );
  },
);

Dialog.displayName = "Dialog";
