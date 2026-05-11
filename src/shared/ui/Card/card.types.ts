import type { ResponsiveValue } from "@/shared/lib";

// Base variant value types
type CardSize = "sm" | "md" | "lg";
type CardVariant = "default" | "elevated" | "outlined";
type CardInteractive = boolean;
type CardStatus = "none" | "success" | "warning" | "error" | "info";

export interface CardProps {
  /** Content rendered in the card header (typically a title or summary). */
  header?: React.ReactNode;
  /** Content rendered in the card footer (typically actions or metadata). */
  footer?: React.ReactNode;
  /** Primary card body content. */
  children?: React.ReactNode;
  /** Size affects padding. */
  size?: ResponsiveValue<CardSize>;
  /** Visual treatment. */
  variant?: ResponsiveValue<CardVariant>;
  /** Enables interactive state (hover, active). */
  interactive?: ResponsiveValue<CardInteractive>;
  /** Semantic status indicated by left border and background. */
  status?: ResponsiveValue<CardStatus>;
  /** URL of a thumbnail image rendered at the top of the card. */
  thumbnail?: string;
  /** Accessible alt text for the thumbnail image. */
  thumbnailAlt?: string;
  /** Shows a loading skeleton while content is being fetched. */
  loading?: boolean;
  /** Applies a selected/active visual state. */
  selected?: boolean;
  /** Prevents interaction and applies a disabled visual style. */
  disabled?: boolean;
  /** Handler called when the card is clicked (if interactive). */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /** Handler for drag start events. Ignored if `dragId` is set. */
  onDragStart?: React.DragEventHandler<HTMLDivElement>;
  /** Handler for drag end events. Ignored if `dragId` is set. */
  onDragEnd?: React.DragEventHandler<HTMLDivElement>;
  /** Handler for drag over events. */
  onDragOver?: React.DragEventHandler<HTMLDivElement>;
  /** Handler for drop events. */
  onDrop?: React.DragEventHandler<HTMLDivElement>;
  /** When set, wraps the card in a DragItem, making it draggable via the HTML drag-and-drop API. */
  dragId?: string;
  /**
   * Data type key for the DragItem. Must match the DropTarget's `accept` prop.
   * A console warning fires in development if `dragId` is set without this.
   */
  dragType?: string;
  /** Additional class names for styling the card. */
  className?: string;
}
