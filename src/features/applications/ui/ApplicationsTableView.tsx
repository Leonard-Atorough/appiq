import { useApplications } from "../data/useApplications";
import { applicationColumns } from "../model/columns";
import { DataTable, Dropdown } from "@/shared/ui";
import { Skeleton } from "@/shared/ui";
import { EmptyState } from "@/shared/ui";
import type { Row } from "@tanstack/react-table";

interface ApplicationsTableViewProps {
  onAddApplication: () => void;
  onEditApplication: (id: string) => void;
  onDeleteApplication: (id: string) => void;
}

/**
 * Applications Table View
 *
 * Displays all job applications in a sortable, filterable table.
 * Fetches data from the useApplications hook and renders with TanStack Table.
 */
export function ApplicationsTableView({
  onAddApplication,
  onEditApplication,
  onDeleteApplication,
}: ApplicationsTableViewProps) {
  //NOTE: we'll needto pass onEditApplication down into the columns definitions. We can spread the columns and add an "actions" column at the end that uses it to render edit buttons for each row.
  const { applications, loading, error } = useApplications();

  const combinedColumns = [
    ...applicationColumns,
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: Row<(typeof applications)[number]> }) => {
        const application = row.original;
        return (
          <Dropdown
            triggerLabel="Row Actions"
            items={[
              {
                label: "Edit",
                onClick: () => onEditApplication(application.id),
              },
              {
                label: "Delete",
                onClick: () => onDeleteApplication(application.id),
              },
            ]}
          />
        );
      },
    },
  ];

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
            onAddApplication();
          },
        }}
      />
    );
  }

  return <DataTable data={applications} columns={combinedColumns} sortable stickyHeader />;
}
