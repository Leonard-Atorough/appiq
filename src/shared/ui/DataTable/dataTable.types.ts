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
  /** Row data array. Each item maps to one row. */
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
  /** Fired when row selection changes. Requires `rowStyle.selectable`. */
  onRowsSelected?: (rows: Row<TData>[]) => void;
  /** Fired with the focused row index during keyboard navigation. `null` when focus leaves the table. */
  onRowFocus?: (rowIndex: number | null) => void;
  /** Shows a loading state (skeleton or spinner). */
  loading?: boolean;
  /** Content shown when `data` is empty. */
  emptyMessage?: React.ReactNode;
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
