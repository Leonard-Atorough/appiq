import React from "react";

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean; // modal (blocks background) or non-modal (popover-like)
  modalOverlayClassName?: string; // custom class for modal overlay
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
  focusRef?: React.RefObject<HTMLElement | null>; // element to focus when dialog opens
  buttonRow?: React.ReactNode; // custom button row, to display underneath the content
}
