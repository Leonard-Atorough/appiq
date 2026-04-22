import React from "react";

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controls whether the dialog is visible. */
  open: boolean;
  /** Called when the dialog requests close (overlay click or Escape). Update `open` here in controlled mode. */
  onOpenChange?: (open: boolean) => void;
  /** `true` renders a backdrop and traps focus. `false` is popover-like with no background block. Defaults to `true`. */
  modal?: boolean;
  /** Extra classes on the modal backdrop overlay. */
  modalOverlayClassName?: string;
  /** Displayed in the dialog header and announced by screen readers as the dialog's accessible name. */
  title?: string;
  /** Supporting text shown below the title. */
  description?: string;
  /** Panel width preset. `sm`=288px, `md`=384px, `lg`=640px. */
  size?: "sm" | "md" | "lg";
  /** Element to focus when the dialog opens. Defaults to the first focusable element in the panel. */
  focusRef?: React.RefObject<HTMLElement | null>;
  /** Content rendered in the dialog footer (typically action buttons). */
  buttonRow?: React.ReactNode;
  /** Shows the built-in close (×) button. Defaults to `true` when no `buttonRow` is provided. */
  showClose?: boolean;
}
