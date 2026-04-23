import { useApplications } from "../data/useApplications";
import { applicationColumns } from "../model/columns";
import { DataTable } from "@/shared/ui";
import { Skeleton } from "@/shared/ui";
import { EmptyState } from "@/shared/ui";

/**
 * Applications Table View
 *
 * Displays all job applications in a sortable, filterable table.
 * Fetches data from the useApplications hook and renders with TanStack Table.
 */
export function ApplicationsTableView() {
  const { applications, loading, error } = useApplications();

  if (loading) {
    return (
      <div className="space-y-sm p-md">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-80 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-md">
        <div className="rounded-lg border border-error bg-error-light p-md">
          <p className="text-sm font-medium text-error">Error loading applications</p>
          <p className="text-xs text-error/80">{error.message}</p>
        </div>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <EmptyState
        title="No applications yet"
        description="Start tracking your job search. Add your first application to get started."
        action={{
          label: "Add Application",
          onClick: () => {
            /* TODO: open add form */
          },
        }}
      />
    );
  }

  return <DataTable data={applications} columns={applicationColumns} sortable stickyHeader />;
}
//Droptarget component:
// props:
// - onDrop: (applicationId: string, newStatus: string) => void
// - onDragOver: (e: React.DragEvent) => void
// - onDragLeave: (e: React.DragEvent) => void
// - isActive: boolean (for styling when an item is being dragged over)
// - applicationId: string (id of the application being dragged, for styling the source column)
// 
// - status: string
// - children: React.ReactNode