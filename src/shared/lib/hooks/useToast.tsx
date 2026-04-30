import { ToastContext } from "@/app/providers/contexts/ToastContext";
import { useContext } from "react";

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
