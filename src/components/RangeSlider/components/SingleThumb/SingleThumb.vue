<template lang="pug">
Labelled(
  :id="id",
  :action="labelAction",
  :labelHidden="labelHidden",
)
  template(#label, v-if="hasSlot(slots.label)")
    slot(name="label")
  template(#help-text, v-if="hasSlot(slots['help-text'])")
    slot(name="help-text")

  div(
    :class="className",
    :style="cssVars",
  )
    div(v-if="hasSlot(slots.prefix)", :class="styles.Prefix")
      slot(name="prefix")
    div(:class="styles.InputWrapper")
      input(
        type="range",
        :class="styles.Input",
        :id="id",
        :name="id",
        :min="min",
        :max="max",
        :step="step",
        :value="clampedValue",
        :disabled="disabled",
        :aria-valuemin="min",
        :aria-valuemax="max",
        :aria-valuenow="clampedValue",
        :aria-invalid="Boolean(error)",
        :aria-describedby="ariaDescribedBy",
        @input="handleChange",
        @focus="$emit('focus')",
        @blur="$emit('blur')",
      )
      output(
        v-if="!disabled && output",
        :for="id",
        :class="styles.Output",
      )
        div(:class="styles.OutputBubble")
          span(:class="styles.OutputText")
            | {{ clampedValue }}
    div(v-if="hasSlot(slots.suffix)", :class="styles.Suffix")
      slot(name="suffix")
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import { clamp } from 'polaris/polaris-react/src/utilities/clamp';
import { invertNumber } from 'polaris/polaris-react/src/components/RangeSlider/utilities';
import { Labelled } from '@/components';
import { helpTextID } from '@/components/Labelled/utils';
import { hasSlot } from '@/utilities/has-slot';

import styles from '@/classes/RangeSlider-SingleThumb.json';
import sharedStyles from '@/classes/RangeSlider.json';

import type { LabelledProps } from '@/components/Labelled/utils';
import type { ErrorType } from '@/utilities/type';

interface SingleThumbProps {
  /** Adds an action to the label */
  labelAction?: LabelledProps['action'];
  /** Visually hide the label */
  labelHidden?: boolean;
  /** ID for range input */
  id: string;
  /** Initial value for range input */
  modelValue: number;
  /** Minimum possible value for range input */
  min: number;
  /** Maximum possible value for range input */
  max: number;
  /** Increment value for range input changes */
  step: number;
  /** Provide a tooltip while sliding, indicating the current value */
  output?: boolean;
  /** Display an error message */
  error?: ErrorType;
  /** Disable input */
  disabled?: boolean;
}

const props = defineProps<SingleThumbProps>();
const slots = useSlots();

const emits = defineEmits<{
  (e: 'input', value: number, id: string): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
}>();

const clampedValue = computed(() => clamp(props.modelValue, props.min, props.max));
const describedBy = ref<string[]>([]);

if (props.error) {
  describedBy.value.push(`${props.id}Error`);
}
if (slots['help-text']) {
  describedBy.value.push(helpTextID(props.id));
}
const ariaDescribedBy = computed(() => describedBy.value.length ? describedBy.value.join(' ') : undefined);

const sliderProgress = computed(() => ((clampedValue.value - props.min) * 100) / (props.max - props.min));
const outputFactor = computed(() => invertNumber((sliderProgress.value - 50) / 100));

const cssVars = computed(() => {
  return {
    '--pc-range-slider-min': props.min,
    '--pc-range-slider-max': props.max,
    '--pc-range-slider-current': clampedValue.value,
    '--pc-range-slider-progress': `${sliderProgress.value}%`,
    '--pc-range-slider-output-factor': `${outputFactor.value}`,
  } as any;
});

const className = computed(() => classNames(
  styles.SingleThumb,
  sharedStyles.RangeSlider,
  props.error && styles.error,
  props.disabled && styles.disabled,
));

const handleChange = (event: Event) => {
  emits('input', parseFloat((event.target as HTMLInputElement).value), props.id);
}
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/RangeSlider/components/SingleThumb/SingleThumb.scss';
</style>
