import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tag } from "./Tag";

const meta: Meta<typeof Tag> = { title: "Shared/Tag", component: Tag };
export default meta;
type Story = StoryObj<typeof Tag>;

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-sm items-center">
      <Tag variant="default" label="Default" />
      <Tag variant="success" label="Success" />
      <Tag variant="warning" label="Warning" />
      <Tag variant="error" label="Error" />
      <Tag variant="info" label="Info" />
    </div>
  ),
};

export const Outline: Story = {
  render: () => (
    <div className="flex flex-wrap gap-sm items-center">
      <Tag variant="default" outlined label="Default" />
      <Tag variant="success" outlined label="Success" />
      <Tag variant="warning" outlined label="Warning" />
      <Tag variant="error" outlined label="Error" />
      <Tag variant="info" outlined label="Info" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-sm items-center">
      <Tag size="sm" label="Small" />
      <Tag size="md" label="Medium" />
      <Tag size="lg" label="Large" />
    </div>
  ),
};

export const Dismissable: Story = {
  render: () => (
    <div className="flex flex-wrap gap-sm items-center">
      <Tag variant="success" onDismiss={() => alert("dismissed")} label="Dismissable" />
      <Tag variant="info" outlined onDismiss={() => alert("dismissed")} label="Outline Dismissable" />
    </div>
  ),
};

export const Rounded: Story = {
  render: () => (
    <div className="flex flex-wrap gap-sm items-center">
      <Tag rounded={false} variant="success" label="Pill off" />
      <Tag rounded variant="success" label="Pill on" />
    </div>
  ),
};
