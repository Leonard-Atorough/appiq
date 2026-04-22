import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field } from "./Field";

const meta: Meta<typeof Field> = { title: "Shared/Field", component: Field };
export default meta;
type Story = StoryObj<typeof Field>;

/** Field wrapping a plain input — use this when you need a custom control that isn't Input/Textarea/Select */
export const WithInput: Story = {
  render: () => (
    <Field id="email" label="Email address" helperText="We'll never share your email.">
      <input
        id="email"
        type="email"
        placeholder="you@example.com"
        className="flex items-center rounded-md border border-base bg-surface px-md py-sm text-sm w-full"
      />
    </Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field id="username" label="Username" error="That username is already taken.">
      <input
        id="username"
        type="text"
        defaultValue="johndoe"
        aria-invalid
        aria-describedby="username-error"
        className="flex items-center rounded-md border-2 border-error bg-surface px-md py-sm text-sm w-full"
      />
    </Field>
  ),
};

export const WithSuccess: Story = {
  render: () => (
    <Field id="username" label="Username" success="Username is available!">
      <input
        id="username"
        type="text"
        defaultValue="unique-handle"
        aria-describedby="username-success"
        className="flex items-center rounded-md border-2 border-success bg-surface px-md py-sm text-sm w-full"
      />
    </Field>
  ),
};

export const AllSlots: Story = {
  render: () => (
    <Field
      id="bio"
      label="Bio"
      helperText="Tell us a little about yourself."
      error="Bio must be at least 20 characters."
    >
      <textarea
        id="bio"
        rows={3}
        defaultValue="Too short"
        aria-invalid
        aria-describedby="bio-helper bio-error"
        className="block w-full rounded-md border-2 border-error bg-surface px-md py-sm text-sm resize-vertical"
      />
    </Field>
  ),
};

export const Required: Story = {
  render: () => (
    <Field id="name" label="Full name" required helperText="Enter your legal name.">
      <input
        id="name"
        type="text"
        placeholder="Jane Smith"
        className="flex items-center rounded-md border border-base bg-surface px-md py-sm text-sm w-full"
      />
    </Field>
  ),
};

export const ReactNodeLabel: Story = {
  render: () => (
    <Field
      id="salary"
      label={
        <span className="flex items-center gap-xs">
          Expected salary
          <span className="text-xs font-normal text-muted">(USD)</span>
        </span>
      }
      helperText="Annual gross, before taxes."
    >
      <input
        id="salary"
        type="number"
        placeholder="80,000"
        className="flex items-center rounded-md border border-base bg-surface px-md py-sm text-sm w-full"
      />
    </Field>
  ),
};
