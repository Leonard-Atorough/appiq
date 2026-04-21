import React from "react";
import type {
  DataTableProps,
  DataTableHeadProps,
  DataTableCellProps,
  DataTableRowProps,
} from "./dataTable.types";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type Cell,
  type Row,
} from "@tanstack/react-table";
import { cn } from "@shared/lib";
import {
  dataTableCellVariants,
  dataTableHeadVariants,
  dataTableRowVariants,
  dataTableVariants,
} from "./dataTable.variants";

/**
 * Internal DataTableHeader component
 * Renders the table header row with column definitions, sorting, and keyboard navigation
 */
function DataTableHeader<TData extends Record<string, any>>({
  table,
  props: { size = "md", variant = "default", sortable = false },
  headerClassName,
}: {
  table: ReturnType<typeof useReactTable<TData>>;
  props: DataTableHeadProps;
  headerClassName?: string;
}) {
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const isSortable = sortable && header.column.getCanSort();

            return (
              <th
                key={header.id}
                className={cn(
                  dataTableHeadVariants({
                    size,
                    variant,
                    sticky: true,
                    sortable: isSortable,
                  }),
                  headerClassName,
                )}
                onClick={isSortable ? header.column.getToggleSortingHandler() : undefined}
                tabIndex={isSortable ? 0 : undefined}
                aria-sort={
                  isSortable
                    ? header.column.getIsSorted() === "asc"
                      ? "ascending"
                      : header.column.getIsSorted() === "desc"
                        ? "descending"
                        : "none"
                    : undefined
                }
                onKeyDown={
                  isSortable
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          header.column.getToggleSortingHandler()?.(e);
                        }
                      }
                    : undefined
                }
              >
                {header.isPlaceholder ? null : (
                  <div className="flex items-center justify-between">
                    <span>
                      {/* Render flex column content via flexRender or just the header if string */}
                      {typeof header.column.columnDef.header === "string"
                        ? header.column.columnDef.header
                        : null}
                    </span>
                    {isSortable && (
                      <span className="ml-(--spacing-xs)" aria-hidden="true">
                        {header.column.getIsSorted() === "asc"
                          ? "↑"
                          : header.column.getIsSorted() === "desc"
                            ? "↓"
                            : ""}
                      </span>
                    )}
                  </div>
                )}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
}

function DataTableCell<TData extends Record<string, any>>({
  cell,
  props: { size = "md", variant = "default" },
  cellClassName,
}: {
  cell: Cell<TData, unknown>;
  props: DataTableCellProps;
  cellClassName?: string;
}) {
  return (
    <td
      key={cell.id}
      className={cn(dataTableCellVariants({ size, variant }), cellClassName)}
      tabIndex={0}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
}

function DataTableRow<TData extends Record<string, any>>({
  row,
  props: {
    size = "md",
    variant = "default",
    striped = false,
    hoverable = false,
    isSelected = false,
    isFocused = false,
  },
  rowClassName,
}: {
  row: Row<TData>;
  props: DataTableRowProps;
  rowClassName?: string;
}) {
  return (
    <tr
      key={row.id}
      className={cn(
        dataTableRowVariants({
          variant,
          striped,
          hoverable,
          selected: isSelected,
          focused: isFocused,
        }),
        rowClassName,
      )}
      tabIndex={-1}
    >
      {row.getVisibleCells().map((cell) => (
        <DataTableCell key={cell.id} cell={cell} props={{ size, variant }} />
      ))}
    </tr>
  );
}

export const DataTable = React.forwardRef<HTMLTableElement, DataTableProps>(
  (
    {
      data,
      columns,
      size = "md",
      variant = "default",
      rowStyle = {},
      sortable = false,
      keyboard = { enabled: true, allowSpaceSelection: true, allowEnterAction: true },
      stickyHeader = true,
      rowClassName,
      cellClassName,
      headerClassName,
      ...props
    },
    ref,
  ) => {
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: sortable ? getSortedRowModel() : undefined,
    });

    return (
      <table ref={ref} className={cn(dataTableVariants({ variant, stickyHeader }))} {...props}>
        <DataTableHeader
          table={table}
          props={{ size, variant, sortable }}
          headerClassName={headerClassName}
        />
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <DataTableRow
              key={row.id}
              row={row}
              props={{ size, variant, striped: rowStyle.striped, hoverable: rowStyle.hoverable }}
              rowClassName={rowClassName}
            />
          ))}
        </tbody>
      </table>
    );
  },
);

DataTable.displayName = "DataTable";
