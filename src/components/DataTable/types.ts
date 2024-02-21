import { type VNode, type CSSProperties } from 'vue';
import type { VueNode } from '@/utilities/types';
import type { PaginationProps } from '@/components/Pagination/types';

export type SortDirection = 'ascending' | 'descending' | 'none';
export type VerticalAlign = 'top' | 'bottom' | 'middle' | 'baseline';

export interface ColumnVisibilityData {
  leftEdge: number;
  rightEdge: number;
  isVisible?: boolean;
  width: number;
  index: number;
}

export type CellProps = {
  contentType?: string;
  nthColumn?: boolean;
  firstColumn?: boolean;
  truncate?: boolean;
  header?: boolean;
  total?: boolean;
  totalInFooter?: boolean;
  sorted?: boolean;
  sortable?: boolean;
  sortDirection?: SortDirection;
  defaultSortDirection?: SortDirection;
  verticalAlign?: VerticalAlign;
  colSpan?: number;
  style?: CSSProperties;
  setRef?: (ref: any) => void;
  stickyHeadingCell?: boolean;
  stickyCellWidth?: number;
  hovered?: boolean;
  inFixedNthColumn?: boolean;
  hasFixedNthColumn?: boolean;
  fixedCellVisible?: boolean;
  firstColumnMinWidth?: string;
  lastFixedFirstColumn?: boolean;
}

export type CellEvents = {
  'sort': [];
  'focus': [e: FocusEvent];
}

export type CellSlots = {
  default: (_?: VueNode) => VNode[];
}

export type TableRow =
  | DataTableProps['headings']
  | DataTableProps['rows']
  | DataTableProps['totals'];

export type TableData = string | number | VueNode;

export type ColumnContentType = 'text' | 'numeric';

export type DataTablePaginationProps = Omit<PaginationProps, 'type'>;

export type DataTableProps = {
  /** List of data types, which determines content alignment for each column. Data types are "text," which aligns left, or "numeric," which aligns right. */
  columnContentTypes: ColumnContentType[];
  /** List of column headings. */
  headings: VueNode[];
  /** List of numeric column totals, highlighted in the table’s header below column headings. Use empty strings as placeholders for columns with no total. */
  totals?: TableData[];
  /** Custom totals row heading */
  totalsName?: {
    singular: VueNode;
    plural: VueNode;
  };
  /** Placement of totals row within table */
  showTotalsInFooter?: boolean;
  /** Lists of data points which map to table body rows. */
  rows: TableData[][];
  /** Hide column visibility and navigation buttons above the header when the table horizontally collapses to be scrollable.
   * @default false
   */
  hideScrollIndicator?: boolean;
  /** Truncate content in first column instead of wrapping.
   * @default true
   */
  truncate?: boolean;
  /** Vertical alignment of content in the cells.
   * @default 'top'
   */
  verticalAlign?: VerticalAlign;
  /** Content centered in the full width cell of the table footer row. */
  footerContent?: TableData;
  /** Table row has hover state. Defaults to true. */
  hoverable?: boolean;
  /** List of booleans, which maps to whether sorting is enabled or not for each column. Defaults to false for all columns.  */
  sortable?: boolean[];
  /**
   * The direction to sort the table rows on first click or keypress of a sortable column heading. Defaults to ascending.
   * @default 'ascending'
   */
  defaultSortDirection?: SortDirection;
  /**
   * The index of the heading that the table rows are initially sorted by. Defaults to the first column.
   * @default 0
   */
  initialSortColumnIndex?: number;
  /** Increased density */
  increasedTableDensity?: boolean;
  /** Add zebra striping to data rows */
  hasZebraStripingOnData?: boolean;
  /** Header becomes sticky and pins to top of table when scrolling  */
  stickyHeader?: boolean;
  /** @deprecated Add a fixed first column on horizontal scroll. Use fixedFirstColumns={n} instead. */
  hasFixedFirstColumn?: boolean;
  /** Add fixed columns on horizontal scroll. */
  fixedFirstColumns?: number;
  /** Specify a min width for the first column if neccessary */
  firstColumnMinWidth?: string;
  /** Properties to enable pagination at the bottom of the table. */
  pagination?: DataTablePaginationProps;
}

export type DataTableEvents = {
  /** Callback fired on click or keypress of a sortable column heading. */
  'sort': [headingIndex: number, direction: SortDirection];
}
