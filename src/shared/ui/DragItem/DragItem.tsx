import React from "react";
import { cn } from "@/shared/lib/cn";
import type { DragItemProps } from "./dragitem.types";

/**
 * DragItem
 *
 * A thin wrapper that makes any content draggable via the HTML drag-and-drop API.
 * Writes `id` to `dataTransfer` under the given `type` key on drag start so that
 * paired `DropTarget` components can read and validate it.
 *
 * @example
 * <DragItem id={application.id} type="application-card">
 *   <Card header={application.position} />
 * </DragItem>
 */
export const DragItem = ({ id, type, children, disabled = false, className }: DragItemProps) => {
  React.useEffect(() => {
    if (import.meta.env.DEV && !type) {
      console.warn(
        `[DragItem] Missing 'type' prop on item id="${id}". ` +
          "Set 'type' to match your DropTarget's 'accept' prop so drops are validated correctly.",
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData(type ?? "application-card", id);
    e.dataTransfer.effectAllowed = "move";

    const el = e.currentTarget;
    const clone = el.cloneNode(true) as HTMLElement;
    clone.style.position = "absolute";
    clone.style.top = "-9999px";
    clone.style.left = "-9999px";
    clone.style.width = `${el.offsetWidth}px`;
    document.body.appendChild(clone);
    e.dataTransfer.setDragImage(clone, e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setTimeout(() => document.body.removeChild(clone), 0);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.clearData();
  };

  return (
    <div
      draggable={!disabled}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={cn(disabled && "cursor-not-allowed", className)}
    >
      {children}
    </div>
  );
};
