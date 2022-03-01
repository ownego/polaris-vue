<template lang="pug">
Choice(
  :id="uniqueId",
  :disabled="disabled",
  :labelHidden="labelHidden",
  @mouseover="mouseOver = true",
  @mouseout="mouseOver = false",
)
  template(#label)
    slot(name="label")
  template(#help-text)
    slot(name="help-text")
  span(:class="styles.RadioButton")
    input(
      :id="uniqueId",
      :name="name",
      :value="value",
      type="radio",
      :checked="isChecked",
      :disabled="disabled",
      :class="inputClassName",
      :aria-describedby="formattedAriaDescribedBy",
      @focus="$emit('focus')",
      @change="handleChange",
      @blur="handleBlur",
      @keyup="handleKeyup",
    )
    span(:class="backdropClassName")
</template>

<script setup lang="ts">
import { ref, computed, useSlots } from 'vue';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/RadioButton.json';
import { UseUniqueId } from '@/use';
import { Choice, helpTextID } from '../Choice';

interface Props {
  /** Indicates the ID of the element that describes the the radio button */
  ariaDescribedBy?: string;
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Radio button is selected */
  checked?: boolean;
  /** Disable input */
  disabled?: boolean;
  /** ID for form input */
  id?: string;
  /** Name for form input */
  name?: string;
  /** Value for form input */
  value?: string;
  /** Value for v-model binding */
  modelValue?: string;
}

const props = defineProps<Props>();

/* eslint-disable */
const emits = defineEmits<{
  (event: 'focus'): void
  (event: 'change', changeEvent: Event): void
  (event: 'update:modelValue', value: string): void
  (event: 'blur'): void
}>();
/* eslint-disable */

const keyFocused = ref(false);
const mouseOver = ref(false);

const slots = useSlots();
const helpTextSlot = computed(() => slots['help-text']!());

const { useUniqueId } = UseUniqueId();
const uniqueId = useUniqueId('RadioButton', props.id);
const name = props.name || uniqueId;

const isChecked = props.checked || props.modelValue === props.value;

const backdropClassName = computed(() => {
  return classNames(styles.Backdrop, mouseOver.value && styles.hover);
});
const inputClassName = computed(() => {
  return classNames(styles.Input, keyFocused.value && styles.keyFocused);
});

const formattedAriaDescribedBy = computed(() => {
  const describedBy: string[] = [];

  if (props.ariaDescribedBy) {
    describedBy.push(props.ariaDescribedBy);
  }

  if (helpTextSlot.value) {
    describedBy.push(helpTextID(uniqueId));
  }

  return describedBy.length ? describedBy.join(' ') : undefined;
});

const handleChange = (event: Event): void => {
  const target = event.target as HTMLInputElement;

  emits('change', event);
  emits('update:modelValue', target.value);
}

const handleBlur = (): void => {
  emits('blur');
  keyFocused.value = false;
};

const handleKeyup = (): void => {
  if (!keyFocused.value) keyFocused.value = true;
};
</script>

<style lang="scss">
@import 'polaris-react/src/components/RadioButton/RadioButton.scss';
</style>
