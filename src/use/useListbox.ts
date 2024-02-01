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

export interface ComboboxListboxOptionType {
  // Whether the option should visually support multiple selection
  allowMultiple?: boolean;
}


export function useListbox() {
  const context = inject('listbox') as ListboxContextType;

  return context;
}

export function useWithinListbox() {
  const context = inject('within-listbox', ref(false)) as Ref<boolean>;

  return context;
}

export function useAction() {
  const context = inject('action', false);

  return context;
}

export function useComboboxListboxOption() {
  const context = inject('combobox-listbox-option', { allowMultiple: false }) as ComboboxListboxOptionType;

  return context;
}

export function useSection() {
  const context = inject('section-context', '') as string;

  return context;
}
