import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { DropTarget } from "./DropTarget";
import { DragItem } from "../DragItem";
import { Card } from "../Card";
import { cn } from "@/shared/lib/cn";
import { dropTargetVariants } from "./droptarget.variants";

const meta: Meta<typeof DropTarget> = {
  title: "Shared/DropTarget",
  component: DropTarget,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof DropTarget>;

// Styled wrapper using the optional dropTargetVariants utility
const StyledZone = ({
  isDragOver,
  isDragAccepted,
  label = "Drop here",
}: {
  isDragOver: boolean;
  isDragAccepted: boolean;
  label?: string;
}) => (
  <div
    className={cn(
      dropTargetVariants({ isActive: isDragOver && isDragAccepted }),
      "min-h-32 min-w-56 flex items-center justify-center p-md",
    )}
  >
    <p className="text-sm text-muted">{label}</p>
  </div>
);

export const Default: Story = {
  render: () => (
    <DropTarget droppableId="default-zone" accept="application-card" onDrop={() => {}}>
      {({ isDragOver, isDragAccepted }) => (
        <StyledZone isDragOver={isDragOver} isDragAccepted={isDragAccepted} />
      )}
    </DropTarget>
  ),
};

export const Disabled: Story = {
  render: () => (
    <DropTarget droppableId="disabled-zone" accept="application-card" onDrop={() => {}} disabled>
      {({ isDragOver, isDragAccepted }) => (
        <div
          className={cn(
            dropTargetVariants({ isActive: isDragOver && isDragAccepted, disabled: true }),
            "min-h-32 flex items-center justify-center p-md",
          )}
        >
          <p className="text-sm text-muted">Drop zone disabled</p>
        </div>
      )}
    </DropTarget>
  ),
};

export const WithDragItems: Story = {
  render: () => {
    const [items] = React.useState([
      { id: "app-1", title: "Software Engineer", company: "Acme Corp" },
      { id: "app-2", title: "Product Designer", company: "Initech" },
      { id: "app-3", title: "Backend Engineer", company: "Globex" },
    ]);
    const [dropped, setDropped] = React.useState<string[]>([]);

    const handleDrop = (draggedId: string) => {
      setDropped((prev) => [...new Set([...prev, draggedId])]);
    };

    return (
      <div className="flex gap-lg items-start">
        <div className="flex flex-col gap-sm">
          <p className="text-sm font-semibold text-secondary">Drag these</p>
          {items.map((item) => (
            <DragItem key={item.id} id={item.id} type="application-card">
              <Card header={item.title} size="sm">
                {item.company}
              </Card>
            </DragItem>
          ))}
        </div>

        <DropTarget
          droppableId="story-zone"
          accept="application-card"
          onDrop={handleDrop}
          ariaLabel="Drop applications here"
        >
          {({ isDragOver, isDragAccepted }) => (
            <div
              className={cn(
                dropTargetVariants({ isActive: isDragOver && isDragAccepted }),
                "min-h-48 min-w-56 flex flex-col gap-sm p-md",
              )}
            >
              {dropped.length === 0 ? (
                <p className="text-sm text-muted m-auto">Drop cards here</p>
              ) : (
                <>
                  <p className="text-xs font-semibold text-muted uppercase tracking-wide">
                    Received
                  </p>
                  {dropped.map((id) => {
                    const item = items.find((i) => i.id === id);
                    return item ? (
                      <Card key={id} header={item.title} size="sm" status="success">
                        {item.company}
                      </Card>
                    ) : null;
                  })}
                </>
              )}
            </div>
          )}
        </DropTarget>
      </div>
    );
  },
};

export const MultipleZones: Story = {
  render: () => {
    const [zoneContents, setZoneContents] = React.useState<Record<string, string[]>>({
      applied: ["app-1", "app-2"],
      interviewing: [],
      offer: [],
    });

    const moveItem = (draggedId: string, toZone: string) => {
      setZoneContents((prev) => {
        const next = { ...prev };
        // Remove from current zone
        Object.keys(next).forEach((zone) => {
          next[zone] = next[zone].filter((id) => id !== draggedId);
        });
        // Add to target zone
        next[toZone] = [...next[toZone], draggedId];
        return next;
      });
    };

    const cards: Record<string, { title: string; company: string }> = {
      "app-1": { title: "Software Engineer", company: "Acme Corp" },
      "app-2": { title: "Product Designer", company: "Initech" },
    };

    const zones = [
      { id: "applied", label: "Applied" },
      { id: "interviewing", label: "Interviewing" },
      { id: "offer", label: "Offer" },
    ];

    return (
      <div className="flex gap-md">
        {zones.map((zone) => (
          <div key={zone.id} className="flex flex-col gap-sm min-w-44">
            <p className="text-sm font-semibold text-secondary">{zone.label}</p>
            <DropTarget
              droppableId={zone.id}
              accept="application-card"
              onDrop={(id) => moveItem(id, zone.id)}
            >
              {({ isDragOver, isDragAccepted }) => (
                <div
                  className={cn(
                    dropTargetVariants({ isActive: isDragOver && isDragAccepted }),
                    "flex flex-col gap-sm p-sm min-h-32",
                  )}
                >
                  {zoneContents[zone.id].map((id) => {
                    const card = cards[id];
                    return card ? (
                      <DragItem key={id} id={id} type="application-card">
                        <Card header={card.title} size="sm">
                          {card.company}
                        </Card>
                      </DragItem>
                    ) : null;
                  })}
                  {zoneContents[zone.id].length === 0 && (
                    <p className="text-xs text-muted text-center m-auto">Empty</p>
                  )}
                </div>
              )}
            </DropTarget>
          </div>
        ))}
      </div>
    );
  },
};
