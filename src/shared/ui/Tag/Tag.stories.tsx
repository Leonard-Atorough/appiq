import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tag } from "./Tag";
import { Icon } from "../Icon";

const meta: Meta<typeof Tag> = { title: "Shared/Tag", component: Tag };
export default meta;
type Story = StoryObj<typeof Tag>;

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-sm items-center">
      <Tag color="default" label="Default" />
      <Tag color="success" label="Success" />
      <Tag color="warning" label="Warning" />
      <Tag color="error" label="Error" />
      <Tag color="info" label="Info" />
    </div>
  ),
};

export const Outline: Story = {
  render: () => (
    <div className="flex flex-wrap gap-sm items-center">
      <Tag color="default" outlined label="Default" />
      <Tag color="success" outlined label="Success" />
      <Tag color="warning" outlined label="Warning" />
      <Tag color="error" outlined label="Error" />
      <Tag color="info" outlined label="Info" />
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
      <Tag color="success" onDismiss={() => alert("dismissed")} label="Dismissable" />
      <Tag color="info" outlined onDismiss={() => alert("dismissed")} label="Outline Dismissable" />
    </div>
  ),
};

export const Rounded: Story = {
  render: () => (
    <div className="flex flex-wrap gap-sm items-center">
      <Tag rounded={false} color="success" label="Pill off" />
      <Tag rounded color="success" label="Pill on" />
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-sm items-center">
      <Tag
        color="success"
        startAdornment={<Icon name="check-circle" size="sm" />}
        label="Applied"
      />
      <Tag
        color="warning"
        startAdornment={<Icon name="clock" size="sm" />}
        label="Pending"
      />
      <Tag
        color="info"
        outlined
        startAdornment={<Icon name="info" size="sm" />}
        label="Information"
      />
    </div>
  ),
};

export const WithCustomDeleteIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-sm items-center">
      <Tag
        color="success"
        onDismiss={() => alert("dismissed with default ✕")}
        label="Default Delete"
      />
      <Tag
        color="error"
        onDismiss={() => alert("dismissed with custom icon")}
        deleteIcon={<Icon name="x-circle" size="sm" />}
        label="Custom Delete"
      />
      <Tag
        color="warning"
        onDismiss={() => alert("dismissed")}
        deleteIcon={<span className="text-lg">×</span>}
        label="Text Delete"
      />
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <div className="flex flex-wrap gap-sm items-center">
      <Tag
        color="info"
        label="Tag with actions"
        actions={[
          {
            id: "edit",
            label: "Edit",
            onClick: () => alert("Edit clicked"),
          },
          {
            id: "view",
            label: "View",
            onClick: () => alert("View clicked"),
          },
        ]}
      />
      <Tag
        color="default"
        outlined
        label="Single action"
        actions={[
          {
            id: "details",
            label: "Details",
            onClick: () => alert("Details clicked"),
          },
        ]}
      />
    </div>
  ),
};

export const Clickable: Story = {
  render: () => (
    <div className="flex flex-wrap gap-sm items-center">
      <Tag
        color="default"
        onClick={() => alert("Default tag clicked")}
        label="Click me"
      />
      <Tag
        color="success"
        startAdornment={<Icon name="check" size="sm" />}
        onClick={() => alert("Success tag clicked")}
        label="Clickable with icon"
      />
      <Tag
        color="info"
        outlined
        onClick={() => alert("Outlined tag clicked")}
        label="Outlined clickable"
      />
    </div>
  ),
};

export const Combined: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <p className="text-sm text-secondary mb-xs">Full-featured tag</p>
        <div className="flex flex-wrap gap-sm items-center">
          <Tag
            color="success"
            size="lg"
            startAdornment={<Icon name="check-circle" size="sm" />}
            label="Applied on Jan 15"
            onDismiss={() => alert("dismissed")}
            deleteIcon={<Icon name="x-circle" size="sm" />}
            actions={[
              {
                id: "status",
                label: "Status",
                onClick: () => alert("Check status"),
              },
            ]}
          />
        </div>
      </div>

      <div>
        <p className="text-sm text-secondary mb-xs">Responsive sizes</p>
        <div className="flex flex-wrap gap-sm items-center">
          <Tag
            size={{ base: "sm", md: "md", lg: "lg" }}
            color="default"
            label="Responsive"
          />
          <Tag
            size={{ base: "lg", md: "md", lg: "sm" }}
            color="warning"
            label="Reverse responsive"
          />
        </div>
      </div>

      <div>
        <p className="text-sm text-secondary mb-xs">Multiple variants combined</p>
        <div className="flex flex-wrap gap-sm items-center">
          <Tag
            color={{ base: "default", md: "success" }}
            label="Responsive variant"
          />
          <Tag
            color="info"
            outlined
            rounded
            startAdornment={<Icon name="info" size="sm" />}
            label="Fully rounded"
          />
        </div>
      </div>
    </div>
  ),
};
