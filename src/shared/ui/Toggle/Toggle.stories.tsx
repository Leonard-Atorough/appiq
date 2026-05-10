import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Shared/Toggle",
  component: Toggle,
  parameters: { layout: "padded" },
  argTypes: {
    type: { control: "select", options: ["checkbox", "switch"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    indeterminate: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

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
      <Toggle size="sm" label="Small" />
      <Toggle size="md" label="Medium (default)" />
      <Toggle size="lg" label="Large" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <Toggle label="Unchecked" />
      <Toggle label="Checked" defaultChecked />
      <Toggle label="Indeterminate" indeterminate />
      <Toggle label="Disabled unchecked" disabled />
      <Toggle label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <Toggle label="Accept terms" state="error" />
      <Toggle
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
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        next.has(opt) ? next.delete(opt) : next.add(opt);
        return next;
      });

    const allChecked = selected.size === options.length;
    const someChecked = selected.size > 0 && !allChecked;

    const toggleAll = () => setSelected(allChecked ? new Set() : new Set(options));

    return (
      <div className="flex flex-col gap-sm">
        <Toggle
          label="All statuses"
          checked={allChecked}
          indeterminate={someChecked}
          onChange={toggleAll}
        />
        <div className="pl-lg flex flex-col gap-sm">
          {options.map((opt) => (
            <Toggle
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
      <Toggle id="standalone" aria-label="Select row" />
      <Toggle id="standalone-checked" aria-label="Select row" defaultChecked />
      <Toggle id="standalone-disabled" aria-label="Select row" disabled />
    </div>
  ),
};

// ─────────────────────────────────────
// Switch Mode Stories
// ─────────────────────────────────────

export const SwitchDefault: Story = {
  name: "Switch: Default",
  args: {
    type: "switch",
    label: "Enable notifications",
  },
};

export const SwitchWithDescription: Story = {
  name: "Switch: With description",
  args: {
    type: "switch",
    label: "Dark mode",
    description: "Use dark theme for this application.",
  },
};

export const SwitchSizes: Story = {
  name: "Switch: Sizes",
  render: () => (
    <div className="flex flex-col gap-md">
      <Toggle type="switch" size="sm" label="Small" defaultChecked />
      <Toggle type="switch" size="md" label="Medium (default)" defaultChecked />
      <Toggle type="switch" size="lg" label="Large" defaultChecked />
    </div>
  ),
};

export const SwitchStates: Story = {
  name: "Switch: States",
  render: () => (
    <div className="flex flex-col gap-md">
      <Toggle type="switch" label="Off" />
      <Toggle type="switch" label="On" defaultChecked />
      <Toggle type="switch" label="Disabled off" disabled />
      <Toggle type="switch" label="Disabled on" disabled defaultChecked />
    </div>
  ),
};

export const SwitchErrorState: Story = {
  name: "Switch: Error state",
  render: () => (
    <div className="flex flex-col gap-md">
      <Toggle type="switch" label="Agree to terms" state="error" />
      <Toggle
        type="switch"
        label="Accept policy"
        description="You must accept to proceed."
        state="error"
        errorMessage="This is required."
      />
    </div>
  ),
};

export const SwitchControlled: Story = {
  name: "Switch: Controlled",
  render: () => {
    const [enabled, setEnabled] = useState(false);

    return (
      <div className="flex flex-col gap-md">
        <Toggle
          type="switch"
          label="Enable feature"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
        <p className="text-sm text-secondary">
          Status: <span className="font-semibold text-secondary">{enabled ? "Enabled" : "Disabled"}</span>
        </p>
      </div>
    );
  },
};

export const SwitchGroup: Story = {
  name: "Switch: Group settings",
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      darkMode: false,
      newsletter: true,
    });

    const toggle = (key: keyof typeof settings) =>
      setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

    return (
      <div className="flex flex-col gap-lg ">
        <div className="flex justify-between items-center p-md bg-surface rounded-lg border border-base w-full">
          <span className="font-medium text-secondary">Notifications</span>
          <Toggle
            type="switch"
            checked={settings.notifications}
            onChange={() => toggle("notifications")}
            aria-label="Toggle notifications"
          />
        </div>
        <div className="flex justify-between items-center p-md bg-surface rounded-lg border border-base w-full">
          <span className="font-medium text-secondary">Dark mode</span>
          <Toggle
            type="switch"
            checked={settings.darkMode}
            onChange={() => toggle("darkMode")}
            aria-label="Toggle dark mode"
          />
        </div>
        <div className="flex justify-between items-center p-md bg-surface rounded-lg border border-base w-full">
          <span className="font-medium text-secondary">Newsletter</span>
          <Toggle
            type="switch"
            checked={settings.newsletter}
            onChange={() => toggle("newsletter")}
            aria-label="Toggle newsletter"
          />
        </div>
      </div>
    );
  },
};
