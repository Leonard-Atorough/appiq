import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta: Meta<typeof Button> = { title: "Shared/Button", component: Button };
export default meta;
type Story = StoryObj<typeof Button>;

export const Variants: Story = { render: () => (
  <div className="flex flex-wrap gap-md items-center">
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
  </div>
)};

export const Sizes: Story = { render: () => (
  <div className="flex flex-wrap gap-md items-center">
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </div>
)};

export const States: Story = { render: () => (
  <div className="flex flex-wrap gap-md items-center">
    <Button>Default</Button>
    <Button disabled>Disabled</Button>
    <Button loading>Loading</Button>
  </div>
)};

export const FullWidth: Story = { render: () => (
  <div className="flex flex-col gap-md max-w-sm">
    <Button full>Full Width</Button>
    <Button full variant="outline">Full Width Outline</Button>
  </div>
)};
