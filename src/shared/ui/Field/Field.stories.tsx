import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field } from "./Field";
import { Checkbox } from "@shared/ui/Checkbox";

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

/** Demonstrates proper aria-describedby usage: the input references all message IDs so screen readers announce them. */
export const WithAriaDescribedBy: Story = {
  render: () => (
    <Field
      id="password"
      label="Password"
      required
      helperText="At least 12 characters, including uppercase and symbol."
      error={undefined}
    >
      <input
        id="password"
        type="password"
        placeholder="Enter password"
        aria-describedby="password-helper"
        className="flex items-center rounded-md border border-base bg-surface px-md py-sm text-sm w-full"
      />
    </Field>
  ),
};

/** Field with a custom control component (not a plain input). */
export const WithCustomControl: Story = {
  render: () => (
    <Field id="agree" label="Agree to terms">
      <Checkbox id="agree" description="I agree to the Terms of Service and Privacy Policy" />
    </Field>
  ),
};

/** All three message types visible simultaneously: required + helper + error. */
export const CombinedStates: Story = {
  render: () => (
    <Field
      id="bio"
      label="Bio"
      required
      helperText="Share a bit about yourself"
      error="Bio must be between 10-500 characters."
    >
      <textarea
        id="bio"
        rows={4}
        defaultValue="Hi"
        aria-invalid
        aria-describedby="bio-helper bio-error"
        className="block w-full rounded-md border-2 border-error bg-surface px-md py-sm text-sm resize-vertical"
      />
    </Field>
  ),
};

/** Field with custom className for spacing/layout control. */
export const WithCustomClassName: Story = {
  render: () => (
    <div className="space-y-lg">
      <Field id="first" label="First Name" className="mb-sm" helperText="Your first name.">
        <input
          id="first"
          type="text"
          placeholder="Jane"
          className="flex items-center rounded-md border border-base bg-surface px-md py-sm text-sm w-full"
        />
      </Field>
      <Field id="last" label="Last Name" className="mb-sm" helperText="Your last name.">
        <input
          id="last"
          type="text"
          placeholder="Smith"
          className="flex items-center rounded-md border border-base bg-surface px-md py-sm text-sm w-full"
        />
      </Field>
    </div>
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
