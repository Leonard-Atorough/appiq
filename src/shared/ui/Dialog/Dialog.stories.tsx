import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, useRef } from "react";
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
        >
          <p>This is a simple informational dialog.</p>
        </Dialog>
      </>
    );
  },
};

export const NonModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Non-Modal Dialog</Button>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          modal={false}
          title="Popover-like Dialog"
          description="No backdrop overlay, focus is not trapped. Click outside to close."
          buttonRow={
            <div className="flex gap-sm justify-end">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
          }
        >
          <p>This dialog acts like a popover without a modal backdrop.</p>
        </Dialog>
      </>
    );
  },
};

export const CustomFocus: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const focusRef = useRef<HTMLButtonElement>(null);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          title="Confirm Deletion"
          description="This action cannot be undone."
          focusRef={focusRef as React.RefObject<HTMLElement>}
          buttonRow={
            <div className="flex gap-sm justify-end">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button ref={focusRef} variant="primary" onClick={() => setOpen(false)}>
                Delete
              </Button>
            </div>
          }
        >
          <p>Are you sure you want to delete this item?</p>
        </Dialog>
      </>
    );
  },
};

export const WithFormContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Form Dialog</Button>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          title="User Settings"
          size="md"
          buttonRow={
            <div className="flex gap-sm justify-end">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Save</Button>
            </div>
          }
        >
          <div className="space-y-md">
            <div>
              <label className="block text-sm font-medium mb-xs">Name</label>
              <input type="text" placeholder="Enter your name" className="w-full px-sm py-xs border border-base rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-xs">Email</label>
              <input type="email" placeholder="Enter your email" className="w-full px-sm py-xs border border-base rounded-md" />
            </div>
          </div>
        </Dialog>
      </>
    );
  },
};
