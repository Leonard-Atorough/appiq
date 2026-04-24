export interface DragItemProps {
  /** Unique identifier passed to the paired DropTarget's `onDrop` callback. */
  id: string;
  /**
   * Data type key written to `dataTransfer` on drag start.
   * Must match the DropTarget's `accept` prop for drops to be accepted.
   * A console warning fires in development if this is not set.
   */
  type?: string;
  /** Content to make draggable. */
  children: React.ReactNode;
  /** Prevents dragging when true. */
  disabled?: boolean;
  /** Extra class(es) merged onto the drag wrapper element. */
  className?: string;
}
