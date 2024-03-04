import { type VNode } from 'vue';
import { type SpaceScale } from '@shopify/polaris-tokens';
import type { PaginationProps } from '@/components/Pagination/types';
import type { Width } from '@/components/Tooltip/types';
import type { VueNode } from '@/utilities/types';
import type { BulkActionsProps } from '@/components/BulkActions/types';
import { type IndexProviderProps, type SelectionType, type Range } from '@/components/IndexProvider/types';

interface IndexTableHeadingTitleString extends IndexTableHeadingBase {
  title: string;
  id?: string;
}

interface IndexTableHeadingTitleNode extends IndexTableHeadingBase {
  title: VueNode;
  id: string;
}

export type IndexTableHeading =
  | IndexTableHeadingTitleString
  | IndexTableHeadingTitleNode;

export type IndexTableSortDirection = 'ascending' | 'descending';

type IndexTableSortToggleLabel = {
  [key in IndexTableSortDirection]: string;
};

interface IndexTableSortToggleLabels {
  [key: number]: IndexTableSortToggleLabel;
}

export type IndexTablePaginationProps = Omit<PaginationProps, 'type'>;

export type IndexTableHeadingBase = {
  id?: string;
  /**
   * Adjust horizontal alignment of header content.
   * @default 'start'
   */
  alignment?: 'start' | 'center' | 'end';
  flush?: boolean;
  new?: boolean;
  hidden?: boolean;
  tooltipContent?: VueNode;
  tooltipWidth?: Width;
  tooltipPersistsOnClick?: boolean;
  /**
   * The direction to sort the table rows on first click or keypress of this column heading.
   * When not specified, the value from IndexTable.defaultSortDirection will be used.
   */
  defaultSortDirection?: IndexTableSortDirection;
  /** Horizontal end spacing around title. Accepts a spacing token. */
  paddingBlockEnd?: SpaceScale;
}

export type IndexTableBaseProps = {
  headings: IndexTableHeading[];
  promotedBulkActions?: BulkActionsProps['promotedActions'];
  bulkActions?: BulkActionsProps['actions'];
  paginatedSelectAllActionText?: string;
  lastColumnSticky?: boolean;
  selectable?: boolean;
  /** List of booleans, which maps to whether sorting is enabled or not for each column. Defaults to false for all columns.  */
  sortable?: boolean[];
  /**
   * The direction to sort the table rows on first click or keypress of a sortable column heading. Defaults to descending.
   * @default 'descending'
   */
  defaultSortDirection?: IndexTableSortDirection;
  /** The current sorting direction. */
  sortDirection?: IndexTableSortDirection;
  /**
   * The index of the heading that the table rows are sorted by.
   */
  sortColumnIndex?: number;
  /** Optional dictionary of sort toggle labels for each sortable column, with ascending and descending label,
   * with the key as the index of the column */
  sortToggleLabels?: IndexTableSortToggleLabels;
  /** Add zebra striping to table rows */
  hasZebraStriping?: boolean;
  /** Properties to enable pagination at the bottom of the table. */
  pagination?: IndexTablePaginationProps;
}

export type IndexTableBaseEvents = {
  /** Callback fired on click or keypress of a sortable column heading. */
  'sort': [headingIndex: number, direction: IndexTableSortDirection];
}

export type IndexTableSlots = {
  default: (_: VueNode) => VNode[];
  emptyState: (_: VueNode) => VNode[];
  sort: (_?: VueNode) => VNode[];
}

export type IndexTableEvents = {
  /** Callback fired on click or keypress of a sortable column heading. */
  'sort': [headingIndex: number, direction: IndexTableSortDirection];
  /** Callback fired on selection is changed */
  'selection-change': [selectionType: SelectionType, toggleType: boolean, selection?: string | Range, position?: number];
}

export type IndexTableProps = IndexTableBaseProps & IndexProviderProps;

export interface TableHeadingRect {
  offsetWidth: number;
  offsetLeft: number;
}
