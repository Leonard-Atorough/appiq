import type { Meta, StoryObj } from "@storybook/react-vite";
import { Breadcrumb } from "./Breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "Shared/Breadcrumb",
  component: Breadcrumb,
  parameters: { layout: "padded" },
  argTypes: {
    maxItems: { control: "number", min: 2, max: 10 },
    collapseFrom: { control: "select", options: ["start", "end"] },
    lastItemAsLink: { control: "boolean" },
    separator: { control: "text" },
    useDropdown: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Applications", href: "/applications" },
      { label: "Job #123" },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      {
        label: "Home",
        icon: <span>🏠</span>,
        href: "/",
      },
      {
        label: "Applications",
        icon: <span>📋</span>,
        href: "/applications",
      },
      {
        label: "Job #123",
        icon: <span>📌</span>,
      },
    ],
  },
};

export const Long: Story = {
  name: "Long Trail (Collapsing from Start)",
  args: {
    items: Array.from({ length: 8 }, (_, i) => ({
      label: `Level ${i + 1}`,
      href: `/level-${i + 1}`,
    })),
    maxItems: 3,
    collapseFrom: "start",
  },
};

export const CollapsedFromEnd: Story = {
  args: {
    items: Array.from({ length: 8 }, (_, i) => ({
      label: `Level ${i + 1}`,
      href: `/level-${i + 1}`,
    })),
    maxItems: 3,
    collapseFrom: "end",
  },
};

export const WithExpandButton: Story = {
  args: {
    items: Array.from({ length: 6 }, (_, i) => ({
      label: `Item ${i + 1}`,
      href: `/item-${i + 1}`,
    })),
    maxItems: 3,
    useDropdown: false,
  },
};

export const WithExpandButtonFromEnd: Story = {
  name: "Expand Button (Collapsing from End)",
  args: {
    items: Array.from({ length: 6 }, (_, i) => ({
      label: `Item ${i + 1}`,
      href: `/item-${i + 1}`,
    })),
    maxItems: 3,
    collapseFrom: "end",
    useDropdown: false,
  },
};

export const DisabledItems: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Disabled Section", disabled: true, href: "/disabled" },
      { label: "Active Page" },
    ],
  },
};

export const CustomSeparator: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Applications", href: "/applications" },
      { label: "Job #123" },
    ],
    separator: " > ",
  },
};

export const LastItemAsLink: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Applications", href: "/applications" },
      { label: "Job #123", href: "/jobs/123" },
    ],
    lastItemAsLink: true,
  },
};
