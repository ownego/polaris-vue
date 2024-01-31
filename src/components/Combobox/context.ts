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

export interface ComboboxListboxType {
  // Value of the Texfields ID for listbox aria-labelledby
  textFieldLabelId?: Ref<string | undefined>;
  // Enables/disables keyboard control
  textFieldFocused?: Ref<boolean>;
  // Unique ID to set on the listbox. Used to set the Combobox aria-owns and TextField aria-controls attributes.
  listboxId?: Ref<string | undefined>;
  // Whethor or not more options are available to lazy load. Use the hasMoreResults boolean provided by the GraphQL API of the paginated data. */
  willLoadMoreOptions?: boolean;
  // Sets the value for the TextField aria-activedescendant attribute.
  setActiveOptionId?(id: string): void;
  // Callback to set a generated listbox ID.
  setListboxId?(id: string): void;
  // Callback fired when an option is selected.
  onOptionSelected?(): void;
  // Callback fired when keyboard user navigates to the last item. Use to lazy load when listbox option data is paginated.
  onKeyToBottom?(): void;
}

export interface ComboboxListboxOptionType {
  // Whether the option should visually support multiple selection
  allowMultiple?: boolean;
}

export function useComboboxTextField() {
  const context = inject<ComboboxTextFieldType | undefined>('ComboboxTextFieldContext', undefined);

  if (!context) {
    throw new Error(
      'No Combobox was provided. Your component must be wrapped in a <Combobox> component.',
    );
  }

  return context;
}

export function useComboboxListbox() {
  const context = inject<ComboboxListboxType>('ComboboxListboxContext', {});
  return context;
}

export function useComboboxListboxOptionContext() {
  const context = inject<ComboboxListboxOptionType>('ComboboxListboxOptionContext', {});
  return context;
}
