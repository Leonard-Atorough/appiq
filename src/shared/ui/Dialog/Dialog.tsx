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
      modalOverlayClassName,
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
      <div className={cn("fixed inset-0 z-50 flex items-center justify-center p-(--spacing-md)")}>
        {modal && (
          <div
            className={cn("fixed inset-0 bg-(--color-text)/0.5", modalOverlayClassName ?? "")}
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
            <div className="px-(--spacing-md) py-(--spacing-sm) border-b border-(--color-border)">
              <h2 id={titleId} className="text-(--font-size-lg) font-(--font-weight-semibold)">
                {title}
              </h2>
            </div>
          )}

          {description && (
            <div
              className="px-(--spacing-md) py-(--spacing-xs) text-(--font-size-sm) text-(--color-text-muted)"
              id={descId}
            >
              {description}
            </div>
          )}

          <div className="p-(--spacing-md)">{children}</div>

          <div className="px-(--spacing-md) py-(--spacing-sm) border-t border-(--color-border) text-right">
            <button
              ref={closeButtonRef}
              type="button"
              className="px-(--spacing-md) py-(--spacing-sm) rounded-(--radius-md) bg-(--color-secondary) text-(--color-secondary-foreground) shadow-sm hover:shadow-md active:shadow-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-(--color-secondary) active:scale-[0.98]"
              onClick={() => onOpenChange?.(false)}
            >
              Close
            </button>
          </div>
          {buttonRow && (
            <div className="px-(--spacing-md) py-(--spacing-sm) border-t border-(--color-border)">
              {buttonRow}
            </div>
          )}
        </section>
      </div>
    );
  },
);

Dialog.displayName = "Dialog";
