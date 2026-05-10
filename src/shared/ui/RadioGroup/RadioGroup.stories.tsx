import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { RadioGroup } from "./RadioGroup";

const meta = {
  title: "Shared/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { value: "option-a", label: "Option A" },
  { value: "option-b", label: "Option B" },
  { value: "option-c", label: "Option C" },
];

/**
 * Basic radio group.
 */
export const Default: Story = {
  args: {
    name: "basic",
    label: "Choose an option",
    options: defaultOptions,
  },
};

/**
 * Radio group with descriptions for each option.
 */
export const WithDescriptions: Story = {
  args: {
    name: "descriptions",
    label: "Choose a plan",
    options: [
      { value: "starter", label: "Starter", description: "Perfect for individuals" },
      { value: "pro", label: "Pro", description: "For growing teams" },
      { value: "enterprise", label: "Enterprise", description: "For large organizations" },
    ],
  },
};

/**
 * Radio group with error message.
 */
export const WithError: Story = {
  args: {
    name: "error",
    label: "Choose an option",
    error: "Selection is required",
    options: defaultOptions,
  },
};

/**
 * Radio group with description text.
 */
export const WithDescription: Story = {
  args: {
    name: "description",
    label: "Notification Frequency",
    description: "How often would you like to receive updates?",
    options: [
      { value: "daily", label: "Daily" },
      { value: "weekly", label: "Weekly" },
      { value: "monthly", label: "Monthly" },
    ],
  },
};

/**
 * Disabled radio group.
 */
export const Disabled: Story = {
  args: {
    name: "disabled",
    label: "Choose an option",
    disabled: true,
    options: defaultOptions,
  },
};

/**
 * Radio group with required indicator.
 */
export const Required: Story = {
  args: {
    name: "required",
    label: "Choose an option",
    required: true,
    options: defaultOptions,
  },
};

/**
 * Radio group with individual disabled options.
 */
export const WithDisabledOptions: Story = {
  args: {
    name: "disabled-options",
    label: "Choose a tier",
    options: [
      { value: "free", label: "Free" },
      { value: "pro", label: "Pro (sold out)", disabled: true },
      { value: "enterprise", label: "Enterprise" },
    ],
  },
};

/**
 * Horizontal layout.
 */
export const Horizontal: Story = {
  args: {
    name: "horizontal",
    label: "Choose a size",
    direction: "horizontal",
    options: [
      { value: "small", label: "Small" },
      { value: "medium", label: "Medium" },
      { value: "large", label: "Large" },
    ],
  },
};

/**
 * Small size variant.
 */
export const Small: Story = {
  args: {
    name: "small",
    label: "Choose an option",
    size: "sm",
    options: defaultOptions,
  },
};

/**
 * Medium size variant (default).
 */
export const Medium: Story = {
  args: {
    name: "medium",
    label: "Choose an option",
    size: "md",
    options: defaultOptions,
  },
};

/**
 * Large size variant.
 */
export const Large: Story = {
  args: {
    name: "large",
    label: "Choose an option",
    size: "lg",
    options: defaultOptions,
  },
};

/**
 * Controlled component example.
 */
export const Controlled = {
  render: () => {
    const [value, setValue] = useState("option-a");
    return (
      <div className="space-y-md">
        <RadioGroup
          name="controlled"
          label="Choose an option"
          value={value}
          onChange={setValue}
          options={defaultOptions}
        />
        <div className="text-sm text-muted">
          Selected value: <span className="font-mono font-semibold">{value}</span>
        </div>
      </div>
    );
  },
};

/**
 * All size variants together.
 */
export const AllSizes = {
  render: () => (
    <div className="space-y-lg">
      <RadioGroup
        name="sizes-sm"
        label="Small"
        size="sm"
        options={defaultOptions}
      />
      <RadioGroup
        name="sizes-md"
        label="Medium"
        size="md"
        options={defaultOptions}
      />
      <RadioGroup
        name="sizes-lg"
        label="Large"
        size="lg"
        options={defaultOptions}
      />
    </div>
  ),
};

/**
 * Both layout directions.
 */
export const LayoutDirections = {
  render: () => (
    <div className="space-y-lg">
      <RadioGroup
        name="vertical"
        label="Vertical Layout"
        direction="vertical"
        options={defaultOptions}
      />
      <RadioGroup
        name="horizontal"
        label="Horizontal Layout"
        direction="horizontal"
        options={defaultOptions}
      />
    </div>
  ),
};
