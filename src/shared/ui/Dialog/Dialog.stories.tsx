import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Dialog } from "./Dialog";
import { Button } from "@shared/ui/Button";

const meta: Meta<typeof Dialog> = { title: "Shared/Dialog", component: Dialog };
export default meta;
type Story = StoryObj<typeof Dialog>;

function DialogDemo({ size }: { size?: "sm" | "md" | "lg" }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog ({size ?? "md"})</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Confirm Action"
        description="Are you sure you want to proceed? This action cannot be undone."
        size={size}
        buttonRow={
          <div className="flex gap-sm justify-end">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </div>
        }
      />
    </>
  );
}

export const Default: Story = { render: () => <DialogDemo /> };

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-md">
      <DialogDemo size="sm" />
      <DialogDemo size="md" />
      <DialogDemo size="lg" />
    </div>
  ),
};

export const WithoutButtonRow: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open (built-in close)</Button>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          title="Information"
          description="This dialog uses the built-in close button since no buttonRow is provided."
          showClose
        />
      </>
    );
  },
};
