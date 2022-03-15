<template lang="pug">
PolarisTextField(
  v-bind="props",
  :id="textFieldId",
  autoComplete="list",
  aria-haspopup="listbox",
  :ariaActiveDescendant="activeOptionId",
  :ariaControls="listboxId",
  :ariaExpanded="expanded",
  :modelValue="modelValue",
  @focus="handleFocus",
  @blur="handleBlur",
  @change="handleChange",
)
  template(#label, v-if="$slots.label")
    slot(name="label")
  template(#help-text, v-if="$slots['help-text']")
    slot(name="help-text")
  template(#prefix, v-if="$slots.prefix")
    slot(name="prefix")
  template(#suffix, v-if="$slots.suffix")
    slot(name="suffix")
  template(#connected-left, v-if="$slots['connected-left']")
    slot(name="connected-left")
  template(#connected-right, v-if="$slots['connected-right']")
    slot(name="connected-right")
</template>

<script setup lang="ts">
import { inject, computed, watch } from 'vue';
import { UseUniqueId } from '@/use';
import type { ComboboxTextFieldType } from '@/utilities/interface';
import type { Error } from '@/utilities/type';
import type { LabelledProps } from '../../../Labelled/utils'
import { labelID } from '../../../Label/utils';
import { TextField as PolarisTextField } from '../../../TextField';

type Type =
  | 'text'
  | 'email'
  | 'number'
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

interface TextFieldProps {
  /** Hint text to display */
  placeholder?: string;
  /** Initial value for the input */
  modelValue?: string;
  /** Adds an action to the label */
  labelAction?: LabelledProps['action'];
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Disable the input */
  disabled?: boolean;
  /** Show a clear text button in the input */
  clearButton?: boolean;
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
  /** Indicates whether or not the entire input/text area text should be selected on focus */
  selectTextOnFocus?: boolean;
}

const comboboxTextFieldContext = inject<ComboboxTextFieldType>('comboboxTextFieldContext', {});
const {
  activeOptionId,
  listboxId,
  expanded,
  setTextFieldFocused,
  setTextFieldLabelId,
  onTextFieldFocus,
  onTextFieldChange,
  onTextFieldBlur,
} = comboboxTextFieldContext;

const props = defineProps<TextFieldProps>();

const emits = defineEmits<{
  (event: 'focus'): void
  (event: 'blur'): void
  (event: 'change', changeEvent: Event): void
  (event: 'update:modelValue', value: string): void
}>();

const { useUniqueId } = UseUniqueId();
const uniqueId = useUniqueId('ComboboxTextField');
const textFieldId = computed(() => props.id || uniqueId);
const labelId = computed(() => labelID(props.id || uniqueId));

watch(
  [
    () => labelId.value,
    () => setTextFieldLabelId,
  ],
  () => {
    if (setTextFieldLabelId) {
      setTextFieldLabelId(labelId.value);
    }
  },
)

const handleFocus = (): void => {
  emits('focus');

  if (onTextFieldFocus) {
    onTextFieldFocus();
  }


  if (setTextFieldFocused) {
    setTextFieldFocused(true);
  }
};
  
const handleBlur = (): void => {
  emits('blur');

  if (onTextFieldBlur) {
    onTextFieldBlur();
  }

  if (setTextFieldFocused) {
    setTextFieldFocused(false);
  }
};

const handleChange = (event: Event): void => {
  const target = event.target as HTMLInputElement;

  emits('update:modelValue', target.value);
  emits('change', event);

  if (onTextFieldChange) {
    onTextFieldChange();
  }
}
</script>
