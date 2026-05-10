/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnDef, Row } from "@tanstack/react-table";
import type { ResponsiveValue } from "@/shared/lib";
import type {
  dataTableVariants,
  dataTableCellVariants,
  dataTableHeadVariants,
  dataTableRowVariants,
} from "./dataTable.variants";
import type { VariantProps } from "class-variance-authority";


export type DataTableSize = "sm" | "md" | "lg";
export type TableDisplayStyle = "default" | "minimal" | "full";
export type DataTableDensity = "condensed" | "normal" | "spacious";

export interface DataTableRowStyle {
  /** Alternating row background colours. */
  striped?: boolean;
  /** Enables row selection (checkbox column + `onRowsSelected`). */
  selectable?: boolean;
}

export interface DataTableKeyboardConfig {
  /** Enables arrow-key row navigation. */
  enabled?: boolean;
  /** Space bar toggles row selection during keyboard nav. */
  allowSpaceSelection?: boolean;
  /** Enter fires the row action during keyboard nav. */
  allowEnterAction?: boolean;
}

export interface DataTableProps<TData extends Record<string, any> = any> extends Omit<
  VariantProps<typeof dataTableVariants>,
  "style" | "density"
> {
  /** Row data array. Each item maps to one row. Parent is responsible for loading/empty states. */
  data: TData[];
  /** TanStack Table column definitions. */
  columns: ColumnDef<TData, any>[];
  /** Text size. */
  textSize?: ResponsiveValue<DataTableSize>;
  /** Visual style variant. */
  style?: ResponsiveValue<TableDisplayStyle>;
  /** Row density configuration. */
  density?: ResponsiveValue<DataTableDensity>;
  /** Row appearance configuration (striped, hover, selectable). */
  rowStyle?: DataTableRowStyle;
  /** Enables click-to-sort on column headers. */
  sortable?: boolean;
  /** Keyboard arrow-key navigation and selection config. */
  keyboard?: DataTableKeyboardConfig;
  /** Keeps the header row fixed during vertical scroll. */
  stickyHeader?: boolean;
  /** Extra classes applied to every `<tr>`. */
  rowClassName?: string;
  /** Extra classes applied to every `<td>`. */
  cellClassName?: string;
  /** Extra classes applied to every `<th>`. */
  headerClassName?: string;
  /** Controlled row selection state. When provided, makes component controlled. Maps row ID to selection boolean. */
  selectedRowIds?: Record<string, boolean>;
  /** Fired when selection state should change (click, space key). Only called in controlled mode. */
  onSelectedRowIdsChange?: (selectedIds: Record<string, boolean>) => void;
  /** Fired when row selection changes. Requires `rowStyle.selectable`. Legacy callback; use `onSelectedRowIdsChange` for controlled mode. */
  onRowsSelected?: (rows: Row<TData>[]) => void;
  /** Fired with the focused row index during keyboard navigation. `null` when focus leaves the table. */
  onRowFocus?: (rowIndex: number | null) => void;
}

/** Styled `<td>` subcomponent. */
export interface DataTableCellProps
  extends
    Omit<React.TdHTMLAttributes<HTMLTableCellElement>, "style">,
    Omit<VariantProps<typeof dataTableCellVariants>, "textSize" | "style"> {
  textSize?: ResponsiveValue<DataTableSize>;
  style?: ResponsiveValue<TableDisplayStyle>;
  className?: string;
}

/** Styled `<tr>` subcomponent. */
export interface DataTableRowProps
  extends
    Omit<React.HTMLAttributes<HTMLTableRowElement>, "style">,
    Omit<VariantProps<typeof dataTableRowVariants>, "style"> {
  textSize?: ResponsiveValue<DataTableSize>;
  style?: ResponsiveValue<TableDisplayStyle>;
  isSelected?: boolean;
  isFocused?: boolean;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
  cellClassName?: string;
}

/** Styled `<th>` subcomponent. */
export interface DataTableHeadProps
  extends
    Omit<React.ThHTMLAttributes<HTMLTableCellElement>, "style">,
    Omit<VariantProps<typeof dataTableHeadVariants>, "textSize" | "style"> {
  textSize?: ResponsiveValue<DataTableSize>;
  style?: ResponsiveValue<TableDisplayStyle>;
  /** Renders sort indicator and cursor when true. */
  sortable?: boolean;
  className?: string;
}
