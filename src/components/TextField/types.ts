import { VNode } from 'vue';
import type { LabelledProps } from '../Labelled/types';
import type { Error, VueNode } from '@/utilities/types';

type Type =
  | 'text'
  | 'email'
  | 'number'
  | 'integer'
  | 'password'
  | 'search'
  | 'tel'
  | 'url'
  | 'date'
  | 'datetime-local'
  | 'month'
  | 'time'
  | 'week'
  | 'currency';

type Alignment = 'left' | 'center' | 'right';

type InputMode =
  | 'none'
  | 'text'
  | 'decimal'
  | 'numeric'
  | 'tel'
  | 'search'
  | 'email'
  | 'url';

interface SelectSuggestion {
  suggestion?: string;
}

interface SelectTextOnFocus {
  selectTextOnFocus?: boolean;
}

interface Readonly {
  readonly?: boolean;
}

interface Disabled {
  disabled?: boolean;
}

interface NonMutuallyExclusiveProps {
  /** Text to display before value */
  prefix?: string;
  /** Text to display after value */
  suffix?: string;
  /** Content to vertically display above the input value */
  verticalContent?: string;
  /** Hint text to display */
  placeholder?: string;
  /** Initial value for the input */
  value?: string;
  /** Additional hint text to display */
  helpText?: string;
  /** Label for the input */
  label?: string;
  /** Adds an action to the label */
  labelAction?: LabelledProps['action'];
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Disable the input */
  disabled?: boolean;
  /** Show a clear text button in the input */
  clearButton?: boolean;
  /** Indicates whether or not the entire value should be selected on focus. */
  selectTextOnFocus?: boolean;
  /** An inline autocomplete suggestion containing the input value. The characters that complete the input value are selected for ease of deletion on input change or keypress of Backspace/Delete. The selected substring is visually highlighted with subdued styling. */
  suggestion?: string;
  /** Disable editing of the input */
  readOnly?: boolean;
  /** Automatically focus the input */
  autoFocus?: boolean;
  /** Force the focus state on the input */
  focused?: boolean;
  /** Allow for multiple lines of input */
  multiline?: boolean | number;
  /** Error to display beneath the label */
  error?: Error | boolean;
  /** Determine type of input */
  type?: Type;
  /** Name of the input */
  name?: string;
  /** ID for the input */
  id?: string;
  /** Defines a specific role attribute for the input */
  role?: string;
  /** Limit increment value for numeric and date-time inputs */
  step?: number;
  /** Increment value for numeric and date-time inputs when using Page Up or Page Down */
  largeStep?: number;
  /** Enable automatic completion by the browser. Set to "off" when you do not want the browser to fill in info */
  autoComplete: string;
  /** Mimics the behavior of the native HTML attribute, limiting the maximum value */
  max?: number | string;
  /** Maximum character length for an input */
  maxLength?: number;
  /** Maximum height of the input element. Only applies when `multiline` is `true` */
  maxHeight?: number | string;
  /** Mimics the behavior of the native HTML attribute, limiting the minimum value */
  min?: number | string;
  /** Minimum character length for an input */
  minLength?: number;
  /** A regular expression to check the value against */
  pattern?: string;
  /** Choose the keyboard that should be used on mobile devices */
  inputMode?: InputMode;
  /** Indicate whether value should have spelling checked */
  spellCheck?: boolean;
  /** Indicates the id of a component owned by the input */
  ariaOwns?: string;
  /** Indicates whether or not a Popover is displayed */
  ariaExpanded?: boolean;
  /** Indicates the id of a component controlled by the input */
  ariaControls?: string;
  /** Indicates the id of a related component’s visually focused element to the input */
  ariaActiveDescendant?: string;
  /** Indicates what kind of user input completion suggestions are provided */
  ariaAutocomplete?: string;
  /** Indicates whether or not the character count should be displayed */
  showCharacterCount?: boolean;
  /** Determines the alignment of the text in the input */
  align?: Alignment;
  /** Visual required indicator, adds an asterisk to label */
  requiredIndicator?: boolean;
  /** Indicates whether or not a monospaced font should be used */
  monospaced?: boolean;
  /** Visual styling options for the TextField
   * @default 'inherit'
   */
  variant?: 'inherit' | 'borderless';
  /** Indicates the tone of the text field */
  tone?: 'magic';
}

export type TextFieldSlots = {
  /** Additional hint text to display */
  helpText?: (_?: VueNode) => VNode[];
  /** Label for the input */
  label?: (_?: VueNode) => VNode[];
  /** An element connected to the right of the input */
  connectedRight?: (_?: VueNode) => VNode[];
  /** An element connected to the left of the input */
  connectedLeft?: (_?: VueNode) => VNode[];
  /** Content to vertically display above the input value */
  verticalContent?: (_?: VueNode) => VNode[];
  /** Text to display before value */
  prefix?: (_?: VueNode) => VNode[];
  /** Text to display after value */
  suffix?: (_?: VueNode) => VNode[];
};

export type TextFieldEvents = {
  /** Callback fired when clear button is clicked */
  'clear-button-click': [id: string];
  /** Callback fired when v-model is changed */
  'input': [e: InputEvent, value: string];
  /** Callback fired when input element value is changed */
  'change': [value: string, id: string];
  /** When provided, callback fired instead of onChange when value is changed via the number step control  */
  'spinner-change': [value: string, id: string];
  /** Callback fired when input is focused */
  'focus': [event: FocusEvent];
  /** Callback fired when input is blurred */
  'blur': [event: FocusEvent];
};

export type MutuallyExclusiveSelectionProps =
  | SelectSuggestion
  | SelectTextOnFocus;

export type MutuallyExclusiveInteractionProps =
  | Readonly
  | Disabled;

export type TextFieldProps = NonMutuallyExclusiveProps &
  MutuallyExclusiveInteractionProps &
  MutuallyExclusiveSelectionProps;
