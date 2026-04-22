// The card component is an interactive, versatile component that contains content and actions about a single subject. It is drag-drop enabled by default, fits into the established design system and customisable.

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
  }
