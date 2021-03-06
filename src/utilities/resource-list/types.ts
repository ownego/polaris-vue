import type { CheckboxHandles } from '../interface';

export type ResourceListSelectedItems = string[] | 'All';
export type CheckableButtonKey = 'plain' | 'bulkSm' | 'bulkLg';
export type CheckableButtons = Map<CheckableButtonKey, CheckboxHandles>;

export const SELECT_ALL_ITEMS = 'All';
