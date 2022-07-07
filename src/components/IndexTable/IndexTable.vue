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
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type {
  Range,
  SelectionType,
} from '@/utilities/index-provider';
import { IndexProvider } from '@/components';
import IndexTableBase from './IndexTableBase.vue';
import type { BulkActionsProps } from '../BulkActions/utils';

interface IndexTableHeading {
  title: string;
  flush?: boolean;
  new?: boolean;
  hidden?: boolean;
}

interface IndexTableProps {
  selectable?: boolean;
  itemCount: number;
  selectedItemsCount?: 'All' | number;
  resourceName?: {
    singular: string;
    plural: string;
  };
  loading?: boolean;
  hasMoreItems?: boolean;
  condensed?: boolean;
  headings: IndexTableHeading[];
  promotedBulkActions?: BulkActionsProps['promotedActions'];
  bulkActions?: BulkActionsProps['actions'];
  paginatedSelectAllActionText?: string;
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
  (
    e: 'selection-change',
    selectionType: SelectionType,
    toggleType: boolean,
    selection?: string | Range,
  ): void;
}>();

const onSelectionChange = (
  selectionType: SelectionType,
  toggleType: boolean,
  selection?: string | Range,
) => {
  console.log('table', selectionType, toggleType, selection);
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
