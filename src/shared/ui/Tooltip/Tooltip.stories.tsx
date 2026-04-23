import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "./Tooltip";
import { Button } from "@shared/ui/Button";
import { Badge } from "@shared/ui/Badge";

const meta: Meta<typeof Tooltip> = { title: "Shared/Tooltip", component: Tooltip };
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <div className="flex justify-center p-3xl">
      <Tooltip message="Save your changes">
        <Button>Save</Button>
      </Tooltip>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap justify-center gap-lg p-3xl">
      <Tooltip message="Default tooltip" color="default" bordered>
        <Button variant="outline" size="sm">Default</Button>
      </Tooltip>
      <Tooltip message="Dark tooltip" color="dark">
        <Button variant="outline" size="sm">Dark</Button>
      </Tooltip>
      <Tooltip message="Primary tooltip" color="primary">
        <Button size="sm">Primary</Button>
      </Tooltip>
      <Tooltip message="Success tooltip" color="success">
        <Button variant="ghost" size="sm">Success</Button>
      </Tooltip>
      <Tooltip message="Warning tooltip" color="warning">
        <Button variant="ghost" size="sm">Warning</Button>
      </Tooltip>
      <Tooltip message="Error tooltip" color="error">
        <Button variant="ghost" size="sm">Error</Button>
      </Tooltip>
      <Tooltip message="Info tooltip" color="info">
        <Button variant="ghost" size="sm">Info</Button>
      </Tooltip>
    </div>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-xl p-5xl place-items-center">
      {(["top", "bottom", "left", "right"] as const).map((side) => (
        <Tooltip key={side} message={`Tooltip on ${side}`} side={side}>
          <Button variant="outline" size="sm">{side}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="flex flex-col gap-lg p-3xl items-center">
      {(["start", "center", "end"] as const).map((align) => (
        <Tooltip key={align} message={`Aligned to ${align}`} align={align} side="bottom">
          <Button variant="outline">{align}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap justify-center gap-lg p-3xl">
      <Tooltip message="Small tooltip" size="sm">
        <Button variant="outline" size="sm">Small</Button>
      </Tooltip>
      <Tooltip message="Medium tooltip — the default size for most use cases" size="md">
        <Button variant="outline" size="sm">Medium</Button>
      </Tooltip>
      <Tooltip message="Large tooltip with more room for longer descriptive text" size="lg">
        <Button variant="outline" size="sm">Large</Button>
      </Tooltip>
    </div>
  ),
};

export const Bordered: Story = {
  render: () => (
    <div className="flex justify-center gap-lg p-3xl">
      <Tooltip message="No border (default)" color="default">
        <Button variant="outline" size="sm">No border</Button>
      </Tooltip>
      <Tooltip message="With border" color="default" bordered>
        <Button variant="outline" size="sm">Bordered</Button>
      </Tooltip>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex justify-center p-3xl">
      <Tooltip message="This will never show" disabled>
        <Button variant="outline">Disabled tooltip</Button>
      </Tooltip>
    </div>
  ),
};

export const WithDelay: Story = {
  render: () => (
    <div className="flex justify-center gap-lg p-3xl">
      <Tooltip message="Instant (delay=0)" delay={0}>
        <Button variant="ghost" size="sm">Instant</Button>
      </Tooltip>
      <Tooltip message="Default 300ms delay" delay={300}>
        <Button variant="ghost" size="sm">300ms</Button>
      </Tooltip>
      <Tooltip message="Slow 800ms delay" delay={800}>
        <Button variant="ghost" size="sm">800ms</Button>
      </Tooltip>
    </div>
  ),
};

export const OnNonButton: Story = {
  render: () => (
    <div className="flex flex-wrap justify-center gap-lg p-3xl">
      <Tooltip message="Status: Interviewing" color="warning">
        <Badge variant="warning">Interviewing</Badge>
      </Tooltip>
      <Tooltip message="Application was rejected" color="error">
        <Badge variant="error">Rejected</Badge>
      </Tooltip>
      <Tooltip message="Offer received — congratulations!" color="success">
        <Badge variant="success">Offer</Badge>
      </Tooltip>
    </div>
  ),
};

export const InsideOverflowContainer: Story = {
  render: () => (
    <div className="p-xl">
      <p className="text-sm text-muted mb-md">
        The tooltip renders in a portal and escapes the <code>overflow-hidden</code> container below.
      </p>
      <div className="overflow-hidden rounded-lg border border-base p-md flex justify-center">
        <Tooltip message="I escape overflow:hidden via portal" side="top">
          <Button size="sm">Hover me</Button>
        </Tooltip>
      </div>
    </div>
  ),
};
