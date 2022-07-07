import type { Ref, ComputedRef } from 'vue';

export interface IndexContextType {
  loading?: Ref<boolean | undefined>;
  bulkSelectState?: Ref<boolean | 'indeterminate'>;
  resourceName: {
    singular: string;
    plural: string;
  };
  selectedItemsCount: Ref<'All' | number>;
  bulkActionsAccessibilityLabel?: ComputedRef<string>;
  bulkActionsLabel: ComputedRef<string>;
  selectMode: ComputedRef<boolean>;
  paginatedSelectAllText?: ComputedRef<string | undefined>;
  itemCount: number;
  selectable?: Ref<boolean>;
  hasMoreItems?: boolean;
  condensed?: Ref<boolean | undefined>;
}

export interface IndexRowContextType {
  selectable: boolean;
  selectMode: boolean;
  condensed?: boolean;
}
