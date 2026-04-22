import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "./Icon";
import type { IconVariant, IconSize } from "./icon.types";

const meta: Meta<typeof Icon> = { title: "Shared/Icon", component: Icon };
export default meta;
type Story = StoryObj<typeof Icon>;

const allIcons = [
  "kebab",
  "meatball",
  "bento",
  "doner",
  "hamburger",
  "check-circle",
  "x-circle",
  "alert-triangle",
  "info",
  "bell",
  "x",
  "briefcase",
];

const variants: IconVariant[] = [
  "default",
  "muted",
  "primary",
  "secondary",
  "success",
  "error",
  "warning",
  "info",
];
const sizes: IconSize[] = ["xs", "sm", "md", "lg", "xl"];

export const AllIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-lg items-center">
      {allIcons.map((name) => (
        <div key={name} className="flex flex-col items-center gap-xs">
          <Icon name={name} size="lg" />
          <span className="text-xs text-muted">{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-lg items-center">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-col items-center gap-xs">
          <Icon name="check-circle" size="lg" variant={variant} />
          <span className="text-xs text-muted">{variant}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-lg items-end">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col items-center gap-xs">
          <Icon name="briefcase" size={size} />
          <span className="text-xs text-muted">{size}</span>
        </div>
      ))}
    </div>
  ),
};
