import React from "react";
import type { CardProps } from "./card.types";
import { cn } from "@/shared/lib/cn";
import { cardVariants } from "./card.variants";

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
      draggable,
      size,
      variant,
      interactive,
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
    const headerId = React.useId();
    return (
      <div
        ref={ref}
        aria-labelledby={header ? headerId : undefined}
        aria-disabled={disabled || undefined}
        data-selected={selected || undefined}
        tabIndex={interactive !== false && !disabled ? 0 : undefined}
        className={cn(
          cardVariants({ size, variant, interactive, status }),
          disabled && "opacity-50 pointer-events-none",
          loading && "cursor-wait opacity-75",
          selected && "ring-2 ring-(--color-primary) ring-offset-2",
          className,
        )}
        role={interactive !== false && onClick ? "button" : "group"}
        draggable={draggable ?? !disabled}
        onKeyDown={(e) => {
          if (interactive !== false && !disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
          }
        }}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={onClick}
        {...props}
      >
        {thumbnail && (
          <div>
            <img src={thumbnail} alt={thumbnailAlt ?? ""} className="w-full h-auto rounded-t-lg" />
          </div>
        )}
        <div>
          {header && (
            <div id={headerId} className="mb-sm text-lg font-semibold">
              {header}
            </div>
          )}
          <div>{children}</div>
          {footer && <div className="mt-sm text-sm text-muted">{footer}</div>}
        </div>
      </div>
    );
  },
);

Card.displayName = "Card";
