<template lang="pug">
IndexProvider(
  :selectable="selectable && !condensed",
  :itemCount="itemCount",
  :selectedItemsCount="selectedItemsCount",
  :resourceName="resourceName",
  :loading="loading",
  :hasMoreItems="hasMoreItems",
  :condensed="condensed",
  :paginated-select-all-text="paginatedSelectAllText",
  @selection-change="onSelectionChange",
)
  IndexTableBase(
    v-bind="indexTableBaseProps",
    @sort="onSort",
  )
    slot
    template(v-if="hasSlot(slots.emptyState)", #emptyState)
      slot(name="emptyState")
    template(v-if="hasSlot(slots.sort)", #sort)
      slot(name="sort")
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IndexProvider } from '@/components';
import { SelectionType, type Range } from '@/components/IndexProvider/types';
import type {
  IndexTableSlots,
  IndexTableEvents,
  IndexTableProps,
  IndexTableBaseProps,
  IndexTableSortDirection,
} from './types';

import { default as IndexTableBase } from './IndexTableBase.vue';
import { useHasSlot } from '@/use/useHasSlot';

const props = withDefaults(defineProps<IndexTableProps>(), {
  selectable: true,
  selectedItemsCount: 0,
});
const slots = defineSlots<IndexTableSlots>();
const emits = defineEmits<IndexTableEvents>();

const { hasSlot } = useHasSlot();

const indexTableBaseProps = computed<IndexTableBaseProps>(() => {
  const {
    selectable,
    itemCount,
    selectedItemsCount,
    resourceName,
    loading,
    hasMoreItems,
    condensed,
    onSelectionChange,
    paginatedSelectAllText,
    ...rest
  } = props;

  return rest;
});

const onSelectionChange = (
  selectionType: SelectionType,
  toggleType: boolean,
  selection?: string | Range,
) => {
  emits('selection-change', selectionType, toggleType, selection);
};

const onSort = (index: number, direction: IndexTableSortDirection) => {
  emits('sort', index, direction);
};
</script>
