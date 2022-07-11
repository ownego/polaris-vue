export type IndexSelectedItems = string[] | 'All';

export const SELECT_ALL_ITEMS = 'All';

export type SelectionType = 'all' | 'page' | 'multi' | 'single';

export type Range = [number, number];

export type HandleSelectionChange = (
  selectionType: SelectionType,
  toggleType: boolean,
  selection?: string | Range,
  sortOrder?: number,
) => void;

export interface BulkSelectionDataOptions {
  selectedItemsCount: number | typeof SELECT_ALL_ITEMS;
  itemCount: number;
  hasMoreItems?: boolean;
  resourceName?: {
    singular: string;
    plural: string;
  };
}

export interface HandleBulkSelectionOptions {
  onSelectionChange?(
    selectionType: SelectionType,
    toggleType: boolean,
    selection?: string | Range,
  ): void;
}
