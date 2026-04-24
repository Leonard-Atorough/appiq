// This component is a provider of a drop area as part of a drag-and-drop interaction. It accepts drag events and provides visual feedback based on the drag state (e.g., when an item is being dragged over it). The `children` prop is a render prop that receives the current drag state, allowing for dynamic content rendering based on whether an item is being dragged over the target and whether it is accepted. The component also supports a `droppableId` for identifying the drop target in complex drag-and-drop scenarios.
export interface DropTargetProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onDrop"> {
  onDrop: (draggedId: string) => void;
  /** A render prop that receives the current drag state and returns the content to be rendered inside the drop target. */
  children: (state: { isDragOver: boolean; isDragAccepted: boolean }) => React.ReactNode;
  /** MIME type(s) or custom type(s) that the drop target accepts. */
  accept?: string | string[];
  /** Unique identifier for the drop target, used to match with draggable items. */
  droppableId: string;
  /** Whether the drop target is currently disabled. */
  disabled?: boolean;
  /** Extra class(es) merged onto the drop target's className. */
  className?: string;
  /** Accessible label for the drop target, used by screen readers. */
  ariaLabel?: string;
}
