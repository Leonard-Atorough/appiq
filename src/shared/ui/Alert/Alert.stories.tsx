import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "./Alert";

const meta = {
  title: "Shared/Alert",
  component: Alert,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default info alert.
 */
export const Default: Story = {
  args: {
    children: "This is an informational message.",
  },
};

/**
 * Success alert for positive feedback.
 */
export const Success: Story = {
  args: {
    type: "success",
    title: "Success!",
    children: "Your changes have been saved successfully.",
  },
};

/**
 * Error alert for critical issues.
 */
export const Error: Story = {
  args: {
    type: "error",
    title: "Error",
    children:
      "Something went wrong. Please check your input and try again.",
  },
};

/**
 * Warning alert for cautionary messages.
 */
export const Warning: Story = {
  args: {
    type: "warning",
    title: "Warning",
    children: "This action cannot be undone. Proceed with caution.",
  },
};

/**
 * Info alert with optional title.
 */
export const WithTitle: Story = {
  args: {
    type: "info",
    title: "Information",
    children: "Here is some helpful information you should know.",
  },
};

/**
 * Dismissible alert — user can close it.
 */
export const Dismissible: Story = {
  args: {
    type: "success",
    title: "Success!",
    children: "Your settings have been updated.",
    dismissible: true,
  },
};

/**
 * All alert types in a grid.
 */
export const AllTypes = {
  render: () => (
    <div className="space-y-md">
      <Alert type="info" title="Information">
        This is an informational alert.
      </Alert>
      <Alert type="success" title="Success">
        This is a success alert.
      </Alert>
      <Alert type="warning" title="Warning">
        This is a warning alert.
      </Alert>
      <Alert type="error" title="Error">
        This is an error alert.
      </Alert>
    </div>
  ),
};

/**
 * Alerts with and without dismissible option.
 */
export const DismissibleVariations = {
  render: () => (
    <div className="space-y-md">
      <Alert type="info" title="Non-dismissible">
        You cannot close this alert.
      </Alert>
      <Alert type="success" title="Dismissible" dismissible>
        You can close this alert by clicking the X button.
      </Alert>
    </div>
  ),
};

/**
 * Multi-line content example.
 */
export const LongContent: Story = {
  args: {
    type: "warning",
    title: "System Maintenance",
    children:
      "The system will undergo scheduled maintenance on Saturday from 2 AM to 6 AM UTC. During this time, the service may be unavailable. Please plan accordingly and save your work beforehand.",
    dismissible: true,
  },
};

/**
 * Dense, simple alerts without titles.
 */
export const Simple = {
  render: () => (
    <div className="space-y-sm">
      <Alert type="success">Changes saved</Alert>
      <Alert type="error">Invalid input provided</Alert>
      <Alert type="info">New features available</Alert>
    </div>
  ),
};

/**
 * Borderless alert for inline display in forms.
 */
export const Borderless: Story = {
  args: {
    type: "error",
    borderless: true,
    children: "Email address is required.",
  },
};

/**
 * Borderless alert with title, useful for form field errors.
 */
export const BorderlessWithTitle: Story = {
  args: {
    type: "error",
    borderless: true,
    title: "Validation Error",
    children: "Please enter a valid email address.",
  },
};

/**
 * Comparison of bordered vs borderless alerts.
 */
export const BorderlessVariations = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-md text-sm font-semibold text-secondary">
          Bordered (Default)
        </h3>
        <Alert type="error" title="Error">
          This error has a visible border and padding.
        </Alert>
      </div>
      <div>
        <h3 className="mb-md text-sm font-semibold text-secondary">
          Borderless (Inline)
        </h3>
        <Alert type="error" borderless title="Error">
          This error has no border or padding, ideal for inline form feedback.
        </Alert>
      </div>
    </div>
  ),
};

/**
 * Form field error scenario with borderless alert.
 */
export const FormErrorExample = {
  render: () => (
    <div className="space-y-lg">
      <div className="max-w-sm">
        <label className="block text-sm font-semibold text-secondary mb-xs">
          Email Address
        </label>
        <input
          type="email"
          placeholder="your@email.com"
          className="w-full px-md py-sm border border-base rounded-lg bg-base text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Alert
          type="error"
          borderless
          className="mt-xs"
        >
          Email address is required.
        </Alert>
      </div>

      <div className="max-w-sm">
        <label className="block text-sm font-semibold text-secondary mb-xs">
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full px-md py-sm border border-base rounded-lg bg-base text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Alert
          type="error"
          borderless
          className="mt-xs"
        >
          Password must be at least 8 characters.
        </Alert>
      </div>
    </div>
  ),
};

/**
 * All borderless alert types.
 */
export const AllBorderlessTypes = {
  render: () => (
    <div className="space-y-md">
      <Alert type="info" borderless>
        This is an informational inline alert.
      </Alert>
      <Alert type="success" borderless>
        This is a success inline alert.
      </Alert>
      <Alert type="warning" borderless>
        This is a warning inline alert.
      </Alert>
      <Alert type="error" borderless>
        This is an error inline alert.
      </Alert>
    </div>
  ),
};
