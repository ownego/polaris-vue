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
  )
    slot
    template(v-if="hasSlot(slots.sort)", #sort)
      slot(name="sort")
    template(v-if="hasSlot(slots.emptyState)", #emptyState)
      slot(name="emptyState")
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type {
  SelectionType,
} from '@/utilities/index-provider';
import { IndexProvider } from '@/components';
import { hasSlot } from '@/utilities/has-slot';
import IndexTableBase from './IndexTableBase.vue';
import type { IndexTableHeading } from './utils';
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
}

interface IndexTableBaseProps {
  headings: IndexTableHeading[];
  promotedBulkActions?: BulkActionsProps['promotedActions'];
  bulkActions?: BulkActionsProps['actions'];
  paginatedSelectAllActionText?: string;
  lastColumnSticky?: boolean;
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
}>();

const slots = useSlots();

const onSelectionChange = (
  selectionType: SelectionType,
  toggleType: boolean,
  selection?: string | Range,
) => {
  emits('selection-change', selectionType, toggleType, selection);
}

const indexTableBaseProps = computed<IndexTableBaseProps>(() => {
  return {
    headings: props.headings,
    promotedBulkActions: props.promotedBulkActions,
    bulkActions: props.bulkActions,
    paginatedSelectAllActionText: props.paginatedSelectAllActionText,
    lastColumnSticky: props.lastColumnSticky,
  };
});
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/IndexTable/IndexTable.scss';
</style>
