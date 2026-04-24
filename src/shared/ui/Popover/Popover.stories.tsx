import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Popover } from "./Popover";
import { Button } from "@shared/ui/Button";

const meta: Meta<typeof Popover> = { title: "Shared/Popover", component: Popover };
export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover
      trigger={(props) => (
        <Button variant="outline" {...props}>
          Open Popover
        </Button>
      )}
    >
      <div className="flex flex-col gap-sm p-xs">
        <p className="text-sm font-semibold">Quick actions</p>
        <p className="text-sm text-muted">Select an action to continue.</p>
        <Button size="sm" variant="ghost">
          Edit application
        </Button>
        <Button size="sm" variant="ghost">
          Archive
        </Button>
      </div>
    </Popover>
  ),
};

export const Placement: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-xl p-3xl">
      {(["top", "bottom", "left", "right"] as const).map((side) => (
        <div key={side} className="flex justify-center">
          <Popover
            side={side}
            trigger={(props) => (
              <Button size="sm" variant="outline" {...props}>
                {side}
              </Button>
            )}
          >
            <p className="text-sm p-xs">Popover on {side}</p>
          </Popover>
        </div>
      ))}
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="flex flex-col gap-3xl p-3xl">
      {(["start", "center", "end"] as const).map((align) => (
        <div key={align} className="flex justify-center">
          <Popover
            side="bottom"
            align={align}
            trigger={(props) => (
              <Button size="sm" variant="outline" {...props}>
                align: {align}
              </Button>
            )}
          >
            <p className="text-sm p-xs">Aligned to {align}</p>
          </Popover>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-xl p-3xl">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Popover
          key={size}
          size={size}
          trigger={(props) => (
            <Button size="sm" variant="outline" {...props}>
              {size}
            </Button>
          )}
        >
          <div className="flex flex-col gap-sm">
            <p className="font-semibold">Size {size}</p>
            <p className="text-sm text-muted">This popover is {size} sized.</p>
          </div>
        </Popover>
      ))}
    </div>
  ),
};

export const OpenOnHover: Story = {
  render: () => (
    <Popover
      openOn="hover"
      trigger={(props) => (
        <Button variant="ghost" {...props}>
          Hover me
        </Button>
      )}
    >
      <p className="text-sm p-xs">Opens on hover</p>
    </Popover>
  ),
};

export const OpenOnFocus: Story = {
  render: () => (
    <Popover
      openOn="focus"
      trigger={(props) => (
        <Button variant="ghost" {...props}>
          Focus me
        </Button>
      )}
    >
      <p className="text-sm p-xs">Opens on focus</p>
    </Popover>
  ),
};

export const Modal: Story = {
  render: () => (
    <Popover modal trigger={(props) => <Button {...props}>Open modal popover</Button>}>
      <div className="flex flex-col gap-sm p-xs max-w-xs">
        <p className="text-sm font-semibold">Modal popover</p>
        <p className="text-sm text-muted">Traps focus and renders a backdrop.</p>
        <Button size="sm" variant="primary">
          Confirm
        </Button>
      </div>
    </Popover>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex flex-col gap-md">
        <p className="text-sm text-muted">Open state: {open ? "Open" : "Closed"}</p>
        <Popover
          open={open}
          onOpenChange={setOpen}
          trigger={(props) => <Button {...props}>Toggle</Button>}
        >
          <div className="flex flex-col gap-sm p-xs">
            <p className="text-sm font-semibold">Controlled Popover</p>
            <p className="text-sm text-muted">Managed by parent state.</p>
            <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
              Close from content
            </Button>
          </div>
        </Popover>
      </div>
    );
  },
};

export const WithForm: Story = {
  render: () => (
    <Popover
      size="md"
      trigger={(props) => (
        <Button variant="outline" {...props}>
          Quick Filter
        </Button>
      )}
    >
      <form className="flex flex-col gap-md" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="text-sm font-semibold">Status</label>
          <select className="mt-xs p-xs border border-base rounded text-sm w-full">
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold">Company</label>
          <input
            type="text"
            placeholder="Filter by company..."
            className="mt-xs p-xs border border-base rounded text-sm w-full"
          />
        </div>
        <Button type="submit" size="sm" variant="primary">
          Apply Filter
        </Button>
      </form>
    </Popover>
  ),
};
