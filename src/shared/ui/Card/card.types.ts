// The card component is an interactive, versatile component that contains content and actions about a single subject. It is drag-drop enabled by default, fits into the established design system and customisable.

import type { VariantProps } from "class-variance-authority";
import type { cardVariants } from "./card.variants";

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
    /**
     * The Header content of the card, typically a title or summary of the card's content.
     */
    header?: React.ReactNode;

    /**
     * The Footer content of the card, typically containing actions or additional information related to the card's content.
     */
    footer?: React.ReactNode;

    /**
     * The main content of the card, which can include text, images, or any other React nodes that represent the primary information or media associated with the card.
     */
    children?: React.ReactNode;

    /**
     * A path to a thumbnail image, rendered at the top of the card if provided.
     */
    thumbnail?: string;

    /**
     * Accessible alt text for the thumbnail image. Should describe the image content meaningfully.
     */
    thumbnailAlt?: string;

    /**
     * Indicates whether the card is in a loading state, typically used to show a placeholder or spinner while content is being fetched or processed.
     */
    loading?: boolean;

    /**
     * Indicates whether the card is selected, typically used to highlight or mark the card as active or chosen.
     */
    selected?: boolean;

    /**
     * Indicates whether the card is disabled, typically used to prevent user interaction and visually convey a non-interactive state.
     */
    disabled?: boolean;

    // /**
    //  * Indicates whether the card is in an error state, typically used to show an error message or visual indication of a problem.
    //  */
    // error?: boolean;

    // /**
    //  * Indicates whether the card is in a success state, typically used to show a success message or visual indication of a successful action.
    //  */
    // success?: boolean;

    /**
     * Event handler for when the drag operation starts.
     */
    onDragStart?: React.DragEventHandler<HTMLDivElement>;

    /**
     * Event handler for when the drag operation ends.
     */
    onDragEnd?: React.DragEventHandler<HTMLDivElement>;

    /**
     * Event handler for when the dragged item is over a valid drop target.
     */
    onDragOver?: React.DragEventHandler<HTMLDivElement>;

    /**
     * Event handler for when the dragged item is dropped on a valid drop target.
     */
    onDrop?: React.DragEventHandler<HTMLDivElement>;
  }
