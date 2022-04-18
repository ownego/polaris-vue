<template lang="pug">
DualThumb(
  v-if="isDualThumb",
  v-model="(modelValue as [number, number])",
  v-bind="sharedProps",
  @input="handleChange",
  @focus="emits('focus')",
  @blur="emits('blur')",
)
  template(#label, v-if="slots.label || label")
    slot(v-if="slots.label", name="label")
    template(v-else) {{ label }}
  template(#help-text, v-if="slots['help-text']")
    slot(name="help-text")
  template(#prefix, v-if="slots.prefix")
    slot(name="prefix")
  template(#suffix, v-if="slots.suffix")
    slot(name="suffix")
SingleThumb(
  v-else,
  v-model="(modelValue as number)",
  v-bind="sharedProps",
  @input="handleChange",
  @focus="emits('focus')",
  @blur="emits('blur')",
)
  template(#label, v-if="slots.label || label")
    slot(v-if="slots.label", name="label")
    template(v-else) {{ label }}
  template(#help-text, v-if="slots['help-text']")
    slot(name="help-text")
  template(#prefix, v-if="slots.prefix")
    slot(name="prefix")
  template(#suffix, v-if="slots.suffix")
    slot(name="suffix")
</template>
<script setup lang="ts">
import { watch, computed, useSlots } from 'vue';
import { UseUniqueId } from '@/use';
import type { LabelledProps } from '@/components/Labelled/utils';
import type { Error } from '@/utilities/type';
import type { RangeSliderValue } from './types';
import { SingleThumb, DualThumb } from './components';

interface RangeSliderProps {
  /** Label for the range input */
  label?: string;
  /** Adds an action to the label */
  labelAction?: LabelledProps['action'];
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Initial value for range input */
  modelValue: RangeSliderValue;
  /** Minimum possible value for range input */
  min?: number;
  /** Maximum possible value for range input */
  max?: number;
  /** Increment value for range input changes */
  step?: number;
  /** Provide a tooltip while sliding, indicating the current value */
  output?: boolean;
  /** Display an error message */
  error?: Error;
  /** Disable input */
  disabled?: boolean;
}

const props = withDefaults(defineProps<RangeSliderProps>(), {
  min: 0,
  max: 100,
  step: 1,
});

const emits = defineEmits<{
  (e: 'change', value: RangeSliderValue, id: string): void;
  (e: 'update:modelValue', value: RangeSliderValue, id: string): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
}>();

const slots = useSlots();

const { useUniqueId } = UseUniqueId();
const id = useUniqueId('RangeSlider');

const isDualThumb = computed(() => Array.isArray(props.modelValue));

const sharedProps = computed(() => {
  const { label, modelValue, ...rest } = props;
  return {
    id,
    ...rest,
  };
});

// watch(
//   () => props.modelValue,
//   (newVal, oldVal) => {
//     if (newVal !== oldVal) {
//       emits('update:modelValue', newVal, id);
//       emits('change', newVal, id);
//     }
//   },
// );

const handleChange = (value: RangeSliderValue, thumbId: string) => {
  emits('change', value, thumbId);
  emits('update:modelValue', value, thumbId);
};
</script>
<style lang="scss">
@import 'polaris/polaris-react/src/components/RangeSlider/RangeSlider.scss';
</style>
