import { type ComputedRef, inject, type Ref } from 'vue';
import { SelectionType, SELECT_ALL_ITEMS, type Range } from './types';

export interface IndexContextType {
  loading?: Ref<boolean | undefined>;
  bulkSelectState?: ComputedRef<boolean | 'indeterminate' | undefined>;
  resourceName: {
    singular: string;
    plural: string;
  };
  selectedItemsCount: Ref<typeof SELECT_ALL_ITEMS | number>;
  bulkActionsAccessibilityLabel?: ComputedRef<string>;
  selectMode: ComputedRef<boolean>;
  paginatedSelectAllText?: ComputedRef<string | undefined>;
  itemCount: Ref<number>;
  selectable?: Ref<boolean>;
  hasMoreItems?: Ref<boolean | undefined>;
  condensed?: Ref<boolean | undefined>;
}

export const useIndexContext = () => {
  const context = inject<IndexContextType>('indexContext');

  if (!context) {
    throw new Error(`useIndexContext: Missing IndexProvider context`);
  }

  return context;
};

export const useIndexSelectionChangeContext = () => {
  const context = inject<((
    selectionType: SelectionType,
    toggleType: boolean,
    selection?: string | Range,
    position?: number,
  ) => void)>('indexSelectionChangeContext');

  if (!context) {
    throw new Error(`Missing IndexProvider context`);
  }

  return context;
};

export interface IndexRowContextType {
  selectable: Ref<boolean>;
  selectMode: ComputedRef<boolean>;
  condensed?: Ref<boolean | undefined>;
}

export const useIndexRowContext = () => {
  const context = inject<IndexRowContextType>('indexRowContext');

  if (!context) {
    throw new Error(`Missing IndexProvider context`);
  }

  return context;
};
