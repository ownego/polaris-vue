import type { ComputedRef, Ref } from 'vue';
import type { CheckboxHandles } from '../interface';

import type { ResourceListSelectedItems, CheckableButtonKey } from './types';

export interface ResourceListContextType {
  registerCheckableButtons?(
    key: CheckableButtonKey,
    button: CheckboxHandles,
  ): void;
  selectMode?: Ref<boolean>;
  selectable?: boolean;
  selectedItems?: ComputedRef<ResourceListSelectedItems>;
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
