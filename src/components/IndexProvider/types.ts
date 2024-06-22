import { type Ref } from "vue";

export type IndexSelectedItems = string[] | 'All';

export const SELECT_ALL_ITEMS = 'All';

export enum SelectionType {
  All = 'all',
  Page = 'page',
  Multi = 'multi',
  Single = 'single',
  Range = 'range',
}

export type Range = [number, number];

export type IndexProviderProps = {
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
    position?: number,
  ): void;
  paginatedSelectAllText?: string;
}

export type HandleSelectionChange = (
  selectionType: SelectionType,
  toggleType: boolean,
  selection?: string | Range,
  sortOrder?: number,
) => void;

export interface BulkSelectionDataOptions {
  selectedItemsCount: Ref<number | typeof SELECT_ALL_ITEMS>;
  itemCount: Ref<number>;
  hasMoreItems?: Ref<boolean>;
  resourceName?: {
    singular: string;
    plural: string;
  };
  defaultPaginatedSelectAllText?: string;
}

export interface HandleBulkSelectionOptions {
  onSelectionChange?: IndexProviderProps['onSelectionChange'];
}
