import type { SortDirection, VerticalAlign } from '../../types';

export interface CellProps {
  contentType?: string;
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
  stickyHeadingCell?: boolean;
  stickyCellWidth?: number;
  hovered?: boolean;
  inFixedFirstColumn?: boolean;
  hasFixedFirstColumn?: boolean;
  fixedCellVisible?: boolean;
  firstColumnMinWidth?: string;
}
