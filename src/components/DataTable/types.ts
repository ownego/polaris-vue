import { type VNode, type CSSProperties } from 'vue';

export type SortDirection = 'ascending' | 'descending' | 'none';
export type VerticalAlign = 'top' | 'bottom' | 'middle' | 'baseline';

export interface ColumnVisibilityData {
  leftEdge: number;
  rightEdge: number;
  isVisible?: boolean;
  width: number;
  index: number;
}

export interface DataTableState {
  condensed: boolean;
  columnVisibilityData: ColumnVisibilityData[];
  previousColumn?: ColumnVisibilityData;
  currentColumn?: ColumnVisibilityData;
  sortedColumnIndex?: number;
  sortDirection?: SortDirection;
  isScrolledFarthestLeft?: boolean;
  isScrolledFarthestRight?: boolean;
  rowHovered: number | undefined;
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
  style: CSSProperties;
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
  default: () => VNode[];
}
