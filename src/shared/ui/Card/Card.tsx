import React from "react";
import type { CardProps } from "./card.types";
import { cn, useResponsive } from "@/shared/lib";
import { cardVariants } from "./card.variants";
import { DragItem } from "../DragItem";

/**
 * Card
 *
 * A surface container for grouped content with optional header, footer, and thumbnail.
 * Variant props (size, variant, status) support responsive values.
 * When `onClick` is provided the card adopts `role="button"` and activates on
 * Enter/Space for full keyboard support; otherwise it renders as `role="group"`.
 * The `loading` state masks content while preserving layout dimensions.
 * Supports drag-and-drop lifecycle events and a `selected` ring indicator.
 *
 * @example
 * <Card header="Software Engineer" onClick={() => openDetail(id)}>
 *   <p>Acme Corp — Applied 3 days ago</p>
 * </Card>
 *
 * @example
 * <Card
 *   size={{ base: "sm", lg: "md" }}
 *   variant={{ base: "outlined", lg: "elevated" }}
 * >
 *   Content
 * </Card>
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      header,
      footer,
      children,
      thumbnail,
      thumbnailAlt,
      loading,
      selected,
      disabled,
      dragId,
      dragType,
      size,
      variant,
      status,
      onDragStart,
      onDragEnd,
      onDragOver,
      onDrop,
      onClick,
      className,
      ...props
    },
    ref,
  ): React.JSX.Element => {
    if (import.meta.env.DEV && dragId && !dragType) {
      console.warn(
        "[Card] 'dragId' is set but 'dragType' is missing. Set 'dragType' to match your DropTarget's 'accept' prop.",
      );
    }

    // Resolve responsive variant props
    const resolvedSize = useResponsive(size ?? "md");
    const resolvedVariant = useResponsive(variant ?? "default");
    const resolvedStatus = useResponsive(status ?? "none");

    const interactive = onClick ? true : false; // Card is interactive if onClick handler is provided

    const headerId = React.useId();

    const cardElement = (
      <div
        ref={ref}
        aria-labelledby={header ? headerId : undefined}
        aria-disabled={disabled || loading || undefined}
        aria-busy={loading || undefined}
        data-selected={selected || undefined}
        tabIndex={interactive !== false && !disabled ? 0 : undefined}
        className={cn(
          cardVariants({
            size: resolvedSize,
            variant: resolvedVariant,
            interactive: interactive,
            status: resolvedStatus,
          }),
          disabled && "opacity-disabled pointer-events-none",
          loading && "cursor-wait opacity-muted",
          !loading && !disabled && dragId && "cursor-grab active:cursor-grabbing",
          selected && "ring-2 ring-(--color-primary) ring-offset-2",
          className,
        )}
        role={interactive !== false && onClick ? "button" : "group"}
        draggable={false}
        onKeyDown={(e) => {
          if (
            interactive !== false &&
            !disabled &&
            !loading &&
            (e.key === "Enter" || e.key === " ")
          ) {
            e.preventDefault();
            onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
          }
        }}
        onDragStart={dragId ? undefined : onDragStart}
        onDragEnd={dragId ? undefined : onDragEnd}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={loading || disabled ? undefined : onClick}
        {...props}
      >
        {thumbnail && (
          <div>
            <img src={thumbnail} alt={thumbnailAlt ?? ""} className="w-full h-auto rounded-t-lg" />
          </div>
        )}
        {/* Keep children in DOM during loading so layout anchors are preserved */}
        <div className={loading ? "opacity-0" : undefined}>
          {header && (
            <div id={headerId} className="mb-sm text-lg font-semibold">
              {header}
            </div>
          )}
          <div className="min-h-2xl bg-outline rounded-sm">{children}</div>
          {footer && <div className="mt-sm text-sm text-muted">{footer}</div>}
        </div>
        {loading && (
          <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
            <span className="animate-spin h-6 w-6 border-2 border-current border-t-transparent rounded-full" />
          </span>
        )}
      </div>
    );

    if (dragId) {
      return (
        <DragItem id={dragId} type={dragType} disabled={disabled}>
          {cardElement}
        </DragItem>
      );
    }

    return cardElement;
  },
);

Card.displayName = "Card";
