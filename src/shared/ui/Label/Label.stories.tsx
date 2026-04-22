import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "./Label";

const meta: Meta<typeof Label> = { title: "Shared/Label", component: Label };
export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render: () => <Label>Label text</Label>,
};

export const WithHtmlFor: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <Label htmlFor="username">Username</Label>
      <input id="username" type="text" className="px-md py-sm border rounded" />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <Label htmlFor="email" required>
        Email Address
      </Label>
      <input id="email" type="email" className="px-md py-sm border rounded" />
    </div>
  ),
};

export const RequiredOptional: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div className="flex flex-col gap-md">
        <Label htmlFor="required-field" required>
          Required Field
        </Label>
        <input
          id="required-field"
          type="text"
          className="px-md py-sm border rounded"
          placeholder="This field is required"
        />
      </div>
      <div className="flex flex-col gap-md">
        <Label htmlFor="optional-field">Optional Field</Label>
        <input
          id="optional-field"
          type="text"
          className="px-md py-sm border rounded"
          placeholder="This field is optional"
        />
      </div>
    </div>
  ),
};

export const WithComplexContent: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <Label htmlFor="description">
        Description{" "}
        <span className="text-xs text-muted-foreground">(optional)</span>
      </Label>
      <textarea
        id="description"
        className="px-md py-sm border rounded"
        placeholder="Enter description..."
        rows={4}
      />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <form className="flex flex-col gap-lg">
      <div className="flex flex-col gap-md">
        <Label htmlFor="first-name" required>
          First Name
        </Label>
        <input
          id="first-name"
          type="text"
          className="px-md py-sm border rounded"
        />
      </div>
      <div className="flex flex-col gap-md">
        <Label htmlFor="last-name" required>
          Last Name
        </Label>
        <input
          id="last-name"
          type="text"
          className="px-md py-sm border rounded"
        />
      </div>
      <div className="flex flex-col gap-md">
        <Label htmlFor="phone">Phone Number</Label>
        <input
          id="phone"
          type="tel"
          className="px-md py-sm border rounded"
        />
      </div>
    </form>
  ),
};
