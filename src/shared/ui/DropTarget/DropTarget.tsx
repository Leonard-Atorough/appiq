import React, { useState } from "react";
import type { DropTargetProps } from "./droptarget.types";

/**
 * DropTarget
 *
 * A drop zone for drag-and-drop interactions. Accepts dragged items and provides
 * visual feedback when items are dragged over it. The `children` prop is a render
 * prop that receives the current drag state.
 *
 * @example
 * <DropTarget
 *   droppableId="status-interviewing"
 *   accept="application-card"
 *   onDrop={(draggedId) => moveApplication(draggedId, "interviewing")}
 * >
 *   {({ isDragOver }) => (
 *     <div className={cn("p-md", isDragOver && "ring-2 ring-primary")}>
 *       Drop applications here
 *     </div>
 *   )}
 * </DropTarget>
 */
export const DropTarget = ({
  onDrop,
  children,
  accept,
  droppableId,
  disabled = false,
  className,
  ariaLabel,
  ...props
}: DropTargetProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isDragAccepted, setIsDragAccepted] = useState(false);

  const dragCounter = React.useRef(0);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (!disabled) {
      const draggedType = e.dataTransfer?.types?.[0];
      const acceptTypes = Array.isArray(accept) ? accept : [accept || "application-card"];
      const isAccepted = !accept || acceptTypes.includes(draggedType || "");
      setIsDragAccepted(isAccepted);
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current <= 0) {
      dragCounter.current = 0;
      setIsDragOver(false);
      setIsDragAccepted(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    setIsDragAccepted(false);

    // Use the actual type from the drag event (set by DragItem) rather than
    // assuming accept[0], so array-accept works regardless of item order.
    const draggedType =
      e.dataTransfer?.types?.[0] ??
      (Array.isArray(accept) ? accept[0] : (accept ?? "application-card"));
    const draggedId = e.dataTransfer?.getData(draggedType);
    if (draggedId && !disabled && isDragAccepted) {
      onDrop(draggedId);
    }

    dragCounter.current = 0;
  };

  return (
    <div
      className={className}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      data-droppable-id={droppableId}
      aria-label={ariaLabel}
      {...props}
    >
      {children({ isDragOver, isDragAccepted })}
    </div>
  );
};
