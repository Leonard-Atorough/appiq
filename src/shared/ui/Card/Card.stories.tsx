import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";
import { DropTarget } from "../DropTarget";
import { cn } from "@/shared/lib/cn";
import { dropTargetVariants } from "../DropTarget/droptarget.variants";

const meta: Meta<typeof Card> = { title: "Shared/Card", component: Card };
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = { render: () => (
  <Card header="Software Engineer" footer="Applied via LinkedIn">
    Acme Corp — Remote
  </Card>
)};

export const Sizes: Story = { render: () => (
  <div className="flex flex-col gap-md">
    <Card size="sm" header="Small Card">Compact content</Card>
    <Card size="md" header="Medium Card">Default content</Card>
    <Card size="lg" header="Large Card">Spacious content</Card>
  </div>
)};

export const Variants: Story = { render: () => (
  <div className="flex flex-col gap-md">
    <Card variant="default" header="Default">Flat surface card</Card>
    <Card variant="elevated" header="Elevated">Higher shadow card</Card>
    <Card variant="outlined" header="Outlined">Transparent with border</Card>
  </div>
)};

export const StatusVariants: Story = { render: () => (
  <div className="flex flex-col gap-md">
    <Card status="success" header="Offer Received">Frontend Engineer @ Acme</Card>
    <Card status="info" header="Interview Scheduled">Product Designer @ Initech</Card>
    <Card status="warning" header="Awaiting Response">Backend Engineer @ Globex</Card>
    <Card status="error" header="Rejected">Full Stack @ Umbrella Corp</Card>
  </div>
)};

export const Selected: Story = { render: () => (
  <Card header="Selected Card" selected>
    This card is in a selected state.
  </Card>
)};

export const Disabled: Story = { render: () => (
  <Card header="Disabled Card" disabled>
    Interaction is blocked.
  </Card>
)};

export const Loading: Story = { render: () => (
  <Card header="Loading Card" loading>
    Content is being fetched…
  </Card>
)};

export const NonInteractive: Story = { render: () => (
  <Card header="Read-only Card" interactive={false}>
    No hover or cursor changes.
  </Card>
)};

export const WithThumbnail: Story = { render: () => (
  <Card
    thumbnail="https://placehold.co/600x200"
    thumbnailAlt="Placeholder company banner"
    header="Frontend Engineer"
    footer="Posted 3 days ago"
  >
    Acme Corp — San Francisco, CA
  </Card>
)};

export const Draggable: Story = { render: () => (
  <div className="flex flex-col gap-md">
    <p className="text-sm text-muted">Try dragging these cards</p>
    <Card header="Software Engineer" dragId="app-1" dragType="application-card" footer="Applied via LinkedIn">
      Acme Corp — Remote
    </Card>
    <Card header="Product Designer" dragId="app-2" dragType="application-card" footer="Applied via Company Site">
      Initech — Hybrid
    </Card>
  </div>
)};

export const DragAndDrop: Story = { render: () => {
  const [dropped, setDropped] = React.useState<string | null>(null);
  return (
    <div className="flex gap-lg">
      <div className="flex flex-col gap-sm">
        <p className="text-sm font-semibold">Drag these</p>
        <Card header="Software Engineer" dragId="app-1" dragType="application-card">
          Acme Corp
        </Card>
        <Card header="Product Designer" dragId="app-2" dragType="application-card">
          Initech
        </Card>
      </div>
      <DropTarget
        droppableId="demo-zone"
        accept="application-card"
        onDrop={(id) => setDropped(id)}
      >
        {({ isDragOver, isDragAccepted }) => (
          <div className={cn(
            dropTargetVariants({ isActive: isDragOver && isDragAccepted }),
            "min-h-32 min-w-48 flex items-center justify-center",
          )}>
            {dropped
              ? <p className="text-sm text-secondary">Dropped: <strong>{dropped}</strong></p>
              : <p className="text-sm text-muted">Drop here</p>
            }
          </div>
        )}
      </DropTarget>
    </div>
  );
}};

import React from "react";
