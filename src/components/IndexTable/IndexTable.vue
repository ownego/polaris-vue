<template lang="pug">
IndexProvider(
  :selectable="selectable",
  :itemCount="itemCount",
  :selectedItemsCount="selectedItemsCount",
  :resourceName="resourceName",
  :loading="loading",
  :hasMoreItems="hasMoreItems",
  :condensed="condensed",
  :onSelectionChange="onSelectionChange",
)
  IndexTableBase(
    v-bind="indexTableBaseProps",
    @sort="onSort",
  )
    slot
    template(v-if="hasSlot(slots.sort)", #sort)
      slot(name="sort")
    template(v-if="hasSlot(slots.emptyState)", #emptyState)
      slot(name="emptyState")
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { SelectionType } from '@/utilities/index-provider';
import { IndexProvider } from '@/components';
import { hasSlot } from '@/utilities/has-slot';
import IndexTableBase from './IndexTableBase.vue';
import type { IndexTableHeading, IndexTableSortDirection, IndexTableSortToggleLabels } from './utils';
import type { BulkActionsProps } from '@/components/BulkActions/utils';

type Range = [number, number];

interface IndexTableProps {
  /** Renders a Select All button at the top of the list and checkboxes in front of each list item. For use when bulkActions aren't provided. */
  selectable?: boolean;
  /** Total number of items in the table */
  itemCount: number;
  /** Number of items selected */
  selectedItemsCount?: 'All' | number;
  /** Name of the resource, such as customers or products. */
  resourceName?: {
    singular: string;
    plural: string;
  };
  /** Small loading bar will display on the top of table */
  loading?: boolean;
  /** Whether or not there are more items than currently set on the items prop. Determines whether or not to set the paginatedSelectAllAction and paginatedSelectAllText props on the BulkActions component. */
  hasMoreItems?: boolean;
  /** To display the table as narrow width */
  condensed?: boolean;
  /** List heading of the table */
  headings: IndexTableHeading[];
  /** Up to 2 bulk actions that will be given more prominence */
  promotedBulkActions?: BulkActionsProps['promotedActions'];
  /** Actions available on the currently selected items */
  bulkActions?: BulkActionsProps['actions'];
  /** Text to select all across pages */
  paginatedSelectAllActionText?: string;
  /** Sticky the last column on horizontal scrolling */
  lastColumnSticky?: boolean;
  /** List of booleans, which maps to whether sorting is enabled or not for each column. Defaults to false for all columns.  */
  sortable?: boolean[];
  /**
   * The direction to sort the table rows on first click or keypress of a sortable column heading. Defaults to ascending.
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
}

interface IndexTableBaseProps {
  headings: IndexTableHeading[];
  promotedBulkActions?: BulkActionsProps['promotedActions'];
  bulkActions?: BulkActionsProps['actions'];
  paginatedSelectAllActionText?: string;
  lastColumnSticky?: boolean;
  sortable?: boolean[];
  defaultSortDirection?: IndexTableSortDirection;
  sortDirection?: IndexTableSortDirection;
  sortColumnIndex?: number;
}

const props = withDefaults(defineProps<IndexTableProps>(), {
  selectable: true,
  selectedItemsCount: 0,
  lastColumnSticky: false,
});

const emits = defineEmits<{
  /** Callback when selection is changed */
  (
    e: 'selection-change',
    selectionType: SelectionType,
    toggleType: boolean,
    selection?: string | Range,
  ): void;
  /** Callback fired on click or keypress of a sortable column heading. */
  (e: 'sort', index: number, direction: IndexTableSortDirection): void;
}>();

const slots = useSlots();

const onSelectionChange = (
  selectionType: SelectionType,
  toggleType: boolean,
  selection?: string | Range,
) => {
  emits('selection-change', selectionType, toggleType, selection);
}

const onSort = (index: number, direction: IndexTableSortDirection) => {
  emits('sort', index, direction);
};

const indexTableBaseProps = computed<IndexTableBaseProps>(() => {
  return {
    headings: props.headings,
    promotedBulkActions: props.promotedBulkActions,
    bulkActions: props.bulkActions,
    paginatedSelectAllActionText: props.paginatedSelectAllActionText,
    lastColumnSticky: props.lastColumnSticky,
    sortable: props.sortable,
    defaultSortDirection: props.defaultSortDirection,
    sortDirection: props.sortDirection,
    sortColumnIndex: props.sortColumnIndex,
    sortToggleLabels: props.sortToggleLabels,
  };
});
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/IndexTable/IndexTable.scss';
</style>
