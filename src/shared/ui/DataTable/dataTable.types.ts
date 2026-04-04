import type { ColumnDef, Row } from "@tanstack/react-table";
import type {
  dataTableVariants,
  dataTableCellVariants,
  dataTableHeadVariants,
  dataTableRowVariants,
} from "./dataTable.variants";
import type { VariantProps } from "class-variance-authority";

/** Size options for DataTable components */
export type DataTableSize = "sm" | "md" | "lg";

/** Visual variant options for DataTable components */
export type DataTableVariant = "default" | "compact" | "minimal";

/** Row styling configuration */
export interface DataTableRowStyle {
  striped?: boolean;
  hoverable?: boolean;
  selectable?: boolean;
}

/** Keyboard navigation configuration */
export interface DataTableKeyboardConfig {
  enabled?: boolean;
  allowSpaceSelection?: boolean;
  allowEnterAction?: boolean;
}

/** Main DataTable component props */
export interface DataTableProps<TData extends Record<string, any> = any> extends VariantProps<
  typeof dataTableVariants
> {
  data: TData[];
  columns: ColumnDef<TData, any>[];

  size?: DataTableSize;

  variant?: DataTableVariant;

  rowStyle?: DataTableRowStyle;
  sortable?: boolean;
  keyboard?: DataTableKeyboardConfig;
  stickyHeader?: boolean;
  rowClassName?: string;
  cellClassName?: string;
  headerClassName?: string;
  onRowsSelected?: (rows: Row<TData>[]) => void;
  onRowFocus?: (rowIndex: number | null) => void;
  loading?: boolean;
  emptyMessage?: React.ReactNode;
}

/** DataTable cell props (styled subcomponent) */
export interface DataTableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement>, VariantProps<typeof dataTableCellVariants> {
  size?: DataTableSize;
  variant?: DataTableVariant;
}

/** DataTable row props (styled subcomponent) */
export interface DataTableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement>, VariantProps<typeof dataTableRowVariants> {
  size?: DataTableSize;
  variant?: DataTableVariant;
  striped?: boolean;
  hoverable?: boolean;
  isSelected?: boolean;
  isFocused?: boolean;
}

/** DataTable header props (styled subcomponent) */
export interface DataTableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement>, VariantProps<typeof dataTableHeadVariants> {
  size?: DataTableSize;
  variant?: DataTableVariant;
  sortable?: boolean;
}
