import type { Action, IconSource } from '@/utilities/type';

export interface anyKey {
  [key: string]: any;
}

export interface DisableableAction extends Action {
  /** Whether or not the action is disabled */
  disabled?: boolean;
}

export interface BadgeAction {
  badge?: {
    status: 'new';
    content: string;
  };
}

export interface IconableAction extends Action {
  /** Source of the icon */
  icon?: IconSource;
}

export interface DestructableAction extends Action {
  /** Destructive action */
  destructive?: boolean;
}

export interface LoadableAction extends Action {
  /** Should a spinner be displayed */
  loading?: boolean;
}

export interface OutlineableAction extends Action {
  /** Should action be displayed as an outlined button */
  outline?: boolean;
}

export interface PlainAction extends Action {
  /** Should action be displayed as a plain link */
  plain?: boolean;
}

export interface ComplexAction
  extends Action,
  DisableableAction,
  DestructableAction,
  IconableAction,
  OutlineableAction,
  LoadableAction,
  PlainAction { }

export interface ComboboxListboxType {
  // Value of the Texfields ID for listbox aria-labelledby
  textFieldLabelId?: string;
  // Enables/disables keyboard control
  textFieldFocused?: boolean;
  // Unique ID to set on the listbox. Used to set the Combobox aria-owns and TextField aria-controls attributes.
  listboxId?: string;
  // Whether or not more options are available to lazy load. Use the hasMoreResults boolean provided by the GraphQL API of the paginated data. */
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

export interface ComboboxTextFieldType {
  // Value for the TextField aria-activedescendant. (also on list context when not in combobox)
  activeOptionId?: string;
  // Value for the Combobox aria-owns and TextField aria-control
  listboxId?: string;
  // Value for aria-expanded on TextField
  expanded?: boolean;
  // Sets the value for the Listbox aria-labelledby
  setTextFieldLabelId?(id: string): void;
  // Sets a boolean to enable/disable keyboard control for the Listbox
  setTextFieldFocused?(value: boolean): void;
  // Callback when TextField is focused
  onTextFieldFocus?(): void;
  // Callback when TextField is blured
  onTextFieldBlur?(): void;
  // Callback when TextField is changed
  onTextFieldChange?(): void;
}

export interface MenuActionDescriptor extends ComplexAction {
  /** Zero-indexed numerical position. Overrides the action's order in the menu */
  index?: number;
}

export interface OptionDescriptor {
  /** Value of the option */
  value: string;
  /** Whether the option is disabled or not */
  disabled?: boolean;
  /** Whether the option is active or not */
  active?: boolean;
  /** Unique identifier for the option */
  id?: string;
  /** Display label for the option */
  label: string,
}

export interface SectionDescriptor {
  /** Collection of options within the section */
  options: OptionDescriptor[];
  /** Section title */
  title?: string;
}

export type Descriptor = SectionDescriptor | OptionDescriptor;

