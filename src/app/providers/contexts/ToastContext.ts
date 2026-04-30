import type { ToastProps } from "@/shared/ui";
import { createContext } from "react";

export type QueuedToast = Omit<ToastProps, "onDismiss"> & { id: string };

interface ToastContextType {
  toasts: QueuedToast[];
  addToast: (toast: Omit<ToastProps, "onDismiss">) => void;
  removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);