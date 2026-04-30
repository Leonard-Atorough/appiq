import { useToast } from "@/shared/lib/hooks/useToast";
import { Toast } from "@/shared/ui";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-md right-md z-50 pointer-events-none flex flex-col gap-sm px-md">
      {toasts.map(({ id, ...toastProps }) => (
        <div key={id} className="pointer-events-auto">
          <Toast
            {...toastProps}
            onDismiss={() => removeToast(id)}
          />
        </div>
      ))}
    </div>
  );
}
