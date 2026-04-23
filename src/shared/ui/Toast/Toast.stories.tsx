import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Toast } from "./Toast";
import { Button } from "@shared/ui/Button";
import type { ToastProps } from "./toast.types";

const meta: Meta<typeof Toast> = { title: "Shared/Toast", component: Toast };
export default meta;
type Story = StoryObj<typeof Toast>;

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-md ">
      <Toast title="Default" description="A neutral notification." onDismiss={() => {}} />
      <Toast
        variant="success"
        title="Success"
        description="Application saved successfully."
        onDismiss={() => {}}
      />
      <Toast
        variant="error"
        title="Error"
        description="Failed to sync. Please try again."
        onDismiss={() => {}}
      />
      <Toast
        variant="warning"
        title="Warning"
        description="Your session will expire soon."
        onDismiss={() => {}}
      />
      <Toast
        variant="info"
        title="Info"
        description="3 new matches found for your profile."
        onDismiss={() => {}}
      />
    </div>
  ),
};

export const WithAction: Story = {
  render: () => (
    <div className="">
      <Toast
        variant="info"
        title="Application archived"
        description="You can restore it from the archive."
        action={{ label: "Undo", onClick: () => {} }}
        onDismiss={() => {}}
      />
    </div>
  ),
};

export const LiveDemo: Story = {
  render: () => {
    type QueuedToast = Omit<ToastProps, "onDismiss"> & { key: number };
    const [toasts, setToasts] = useState<QueuedToast[]>([]);
    const [counter, setCounter] = useState(0);

    const add = (props: Omit<ToastProps, "onDismiss">) => {
      const key = counter + 1;
      setCounter(key);
      setToasts((prev) => [...prev, { ...props, key }]);
    };

    return (
      <div className="flex flex-col gap-lg">
        <div className="flex flex-wrap gap-sm">
          <Button size="sm" onClick={() => add({ title: "Saved", variant: "success" })}>
            Success
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              add({
                title: "Error occurred",
                variant: "error",
                description: "Check your connection.",
              })
            }
          >
            Error
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => add({ title: "Heads up", variant: "warning" })}
          >
            Warning
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              add({
                title: "FYI",
                variant: "info",
                description: "Something happened in the background.",
              })
            }
          >
            Info
          </Button>
        </div>
        <div className="flex flex-col gap-sm ">
          {toasts.map((t) => (
            <Toast
              key={t.key}
              // Spreading all props except `key`
              {...((({ key, ...rest }) => rest)(t) as ToastProps) }
              duration={4000}
              onDismiss={() => setToasts((prev) => prev.filter((x) => x.key !== t.key))}
            />
          ))}
        </div>
      </div>
    );
  },
};
