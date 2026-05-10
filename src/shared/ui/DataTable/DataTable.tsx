import type {
  DataTableCellProps,
  DataTableHeadProps,
  DataTableProps,
  DataTableRowProps,
} from "./dataTable.types";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type Cell,
  type Row,
} from "@tanstack/react-table";
import { cn, useResponsive } from "@shared/lib";
import {
  dataTableCellVariants,
  dataTableHeadVariants,
  dataTableRowVariants,
  dataTableVariants,
} from "./dataTable.variants";

import { useCallback, useEffect, useState } from "react";
import React from "react";
import { Icon } from "../Icon";

/**
 * Internal DataTableHeader component
 * Renders the table header row with column definitions, sorting, and keyboard navigation
 */
function DataTableHeader<TData extends Record<string, unknown>>({
  table,
  props: { textSize = "md", style = "default", sortable = false, className },
}: {
  table: ReturnType<typeof useReactTable<TData>>;
  props: DataTableHeadProps;
}) {
  const resolvedStyle = useResponsive(style);
  const resolvedTextSize = useResponsive(textSize);
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
                    textSize: resolvedTextSize,
                    style: resolvedStyle,
                    sticky: true,
                    sortable: isSortable,
                  }),
                  className,
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
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {isSortable && (
                      <span className="ml-xs" aria-hidden="true">
                        {header.column.getIsSorted() === "asc" ? (
                          <Icon name="chevron-up" size="sm" />
                        ) : header.column.getIsSorted() === "desc" ? (
                          <Icon name="chevron-down" size="sm" />
                        ) : (
                          ""
                        )}
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

function DataTableCell<TData extends Record<string, unknown>>({
  cell,
  props: { textSize = "md", style = "default", className: cellClassName },
}: {
  cell: Cell<TData, unknown>;
  props: DataTableCellProps;
}) {
  const resolvedStyle = useResponsive(style);
  const resolvedTextSize = useResponsive(textSize);
  return (
    <td
      key={cell.id}
      className={cn(
        dataTableCellVariants({ textSize: resolvedTextSize, style: resolvedStyle }),
        cellClassName,
      )}
      tabIndex={0}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
}

function DataTableRow<TData extends Record<string, unknown>>({
  row,
  props: {
    textSize = "md",
    style = "default",
    isSelected = false,
    isFocused = false,
    className: rowClassName,
    cellClassName,
    onKeyDown,
    onClick,
    onFocus,
    onBlur,
  },
  tabIndex,
}: {
  row: Row<TData>;
  props: DataTableRowProps;
  tabIndex?: number;
}) {
  const resolvedStyle = useResponsive(style);

  return (
    <tr
      key={row.id}
      className={cn(
        dataTableRowVariants({
          style: resolvedStyle,
          hoverable: onClick || onFocus ? true : false, // Make row hoverable if it has an onClick or onFocus handler
          selected: isSelected,
          focused: isFocused,
        }),
        rowClassName,
      )}
      onKeyDown={onKeyDown}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={tabIndex}
      role="row"
      aria-selected={isSelected}
    >
      {row.getVisibleCells().map((cell) => (
        <DataTableCell
          key={cell.id}
          cell={cell}
          props={{ textSize, style, className: cellClassName }}
        />
      ))}
    </tr>
  );
}

/**
 * DataTable
 *
 * A pure presentational data table built on TanStack Table (react-table v8).
 * Renders data with support for sorting, keyboard navigation, and row selection.
 * Parent components are responsible for managing loading/empty states.
 *
 * Supports:
 * - Column sorting with keyboard support (Enter/Space on headers)
 * - Sticky header
 * - Arrow key row navigation
 * - Space bar row selection
 * - Custom cell and header rendering via ColumnDef
 * - Responsive sizing via ResponsiveValue
 *
 * @example
 * // Feature component handles loading/empty, passes data to DataTable:
 * function ApplicationsList() {
 *   const { applications, loading, error } = useApplications();
 *   const columns: ColumnDef<Application>[] = [
 *     { accessorKey: "title", header: "Title" },
 *     { id: "actions", cell: ({ row }) => <Dropdown items={...} /> },
 *   ];
 *
 *   if (loading) return <Spinner />;
 *   if (applications.length === 0) return <EmptyState />;
 *
 *   return <DataTable data={applications} columns={columns} sortable />;
 * }
 * // Responsive: md=md, lg=lg
 * <DataTable data={items} columns={cols} size={{ base: "sm", md: "md", lg: "lg" }} variant={{ base: "default", lg: "compact" }} />
 */
export const DataTable = React.forwardRef<HTMLTableElement, DataTableProps>(
  (
    {
      data,
      columns,
      textSize = "md",
      style = "default",
      density = "normal",
      rowStyle = {},
      sortable = false,
      keyboard = { enabled: true, allowSpaceSelection: true, allowEnterAction: true },
      stickyHeader = true,
      rowClassName,
      cellClassName,
      headerClassName,
      selectedRowIds: controlledSelectedRowIds,
      onSelectedRowIdsChange,
      onRowsSelected,
      onRowFocus,
      ...props
    },
    ref,
  ) => {
    // Resolve responsive values at the level they are used in subcomponents to avoid unnecessary re-renders of the entire table when breakpoints change
    const resolvedStyle = useResponsive(style);
    const resolvedDensity = useResponsive(density);

    // Determine if controlled or uncontrolled
    const isControlled = controlledSelectedRowIds !== undefined;

    // Internal state for uncontrolled mode
    const [internalSelectedRowIds, setInternalSelectedRowIds] = useState<Record<string, boolean>>(
      {},
    );

    // Use controlled value if provided, otherwise use internal state
    const selectedRowIds = isControlled ? controlledSelectedRowIds : internalSelectedRowIds;

    // Helper to update selection state (works in both modes)
    const updateSelectedRowIds = useCallback(
      (updater: (prev: Record<string, boolean>) => Record<string, boolean>) => {
        const newSelection = updater(selectedRowIds);
        if (isControlled) {
          onSelectedRowIdsChange?.(newSelection);
        } else {
          setInternalSelectedRowIds(newSelection);
        }
      },
      [selectedRowIds, isControlled, onSelectedRowIdsChange],
    );

    const [focusedRowIndex, setFocusedRowIndex] = useState<number | null>(null);

    const table = useReactTable({
      data,
      columns,
      state: { rowSelection: selectedRowIds },
      enableRowSelection: rowStyle.selectable,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: sortable ? getSortedRowModel() : undefined,
      getFilteredRowModel: getFilteredRowModel(),
    });

    const rows = table.getRowModel().rows;
    const selectedRows = rows.filter((row) => selectedRowIds[row.id]);

    // Notify parent when selection changes (uncontrolled mode only)
    useEffect(() => {
      if (!isControlled) {
        onRowsSelected?.(selectedRows);
      }
    }, [selectedRowIds, selectedRows, onRowsSelected, isControlled]);

    // Notify parent when focus changes
    useEffect(() => {
      onRowFocus?.(focusedRowIndex);
    }, [focusedRowIndex, onRowFocus]);

    const handleRowKeyDown = useCallback(
      (rowIndex: number, e: React.KeyboardEvent) => {
        if (!keyboard.enabled) return;

        const totalRows = rows.length;
        let nextFocusIndex = focusedRowIndex;

        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            nextFocusIndex =
              focusedRowIndex === null ? 0 : Math.min(focusedRowIndex + 1, totalRows - 1);
            setFocusedRowIndex(nextFocusIndex);
            break;
          case "ArrowUp":
            e.preventDefault();
            nextFocusIndex = focusedRowIndex === null ? 0 : Math.max(focusedRowIndex - 1, 0);
            setFocusedRowIndex(nextFocusIndex);
            break;
          case " ":
            if (keyboard.allowSpaceSelection && rowStyle.selectable) {
              e.preventDefault();
              const row = rows[rowIndex];
              updateSelectedRowIds((prev) => ({
                ...prev,
                [row.id]: !prev[row.id],
              }));
            }
            break;
          case "Enter":
            if (keyboard.allowEnterAction) {
              e.preventDefault();
              // Trigger any action on the focused row (e.g., open details)
              // This is a hook point for parent to implement
            }
            break;
        }
      },
      [keyboard, focusedRowIndex, rowStyle.selectable, rows, updateSelectedRowIds],
    );

    const handleRowClick = (rowId: string) => {
      if (rowStyle.selectable) {
        updateSelectedRowIds((prev) => ({
          ...prev,
          [rowId]: !prev[rowId],
        }));
      }
    };

    return (
      <table
        ref={ref}
        className={cn(
          dataTableVariants({
            style: resolvedStyle,
            stickyHeader,
            striped: rowStyle.striped,
            density: resolvedDensity,
          }),
        )}
        {...props}
      >
        <DataTableHeader
          table={table}
          props={{ textSize, style: resolvedStyle, sortable, className: headerClassName }}
        />
        <tbody>
          {rows.map((row, rowIndex) => (
            <DataTableRow
              key={row.id}
              row={row}
              props={{
                textSize,
                style: resolvedStyle,
                isSelected: selectedRowIds[row.id] ?? false,
                isFocused: focusedRowIndex === rowIndex,
                className: rowClassName,
                cellClassName: cellClassName,
                onKeyDown: (e) => handleRowKeyDown(rowIndex, e),
                onClick: () => handleRowClick(row.id),
                onFocus: () => setFocusedRowIndex(rowIndex),
                onBlur: () => setFocusedRowIndex(null),
                tabIndex: focusedRowIndex === rowIndex ? 0 : -1,
              }}
            />
          ))}
        </tbody>
      </table>
    );
  },
);

DataTable.displayName = "DataTable";
