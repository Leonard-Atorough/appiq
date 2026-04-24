import type { Meta, StoryObj } from "@storybook/react-vite";
import { DragItem } from "./DragItem";
import { Card } from "../Card";
import { DropTarget } from "../DropTarget";
import { cn } from "@/shared/lib/cn";
import { dropTargetVariants } from "../DropTarget/droptarget.variants";
import React from "react";

const meta: Meta<typeof DragItem> = {
  title: "Shared/DragItem",
  component: DragItem,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof DragItem>;

export const Default: Story = {
  render: () => (
    <DragItem id="item-1" type="application-card">
      <Card header="Software Engineer">Drag this card</Card>
    </DragItem>
  ),
};

export const Disabled: Story = {
  render: () => (
    <DragItem id="item-1" type="application-card" disabled>
      <Card header="Disabled Card" disabled>
        This item cannot be dragged
      </Card>
    </DragItem>
  ),
};

export const MultipleItems: Story = {
  render: () => (
    <div className="flex flex-col gap-sm">
      {["app-1", "app-2", "app-3"].map((id, i) => (
        <DragItem key={id} id={id} type="application-card">
          <Card header={`Application ${i + 1}`} size="sm">
            Drag to reorder
          </Card>
        </DragItem>
      ))}
    </div>
  ),
};

export const WithDropTarget: Story = {
  render: () => {
    const [droppedId, setDroppedId] = React.useState<string | null>(null);
    return (
      <div className="flex gap-lg items-start">
        <div className="flex flex-col gap-sm">
          <p className="text-sm font-semibold text-secondary">Drag source</p>
          <DragItem id="app-1" type="application-card">
            <Card header="Software Engineer" size="sm">
              Acme Corp
            </Card>
          </DragItem>
          <DragItem id="app-2" type="application-card">
            <Card header="Product Designer" size="sm">
              Initech
            </Card>
          </DragItem>
        </div>
        <div className="flex flex-col gap-sm">
          <p className="text-sm font-semibold text-secondary">Drop target</p>
          <DropTarget droppableId="story-zone" accept="application-card" onDrop={setDroppedId}>
            {({ isDragOver, isDragAccepted }) => (
              <div
                className={cn(
                  dropTargetVariants({ isActive: isDragOver && isDragAccepted }),
                  "min-h-24 min-w-56 flex items-center justify-center rounded-lg p-md",
                )}
              >
                {droppedId ? (
                  <p className="text-sm text-secondary">
                    Dropped: <strong>{droppedId}</strong>
                  </p>
                ) : (
                  <p className="text-sm text-muted">Drop here</p>
                )}
              </div>
            )}
          </DropTarget>
        </div>
      </div>
    );
  },
};
