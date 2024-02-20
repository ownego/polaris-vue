<template lang="pug">
Labelled(
  :id="`${id}`",
  :error="error",
  :action="labelAction",
  :label-hidden="labelHidden",
  :required-indicator="requiredIndicator",
  :disabled="disabled",
  :read-only="readOnly",
)
  template(v-if="hasLabel", #label)
    slot(v-if="hasSlot(slots.label)", name="label")
    template(v-else) {{ label }}

  template(v-if="hasHelpText", #helpText)
    slot(v-if="hasSlot(slots.helpText)", name="helpText")
    template(v-else) {{ helpText }}

  Connected
    template(v-if="Boolean(slots.connectedLeft)", #left)
      slot(name="connectedLeft")

    template(v-if="Boolean(slots.connectedRight)", #right)
      slot(name="connectedRight")

    div(
      :class="className",
      @click="handleClick",
      ref="textFieldRef",
    )
      div(
        v-if="hasPrefix",
        :class="classNames(styles.Prefix, isIconPrefix && styles.PrefixIcon)",
        :id="`${id}-Prefix`",
        ref="prefixRef",
      )
        slot(v-if="hasSlot(slots.prefix)", name="prefix")
        template(v-else) {{ prefix }}

      div(
        v-if="hasVerticalContent",
        :class="styles.VerticalContent",
        :id="`${id}-VerticalContent`",
        ref="verticalContentRef",
        @click="handleClickChild",
      )
        slot(v-if="hasSlot(slots.verticalContent)", name="verticalContent")
        template(v-else) {{ verticalContent }}
        component(:is="input")

      component(v-else, :is="input")

      div(
        v-if="hasSuffix",
        :class="styles.Suffix",
        :id="`${id}-Suffix`",
        ref="suffixRef",
      )
        slot(v-if="hasSlot(slots.suffix)", name="suffix")
        template(v-else) {{ suffix }}

      div(
        v-if="props.showCharacterCount",
        :class="characterCountClassName",
        :aria-label="characterCountLabel",
        :aria-live="focus ? 'polite' : 'off'",
        aria-atomic="true",
        @click="handleClickChild",
      ) {{ characterCountText }}

      button(
        v-if="clearButton && clearButtonVisible",
        type="button",
        :class="styles.ClearButton",
        :disabled="disabled",
        @click="handleClearButtonPress",
      )
        Text(as="span", visually-hidden)
          | {{ i18n.translate('Polaris.Common.clear') }}
        Icon(:source="XCircleIcon", tone="base")

      Spinner(
        v-if="isNumericType && step !== 0 && !disabled && !readOnly",
        ref="spinnerRef",
        @click="handleClickChild",
        @change="handleNumberChange",
        @mousedown="handleSpinnerButtonPress",
        @mouseup="handleSpinnerButtonRelease",
        @blur="handleOnBlur",
      )

      div(:class="backdropClassName")

      Resizer(
        v-if="multiline && isAfterInitial",
        :contents="normalizedValue || placeholder",
        :current-height="height",
        :minimum-lines="typeof multiline === 'number' ? multiline : 1",
        @height-change="handleExpandingResize",
      )
</template>

<script setup lang="ts">
import { computed, h, onMounted, ref, watch } from 'vue';
import useI18n from '@/use/useI18n';
import useId from '@/use/useId';
import { useHasSlot } from '@/use/useHasSlot';
import { classNames, variationName } from '@/utilities/css';
import { Key } from '@/utilities/types';
import { useEventListener } from '@/utilities/use-event-listener';
import { helpTextID } from '../Labelled/utils';
import { labelId } from '../Label/utils';
import { Labelled } from '../Labelled';
import { Connected } from '../Connected';
import { Icon } from '../Icon';
import { Text } from '../Text';
import XCircleIcon from '@icons/XCircleIcon.svg';
import styles from '@polaris/components/TextField/TextField.module.scss';

import type { TextFieldProps, TextFieldSlots, TextFieldEvents } from './types';
import { Resizer, Spinner } from './components';

const props = withDefaults(defineProps<TextFieldProps>(), {
  type: 'text',
  variant: 'inherit',
  size: 'medium',
});

const slots = defineSlots<TextFieldSlots>();
const emits = defineEmits<TextFieldEvents>();

const i18n = useI18n();
const { hasSlot } = useHasSlot();

const model = defineModel<string>();

const isAfterInitial = ref(false);
const height = ref<number | null>(null);
const focus = ref<boolean>(props.focused);
const buttonPressTimer = ref<number>();

const uniqId = useId();
const id = props.id || uniqId;

const textFieldRef = ref<HTMLDivElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);
const textAreaRef = ref<HTMLTextAreaElement | null>(null);
const prefixRef = ref<HTMLDivElement | null>(null);
const suffixRef = ref<HTMLDivElement | null>(null);
const verticalContentRef = ref<HTMLDivElement | null>(null);
const spinnerRef = ref<InstanceType<typeof Spinner> | null>(null);

const inputElm = computed(() => {
  return props.multiline ? textAreaRef.value : inputRef.value;
});

watch(
  () => [props.focused, props.verticalContent, inputElm.value],
  () => {
    if (!inputElm.value || !props.focused) return;

    if (props.focused) {
      inputElm.value.focus();
    } else {
      inputElm.value.blur();
    }
  },
  { immediate: true },
);

watch(
  () => [focus.value, model.value, props.type, props.suggestion],
  () => {
    const isSupportedInputType =
      props.type === 'text' ||
      props.type === 'tel' ||
      props.type === 'search' ||
      props.type === 'url' ||
      props.type === 'password';

    if (!inputRef.value || !isSupportedInputType || !props.suggestion || !model.value) return;
    inputRef.value.setSelectionRange(model.value.length, props.suggestion.length);
  },
  { flush: 'post' },
);

onMounted(() => {
  isAfterInitial.value = true;
});

const hasLabel = computed(() => hasSlot(slots.label) || props.label);
const hasHelpText = computed(() => hasSlot(slots.helpText) || props.helpText);
const hasSuffix = computed(() => hasSlot(slots.suffix) || props.suffix);
const hasPrefix = computed(() => hasSlot(slots.prefix) || props.prefix);
const hasVerticalContent = computed(() => hasSlot(slots.verticalContent) || props.verticalContent);

const normalizedValue = computed(() => props.suggestion ? props.suggestion : model.value);

const normalizedStep = computed(() => {
  return props.step || 1;
});

const normalizedMax = computed(() => {
  return props.max || Infinity;
});

const normalizedMin = computed(() => {
  return props.min || -Infinity;
});

const className = computed(() => classNames(
  styles.TextField,
  Boolean(normalizedValue.value) && styles.hasValue,
  props.disabled && styles.disabled,
  props.readOnly && styles.readOnly,
  props.error && styles.error,
  props.tone && styles[variationName('tone', props.tone)],
  props.multiline && styles.multiline,
  focus.value && !props.disabled && styles.focus,
  props.variant !== 'inherit' && styles[props.variant],
));

const inputType = computed(() => {
  return props.type === 'currency' ? 'text' : props.type;
});

const isNumericType = computed(() => {
  return props.type === 'number' || props.type === 'integer';
});

const clearButtonVisible = computed(() => normalizedValue.value !== '');

const style = computed(() => {
  return props.multiline && height.value
    ? { height: `${height.value}px`, maxHeight: `${props.maxHeight}px` }
    : undefined;
});

const describedBy = computed<string[]>(() => {
  const output = [];
  if (props.error) {
    output.push(`${id}Error`);
  }

  if (slots.helpText || props.helpText) {
    output.push(helpTextID(`${id}`));
  }

  if (props.showCharacterCount) {
    output.push(`${id}-CharacterCounter`);
  }

  return output;
});

const labelledBy = computed<string[]>(() => {
  const output = [];

  if (props.prefix) {
    output.push(`${id}-Prefix`);
  }

  if (props.suffix) {
    output.push(`${id}-Suffix`);
  }

  if (props.verticalContent) {
    output.push(`${id}-VerticalContent`);
  }

  output.unshift(labelId(`${id}`));

  return output;
});

const inputClassName = computed(() => classNames(
  styles.Input,
  props.align && styles[variationName('Input-align', props.align)],
  props.suffix && styles['Input-suffixed'],
  props.clearButton && styles['Input-hasClearButton'],
  props.monospaced && styles.monospaced,
  props.suggestion && styles.suggestion,
));

const characterCount = computed(() => normalizedValue.value?.length);
const characterCountLabel = computed(() => {
  return props.maxLength
    ? i18n.translate('Polaris.TextField.characterCountWithMaxLength', {
        count: characterCount.value || 0,
        limit: props.maxLength,
      })
    : i18n.translate('Polaris.TextField.characterCount', {
        count: characterCount.value || 0,
      });
});

const characterCountClassName = computed(() => classNames(
  styles.CharacterCount,
  props.multiline && styles.AlignFieldBottom,
));

const characterCountText = computed(() => !props.maxLength
  ? characterCount.value
  : `${characterCount.value}/${props.maxLength}`,
);

const backdropClassName = computed(() => classNames(
  styles.Backdrop,
  slots.connectedLeft && styles['Backdrop-connectedLeft'],
  slots.connectedRight && styles['Backdrop-connectedRight'],
));

const isIconPrefix = computed(() => {
  const prefixElm = slots.prefix && slots.prefix()[0];
  return (prefixElm?.type as any)?.__name;
});

const handleNumberChange = (steps: number, stepAmount = normalizedStep.value) => {
  const dpl = (num: number) => {
    const dec = String(num).split('.')[1];
    return dec ? dec.length : 0;
  };

  const numericValue = model.value ? parseFloat(model.value) : 0;

  if (isNaN(numericValue)) {
    return;
  }

  // Making sure the new value has the same length of decimal places as the
  // step / value has.
  const decimalPlaces =
    props.type === 'integer' ? 0 : Math.max(dpl(numericValue), dpl(stepAmount));

  const newValue = Math.min(
    Number(normalizedMax.value),
    Math.max(numericValue + steps * stepAmount, Number(normalizedMin.value)),
  );

  model.value = String(newValue.toFixed(decimalPlaces));

  emits('spinner-change', model.value, `${id}`);
  emits('change', model.value, `${id}`);
};

const handleSpinnerButtonRelease = () => {
  if (buttonPressTimer.value) {
    clearInterval(buttonPressTimer.value);
  }
};

const handleSpinnerButtonPress = (step: number) => {
  const minInterval = 50;
  const decrementBy = 10;
  let interval = 200;

  const { handleStep } = spinnerRef.value || {};

  const onChangeInterval = () => {
    if (interval > minInterval) {
      interval -= decrementBy;
    }

    handleStep && handleStep(step);

    buttonPressTimer.value = window.setTimeout(onChangeInterval, interval);
  };

  buttonPressTimer.value = window.setTimeout(onChangeInterval, interval);

  document.addEventListener('mouseup', handleSpinnerButtonRelease, { once: true });
};

const handleExpandingResize = (heightValue: number) => {
  height.value = heightValue;
};

const handleOnFocus = (e: FocusEvent | MouseEvent) => {
  focus.value = true;

  if (props.selectTextOnFocus && !props.suggestion) {
    inputElm.value?.select();
  }

  emits('focus', e);
}

useEventListener('wheel', handleOnWheel, inputRef.value);

function handleOnWheel(e: WheelEvent) {
  if (document.activeElement === e.target && isNumericType.value) {
    e.stopPropagation();
  }
}

const input = () => h(props.multiline ? 'textarea' : 'input', {
  name: props.name,
  id: `${id}`,
  disabled: props.disabled,
  readOnly: props.readOnly,
  role: props.role,
  autoFocus: props.autoFocus,
  value: normalizedValue.value || props.value,
  placeholder: props.placeholder,
  style: style.value,
  autoComplete: props.autoComplete,
  class: inputClassName.value,
  ref: props.multiline ? textAreaRef : inputRef,
  min: props.min,
  max: props.max,
  step: props.step,
  minLength: props.minLength,
  maxLength: props.maxLength,
  spellCheck: props.spellCheck,
  pattern: props.pattern,
  inputMode: props.inputMode,
  type: inputType.value,
  rows: getRows(props.multiline),
  'aria-describedby': describedBy.value.join(' '),
  'aria-labelledby': labelledBy.value.join(' '),
  'aria-invalid': Boolean(props.error),
  'aria-owns': props.ariaOwns,
  'aria-activedescendant': props.ariaActiveDescendant,
  'aria-autocomplete': props.ariaAutocomplete,
  'aria-controls': props.ariaControls,
  'aria-expanded': props.ariaExpanded,
  'aria-required': props.requiredIndicator,
  ...normalizeAriaMultiline(props.multiline),
  onFocus: handleOnFocus,
  onBlur: handleOnBlur,
  onClick: handleClickChild,
  onKeyPress: handleKeyPress,
  onKeyDown: handleKeyDown,
  onChange: !props.suggestion ? handleChange : undefined,
  onInput: handleInput,
  'data-1p-ignore': props.autoComplete === 'off' || undefined,
  'data-lpignore': props.autoComplete === 'off' || undefined,
  'data-form-type': props.autoComplete === 'off' ? 'other' : undefined,
});

function handleChange(e: Event) {
  emits('change', (e.target as HTMLInputElement).value, `${id}`);
}

function handleInput(e: Event) {
  model.value = (e.target as HTMLInputElement).value;
  emits('input', e as InputEvent, (e.target as HTMLInputElement).value);

  if (props.suggestion) {
    (e.target as HTMLInputElement).value = props.suggestion;
    handleChange(e);
  }
}

function handleClick(e: MouseEvent) {
  const { target } = e;

  if (!target) return;

  const inputRefRole = inputRef.value?.getAttribute('role');
  if (target === inputRef.value && inputRefRole === 'combobox') {
    inputRef.value?.focus();
    handleOnFocus(e);
    return;
  }

  if (
    isPrefixOrSuffix(target)
    || isVerticalContent(target)
    || isInput(target)
    || isSpinner(target)
    || focus.value
  ) {
    return;
  }

  inputElm.value?.focus();
}

function handleClickChild(event: Event) {
  if (!event.target) return;

  if (!isSpinner(event.target) && !isInput(event.target)) {
    event.stopPropagation();
  }

  if (
    isPrefixOrSuffix(event.target) ||
    isVerticalContent(event.target) ||
    isInput(event.target) ||
    focus.value
  ) {
    return;
  }

  focus.value = true;
  inputElm.value?.focus();
}

function handleClearButtonPress() {
  emits('clear-button-click', `${id}`);
}

function handleKeyPress(event: KeyboardEvent) {
  const {key, which} = event;
  const numbersSpec = /[\d.,eE+-]$/;
  const integerSpec = /[\deE+-]$/;

  if (
    !isNumericType ||
    which === Key.Enter ||
    (props.type === 'number' && numbersSpec.test(key)) ||
    (props.type === 'integer' && integerSpec.test(key))
  ) {
    return;
  }

  event.preventDefault();
}

function handleKeyDown(event: KeyboardEvent) {
  if (!isNumericType) {
    return;
  }

  const {key, which} = event;

  if (props.type === 'integer' && (key === 'ArrowUp' || which === Key.UpArrow)) {
    handleNumberChange(1);
    event.preventDefault();
  }
  if (
    props.type === 'integer' &&
    (key === 'ArrowDown' || which === Key.DownArrow)
  ) {
    handleNumberChange(-1);
    event.preventDefault();
  }

  if ((which === Key.Home || key === 'Home') && props.min) {
    model.value = String(props.min);
    emits('spinner-change', model.value, `${id}`);
    emits('change', model.value, `${id}`);
  }

  if ((which === Key.End || key === 'End') && props.max !== undefined) {
    model.value = String(props.max);
    emits('spinner-change', model.value, `${id}`);
    emits('change', model.value, `${id}`);
  }

  if ((which === Key.PageUp || key === 'PageUp') && props.largeStep !== undefined) {
    handleNumberChange(1, props.largeStep);
  }

  if (
    (which === Key.PageDown || key === 'PageDown') &&
    props.largeStep !== undefined
  ) {
    handleNumberChange(-1, props.largeStep);
  }
}

function handleOnBlur(event: FocusEvent) {
  focus.value = false;

  // Return early if new focus target is inside the TextField component
  if (textFieldRef.value?.contains(event.relatedTarget as Node)) {
    return;
  }

  emits('blur', event);
}

function isInput(target: HTMLElement | EventTarget) {
  const input = inputElm.value;
  return (
    target instanceof HTMLElement &&
    input &&
    (input.contains(target) || input.contains(document.activeElement))
  );
}

function isPrefixOrSuffix(target: Element | EventTarget) {
  return (
    target instanceof Element &&
    ((prefixRef.value && prefixRef.value.contains(target)) ||
      (suffixRef.value && suffixRef.value.contains(target)))
  );
}

function isSpinner(target: Element | EventTarget) {
  const { spinnerWrapperRef } = spinnerRef.value || {};

  return (
    target instanceof Element &&
    spinnerWrapperRef &&
    spinnerWrapperRef.contains(target)
  );
}

function isVerticalContent(target: Element | EventTarget) {
  return (
    target instanceof Element &&
    verticalContentRef.value &&
    (verticalContentRef.value.contains(target) ||
      verticalContentRef.value.contains(document.activeElement))
  );
}

function getRows(multiline?: boolean | number) {
  if (!multiline) return undefined;

  return typeof multiline === 'number' ? multiline : 1;
}

function normalizeAriaMultiline(multiline?: boolean | number) {
  if (!multiline) return undefined;

  return Boolean(multiline) || (typeof multiline === 'number' && multiline > 0)
    ? {'aria-multiline': true}
    : undefined;
}
</script>
