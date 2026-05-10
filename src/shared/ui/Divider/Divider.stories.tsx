import type { Meta, StoryObj } from "@storybook/react-vite";
import { Divider } from "./Divider";

const meta = {
  title: "Shared/Divider",
  component: Divider,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default horizontal divider — decorative visual separator.
 */
export const Default: Story = {};

/**
 * Semantic horizontal divider using `<hr>` element for meaningful content separation.
 */
export const Semantic: Story = {
  args: {
    decorative: false,
  },
};

/**
 * Vertical divider for side-by-side content separation.
 */
export const Vertical: Story = {
  render: () => (
    <div className="flex items-center gap-lg h-24">
      <div className="flex-1">Left content</div>
      <Divider direction="vertical" />
      <div className="flex-1">Right content</div>
    </div>
  ),
};

/**
 * Dashed divider appearance.
 */
export const Dashed: Story = {
  args: {
    appearance: "dashed",
  },
};

/**
 * Dotted divider appearance.
 */
export const Dotted: Story = {
  args: {
    appearance: "dotted",
  },
};

/**
 * Muted color divider for subtle visual separation.
 */
export const Muted: Story = {
  args: {
    color: "muted",
  },
};

/**
 * All spacing options.
 */
export const Spacings: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <p className="text-sm text-secondary mb-xs">spacing="none"</p>
        <Divider spacing="none" />
      </div>

      <div>
        <p className="text-sm text-secondary mb-xs">spacing="xs"</p>
        <Divider spacing="xs" />
      </div>

      <div>
        <p className="text-sm text-secondary mb-xs">spacing="sm"</p>
        <Divider spacing="sm" />
      </div>

      <div>
        <p className="text-sm text-secondary mb-xs">spacing="md"</p>
        <Divider spacing="md" />
      </div>

      <div>
        <p className="text-sm text-secondary mb-xs">spacing="lg"</p>
        <Divider spacing="lg" />
      </div>

      <div>
        <p className="text-sm text-secondary mb-xs">spacing="xl"</p>
        <Divider spacing="xl" />
      </div>
    </div>
  ),
};

/**
 * All appearance variants side-by-side.
 */
export const Appearances: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <p className="text-sm text-secondary mb-sm">Solid</p>
        <Divider appearance="solid" />
      </div>

      <div>
        <p className="text-sm text-secondary mb-sm">Dashed</p>
        <Divider appearance="dashed" />
      </div>

      <div>
        <p className="text-sm text-secondary mb-sm">Dotted</p>
        <Divider appearance="dotted" />
      </div>
    </div>
  ),
};

/**
 * Divider in a card layout showing semantic separation.
 */
export const InCard: Story = {
  render: () => (
    <div className="w-80 border border-border-base rounded-lg bg-surface p-lg">
      <h3 className="font-semibold mb-md">Section One</h3>
      <p className="text-sm text-secondary mb-md">
        Content for the first section of the card.
      </p>

      <Divider decorative={false} spacing="md" />

      <h3 className="font-semibold mb-md">Section Two</h3>
      <p className="text-sm text-secondary">
        Content for the second section of the card.
      </p>
    </div>
  ),
};

/**
 * Vertical divider with varying heights in a flex layout.
 */
export const VerticalVariations: Story = {
  render: () => (
    <div className="flex gap-lg">
      <div className="flex items-center gap-lg h-20">
        <div>Item 1</div>
        <Divider direction="vertical" decorative />
        <div>Item 2</div>
      </div>

      <div className="flex items-center gap-lg h-32">
        <div>Item 1</div>
        <Divider direction="vertical" color="muted" />
        <div>Item 2</div>
      </div>

      <div className="flex items-center gap-lg h-16">
        <div>Item 1</div>
        <Divider direction="vertical" appearance="dashed" />
        <div>Item 2</div>
      </div>
    </div>
  ),
};
