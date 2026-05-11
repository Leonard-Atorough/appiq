import { useApplications } from "@features/applications/data/useApplications";
import { useApplicationActions } from "@features/applications/data/useApplicationActions";
import { ApplicationCard } from "../../../components/cards/ApplicationCard";
import { Tag, DropTarget, Flex, Header, Skeleton, dropTargetVariants } from "@/shared/ui";
import { cn } from "@/shared/lib";
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
  const { moveAsync: moveApplication, deleteAsync } = useApplicationActions({
    withSuccess: true,
    withError: true,
  });

  if (loading) {
    return (
      <Flex gap="md" padding="md" data-testid="kanban-loading">
        {COLUMNS.map((col) => (
          <Flex key={col.id} direction="column" gap="sm" fullWidth className="min-w-0">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </Flex>
        ))}
      </Flex>
    );
  }

  if (error) {
    return (
      <div className="p-md">
        <div className="rounded-lg border border-error bg-error/10 p-md">
          <p className="text-sm font-medium text-error">Error loading applications</p>
          <p className="text-xs text-error-text">{error?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <Flex
      direction="row"
      gap={{ base: "sm", lg: "md" }}
      paddingX={{ base: "xs", lg: "md" }}
      className="overflow-x-auto h-[80vh]"
    >
      {COLUMNS.map((col) => {
        const cards = applications.filter((app) => app.status === col.id);
        return (
          <Flex
            key={col.id}
            direction="column"
            gap="sm"
            padding="sm"
            justify="start"
            fullWidth
            className="min-w-[95%] md:min-w-70 bg-muted rounded-lg h-full"
          >
            <Flex align="center" justify="between" paddingX="xs" fullWidth>
              <Header level={3} size="h6" weight="semibold">{col.label}</Header>
              <Tag color={col.badge} size="sm" outlined rounded={false} label={cards.length} />
            </Flex>
            <DropTarget
              droppableId={col.id}
              accept="application-card"
              onDrop={(draggedId) => {
                void moveApplication.execute(draggedId, col.id);
              }}
              className="h-full w-full overflow-y-auto"
            >
              {({ isDragOver, isDragAccepted }) => (
                <div
                  className={cn(
                    dropTargetVariants({ isActive: isDragOver && isDragAccepted }),
                    "flex flex-col gap-sm p-sm w-full min-h-32",
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
                          void deleteAsync.execute(id);
                        }}
                        onEdit={(app) => onEditApplication(app.id)}
                        onNavigate={onNavigateToApplication}
                      />
                    ))
                  )}
                </div>
              )}
            </DropTarget>
          </Flex>
        );
      })}
    </Flex>
  );
}
