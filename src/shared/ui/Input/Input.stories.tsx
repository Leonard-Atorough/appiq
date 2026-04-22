import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";

const meta: Meta<typeof Input> = { title: "Shared/Input", component: Input };
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <Input label="Job Title" placeholder="e.g. Software Engineer" />
      <Input label="Company" placeholder="e.g. Acme Corp" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <Input label="Default" placeholder="Default state" state="default" />
      <Input label="Error" placeholder="Invalid value" state="error" />
      <Input label="Disabled" placeholder="Not editable" disabled />
    </div>
  ),
};

export const WithAdornments: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <Input
        label="Salary"
        startAdornment={<span className="text-muted">$</span>}
        placeholder="80,000"
      />
      <Input
        label="Search"
        endAdornment={<span className="text-muted">⌘K</span>}
        placeholder="Search applications…"
      />
    </div>
  ),
};
