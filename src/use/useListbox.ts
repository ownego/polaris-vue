import { type Ref, inject, ref } from 'vue';

export interface NavigableOption {
  domId: string;
  value: string;
  element: HTMLElement;
  disabled: boolean;
  isAction?: boolean;
  index?: number;
}

export interface ListboxContextType {
  onOptionSelect(option: NavigableOption): void;
  setLoading(label?: string): void;
}

export function useListbox() {
  const context = inject('listbox') as Ref<ListboxContextType>;

  return context;
}

export function useWithinListbox() {
  const context = inject('within-listbox', ref(false)) as Ref<boolean>;

  return context;
}

export function useAction() {
  const context = inject('action', ref(false)) as Ref<boolean>;

  return context;
}
