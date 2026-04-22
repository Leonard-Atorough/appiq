import type { Meta, StoryObj } from "@storybook/react-vite";
import { EmptyState } from "./EmptyState";
import { Icon } from "@shared/ui/Icon";

const meta: Meta<typeof EmptyState> = { title: "Shared/EmptyState", component: EmptyState };
export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  render: () => (
    <EmptyState
      title="No applications yet"
      description="Start tracking your job search by adding your first application."
      action={{ label: "Add Application", onClick: () => {} }}
    />
  ),
};

export const WithIcon: Story = {
  render: () => (
    <EmptyState
      icon={<Icon name="briefcase" size="xl" variant="muted" />}
      title="No results found"
      description="Try adjusting your filters or search term."
    />
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <EmptyState size="sm" title="Small" description="Compact empty state" />
      <EmptyState size="md" title="Medium" description="Default empty state" />
      <EmptyState size="lg" title="Large" description="Spacious empty state" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <EmptyState variant="default" title="Default" description="White surface background" />
      <EmptyState variant="muted" title="Muted" description="Muted surface background" />
    </div>
  ),
};

export const TitleOnly: Story = {
  render: () => <EmptyState title="Nothing here" />,
};
