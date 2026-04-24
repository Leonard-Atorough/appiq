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
  "chevron-left",
  "chevron-right",
  "chevron-up",
  "chevron-down",
  "check-circle",
  "x-circle",
  "alert-triangle",
  "info",
  "bell",
  "check",
  "minus",
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

/** Decorative icon (default): used in buttons, labels, decorative UI */
export const Decorative: Story = {
  render: () => (
    <button className="flex items-center gap-sm px-md py-sm rounded-md bg-primary text-white">
      <Icon name="check" />
      <span>Confirm</span>
    </button>
  ),
};

/** Semantic icon (with aria-label): used when icon conveys meaning without text */
export const Informational: Story = {
  render: () => (
    <div className="flex gap-md items-center">
      <Icon
        name="check-circle"
        variant="success"
        size="lg"
        aria-hidden={false}
        aria-label="Application submitted successfully"
      />
      <Icon
        name="x-circle"
        variant="error"
        size="lg"
        aria-hidden={false}
        aria-label="Application rejected"
      />
      <Icon
        name="alert-triangle"
        variant="warning"
        size="lg"
        aria-hidden={false}
        aria-label="Warning: review required"
      />
      <Icon
        name="info"
        variant="info"
        size="lg"
        aria-hidden={false}
        aria-label="Additional information available"
      />
    </div>
  ),
};

/** Size and variant combination grid */
export const SizeVariantGrid: Story = {
  render: () => (
    <table className="border-collapse w-full text-center">
      <thead>
        <tr className="border-b border-base">
          <th className="p-md text-sm font-semibold">Size \ Variant</th>
          {variants.slice(0, 4).map((v) => (
            <th key={v} className="p-md text-sm font-semibold">
              {v}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sizes.map((size) => (
          <tr key={size} className="border-b border-base">
            <td className="p-md text-sm font-semibold text-left">{size}</td>
            {variants.slice(0, 4).map((variant) => (
              <td key={`${size}-${variant}`} className="p-md">
                <Icon name="check-circle" size={size} variant={variant} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
};

/** Feedback states: common status indicator patterns */
export const StatusIndicators: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <div className="flex items-center gap-md p-md rounded-md bg-success/10 border border-success">
        <Icon name="check-circle" variant="success" size="lg" aria-hidden={false} aria-label="Success" />
        <span className="text-sm">Application submitted successfully</span>
      </div>
      <div className="flex items-center gap-md p-md rounded-md bg-error/10 border border-error">
        <Icon name="x-circle" variant="error" size="lg" aria-hidden={false} aria-label="Error" />
        <span className="text-sm">Unable to process request</span>
      </div>
      <div className="flex items-center gap-md p-md rounded-md bg-warning/10 border border-warning">
        <Icon name="alert-triangle" variant="warning" size="lg" aria-hidden={false} aria-label="Warning" />
        <span className="text-sm">Please review before proceeding</span>
      </div>
      <div className="flex items-center gap-md p-md rounded-md bg-info/10 border border-info">
        <Icon name="info" variant="info" size="lg" aria-hidden={false} aria-label="Information" />
        <span className="text-sm">Learn more about this feature</span>
      </div>
    </div>
  ),
};
