import type { Component, ComputedRef, Ref, VNode } from 'vue';

export type Target = '_blank' | '_self' | '_parent' | '_top';

export type IconSource = Component | string | (string | Component)[]

export type VueNode = string | number | boolean | Component | Element | Function | VNode | null | undefined;

export type NonEmptyArray<T> = [T, ...T[]];

export interface BaseButton {
  /** A unique identifier for the button */
  id?: string;
  /** A destination to link to, rendered in the href attribute of a link */
  url?: string;
  /** Forces url to open in a new tab */
  external?: boolean;
  /** Where to display the url */
  target?: Target;
  /** Tells the browser to download the url instead of opening it. Provides a hint for the downloaded filename if it is a string value */
  download?: string | boolean;
  /** Allows the button to submit a form */
  submit?: boolean;
  /** Disables the button, disallowing merchant interaction */
  disabled?: boolean;
  /** Replaces button text with a spinner while a background action is being performed */
  loading?: boolean;
  /** Sets the button in a pressed state */
  pressed?: boolean;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** A valid WAI-ARIA role to define the semantic value of this element */
  role?: string;
  /** Id of the element the button controls */
  ariaControls?: string;
  /** Tells screen reader the controlled element is expanded */
  ariaExpanded?: boolean;
  /** Indicates the ID of the element that describes the button */
  ariaDescribedBy?: string;
  /** Indicates the current checked state of the button when acting as a toggle or switch */
  ariaChecked?: 'false' | 'true';
}

export interface Action {
  /** A unique identifier for the action */
  id?: string;
  /** Content the action displays */
  content?: string;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** A destination to link to, rendered in the action */
  url?: string;
  /** Forces url to open in a new tab */
  external?: boolean;
  /** Where to display the url */
  target?: Target;
  /** Callback when an action takes place */
  onAction?(): void;
  /** Callback when mouse enter */
  onMouseEnter?(): void;
  /** Callback when element is touched */
  onTouchStart?(): void;
}

export type Error = string | Element | (string | Element)[];

export enum Key {
  Backspace = 8,
  Tab = 9,
  Enter = 13,
  Shift = 16,
  Ctrl = 17,
  Alt = 18,
  Pause = 19,
  CapsLock = 20,
  Escape = 27,
  Space = 32,
  PageUp = 33,
  PageDown = 34,
  End = 35,
  Home = 36,
  LeftArrow = 37,
  UpArrow = 38,
  RightArrow = 39,
  DownArrow = 40,
  Insert = 45,
  Delete = 46,
  Key0 = 48,
  Key1 = 49,
  Key2 = 50,
  Key3 = 51,
  Key4 = 52,
  Key5 = 53,
  Key6 = 54,
  Key7 = 55,
  Key8 = 56,
  Key9 = 57,
  KeyA = 65,
  KeyB = 66,
  KeyC = 67,
  KeyD = 68,
  KeyE = 69,
  KeyF = 70,
  KeyG = 71,
  KeyH = 72,
  KeyI = 73,
  KeyJ = 74,
  KeyK = 75,
  KeyL = 76,
  KeyM = 77,
  KeyN = 78,
  KeyO = 79,
  KeyP = 80,
  KeyQ = 81,
  KeyR = 82,
  KeyS = 83,
  KeyT = 84,
  KeyU = 85,
  KeyV = 86,
  KeyW = 87,
  KeyX = 88,
  KeyY = 89,
  KeyZ = 90,
  LeftMeta = 91,
  RightMeta = 92,
  Select = 93,
  Numpad0 = 96,
  Numpad1 = 97,
  Numpad2 = 98,
  Numpad3 = 99,
  Numpad4 = 100,
  Numpad5 = 101,
  Numpad6 = 102,
  Numpad7 = 103,
  Numpad8 = 104,
  Numpad9 = 105,
  Multiply = 106,
  Add = 107,
  Subtract = 109,
  Decimal = 110,
  Divide = 111,
  F1 = 112,
  F2 = 113,
  F3 = 114,
  F4 = 115,
  F5 = 116,
  F6 = 117,
  F7 = 118,
  F8 = 119,
  F9 = 120,
  F10 = 121,
  F11 = 122,
  F12 = 123,
  NumLock = 144,
  ScrollLock = 145,
  Semicolon = 186,
  Equals = 187,
  Comma = 188,
  Dash = 189,
  Period = 190,
  ForwardSlash = 191,
  GraveAccent = 192,
  OpenBracket = 219,
  BackSlash = 220,
  CloseBracket = 221,
  SingleQuote = 222,
}

export interface DisableableAction extends Action {
  /** Whether or not the action is disabled */
  disabled?: boolean;
}

export interface BadgeAction {
  badge?: {
    tone: 'new';
    content: string;
  };
}

export interface DestructableAction extends Action {
  /** Destructive action */
  destructive?: boolean;
}

export interface IconableAction extends Action {
  /** Source of the icon */
  icon?: IconSource;
}

export interface TooltipAction {
  /** Text content to render in a tooltip */
  helpText?: VueNode;
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
    PlainAction {}

export interface MenuActionDescriptor extends ComplexAction, TooltipAction {
  /** Zero-indexed numerical position. Overrides the action's order in the menu */
  index?: number;
}

export interface MenuGroupDescriptor extends BadgeAction {
  /** Menu group title */
  title: string;
  /** List of actions */
  actions: ActionListItemDescriptor[];
  /** Icon to display */
  icon?: IconableAction['icon'];
  /** Action details */
  details?: VueNode;
  /** Disables action button */
  disabled?: boolean;
  /** Zero-indexed numerical position. Overrides the group's order in the menu. */
  index?: number;
  /** Callback when any action takes place */
  onActionAnyItem?: ActionListItemDescriptor['onAction'];
  /** Callback when the menu is clicked */
  onClick?(openActions: () => void): void;
}

export interface LinkAction {
  /** A unique identifier for the action */
  id?: string;
  /** Content the action displays */
  content?: string;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** A destination to link to */
  url: string;
}

export interface BaseCallbackAction {
  /** A unique identifier for the action */
  id?: string;
  /** Content the action displays */
  content?: string;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** Callback when an action takes place */
  onAction(): void;
}

export interface CallbackAction extends BaseCallbackAction {}

export interface ActionListItemDescriptor
  extends DisableableAction,
    DestructableAction {
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** @deprecated Badge component */
  badge?: {
    tone: 'new';
    content: string;
  };
  /** Prefix source */
  prefix?: VueNode;
  /** Suffix source */
  suffix?: VueNode;
  /** Additional hint text to display with item */
  helpText?: string;
  /** @deprecated Source of the icon */
  icon?: IconSource;
  /** @deprecated Image source */
  image?: string;
  /** @deprecated Add an ellipsis suffix to action content. ellipsis appends `...` without truncating. Use truncate instead. */
  ellipsis?: boolean;
  /** Truncate the action content either at the beginning or at the end */
  truncate?: boolean;
  /** Whether the action is active or not */
  active?: boolean;
  /** The item variations */
  variant?: 'default' | 'menu' | 'indented';
  /** Defines a role for the action */
  role?: string;
}

export interface ActionListSection {
  /** Section title */
  title?: string;
  /** Collection of action items for the list */
  items: ActionListItemDescriptor[];
}

export interface MenuActionDescriptor extends ComplexAction {
  /** Zero-indexed numerical position. Overrides the action's order in the menu */
  index?: number;
}

export interface MenuGroupDescriptor extends BadgeAction {
  /** Menu group title */
  title: string;
  /** List of actions */
  actions: ActionListItemDescriptor[];
  /** Icon to display */
  icon?: IconableAction['icon'];
  /** Disables action button */
  disabled?: boolean;
  /** Zero-indexed numerical position. Overrides the group's order in the menu. */
  index?: number;
}

export interface CheckboxHandles {
  focus(): void;
}

export interface ResourceListContextType {
  selectMode?: Ref<boolean>;
  selectable?: ComputedRef<boolean>;
  selectedItems?: ComputedRef<ResourceListSelectedItems>;
  resourceName?: {
    singular: string;
    plural: string;
  };
  hasBulkActions?: boolean;
  loading?: ComputedRef<boolean>;
  onSelectionChange?(
    selected: boolean,
    id: string,
    sortNumber: number | undefined,
    shiftKey: boolean,
  ): void;
}

export type ResourceListSelectedItems = string[] | 'All';
export type CheckableButtonKey = 'plain' | 'bulkSm' | 'bulkLg';
export type CheckableButtons = Map<CheckableButtonKey, CheckboxHandles>;
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
  /** Media to display to the left of the option content */
  media?: VueNode;
}

export interface SectionDescriptor {
  /** Collection of options within the section */
  options: OptionDescriptor[];
  /** Section title */
  title?: string;
}

export type Descriptor = SectionDescriptor | OptionDescriptor;
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

export interface ComboboxListboxType {
  // Value of the Texfields ID for listbox aria-labelledby
  textFieldLabelId?: Ref<string | undefined>;
  // Enables/disables keyboard control
  textFieldFocused?: Ref<boolean>;
  // Unique ID to set on the listbox. Used to set the Combobox aria-owns and TextField aria-controls attributes.
  listboxId?: Ref<string | undefined>;
  // Whether or not more options are available to lazy load. Use the hasMoreResults boolean provided by the GraphQL API of the paginated data. */
  willLoadMoreOptions?: ComputedRef<boolean>;
  // Sets the value for the TextField aria-activedescendant attribute.
  setActiveOptionId?(id: string): void;
  // Callback to set a generated listbox ID.
  setListboxId?(id: string): void;
  // Callback fired when an option is selected.
  onOptionSelected?(): void;
  // Callback fired when keyboard user navigates to the last item. Use to lazy load when listbox option data is paginated.
  onKeyToBottom?(): void;
}

export interface AppliedFilterInterface {
  /** A unique key used to identify the applied filter */
  name: string;
  /** A label for the applied filter */
  label: string;
  unsavedChanges?: boolean;
  /** Callback when the remove button is pressed */
  onRemove(key: string): void;
}


export interface FilterInterface {
  /** A unique key used to identify the filter */
  name: string;
  /** The label for the filter */
  label: string;
  /** The markup for the given filter */
  filter: VueNode;
  /** Whether or not the filter should have a shortcut popover displayed */
  shortcut?: boolean;
  /** Whether or not the filter should be pinned, permanently displaying the filter */
  pinned?: boolean;
  /** Whether or not the filter is disabled */
  disabled?: boolean;
  /**
   * @default false
   * Whether or not the clear button is displayed
   */
  hideClearButton?: boolean;
  /** Optional callback when filter is pressed */
  onAction?: () => void;
  /** Suffix source */
  suffix?: VueNode;
  /** Optional section heading that this filter will go under  */
  section?: string;
  /** Optional: hides the filter from the dropdown  */
  hidden?: boolean;
}
