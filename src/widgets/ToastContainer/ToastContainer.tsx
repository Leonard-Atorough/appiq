import { useToast } from "@/shared/lib/hooks/useToast";
import { Toast } from "@/shared/ui";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-0 right-0 p-md z-50 pointer-events-none flex flex-col gap-sm max-w-md">
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
