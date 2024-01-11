import { type Ref, inject } from 'vue';

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
  const context = inject('within-listbox') as Ref<boolean>;

  return context;
}

export function useAction() {
  const context = inject('action') as Ref<boolean>;

  return context;
}
