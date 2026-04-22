import type { Meta, StoryObj } from "@storybook/react-vite";
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

export const Modal: Story = {
  render: () => (
    <Popover modal trigger={(props) => <Button {...props}>Open modal popover</Button>}>
      <div className="flex flex-col gap-sm p-xs max-w-xs">
        <p className="text-sm font-semibold">Modal popover</p>
        <p className="text-sm text-muted">Traps focus and renders a backdrop.</p>
      </div>
    </Popover>
  ),
};
