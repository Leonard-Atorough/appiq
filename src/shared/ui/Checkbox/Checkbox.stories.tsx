import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Shared/Checkbox",
  component: Checkbox,
  parameters: { layout: "padded" },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    indeterminate: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "Accept terms and conditions",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Email notifications",
    description: "Receive updates when your application status changes.",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <Checkbox size="sm" label="Small" />
      <Checkbox size="md" label="Medium (default)" />
      <Checkbox size="lg" label="Large" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <Checkbox label="Accept terms" state="error" />
      <Checkbox
        label="Accept terms"
        description="Please read before accepting."
        state="error"
        errorMessage="You must accept the terms to continue."
      />
    </div>
  ),
};

export const ControlledGroup: Story = {
  render: () => {
    const options = ["Applied", "Interviewing", "Offer", "Rejected"];
    const [selected, setSelected] = useState<Set<string>>(new Set(["Applied"]));

    const toggle = (opt: string) =>
      setSelected((prev) => {
        const next = new Set(prev);
        next.has(opt) ? next.delete(opt) : next.add(opt);
        return next;
      });

    const allChecked = selected.size === options.length;
    const someChecked = selected.size > 0 && !allChecked;

    const toggleAll = () => setSelected(allChecked ? new Set() : new Set(options));

    return (
      <div className="flex flex-col gap-sm">
        <Checkbox
          label="All statuses"
          checked={allChecked}
          indeterminate={someChecked}
          onChange={toggleAll}
        />
        <div className="pl-lg flex flex-col gap-sm">
          {options.map((opt) => (
            <Checkbox
              key={opt}
              label={opt}
              checked={selected.has(opt)}
              onChange={() => toggle(opt)}
            />
          ))}
        </div>
        <p className="text-sm text-secondary mt-sm">
          Selected: {[...selected].join(", ") || "none"}
        </p>
      </div>
    );
  },
};

export const BareInput: Story = {
  name: "Bare input (no label)",
  render: () => (
    <div className="flex items-center gap-sm">
      <Checkbox id="standalone" aria-label="Select row" />
      <Checkbox id="standalone-checked" aria-label="Select row" defaultChecked />
      <Checkbox id="standalone-disabled" aria-label="Select row" disabled />
    </div>
  ),
};
