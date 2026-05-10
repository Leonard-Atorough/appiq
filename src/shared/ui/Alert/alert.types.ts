import type React from "react";

export type AlertType = "success" | "error" | "warning" | "info";

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> {
  /** Alert type/severity — determines color and icon semantics. @default "info" */
  type?: AlertType;

  /** Removes the default border and adjusts padding for a more compact look. @default false */
  borderless?: boolean;

  /** Alert title/heading text. Optional. */
  title?: React.ReactNode;

  /** Alert message content (required). */
  children: React.ReactNode;

  /** Whether the alert can be dismissed by the user. @default false */
  dismissible?: boolean;

  /** Callback fired when the alert is dismissed (only when dismissible={true}) */
  onDismiss?: () => void;

  /** Whether the alert content is currently visible. Use to control dismissal. @default true */
  isOpen?: boolean;
}
