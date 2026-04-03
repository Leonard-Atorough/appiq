import { forwardRef, useEffect, useId, useRef } from "react";
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
      title,
      description,
      size = "md",
      className,
      children,
      focusRef = null,
      buttonRow,
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

    const closeButtonRef = useRef<HTMLButtonElement>(null);

    if (!open) return null;

    return (
      <div className={cn("fixed inset-0 z-50 flex items-center justify-center p-4")}>
        {modal && (
          <div
            className="fixed inset-0 bg-(--color-text)/0.5"
            aria-hidden="true"
            data-testid="dialog-overlay"
            onClick={() => onOpenChange?.(false)}
          />
        )}

        <section
          ref={ref}
          role="dialog"
          aria-modal={modal}
          tabIndex={-1}
          aria-labelledby={title ? titleId : undefined}
          aria-describedby={description ? descId : undefined}
          className={cn(dialogVariants({ size }), className)}
          {...props}
        >
          {title && (
            <div className="px-md py-sm border-b border-(--color-border)">
              <h2 id={titleId} className="text-lg font-semibold">
                {title}
              </h2>
            </div>
          )}

          {description && (
            <div className="px-md py-xs text-sm text-(--color-text-muted)" id={descId}>
              {description}
            </div>
          )}

          <div className="p-md">{children}</div>

          <div className="px-md py-sm border-t border-(--color-border) text-right">
            <button
              ref={closeButtonRef}
              type="button"
              className="px-md py-sm rounded-md bg-(--color-secondary) text-(--color-secondary-foreground)"
              onClick={() => onOpenChange?.(false)}
            >
              Close
            </button>
          </div>
          {buttonRow && (
            <div className="px-md py-sm border-t border-(--color-border)">{buttonRow}</div>
          )}
        </section>
      </div>
    );
  },
);

Dialog.displayName = "Dialog";
