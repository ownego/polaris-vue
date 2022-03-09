<template lang="pug">
Labelled(
  :id="uniqueId",
  :error="error",
  :action="labelAction",
  :labelHidden="labelHidden",
  :requiredIndicator="requiredIndicator",
)
  template(#label, v-if="slots.label")
    slot(name="label")
  template(#help-text, v-if="slots['help-text']")
    slot(name="help-text")
  Connected
    template(#left, v-if="slots.left")
      slot(name="connected-left")
    template(#right, v-if="slots.right")
      slot(name="connected-right")
    div(
      :class="className",
      @focus="handleFocus",
      @click="handleClick",
      @blur="handleBlur",
    )
      div(
        v-if="slots.prefix",
        :id="`${uniqueId}Prefix`",
        :class="styles.Prefix",
        ref="prefixRef",
      )
        slot(name="prefix")
      component(
        :is="multiline ? 'textarea' : 'input'",
        :id="uniqueId",
        :name="name",
        :disabled="disabled",
        :readonly="readOnly",
        :role="role",
        :autofocus="autoFocus",
        :value="modelValue",
        :placeholder="placeholder",
        :style="style",
        :autocomplete="normalizedAutocomplete",
        :class="inputClassName",
        ref="inputRef",
        :min="min",
        :max="max",
        :step="step",
        :minlength="minLength",
        :maxlength="maxLength",
        :spellcheck="spellCheck",
        :pattern="pattern",
        :inputMode="inputMode",
        :rows="rows",
        :type="inputType",
        :aria-describedby="formattedDescribedBy",
        :aria-labelledby="formattedLabelledBy",
        :aria-invalid="Boolean(error)",
        :aria-owns="ariaOwns",
        :aria-activedescendant="ariaActiveDescendant",
        :aria-autocomplete="ariaAutocomplete",
        :aria-controls="ariaControls",
        :aria-expanded="ariaExpanded",
        :aria-required="requiredIndicator",
        v-bind="normalizeAriaMultiline",
        @input="handleChange",
        @keydown="handleKeyPress",
        @focus="$emit('focus')",
        @blur="$emit('blur')",
      )
        template(v-if="multiline") {{ modelValue }}
      div(
        v-if="slots.suffix",
        :id="`${uniqueId}Suffix`",
        :class="styles.Suffix",
        ref="suffixRef",
      )
        slot(name="suffix")
      div(
        v-if="showCharacterCount",
        :class="characterCountClassName",
        aria-label=characterCountLabel,
        :aria-live="focus ? 'polite' : 'off'",
        aria-atomic="true",
      )
        p {{ characterCountText }}
      button(
        v-if="clearButtonVisible && clearButton",
        :class="clearButtonClassName",
        :disabled="disabled",
        @click="$emit('clear-button-click', id)",
      )
        VisuallyHidden
          p Clear button
        Icon(:source="CircleCancelMinor", color="base")
      TextFieldSpinner(
        v-if="type === 'number' && step !== 0 && !disabled && !readOnly",
        @change="handleNumberChange",
        @mousedown="handleButtonPress",
        @mouseup="handleButtonRelease",
      )
      div(:class="backdropClassName")
      Resizer(
        v-if="multiline",
        :contents="normalizedValue || placeholder",
        :currentHeight="height",
        :minimumLines="typeof multiline === 'number' ? multiline : 1",
        @height-change="handleExpandingResize",
      )
</template>

<script setup lang="ts">
import { inject, useSlots, ref, computed, watch } from 'vue';
import { classNames, variationName } from 'polaris-react/src/utilities/css';
import { UseUniqueId } from '@/use';
import styles from '@/classes/TextField.json';
import CircleCancelMinor from '@icons/CircleCancelMinor.svg'; 
import type { ComboboxTextFieldType } from '@/utilities/interface';
import type { LabelledProps } from '../Labelled/utils';
import type { Error } from 'types/type';
import { helpTextID, labelID } from '../Labelled/utils';
import { Resizer, Spinner as TextFieldSpinner } from './components';
import { Connected } from '../Connected';
import { Icon } from '../Icon';
import { Labelled } from '../Labelled';
import { VisuallyHidden } from '../VisuallyHidden';

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
  /** Enable automatic completion by the browser. Set to "off" when you do not want the browser to fill in info */
  autoComplete: string | boolean;
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
}

const comboboxTextFieldContext = inject<ComboboxTextFieldType>('comboboxTextFieldContext', {});

const props = defineProps<TextFieldProps>();

const emits = defineEmits<{
  (event: 'focus'): void
  (event: 'click'): void
  (event: 'blur'): void
  (event: 'change', changeEvent: Event): void
  (event: 'update:modelValue', value: string): void
  (event: 'clear-button-click', id?: string): void
}>();

const prefixRef = ref<HTMLDivElement | null>(null);
const suffixRef = ref<HTMLDivElement | null>(null);
const inputRef = ref<HTMLDivElement | null>(null);

const slots = useSlots();
const connectedLeftSlot = computed(() => slots['connected-left']?.());
const connectedRightSlot = computed(() => slots['connected-right']?.());
const helpTextSlot = computed(() => slots['help-text']?.());
const prefixSlot = computed(() => slots.prefix?.());
const suffixSlot = computed(() => slots.suffix?.());

const height = ref<number>();
const focus = ref<boolean>();
const buttonPressTimer = ref<number>();

watch(
  () => props.focused,
  () => {
    if (!inputRef.value || !props.focused === undefined) {
      return;
    }

    props.focused ? inputRef.value.focus() : inputRef.value.blur();
  },
)

const { useUniqueId } = UseUniqueId();
const uniqueId = computed(() => useUniqueId('TextField', props.id));

const inputType = computed(() => props.type === 'currency' ? 'text' : props.type);
const rows = computed(() => {
  if (!props.multiline) {
    return undefined;
  }

  return typeof props.multiline === 'number' ? props.multiline : 1;
});

const clearButtonVisible = computed(() => normalizedValue.value !== '');
const style = computed(() => props.multiline && height.value
  ? { height: `${height.value}px` }
  : {},
);
const className = computed(() => classNames(
  styles.TextField,
  Boolean(normalizedValue.value) && styles.hasValue,
  props.disabled && styles.disabled,
  props.readOnly && styles.readOnly,
  props.error && styles.error,
  props.multiline && styles.multiline,
  focus.value && styles.focus,
));
const inputClassName = computed(() => {
  const inputAlignmentStyle = props.align
    && styles[variationName('Input-align', props.align) as keyof typeof styles];

  return classNames(
    styles.Input,
    inputAlignmentStyle,
    suffixSlot.value && styles['Input-suffixed'],
    props.clearButton && styles['Input-hasClearButton'],
    props.monospaced && styles.monospaced)
});
const characterCountClassName = computed(() => classNames(
  styles.CharacterCount,
  props.multiline && styles.AlignFieldBottom,
));
const backdropClassName = computed(() => classNames(
  styles.Backdrop,
  connectedLeftSlot.value &&  styles['Backdrop-connectedLeft'],
  connectedRightSlot.value && styles['Backdrop-connectedRight'],
));
const clearButtonClassName = computed(() => classNames(
  styles.ClearButton,
  !clearButtonVisible.value && styles.AlignFieldBottom,
));

const normalizedValue = computed(() => typeof props.modelValue === 'string'
  ? props.modelValue
  : '',
);
const normalizedStep = computed(() => props.step ? props.step : 1);
const normalizedMax = computed(() => props.max ? props.max : Infinity);
const normalizedMin = computed(() => props.min ? props.min : -Infinity);
const normalizeAriaMultiline = computed(() => {
  if (!props.multiline) {
    return undefined;
  }

  return Boolean(props.multiline) || props.multiline > 0
    ? {'aria-multiline': true}
    : undefined;
});
const normalizedAutocomplete = computed(() => {
  if (props.autoComplete === true) {
    return 'on';
  } 
  
  if (props.autoComplete === false) {
    return 'off';
  }

  return props.autoComplete;
});

const characterCount = computed(() => normalizedValue.value.length);
const characterCountText = computed(() => props.maxLength
  ? characterCount.value
  : `${characterCount.value}/${props.maxLength}`,
);

const formattedDescribedBy = computed(() => {
  const describedBy: string[] = [];
  if (props.error) {
    describedBy.push(`${uniqueId.value}Error`);
  }
  if (helpTextSlot.value) {
    describedBy.push(helpTextID(uniqueId.value));
  }
  if (props.showCharacterCount) {
    describedBy.push(`${uniqueId.value}CharacterCounter`);
  }
  return describedBy.length
    ? describedBy.join(' ')
    : undefined;
});

const formattedLabelledBy = computed(() => {
  const labelledBy: string[] = [];

  if (prefixSlot.value) {
    labelledBy.push(`${uniqueId.value}Prefix`);
  }

  if (suffixSlot.value) {
    labelledBy.push(`${uniqueId.value}Suffix`);
  }

  labelledBy.unshift(labelID(uniqueId.value));

  return labelledBy.join(' ');
});

const handleExpandingResize = (value: number): void => {
  height.value = value;
};

const containsAffix = (target: HTMLElement | EventTarget) => {
  return (
    target instanceof HTMLElement
      && ((prefixRef.value && prefixRef.value.contains(target))
        || (suffixRef.value && suffixRef.value.contains(target)))
  );
};

const handleClick = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  
  if (containsAffix(target) || focus.value) {
    return;
  }

  inputRef.value?.focus();
};

const handleFocus = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  
  if (containsAffix(target)) {
    return;
  }

  focus.value = true;
};

const handleBlur = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (containsAffix(target)) {
    return;
  }

  focus.value = false;
};

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  
  if (comboboxTextFieldContext.onTextFieldChange) {
    comboboxTextFieldContext.onTextFieldChange();
  }
  
  emits('update:modelValue', target.value);
  emits('change', event);
};

const handleNumberChange = (payload: number): void => {
  // Returns the length of decimal places in a number
  const dpl = (num: number) => (num.toString().split('.')[1] || []).length;
  const numericValue = props.modelValue ? parseFloat(props.modelValue) : 0;

  if (typeof numericValue !== 'number') {
    return;
  }

  /** Making sure the new value has the same length of decimal places as the
   * step / value has.
   */
  const decimalPlaces = Math.max(dpl(numericValue), dpl(normalizedStep.value));
  const newValue = Math.min(
    Number(normalizedMax.value),
    Math.max(numericValue + payload * normalizedStep.value, Number(normalizedMin.value)),
  );

  emits('update:modelValue', String(newValue.toFixed(decimalPlaces)));
};

const handleButtonRelease = (): void => {
  clearTimeout(buttonPressTimer.value);
};

const handleButtonPress = (): void => {
  const minInterval = 50;
  const decrementBy = 10;
  let interval = 200;
  const onChangeInterval = () => {
    if (interval > minInterval) {
      interval -= decrementBy;
    }

    handleNumberChange(0);
    buttonPressTimer.value = window.setTimeout(
      onChangeInterval,
      interval,
    );
  };

  buttonPressTimer.value = window.setTimeout(onChangeInterval, interval);
  document.addEventListener('mouseup', handleButtonRelease, {
    once: true,
  });
};

const handleKeyPress = (event: KeyboardEvent): void => {
  const { key, which } = { ...event };
  const numbersSpec = /[\d.eE+-]$/;

  if (props.type !== 'number' || which !== 13 || numbersSpec.test(key)) {
    return;
  }

  event.preventDefault();
};
</script>

<style lang="scss">
@import 'polaris-react/src/components/TextField/TextField.scss';
</style>
