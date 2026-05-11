import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from './Flex';

const meta: Meta<typeof Flex> = {
  title: 'Shared/Flex',
  component: Flex,
};

export default meta;
type Story = StoryObj<typeof Flex>;

const PlaceholderItem = ({ label = 'Item' }: { label?: string }) => (
  <div className="bg-primary-subtle text-link rounded px-md py-sm text-sm font-medium min-w-max">
    {label}
  </div>
);

export const Default: Story = {
  render: () => (
    <Flex gap="md">
      <PlaceholderItem label="Item 1" />
      <PlaceholderItem label="Item 2" />
      <PlaceholderItem label="Item 3" />
    </Flex>
  ),
};

export const Column: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      <PlaceholderItem label="Item 1" />
      <PlaceholderItem label="Item 2" />
      <PlaceholderItem label="Item 3" />
    </Flex>
  ),
};

export const ColumnReverse: Story = {
  render: () => (
    <Flex direction="column-reverse" gap="md">
      <PlaceholderItem label="Item 1" />
      <PlaceholderItem label="Item 2" />
      <PlaceholderItem label="Item 3" />
    </Flex>
  ),
};

export const RowReverse: Story = {
  render: () => (
    <Flex direction="row-reverse" gap="md">
      <PlaceholderItem label="Item 1" />
      <PlaceholderItem label="Item 2" />
      <PlaceholderItem label="Item 3" />
    </Flex>
  ),
};

export const GapVariations: Story = {
  render: () => (
    <Flex direction="column" gap="lg">
      <div>
        <p className="text-sm text-muted mb-xs">Gap XS</p>
        <Flex gap="xs" className="bg-muted p-sm rounded">
          <PlaceholderItem label="A" />
          <PlaceholderItem label="B" />
          <PlaceholderItem label="C" />
        </Flex>
      </div>
      <div>
        <p className="text-sm text-muted mb-xs">Gap SM</p>
        <Flex gap="sm" className="bg-muted p-sm rounded">
          <PlaceholderItem label="A" />
          <PlaceholderItem label="B" />
          <PlaceholderItem label="C" />
        </Flex>
      </div>
      <div>
        <p className="text-sm text-muted mb-xs">Gap MD</p>
        <Flex gap="md" className="bg-muted p-sm rounded">
          <PlaceholderItem label="A" />
          <PlaceholderItem label="B" />
          <PlaceholderItem label="C" />
        </Flex>
      </div>
      <div>
        <p className="text-sm text-muted mb-xs">Gap LG</p>
        <Flex gap="lg" className="bg-muted p-sm rounded">
          <PlaceholderItem label="A" />
          <PlaceholderItem label="B" />
          <PlaceholderItem label="C" />
        </Flex>
      </div>
    </Flex>
  ),
};

export const PaddingVariations: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      <div>
        <p className="text-sm text-muted mb-xs">Padding SM</p>
        <Flex padding="sm" className="bg-muted rounded border-base border">
          <PlaceholderItem label="Content" />
        </Flex>
      </div>
      <div>
        <p className="text-sm text-muted mb-xs">Padding MD</p>
        <Flex padding="md" className="bg-muted rounded border-base border">
          <PlaceholderItem label="Content" />
        </Flex>
      </div>
      <div>
        <p className="text-sm text-muted mb-xs">Padding LG</p>
        <Flex padding="lg" className="bg-muted rounded border-base border">
          <PlaceholderItem label="Content" />
        </Flex>
      </div>
    </Flex>
  ),
};

export const JustifyVariations: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      <div>
        <p className="text-sm text-muted mb-xs">Justify Start (default)</p>
        <Flex justify="start" className="bg-muted p-md rounded min-h-32">
          <PlaceholderItem label="Item" />
        </Flex>
      </div>
      <div>
        <p className="text-sm text-muted mb-xs">Justify Center</p>
        <Flex justify="center" className="bg-muted p-md rounded min-h-32">
          <PlaceholderItem label="Item" />
        </Flex>
      </div>
      <div>
        <p className="text-sm text-muted mb-xs">Justify End</p>
        <Flex justify="end" className="bg-muted p-md rounded min-h-32">
          <PlaceholderItem label="Item" />
        </Flex>
      </div>
      <div>
        <p className="text-sm text-muted mb-xs">Justify Between</p>
        <Flex justify="between" className="bg-muted p-md rounded min-h-32">
          <PlaceholderItem label="Start" />
          <PlaceholderItem label="End" />
        </Flex>
      </div>
    </Flex>
  ),
};

export const AlignVariations: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      <div>
        <p className="text-sm text-muted mb-xs">Align Start (default)</p>
        <Flex align="start" className="bg-muted p-md rounded min-h-32">
          <PlaceholderItem label="Short" />
          <div className="bg-secondary-subtle rounded px-md py-md text-secondary-text">
            <p>Taller</p>
            <p>Item</p>
          </div>
        </Flex>
      </div>
      <div>
        <p className="text-sm text-muted mb-xs">Align Center</p>
        <Flex align="center" className="bg-muted p-md rounded min-h-32">
          <PlaceholderItem label="Short" />
          <div className="bg-secondary-subtle rounded px-md py-md text-secondary-text">
            <p>Taller</p>
            <p>Item</p>
          </div>
        </Flex>
      </div>
      <div>
        <p className="text-sm text-muted mb-xs">Align End</p>
        <Flex align="end" className="bg-muted p-md rounded min-h-32">
          <PlaceholderItem label="Short" />
          <div className="bg-secondary-subtle rounded px-md py-md text-secondary-text">
            <p>Taller</p>
            <p>Item</p>
          </div>
        </Flex>
      </div>
      <div>
        <p className="text-sm text-muted mb-xs">Align Stretch</p>
        <Flex align="stretch" className="bg-muted p-md rounded min-h-32">
          <PlaceholderItem label="Stretched" />
          <div className="bg-secondary-subtle rounded px-md py-md text-secondary-text flex-1">
            <p>Stretches to fill</p>
          </div>
        </Flex>
      </div>
    </Flex>
  ),
};

export const WithWrap: Story = {
  render: () => (
    <Flex wrap gap="md" className="bg-muted p-md rounded">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="bg-primary-subtle text-link rounded px-md py-sm text-sm font-medium"
        >
          Item {i + 1}
        </div>
      ))}
    </Flex>
  ),
};

export const Responsive: Story = {
  render: () => (
    <Flex
      direction="column"
      gap="sm"
      justify="start"
      align="stretch"
      className="lg:flex-row lg:gap-lg lg:justify-between lg:items-center"
      style={{ minHeight: '200px' }}
    >
      <div className="bg-muted p-md rounded">Column on mobile, row on lg</div>
      <div className="bg-muted p-md rounded">Responsive layout</div>
      <div className="bg-muted p-md rounded">Resize to see changes</div>
    </Flex>
  ),
};

export const CenteredContainer: Story = {
  render: () => (
    <Flex
      direction="column"
      gap="md"
      justify="center"
      align="center"
      className="bg-muted p-md rounded min-h-96"
    >
      <PlaceholderItem label="Centered vertically and horizontally" />
    </Flex>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <Flex fullWidth direction="column" gap="md" className="bg-muted p-md rounded">
      <PlaceholderItem label="Full width item" />
      <PlaceholderItem label="Full width item" />
    </Flex>
  ),
};

export const WithPaddingX: Story = {
  render: () => (
    <Flex
      direction="column"
      gap="md"
      paddingX="lg"
      paddingY="md"
      className="bg-muted rounded"
    >
      <PlaceholderItem label="Horizontal padding only" />
      <PlaceholderItem label="Vertical padding only" />
    </Flex>
  ),
};

export const ComplexLayout: Story = {
  render: () => (
    <Flex direction="column" gap="lg" padding="lg" className="bg-surface rounded border-base border">
      <Flex justify="between" align="center">
        <h2 className="text-lg font-bold">Header</h2>
        <PlaceholderItem label="Action" />
      </Flex>

      <Flex direction="column" gap="md">
        <p className="text-base">Content section with nested layouts</p>
        <Flex gap="md" wrap>
          {Array.from({ length: 4 }).map((_, i) => (
            <Flex
              key={i}
              direction="column"
              gap="sm"
              padding="md"
              className="bg-muted rounded flex-1 min-w-48"
            >
              <h3 className="font-semibold">Card {i + 1}</h3>
              <p className="text-sm text-muted">Nested flex layout</p>
            </Flex>
          ))}
        </Flex>
      </Flex>

      <Flex justify="between" className="pt-md border-t border-base">
        <PlaceholderItem label="Cancel" />
        <PlaceholderItem label="Confirm" />
      </Flex>
    </Flex>
  ),
};

export const InlineWithCenter: Story = {
  render: () => (
    <Flex gap="sm" align="center" className="bg-muted p-md rounded">
      <div className="w-8 h-8 bg-primary rounded-full" />
      <div>
        <p className="font-semibold text-sm">Inline layout</p>
        <p className="text-xs text-muted">Icon + text, vertically centered</p>
      </div>
    </Flex>
  ),
};
