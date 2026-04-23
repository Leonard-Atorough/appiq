import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./DataTable";
import { Badge } from "@shared/ui/Badge";
import { Dropdown } from "../Dropdown";
import { Checkbox } from "../Checkbox";

const meta: Meta<typeof DataTable> = { title: "Shared/DataTable", component: DataTable };
export default meta;
type Story = StoryObj<typeof DataTable>;

interface Application {
  company: string;
  position: string;
  status: "applied" | "interviewing" | "offer" | "rejected";
  dateApplied: string;
  location: string;
}

const data: Application[] = [
  {
    company: "Acme Corp",
    position: "Senior Frontend Engineer",
    status: "interviewing",
    dateApplied: "2025-03-15",
    location: "Remote",
  },
  {
    company: "TechStart Inc",
    position: "React Developer",
    status: "applied",
    dateApplied: "2025-03-10",
    location: "Hybrid",
  },
  {
    company: "Design Labs",
    position: "Full Stack Engineer",
    status: "rejected",
    dateApplied: "2025-02-28",
    location: "On-site",
  },
  {
    company: "StartupXYZ",
    position: "JavaScript Engineer",
    status: "offer",
    dateApplied: "2025-03-05",
    location: "Remote",
  },
];

const statusVariant: Record<Application["status"], "info" | "warning" | "success" | "error"> = {
  applied: "info",
  interviewing: "warning",
  offer: "success",
  rejected: "error",
};

const columns: ColumnDef<Application>[] = [
  {
    id: "checkbox",
    header: "Select",
    cell: ({ row }) => (
      <Checkbox
        aria-label={`Select application for ${row.original.position} at ${row.original.company}`}
      />
    ),
  },
  { accessorKey: "company", header: "Company" },
  { accessorKey: "position", header: "Position" },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => {
      const s = info.getValue() as Application["status"];
      return (
        <Badge variant={statusVariant[s]} size="sm">
          {s}
        </Badge>
      );
    },
  },
  {
    accessorKey: "dateApplied",
    header: "Applied",
    cell: (i) => new Date(i.getValue() as string).toLocaleDateString(),
  },
  { accessorKey: "location", header: "Location" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Dropdown
        triggerLabel="Row Actions"
        items={[
          {
            label: "View Details",
            onClick: () =>
              alert(`Viewing details for ${row.original.position} at ${row.original.company}`),
          },
          {
            label: "Edit",
            onClick: () =>
              alert(`Editing application for ${row.original.position} at ${row.original.company}`),
          },
          {
            label: "Delete",
            onClick: () =>
              alert(`Deleting application for ${row.original.position} at ${row.original.company}`),
          },
        ]}
      />
    ),
  },
];

export const Default: Story = { render: () => <DataTable data={data} columns={columns} /> };

export const Sortable: Story = {
  render: () => <DataTable data={data} columns={columns} sortable />,
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <DataTable data={data} columns={columns} variant="default" />
      <DataTable data={data} columns={columns} variant="compact" />
      <DataTable data={data} columns={columns} variant="minimal" />
    </div>
  ),
};

export const Striped: Story = {
  render: () => (
    <DataTable data={data} columns={columns} rowStyle={{ striped: true, hoverable: true }} />
  ),
};

export const Loading: Story = { render: () => <DataTable data={[]} columns={columns} loading /> };

export const Empty: Story = {
  render: () => (
    <DataTable data={[]} columns={columns} emptyMessage="No applications match your filters." />
  ),
};
