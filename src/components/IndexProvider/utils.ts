import { computed, ref } from 'vue';
import useI18n from '@/use/useI18n';

import {SELECT_ALL_ITEMS, SelectionType} from './types';
import type {
  HandleSelectionChange,
  Range,
  BulkSelectionDataOptions,
  HandleBulkSelectionOptions,
} from './types';
import {
  useIndexContext,
  useIndexRowContext,
  useIndexSelectionChangeContext,
} from './context';


export function useIndexSelectionChange() {
  const onSelectionChange = useIndexSelectionChangeContext();
  if (!onSelectionChange) {
    throw new Error(`Missing IndexProvider context`);
  }
  return onSelectionChange;
}

export function useIndexRow() {
  const indexRow = useIndexRowContext();
  if (!indexRow) {
    throw new Error(`Missing IndexProvider context`);
  }
  return indexRow;
}

export function useIndexValue() {
  const index = useIndexContext();
  if (!index) {
    throw new Error(`Missing IndexProvider context`);
  }
  return index;
}

export function useBulkSelectionData({
  selectedItemsCount,
  itemCount,
  hasMoreItems,
  resourceName: passedResourceName,
  defaultPaginatedSelectAllText,
}: BulkSelectionDataOptions) {
  const i18n = useI18n();

  const selectable = computed(() => Boolean(selectedItemsCount));
  const selectMode = computed(() => selectedItemsCount.value === 'All' || selectedItemsCount.value > 0);

  const defaultResourceName = {
    singular: i18n.translate('Polaris.IndexProvider.defaultItemSingular'),
    plural: i18n.translate('Polaris.IndexProvider.defaultItemPlural'),
  };

  const resourceName = passedResourceName
    ? passedResourceName
    : defaultResourceName;

  const paginatedSelectAllText = computed(() => {
    if (!selectable || !hasMoreItems) {
      return;
    }

    if (selectedItemsCount.value === SELECT_ALL_ITEMS) {
      if (defaultPaginatedSelectAllText) {
        return defaultPaginatedSelectAllText;
      }
      return i18n.translate('Polaris.IndexProvider.allItemsSelected', {
        itemsLength: itemCount.value,
        resourceNamePlural: resourceName.plural.toLocaleLowerCase(),
      });
    }

    return;
  });

  const bulkActionsLabel = computed(() => {
    const selectedItemsCountLabel =
      selectedItemsCount.value === SELECT_ALL_ITEMS
        ? `${itemCount.value}+`
        : selectedItemsCount.value;

    return i18n.translate('Polaris.IndexProvider.selected', {
      selectedItemsCount: selectedItemsCountLabel,
    });
  });

  const bulkActionsAccessibilityLabel = computed(() => {
    const totalItemsCount = itemCount.value;
    const allSelected = selectedItemsCount.value === totalItemsCount;

    if (totalItemsCount === 1 && allSelected) {
      return i18n.translate(
        'Polaris.IndexProvider.a11yCheckboxDeselectAllSingle',
        {
          resourceNameSingular: resourceName.singular,
        },
      );
    }

    if (totalItemsCount === 1) {
      return i18n.translate(
        'Polaris.IndexProvider.a11yCheckboxSelectAllSingle',
        {
          resourceNameSingular: resourceName.singular,
        },
      );
    }

    if (allSelected) {
      return i18n.translate(
        'Polaris.IndexProvider.a11yCheckboxDeselectAllMultiple',
        {
          itemsLength: itemCount.value,
          resourceNamePlural: resourceName.plural,
        },
      );
    }

    return i18n.translate(
      'Polaris.IndexProvider.a11yCheckboxSelectAllMultiple',
      {
        itemsLength: itemCount.value,
        resourceNamePlural: resourceName.plural,
      },
    );
  });

  const bulkSelectState = computed<boolean | 'indeterminate' | undefined>(() => {
    if (!selectedItemsCount.value || selectedItemsCount.value === 0) {
      return undefined;
    } else if (
      selectedItemsCount.value === SELECT_ALL_ITEMS ||
      selectedItemsCount.value === itemCount.value
    ) {
      return true;
    }

    return 'indeterminate';
  });

  return {
    paginatedSelectAllText,
    bulkActionsLabel,
    bulkActionsAccessibilityLabel,
    resourceName,
    selectMode,
    bulkSelectState,
    selectable,
  };
}

export function useHandleBulkSelection({
  onSelectionChange = () => {},
}: HandleBulkSelectionOptions) {
  const lastSelected = ref<number | null>(null);

  const handleSelectionChange: HandleSelectionChange = (
    selectionType: SelectionType,
    toggleType: boolean,
    selection?: string | Range,
    sortOrder?: number,
  ) => {
    const prevSelected = lastSelected.value;

    if (typeof sortOrder === 'number') {
      lastSelected.value = sortOrder;
    }

    if (
      selectionType === SelectionType.Single ||
      (selectionType === SelectionType.Multi &&
        (typeof prevSelected !== 'number' || typeof sortOrder !== 'number'))
    ) {
      onSelectionChange(SelectionType.Single, toggleType, selection);
    } else if (selectionType === SelectionType.Multi) {
      const min = Math.min(prevSelected as number, sortOrder as number);
      const max = Math.max(prevSelected as number, sortOrder as number);
      onSelectionChange(selectionType, toggleType, [min, max]);
    } else if (
      selectionType === SelectionType.Page ||
      selectionType === SelectionType.All
      ) {
      onSelectionChange(selectionType, toggleType);
    } else if (selectionType === SelectionType.Range) {
      onSelectionChange(SelectionType.Range, toggleType, selection);
    }
  };

  return handleSelectionChange;
}
