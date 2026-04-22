import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Shared/Tabs",
  component: Tabs,
  parameters: { layout: "padded" },
  argTypes: {
    variant: { control: "select", options: ["underline", "pill", "boxed"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    fullWidth: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const sampleTabs = [
  {
    id: "overview",
    label: "Overview",
    content: (
      <div className="p-md text-base">
        <p>Overview content goes here.</p>
      </div>
    ),
  },
  {
    id: "details",
    label: "Details",
    content: (
      <div className="p-md text-base">
        <p>Details content goes here.</p>
      </div>
    ),
  },
  {
    id: "notes",
    label: "Notes",
    content: (
      <div className="p-md text-base">
        <p>Notes content goes here.</p>
      </div>
    ),
  },
];

export const Underline: Story = {
  args: {
    tabs: sampleTabs,
    variant: "underline",
  },
};

export const Pill: Story = {
  args: {
    tabs: sampleTabs,
    variant: "pill",
  },
};

export const Boxed: Story = {
  args: {
    tabs: sampleTabs,
    variant: "boxed",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <p className="text-sm text-secondary mb-sm">Small</p>
        <Tabs tabs={sampleTabs} size="sm" />
      </div>
      <div>
        <p className="text-sm text-secondary mb-sm">Medium (default)</p>
        <Tabs tabs={sampleTabs} size="md" />
      </div>
      <div>
        <p className="text-sm text-secondary mb-sm">Large</p>
        <Tabs tabs={sampleTabs} size="lg" />
      </div>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <Tabs tabs={sampleTabs} variant="underline" fullWidth />
      <Tabs tabs={sampleTabs} variant="pill" fullWidth />
      <Tabs tabs={sampleTabs} variant="boxed" fullWidth />
    </div>
  ),
};

export const Orientation: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div className="w-full flex flex-col gap-md">
        <p className="text-sm text-secondary mb-sm">Horizontal (default)</p>
        <Tabs tabs={sampleTabs} variant="underline" orientation="horizontal" />
        <Tabs tabs={sampleTabs} variant="pill" orientation="horizontal" />
        <Tabs tabs={sampleTabs} variant="boxed" orientation="horizontal" />
      </div>
      <div className="w-full flex flex-col gap-md">
        <p className="text-sm text-secondary mb-sm">Vertical</p>
        <Tabs tabs={sampleTabs} variant="underline" orientation="vertical" />
        <Tabs tabs={sampleTabs} variant="pill" orientation="vertical" />
        <Tabs tabs={sampleTabs} variant="boxed" orientation="vertical" />
      </div>
    </div>
  ),
};

export const WithDisabled: Story = {
  args: {
    tabs: [
      { ...sampleTabs[0] },
      { ...sampleTabs[1] },
      {
        id: "archived",
        label: "Archived",
        content: <div className="p-md">Archived</div>,
        disabled: true,
      },
    ],
  },
};

export const TabBarOnly: Story = {
  name: "Tab bar only (no panels)",
  render: () => {
    const tabBarTabs = [
      { id: "table", label: "Table view" },
      { id: "kanban", label: "Kanban view" },
      { id: "timeline", label: "Timeline view" },
    ];
    return (
      <div className="flex flex-col gap-lg">
        <p className="text-sm text-secondary">
          When no <code>content</code> is provided on tab items the tab bar renders without panels —
          useful when the parent controls what is displayed.
        </p>
        <Tabs tabs={tabBarTabs} variant="underline" />
        <Tabs tabs={tabBarTabs} variant="pill" />
        <Tabs tabs={tabBarTabs} variant="boxed" />
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [active, setActive] = useState("details");
    return (
      <div className="flex flex-col gap-md">
        <p className="text-sm text-secondary">
          Active tab: <strong>{active}</strong>
        </p>
        <Tabs tabs={sampleTabs} activeTab={active} onChange={setActive} />
      </div>
    );
  },
};
