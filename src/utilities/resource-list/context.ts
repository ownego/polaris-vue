import type { CheckboxHandles } from '../interface';

import type {ResourceListSelectedItems, CheckableButtonKey} from './types';

export interface ResourceListContextType {
  registerCheckableButtons?(
    key: CheckableButtonKey,
    button: CheckboxHandles,
  ): void;
  selectMode?: boolean;
  selectable?: boolean;
  selectedItems?: ResourceListSelectedItems;
  resourceName?: {
    singular: string;
    plural: string;
  };
  loading?: boolean;
  onSelectionChange?(
    selected: boolean,
    id: string,
    sortNumber: number | undefined,
    shiftKey: boolean,
  ): void;
}
