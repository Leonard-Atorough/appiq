import { useApplicationActions, useApplications } from "../../data/useApplications";
import { ApplicationCard } from "../items/ApplicationCard";
import { Badge, DropTarget, Skeleton } from "@/shared/ui";
import { useToast } from "@/shared/lib";
import { cn } from "@/shared/lib/cn";
import { dropTargetVariants } from "@/shared/ui/DropTarget/droptarget.variants";
import type { ApplicationStatus } from "@/entities";

const COLUMNS: {
  id: ApplicationStatus;
  label: string;
  badge: "default" | "info" | "warning" | "success" | "error";
}[] = [
  { id: "saved", label: "Saved", badge: "default" },
  { id: "applied", label: "Applied", badge: "info" },
  { id: "interviewing", label: "Interviewing", badge: "warning" },
  { id: "offer", label: "Offer", badge: "success" },
  { id: "rejected", label: "Rejected", badge: "error" },
];

interface ApplicationsKanbanViewProps {
  onEditApplication: (id: string) => void;
  onNavigateToApplication: (id: string) => void;
}

export function ApplicationsKanbanView({
  onEditApplication,
  onNavigateToApplication,
}: ApplicationsKanbanViewProps) {
  const { applications, loading, error } = useApplications();
  const { moveAsync: moveApplication, deleteAsync } = useApplicationActions();
  const { addToast } = useToast();

  if (loading) {
    return (
      <div className="flex gap-md p-md">
        {COLUMNS.map((col) => (
          <div key={col.id} className="flex-1 min-w-0 flex flex-col gap-sm">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-md">
        <div className="rounded-lg border border-error bg-error/10 p-md">
          <p className="text-sm font-medium text-error">Error loading applications</p>
          <p className="text-xs text-error/80">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-md">
      <div className="flex gap-md px-md pb-md overflow-x-auto">
        {COLUMNS.map((col) => {
          const cards = applications.filter((app) => app.status === col.id);
          return (
            <div
              key={col.id}
              className="flex flex-col gap-sm min-w-56 flex-1 bg-muted rounded-lg p-sm"
            >
              <div className="flex items-center justify-between px-xs">
                <h3 className="text-sm font-semibold text-secondary">{col.label}</h3>
                <Badge variant={col.badge} size="sm" outline rounded={false}>
                  {cards.length}
                </Badge>
              </div>
              <DropTarget
                droppableId={col.id}
                accept="application-card"
                onDrop={(draggedId) => {
                  void moveApplication.execute(draggedId, col.id).catch((err) => {
                    addToast({
                      title: "Error moving application",
                      description: err instanceof Error ? err.message : "Unknown error",
                      variant: "error",
                    });
                  });
                }}
              >
                {({ isDragOver, isDragAccepted }) => (
                  <div
                    className={cn(
                      dropTargetVariants({ isActive: isDragOver && isDragAccepted }),
                      "flex flex-col gap-sm p-sm min-h-32",
                    )}
                  >
                    {cards.length === 0 ? (
                      <p className="text-xs text-muted text-center m-auto">Drop here</p>
                    ) : (
                      cards.map((app) => (
                        <ApplicationCard
                          key={app.id}
                          application={app}
                          onDelete={(id) => {
                            void deleteAsync.execute(id).catch((err) => {
                              addToast({
                                title: "Error deleting application",
                                description: err instanceof Error ? err.message : "Unknown error",
                                variant: "error",
                              });
                            });
                          }}
                          onEdit={(app) => onEditApplication(app.id)}
                          onNavigate={onNavigateToApplication}
                        />
                      ))
                    )}
                  </div>
                )}
              </DropTarget>
            </div>
          );
        })}
      </div>
    </div>
  );
}
