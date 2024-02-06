import { inject, type Ref } from 'vue';

export interface ComboboxTextFieldType {
  // Value for the TextField aria-activedescendant. (also on list context when not in combobox)
  activeOptionId?: Ref<string | undefined>;
  // Value for the Combobox aria-owns and TextField aria-control
  listboxId?: Ref<string | undefined>;
  // Value for aria-expanded on TextField
  expanded?: Ref<boolean>;
  // Sets the value for the Listbox aria-labelledby
  setTextFieldLabelId?(id: string): void;
  // Sets a boolean to enable/disable keyboard control for the Listbox
  setTextFieldFocused?(value: boolean): void;
  // Callback fired when TextField is focused
  onTextFieldFocus?(): void;
  // Callback fired when TextField is blurred
  onTextFieldBlur?(): void;
  // Callback fired when TextField value changes
  onTextFieldChange?(value: string): void;
}

export function useComboboxTextField() {
  const context = inject<ComboboxTextFieldType | undefined>('combobox-textfield', undefined);

  if (!context) {
    throw new Error(
      'No Combobox was provided. Your component must be wrapped in a <Combobox> component.',
    );
  }

  return context;
}
