import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "./Spinner";

const meta = {
  title: "Shared/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default spinner with medium size.
 * Inherits text color from parent element via border-current.
 */
export const Default: Story = {};

/**
 * Small spinner for compact layouts.
 */
export const Small: Story = {
  args: {
    size: "sm",
  },
};

/**
 * Large spinner for prominent loading states.
 */
export const Large: Story = {
  args: {
    size: "lg",
  },
};

/**
 * All sizes in one view.
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-lg">
      <div className="flex flex-col items-center gap-sm">
        <Spinner size="sm" />
        <span className="text-xs text-secondary">Small</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Spinner size="md" />
        <span className="text-xs text-secondary">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Spinner size="lg" />
        <span className="text-xs text-secondary">Large</span>
      </div>
    </div>
  ),
};

/**
 * Spinner inherits color from parent text color.
 * Use text utilities to control spinner color.
 */
export const WithTextColor: Story = {
  render: () => (
    <div className="flex gap-lg">
      <div className="flex flex-col items-center gap-sm text-primary-500">
        <Spinner />
        <span className="text-xs">Primary</span>
      </div>
      <div className="flex flex-col items-center gap-sm text-success">
        <Spinner />
        <span className="text-xs">Success</span>
      </div>
      <div className="flex flex-col items-center gap-sm text-error">
        <Spinner />
        <span className="text-xs">Error</span>
      </div>
      <div className="flex flex-col items-center gap-sm text-warning">
        <Spinner />
        <span className="text-xs">Warning</span>
      </div>
    </div>
  ),
};
