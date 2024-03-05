<template lang="pug">
slot
</template>

<script setup lang="ts">
import { computed, provide, toRef } from 'vue';
import { type IndexProviderProps } from './types';
import { useBulkSelectionData, useHandleBulkSelection } from './utils';
import type { IndexContextType, IndexRowContextType } from './context';

const props = withDefaults(defineProps<IndexProviderProps>(), {
  selectedItemsCount: 0,
  selectable: true,
});

const {
  paginatedSelectAllText,
  bulkActionsLabel,
  bulkActionsAccessibilityLabel,
  resourceName,
  selectMode,
  bulkSelectState,
} = useBulkSelectionData({
  selectedItemsCount: toRef(props, 'selectedItemsCount'),
  itemCount: toRef(props, 'itemCount'),
  hasMoreItems: toRef(props, 'hasMoreItems'),
  resourceName: props.resourceName,
});

const handleSelectionChange = useHandleBulkSelection({
  onSelectionChange: props.onSelectionChange,
});

const selectModeRef = computed(() => selectMode.value && props.selectable);

const contextValue = {
  itemCount: toRef(props, 'itemCount'),
  selectMode: selectModeRef,
  selectable: toRef(props, 'selectable'),
  resourceName,
  loading: toRef(props, 'loading'),
  paginatedSelectAllText,
  hasMoreItems: toRef(props, 'hasMoreItems'),
  bulkActionsLabel,
  bulkActionsAccessibilityLabel,
  bulkSelectState,
  selectedItemsCount: toRef(props, 'selectedItemsCount'),
  condensed: toRef(props, 'condensed'),
};

provide<IndexContextType>('indexContext', contextValue);
provide<IndexRowContextType>('indexRowContext', {
  selectable: toRef(props, 'selectable'),
  selectMode: selectModeRef,
  condensed: toRef(props, 'condensed'),
});
provide('indexSelectionChangeContext', handleSelectionChange);
</script>
