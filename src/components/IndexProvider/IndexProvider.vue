<template lang="pug">
slot
</template>

<script setup lang="ts">
import { provide, computed, toRef } from 'vue';
import {
  useHandleBulkSelection,
} from '@/utilities/index-provider';
import { UseI18n } from '@/use';
import type { IndexContextType } from '@/utilities/index-provider';

import type {
  Range,
  SelectionType,
  IndexRowContextType,
} from '@/utilities/index-provider';

import { SELECT_ALL_ITEMS } from '@/utilities/index-provider';

interface Props {
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
  onSelectionChange?(
    selectionType: SelectionType,
    toggleType: boolean,
    selection?: string | Range,
  ): void;
}

const props = withDefaults(defineProps<Props>(), {
  selectable: true,
  selectedItemsCount: 0,
});

const i18n = UseI18n();

// BulkSelectionData
const paginatedSelectAllText = computed(() => {
  if (!props.selectable || !props.hasMoreItems) {
    return;
  }

  if (props.selectedItemsCount === SELECT_ALL_ITEMS) {
    return i18n.translate('Polaris.IndexProvider.allItemsSelected', {
      itemsLength: props.itemCount,
      resourceNamePlural: resourceName.value.plural.toLocaleLowerCase(),
    });
  }

  return undefined;
});

const resourceName = computed(() => {
  const defaultResourceName = {
    singular: i18n.translate('Polaris.IndexProvider.defaultItemSingular'),
    plural: i18n.translate('Polaris.IndexProvider.defaultItemPlural'),
  };
  return props.resourceName
    ? props.resourceName
    : defaultResourceName;
});

const bulkActionsLabel = computed(() => {
  const selectedItemsCountLabel =
    props.selectedItemsCount === SELECT_ALL_ITEMS
      ? `${props.itemCount}+`
      : props.selectedItemsCount;

  return i18n.translate('Polaris.IndexProvider.selected', {
    selectedItemsCount: selectedItemsCountLabel,
  });
});

const bulkActionsAccessibilityLabel = computed(() => {
  const totalItemsCount = props.itemCount;
  const allSelected = props.selectedItemsCount === totalItemsCount;

  if (totalItemsCount === 1 && allSelected) {
    return i18n.translate(
      'Polaris.IndexProvider.a11yCheckboxDeselectAllSingle',
      {
        resourceNameSingular: resourceName.value.singular,
      },
    );
  } else if (totalItemsCount === 1) {
    return i18n.translate(
      'Polaris.IndexProvider.a11yCheckboxSelectAllSingle',
      {
        resourceNameSingular: resourceName.value.singular,
      },
    );
  } else if (allSelected) {
    return i18n.translate(
      'Polaris.IndexProvider.a11yCheckboxDeselectAllMultiple',
      {
        itemsLength: props.itemCount,
        resourceNamePlural: resourceName.value.plural,
      },
    );
  } else {
    return i18n.translate(
      'Polaris.IndexProvider.a11yCheckboxSelectAllMultiple',
      {
        itemsLength: props.itemCount,
        resourceNamePlural: resourceName.value.plural,
      },
    );
  }
});

const selectMode = computed(() => (
  props.selectedItemsCount === 'All' || props.selectedItemsCount > 0
));

const selectModeRef = computed(() => selectMode.value && props.selectable);

const bulkSelectState = computed(() => {
  if (!props.selectedItemsCount || props.selectedItemsCount === 0) {
    return false;
  }

  if (
    props.selectedItemsCount === SELECT_ALL_ITEMS ||
    props.selectedItemsCount === props.itemCount
  ) {
    return true;
  }

  return 'indeterminate';
});

const handleSelectionChange = useHandleBulkSelection({
  onSelectionChange: props.onSelectionChange,
});

provide<IndexContextType>('IndexContext', {
  loading: toRef(props, 'loading'),
  bulkSelectState,
  resourceName: props.resourceName || {
    singular: '',
    plural: '',
  },
  selectedItemsCount: toRef(props, 'selectedItemsCount'),
  bulkActionsAccessibilityLabel,
  selectMode: selectModeRef,
  paginatedSelectAllText,
  itemCount: props.itemCount,
  selectable: toRef(props, 'selectable'),
  hasMoreItems: props.hasMoreItems,
  condensed: toRef(props, 'condensed'),
  bulkActionsLabel,
});

provide<IndexRowContextType>('IndexRowContext', {
  selectable: props.selectable,
  selectMode: selectMode.value && props.selectable,
  condensed: props.condensed,
});

provide('IndexSelectionChangeContext', handleSelectionChange);
</script>
