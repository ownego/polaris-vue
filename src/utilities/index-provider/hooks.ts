import { ref, computed, inject } from 'vue';
import type { ComputedRef } from 'vue';
import { UseI18n } from '@/use';

import { SelectionType, SELECT_ALL_ITEMS } from './types';

import type {
  BulkSelectionDataOptions,
  HandleBulkSelectionOptions,
  HandleSelectionChange,
  Range,
} from './types';

import type { IndexRowContextType, IndexContextType } from './context';

export function useIndexSelectionChange() {
  const onSelectionChange = inject<
    | ((
        selectionType: SelectionType,
        toggleType: boolean,
        selection?: string | Range,
        position?: number,
      ) => void)
      | undefined
      >('IndexSelectionChangeContext', undefined);

  if (!onSelectionChange) {
    throw new Error(`useIndexSelectionChange: Missing IndexProvider context`);
  }
  return onSelectionChange;
}

export function useIndexRow() {
  const indexRow = inject<IndexRowContextType | undefined>('IndexRowContext', undefined);
  if (!indexRow) {
    throw new Error(`useIndexRow: Missing IndexProvider context`);
  }
  return indexRow;
}

export function useIndexValue(): IndexContextType {
  const index = inject<IndexContextType | undefined>('IndexContext', undefined);
  if (!index) {
    throw new Error(`useIndexValue: Missing IndexProvider context`);
  }
  return index;
}

export function useHandleBulkSelection({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onSelectionChange = () => {},
}: HandleBulkSelectionOptions) {
  const lastSelected = ref<number | null>(null);

  const handleSelectionChange: HandleSelectionChange =
  (
    selectionType: SelectionType,
    toggleType: boolean,
    selection?: string | Range,
    sortOrder?: number,
  ) => {
    const prevSelected = lastSelected.value;

    if (SelectionType.Multi && typeof sortOrder === 'number') {
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
    }
  };

  return handleSelectionChange;
}
