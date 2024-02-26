import { type Ref, inject, ref } from 'vue';
import type { ComboboxListboxType } from '@/utilities/types';

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
  const context = inject<Ref<boolean>>('within-listbox', ref(false));

  return context;
}

export function useAction() {
  const context = inject<boolean>('action', false);

  return context;
}

export function useComboboxListbox() {
  const context = inject<ComboboxListboxType>('combobox-listbox', {});

  return context;
}

export function useComboboxListboxOption() {
  const context = inject<ComboboxListboxOptionType>('combobox-listbox-option', { allowMultiple: false });

  return context;
}

export function useSection() {
  const context = inject('section-context', '') as string;

  return context;
}
