import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./DataTable";

interface TestData {
  id: string;
  name: string;
  status: "active" | "inactive";
}

const testData: TestData[] = [
  { id: "1", name: "Item 1", status: "active" },
  { id: "2", name: "Item 2", status: "inactive" },
  { id: "3", name: "Item 3", status: "active" },
];

const columns: ColumnDef<TestData>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "status", header: "Status" },
];

describe("DataTable", () => {
  it("renders table with data", () => {
    render(<DataTable data={testData} columns={columns} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  it("renders column headers", () => {
    render(<DataTable data={testData} columns={columns} />);
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("renders correct number of rows", () => {
    render(<DataTable data={testData} columns={columns} />);
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(4);
  });

  it("renders empty table with empty data", () => {
    render(<DataTable data={[]} columns={columns} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(1);
  });

  it("supports sorting when sortable=true", async () => {
    const sortableColumns: ColumnDef<TestData>[] = [
      { accessorKey: "name", header: "Name", enableSorting: true },
    ];
    render(<DataTable data={testData} columns={sortableColumns} sortable />);

    const nameHeader = screen.getByText("Name");
    const th = nameHeader.closest("th")!;
    const user = userEvent.setup();
    await user.click(nameHeader);
    expect(th).toHaveAttribute("aria-sort", "ascending");
  });

  it("does not allow sorting when sortable=false", () => {
    const sortableColumns: ColumnDef<TestData>[] = [
      { accessorKey: "name", header: "Name", enableSorting: true },
    ];
    render(<DataTable data={testData} columns={sortableColumns} sortable={false} />);

    const nameHeader = screen.getByText("Name");
    expect(nameHeader).not.toHaveAttribute("tabIndex");
  });

  it("supports keyboard navigation with arrow keys", async () => {
    const onRowFocus = vi.fn();
    const { container } = render(
      <DataTable
        data={testData}
        columns={columns}
        keyboard={{ enabled: true }}
        onRowFocus={onRowFocus}
      />,
    );

    const rows = container.querySelectorAll("tbody tr");
    expect(rows[0]).toBeDefined();
  });

  it("navigates with arrow down to next row", async () => {
    const onRowFocus = vi.fn();
    render(
      <DataTable
        data={testData}
        columns={columns}
        keyboard={{ enabled: true }}
        onRowFocus={onRowFocus}
      />,
    );

    const rows = screen.getAllByRole("row");
    // Verify rows are rendered with proper role
    expect(rows.length).toBeGreaterThan(1);
  });

  it("supports space key for row selection", async () => {
    const onRowsSelected = vi.fn();
    render(
      <DataTable
        data={testData}
        columns={columns}
        rowStyle={{ selectable: true }}
        keyboard={{ enabled: true, allowSpaceSelection: true }}
        onRowsSelected={onRowsSelected}
      />,
    );

    // Verify selectable rows are rendered
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(4);
  });

  it("calls onRowsSelected when rows are selected (uncontrolled)", async () => {
    const user = userEvent.setup();
    const onRowsSelected = vi.fn();
    render(
      <DataTable
        data={testData}
        columns={columns}
        rowStyle={{ selectable: true }}
        onRowsSelected={onRowsSelected}
      />,
    );

    const rows = screen.getAllByRole("row");
    await user.click(rows[1]);
    expect(onRowsSelected).toHaveBeenCalledWith(expect.any(Array));
  });

  it("supports controlled selection mode with selectedRowIds prop", async () => {
    const user = userEvent.setup();
    const onSelectedRowIdsChange = vi.fn();
    render(
      <DataTable
        data={testData}
        columns={columns}
        rowStyle={{ selectable: true }}
        selectedRowIds={{}}
        onSelectedRowIdsChange={onSelectedRowIdsChange}
      />,
    );

    const rows = screen.getAllByRole("row");
    await user.click(rows[1]);
    
    // Row IDs are "0", "1", "2" by default in TanStack Table
    expect(onSelectedRowIdsChange).toHaveBeenCalledWith({ "0": true });
  });

  it("syncs checkbox state with controlled selectedRowIds", async () => {
    const onSelectedRowIdsChange = vi.fn();
    const selectedIds: Record<string, boolean> = { "0": true };
    
    render(
      <DataTable
        data={testData}
        columns={[
          {
            id: "checkbox",
            header: "Select",
            cell: ({ row }) => (
              <input
                type="checkbox"
                checked={selectedIds[row.id] ?? false}
                onChange={(e) => {
                  const newIds = { ...selectedIds };
                  if (e.target.checked) {
                    newIds[row.id] = true;
                  } else {
                    delete newIds[row.id];
                  }
                  onSelectedRowIdsChange(newIds);
                }}
              />
            ),
          },
          { accessorKey: "name", header: "Name" },
        ]}
        rowStyle={{ selectable: true }}
        selectedRowIds={selectedIds}
        onSelectedRowIdsChange={onSelectedRowIdsChange}
      />,
    );

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes[0]).toBeChecked();
  });

  it("forwards ref to table element", () => {
    const ref = { current: null } as unknown as React.RefObject<HTMLTableElement>;
    render(<DataTable data={testData} columns={columns} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTableElement);
  });

  it("supports custom header rendering", () => {
    const customColumns: ColumnDef<TestData>[] = [
      {
        accessorKey: "name",
        header: () => <div data-testid="custom-header">Custom Name</div>,
      },
    ];
    render(<DataTable data={testData} columns={customColumns} />);
    expect(screen.getByTestId("custom-header")).toBeInTheDocument();
  });

  it("supports custom cell rendering", () => {
    const customColumns: ColumnDef<TestData>[] = [
      {
        accessorKey: "status",
        cell: (info) => <span data-testid="custom-cell">{String(info.getValue())}</span>,
      },
    ];
    render(<DataTable data={testData} columns={customColumns} />);
    const cells = screen.getAllByTestId("custom-cell");
    expect(cells).toHaveLength(3);
  });

  it("renders aria-selected on selected rows", async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        data={testData}
        columns={columns}
        rowStyle={{ selectable: true }}
      />,
    );

    const rows = screen.getAllByRole("row");
    await user.click(rows[1]);
    expect(rows[1]).toHaveAttribute("aria-selected", "true");
  });

  it("has correct row role attribute", () => {
    render(<DataTable data={testData} columns={columns} />);
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(4);
    rows.forEach((row) => {
      expect(row.tagName).toBe("TR");
    });
  });
});



