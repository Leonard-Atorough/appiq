import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";
import { Button } from "../Button";

const meta: Meta<typeof Badge> = {
  title: "Shared/Badge",
  component: Badge,
  argTypes: {
    value: {
      control: "text",
      description: "The content to display inside the badge (number or string)",
    },
    max: {
      control: "number",
      description: "If value exceeds max, displays as max+",
    },
    color: {
      control: "select",
      options: ["default", "secondary", "success", "error", "warning", "info"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    style: {
      control: "select",
      options: ["dot", "standard"],
    },
    shape: {
      control: "select",
      options: ["circle", "square"],
    },
    isVisible: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    value: 5,
    children: <Button>Notifications</Button>,
  },
};

export const StringValue: Story = {
  args: {
    value: "NEW",
    children: <Button>Features</Button>,
  },
};

export const WithMax: Story = {
  args: {
    value: 25,
    max: 10,
    children: <Button>Messages</Button>,
  },
  render: (args) => (
    <div className="flex gap-lg">
      <Badge {...args} color="error">
        <Button>Messages</Button>
      </Badge>
    </div>
  ),
};

export const Dot: Story = {
  args: {
    value: "",
    style: "dot",
    children: <Button>Status</Button>,
    color: "success",
  },
};

export const ColorVariants: Story = {
  render: () => (
    <div className="flex gap-lg flex-wrap">
      <Badge value={1} color="default">
        <Button size="sm">Default</Button>
      </Badge>
      <Badge value={2} color="secondary">
        <Button size="sm">Secondary</Button>
      </Badge>
      <Badge value={3} color="success">
        <Button size="sm">Success</Button>
      </Badge>
      <Badge value={4} color="error">
        <Button size="sm">Error</Button>
      </Badge>
      <Badge value={5} color="warning">
        <Button size="sm">Warning</Button>
      </Badge>
      <Badge value={6} color="info">
        <Button size="sm">Info</Button>
      </Badge>
    </div>
  ),
};

export const SizeVariants: Story = {
  render: () => (
    <div className="flex gap-lg items-center">
      <Badge value={1} size="sm">
        <Button size="sm">Small</Button>
      </Badge>
      <Badge value={2} size="md">
        <Button>Medium</Button>
      </Badge>
      <Badge value={3} size="lg">
        <Button size="lg">Large</Button>
      </Badge>
    </div>
  ),
};

export const ShapeVariants: Story = {
  render: () => (
    <div className="flex gap-lg">
      <Badge value={1} shape="circle">
        <Button size="sm">Circle</Button>
      </Badge>
      <Badge value={2} shape="square">
        <Button size="sm">Square</Button>
      </Badge>
    </div>
  ),
};

export const DotVariant: Story = {
  render: () => (
    <div className="flex gap-lg flex-wrap">
      <Badge value="" style="dot" color="success">
        <Button size="sm">Online</Button>
      </Badge>
      <Badge value="" style="dot" color="error">
        <Button size="sm">Offline</Button>
      </Badge>
      <Badge value="" style="dot" color="warning">
        <Button size="sm">Away</Button>
      </Badge>
    </div>
  ),
};

export const Hidden: Story = {
  args: {
    value: 0,
    isVisible: false,
    children: <Button>No badge</Button>,
  },
};

export const OnAvatar: Story = {
  render: () => (
    <div className="flex gap-lg">
      <Badge value="1" color="success" style="dot">
        <div className="w-12 h-12 rounded-full bg-surface border-2 border-base" />
      </Badge>
      <Badge value="5" color="error">
        <div className="w-12 h-12 rounded-full bg-surface border-2 border-base flex items-center justify-center text-sm font-semibold">
          A
        </div>
      </Badge>
    </div>
  ),
};
