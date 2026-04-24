import type { ColumnDef, Row } from "@tanstack/react-table";
import type {
  dataTableVariants,
  dataTableCellVariants,
  dataTableHeadVariants,
  dataTableRowVariants,
} from "./dataTable.variants";
import type { VariantProps } from "class-variance-authority";

/** Row density preset. */
export type DataTableSize = "sm" | "md" | "lg";

/** `default` = standard borders, `compact` = reduced spacing, `minimal` = no borders. */
export type DataTableVariant = "default" | "compact" | "minimal";

export interface DataTableRowStyle {
  /** Alternating row background colours. */
  striped?: boolean;
  /** Highlight row on hover. */
  hoverable?: boolean;
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

export interface DataTableProps<TData extends Record<string, any> = any> extends VariantProps<
  typeof dataTableVariants
> {
  /** Row data array. Each item maps to one row. Parent is responsible for loading/empty states. */
  data: TData[];
  /** TanStack Table column definitions. */
  columns: ColumnDef<TData, any>[];
  /** Row density. */
  size?: DataTableSize;
  /** Visual style variant. */
  variant?: DataTableVariant;
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
  extends React.TdHTMLAttributes<HTMLTableCellElement>, VariantProps<typeof dataTableCellVariants> {
  size?: DataTableSize;
  variant?: DataTableVariant;
}

/** Styled `<tr>` subcomponent. */
export interface DataTableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement>, VariantProps<typeof dataTableRowVariants> {
  size?: DataTableSize;
  variant?: DataTableVariant;
  striped?: boolean;
  hoverable?: boolean;
  isSelected?: boolean;
  isFocused?: boolean;
}

/** Styled `<th>` subcomponent. */
export interface DataTableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement>, VariantProps<typeof dataTableHeadVariants> {
  size?: DataTableSize;
  variant?: DataTableVariant;
  /** Renders sort indicator and cursor when true. */
  sortable?: boolean;
}
