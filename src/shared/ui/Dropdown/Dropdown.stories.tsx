import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dropdown } from "./Dropdown";
import { Icon } from "@shared/ui/Icon";

const meta: Meta<typeof Dropdown> = { title: "Shared/Dropdown", component: Dropdown };
export default meta;
type Story = StoryObj<typeof Dropdown>;

const items = [
  { label: "Edit", icon: <Icon name="briefcase" size="sm" />, onClick: () => {} },
  { label: "Duplicate", onClick: () => {} },
  { label: "Archive", onClick: () => {} },
  { label: "Delete", variant: "danger" as const, onClick: () => {} },
];

export const Default: Story = { render: () => <Dropdown items={items} /> };

export const Triggers: Story = {
  render: () => (
    <div className="flex gap-lg items-center">
      <div className="flex flex-col items-center gap-sm">
        <span className="text-sm text-muted">kebab</span>
        <Dropdown items={items} trigger="kebab" triggerLabel="Kebab menu" />
      </div>
      <div className="flex flex-col items-center gap-sm">
        <span className="text-sm text-muted">meatball</span>
        <Dropdown items={items} trigger="meatball" triggerLabel="Meatball menu" />
      </div>
      <div className="flex flex-col items-center gap-sm">
        <span className="text-sm text-muted">hamburger</span>
        <Dropdown items={items} trigger="hamburger" triggerLabel="Hamburger menu" />
      </div>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="flex justify-between px-xl">
      <Dropdown items={items} align="start" triggerLabel="Align start" />
      <Dropdown items={items} align="end" triggerLabel="Align end" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => <Dropdown items={items} disabled triggerLabel="Disabled dropdown" />,
};

export const WithDisabledItem: Story = {
  render: () => (
    <Dropdown
    align="start"
      items={[
        { label: "Edit", onClick: () => {} },
        { label: "Archive (unavailable)", onClick: () => {}, disabled: true },
        { label: "Delete", variant: "danger", onClick: () => {} },
      ]}
    />
  ),
};
