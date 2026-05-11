import type { ColumnDef } from "@tanstack/react-table";
import type { JobApplication } from "@/entities";
import { Tag } from "@/shared/ui";

const statusVariant: Record<JobApplication["status"], "default" | "info" | "warning" | "success" | "error"> = {
  saved: "default",
  applied: "info",
  interviewing: "warning",
  offer: "success",
  rejected: "error",
};

export const applicationColumns: ColumnDef<JobApplication>[] = [
  {
    id: "company",
    header: "Company",
    accessorKey: "company",
  },
  {
    id: "position",
    header: "Position",
    accessorKey: "position",
  },
  {
    id: "status",
    header: "Status",
    accessorKey: "status",
    cell: (info) => (
      <Tag color={statusVariant[info.getValue() as JobApplication["status"]]} size="md" label={info.getValue() as string} />
    ),
  },
  {
    id: "dateApplied",
    header: "Applied",
    accessorKey: "dateApplied",
    cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
  },
  {
    id: "location",
    header: "Location",
    accessorKey: "location",
    cell: (info) => (info.getValue() as string | undefined) ?? "-",
  },
  {
    id: "jobType",
    header: "Job Type",
    accessorKey: "jobType",
    cell: (info) => (info.getValue() as string | undefined) ?? "-",
  },
  {
    id: "salary",
    header: "Salary",
    cell: (info) => {
      const app = info.row.original;
      if (!app.salaryMin || !app.salaryMax) return "-";
      return `$${(app.salaryMin / 1000).toFixed(0)}k - $${(app.salaryMax / 1000).toFixed(0)}k`;
    },
  },
];
