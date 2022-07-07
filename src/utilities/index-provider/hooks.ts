import { ref, inject } from 'vue';

import type { SelectionType } from './types';

import type {
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

    if (selectionType === 'multi' && typeof sortOrder === 'number') {
      lastSelected.value = sortOrder;
    }

    if (
      selectionType === 'single' ||
      (selectionType === 'multi' &&
        (typeof prevSelected !== 'number' || typeof sortOrder !== 'number'))
    ) {
      onSelectionChange('single', toggleType, selection);
    } else if (selectionType === 'multi') {
      const min = Math.min(prevSelected as number, sortOrder as number);
      const max = Math.max(prevSelected as number, sortOrder as number);
      onSelectionChange(selectionType, toggleType, [min, max]);
    } else if (
      selectionType === 'page' ||
      selectionType === 'all'
    ) {
      onSelectionChange(selectionType, toggleType);
    }
  };

  return handleSelectionChange;
}
