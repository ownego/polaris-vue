<template lang="pug">
Choice(
  :id="uniqueId",
  :error="error",
  :disabled="disabled",
  :labelHidden="labelHidden",
  @mouseover="mouseOver = true",
  @mouseout="mouseOver = false",
)
  template(#label, v-if="slots.label")
    slot(name="label")
  template(#help-text, v-if="slots['help-text']")
    slot(name="help-text")
  span(:class="wrapperClassName")
    input(
      :id="uniqueId",
      :role="isWithinListbox ? 'presentation' : 'checkbox'",
      :name="name",
      :value="value || modelValue",
      type="checkbox",
      :checked="isChecked",
      :disabled="disabled",
      :class="inputClassName",
      :aria-invalid="error !== null",
      :aria-controls="ariaControls",
      :aria-describedby="formattedAriaDescribedBy",
      @focus="handleFocus",
      @change="handleChange",
      @blur="handleBlur",
      @keyup="handleKeyup",
      v-bind="indeterminateAttributes",
    )
    span(
      :class="backdropClassName",
      @click="stopPropagation",
      @mouseup="stopPropagation",
    )
    span(:class="styles.Icon")
      Icon(:source="iconSource")
</template>

<script setup lang="ts">
import { inject, ref, computed, useSlots } from 'vue';
import { classNames } from 'polaris-react/src/utilities/css';
import { UseUniqueId } from '@/use';
import MinusMinor from '@icons/MinusMinor.svg';
import TickSmallMinor from '@icons/TickSmallMinor.svg';
import styles from '@/classes/Checkbox.json';
import type { Error } from '@/utilities/type';
import { Key } from '../KeypressListener/utils';
import { errorTextID } from '../InlineError/utils';
import { Choice } from '../Choice';
import { helpTextID } from '../Choice/utils';
import { Icon } from '../Icon';

interface Props {
  /** Indicates the ID of the element that is controlled by the checkbox */
  ariaControls?: string;
  /** Indicates the ID of the element that describes the checkbox */
  ariaDescribedBy?: string;
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Checkbox is selected. `indeterminate` shows a horizontal line in the checkbox */
  checked?: boolean | 'indeterminate';
  /** Disable input */
  disabled?: boolean;
  /** ID for form input */
  id?: string;
  /** Name for form input */
  name?: string;
  /** Value for form input */
  value?: string | boolean;
  /** Value for v-model binding */
  modelValue?: string | boolean;
  /** Display an error message */
  error?: Error | boolean;
}

const isWithinListbox = inject<boolean>('withinListboxContext', false);

const props = defineProps<Props>();

const emits = defineEmits<{
  (event: 'focus'): void
  (event: 'change', changeEvent: Event): void
  (event: 'update:modelValue', value: string | boolean): void
  (event: 'blur'): void
}>();

const mouseOver = ref(false);
const keyFocused = ref(false);

const slots = useSlots();
const helpTextSlot = computed(() => slots['help-text']?.());

const { useUniqueId } = UseUniqueId();
const uniqueId = computed(() => useUniqueId('Checkbox', props.id));

const isIndeterminate = computed(() => props.checked === 'indeterminate');
const isChecked = computed(() => (!isIndeterminate.value && Boolean(props.checked))
    || (typeof props.modelValue === 'boolean' && props.modelValue === true));

const iconSource = computed(() => isIndeterminate.value ? MinusMinor : TickSmallMinor);

const wrapperClassName = computed(() => classNames(
  styles.Checkbox,
  props.error && styles.error,
));
const backdropClassName = computed(() => classNames(
  styles.Backdrop,
  mouseOver.value && styles.hover,
));
const inputClassName = computed(() => classNames(
  styles.Input,
  isIndeterminate.value && styles['Input-indeterminate'],
  keyFocused.value && styles.keyFocused,
));

const indeterminateAttributes = computed(() => isIndeterminate.value
  ? { indeterminate: 'true', 'aria-checked': 'mixed' as const }
  : { 'aria-checked': isChecked.value });
const formattedAriaDescribedBy = computed(() => {
  const describedBy: string[] = [];

  if (props.ariaDescribedBy) {
    describedBy.push(props.ariaDescribedBy);
  }

  if (props.error && typeof props.error !== 'boolean') {
    describedBy.push(errorTextID(uniqueId.value));
  }

  if (helpTextSlot.value) {
    describedBy.push(helpTextID(uniqueId.value));
  }

  return describedBy.length ? describedBy.join(' ') : undefined;
});

const handleFocus = (): void => {
  keyFocused.value = true;
  emits('focus');
};

const handleChange = (event: Event): void => {
  const target = event.target as HTMLInputElement;

  emits('change', event);
  emits('update:modelValue', target.checked);
};

const handleBlur = (): void => {
  keyFocused.value = false;
  emits('blur');
};

const handleKeyup = (event: KeyboardEvent): void => {
  const { key } = event;

  if (key === Key.Space || key === Key.Tab) {
    if (!keyFocused.value) {
      keyFocused.value = true;
    }
  }
};

function stopPropagation(event: MouseEvent | KeyboardEvent) {
  event.stopPropagation();
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Checkbox/Checkbox.scss';
</style>
