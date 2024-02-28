<template lang="pug">
Labelled(
  :id="id",
  :error="error",
  :action="labelAction",
  :label-hidden="labelHidden"
)
  template(v-if="hasLabel", #label)
    slot(v-if="slots.label", name="label")
    template(v-else) {{ label }}
  template(v-if="hasHelpText", #helpText)
    slot(v-if="slots.helpText", name="helpText")
    template(v-else) {{ helpText }}

  div(:class="className", :style="cssVars")
    div(v-if="hasPrefix", :class="styles.Prefix")
      slot(v-if="slots.prefix", name="prefix")
      template(v-else) {{ prefix }}

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
        @input="handleUpdate",
        @change="handleChange",
        @focus="handleFocus",
        @blur="handleBlur",
      )

      output(
        :class="styles.Output",
        :for="id",
      )
        div(:class="styles.OutputBubble")
          Text(
            as="span",
            variant="headingSm",
            alignment="center",
          ) {{ clampedValue }}

    div(v-if="hasSuffix", :class="styles.Suffix")
      slot(v-if="slots.suffix", name="suffix")
      template(v-else) {{ suffix }}
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from '@/utilities/css';
import { clamp } from '@polaris/utilities/clamp';
import { Labelled, Text } from '@/components';
import { helpTextID } from '@/components/Labelled/utils';
import { invertNumber } from '@polaris/components/RangeSlider/utilities';
import { useHasSlot } from '@/use/useHasSlot';
import type { RangeSliderProps, RangeSliderSlots, RangeSliderEvents } from '../../types';

import sharedStyles from '@polaris/components/RangeSlider/RangeSlider.module.scss';
import styles from '@polaris/components/RangeSlider/components/SingleThumb/SingleThumb.module.scss';

export type SingleThumbProps = RangeSliderProps & {
  id: string;
  min: number;
  max: number;
  step: number;
}

const props = defineProps<SingleThumbProps>();
const slots = defineSlots<RangeSliderSlots>();
const emits = defineEmits<RangeSliderEvents>();

const model = defineModel<number>({
  required: true,
});

const { hasSlot } = useHasSlot();

const clampedValue = computed(() => clamp(model.value, props.min, props.max));

const ariaDescribedBy = computed(() => {
  const describedBy = [];

  if (props.error) {
    describedBy.push(`${props.id}Error`);
  }

  if (props.helpText) {
    describedBy.push(helpTextID(props.id));
  }

  return describedBy.length ? describedBy.join(' ') : undefined;
});

const sliderProgress = computed(() => (((clampedValue.value - props.min) * 100) / (props.max - props.min)));
const outputFactor = computed(() => invertNumber((sliderProgress.value - 50) / 100));

const cssVars = computed(() => ({
  '--pc-range-slider-min': props.min,
  '--pc-range-slider-max': props.max,
  '--pc-range-slider-current': clampedValue.value,
  '--pc-range-slider-progress': `${sliderProgress.value}%`,
  '--pc-range-slider-output-factor': `${outputFactor.value}`,
}));

const hasLabel = computed(() => hasSlot(slots.label) || props.label);
const hasHelpText = computed(() => hasSlot(slots.helpText) || props.helpText);
const hasPrefix = computed(() => hasSlot(slots.prefix) || props.prefix);
const hasSuffix = computed(() => hasSlot(slots.suffix) || props.suffix);

const className = computed(() => classNames(
  styles.SingleThumb,
  sharedStyles.RangeSlider,
  props.error && styles.error,
  props.disabled && styles.disabled,
));

const handleUpdate = (event: Event) => {
  const target = event.target as HTMLInputElement;
  model.value = parseFloat(target.value);
};

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  model.value = parseFloat(target.value);
  emits('change', model.value, props.id);
};

const handleFocus = () => {
  emits('focus');
};

const handleBlur = () => {
  emits('blur');
};
</script>
