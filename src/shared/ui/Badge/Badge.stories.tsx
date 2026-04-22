import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = { title: "Shared/Badge", component: Badge };
export default meta;
type Story = StoryObj<typeof Badge>;

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-sm items-center">
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

export const Outline: Story = {
  render: () => (
    <div className="flex flex-wrap gap-sm items-center">
      <Badge variant="default" outline>
        Default
      </Badge>
      <Badge variant="success" outline>
        Success
      </Badge>
      <Badge variant="warning" outline>
        Warning
      </Badge>
      <Badge variant="error" outline>
        Error
      </Badge>
      <Badge variant="info" outline>
        Info
      </Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-sm items-center">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

export const Dismissable: Story = {
  render: () => (
    <div className="flex flex-wrap gap-sm items-center">
      <Badge variant="success" dismissable onDismiss={() => alert("dismissed")}>
        Dismissable
      </Badge>
      <Badge variant="info" outline dismissable onDismiss={() => alert("dismissed")}>
        Outline Dismissable
      </Badge>
    </div>
  ),
};

export const Rounded: Story = {
  render: () => (
    <div className="flex flex-wrap gap-sm items-center">
      <Badge rounded={false} variant="success">
        Pill off
      </Badge>
      <Badge rounded variant="success">
        Pill on
      </Badge>
    </div>
  ),
};
