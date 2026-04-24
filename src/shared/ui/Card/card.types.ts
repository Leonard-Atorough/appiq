import type { VariantProps } from "class-variance-authority";
import type { cardVariants } from "./card.variants";

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  /** Content rendered in the card header (typically a title or summary). */
  header?: React.ReactNode;
  /** Content rendered in the card footer (typically actions or metadata). */
  footer?: React.ReactNode;
  /** Primary card body content. */
  children?: React.ReactNode;
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
  onDragStart?: React.DragEventHandler<HTMLDivElement>;
  onDragEnd?: React.DragEventHandler<HTMLDivElement>;
  onDragOver?: React.DragEventHandler<HTMLDivElement>;
  onDrop?: React.DragEventHandler<HTMLDivElement>;
  /** When set, wraps the card in a DragItem, making it draggable via the HTML drag-and-drop API. */
  dragId?: string;
  /**
   * Data type key for the DragItem. Must match the DropTarget's `accept` prop.
   * A console warning fires in development if `dragId` is set without this.
   */
  dragType?: string;
}
