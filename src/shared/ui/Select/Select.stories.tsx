import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";

const meta: Meta<typeof Select> = { title: "Shared/Select", component: Select };
export default meta;
type Story = StoryObj<typeof Select>;

const options = (
  <>
    <option value="">Select a status…</option>
    <option value="applied">Applied</option>
    <option value="interviewing">Interviewing</option>
    <option value="offer">Offer</option>
    <option value="rejected">Rejected</option>
  </>
);

export const Default: Story = {
  render: () => <Select label="Application Status">{options}</Select>,
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <Select label="Small" size="sm">
        {options}
      </Select>
      <Select label="Medium" size="md">
        {options}
      </Select>
      <Select label="Large" size="lg">
        {options}
      </Select>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <Select label="Default" state="default">
        {options}
      </Select>
      <Select label="Error" state="error">
        {options}
      </Select>
      <Select label="Success" state="success">
        {options}
      </Select>
      <Select label="Disabled" disabled>
        {options}
      </Select>
    </div>
  ),
};

export const WithMessages: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <Select label="Application Status" helperText="Choose the current stage of your application.">
        {options}
      </Select>
      <Select
        label="Application Status"
        error="Please select a status to continue."
        helperText="Choose the current stage of your application."
      >
        {options}
      </Select>
      <Select
        label="Application Status"
        success="Status saved!"
      >
        {options}
      </Select>
    </div>
  ),
};
