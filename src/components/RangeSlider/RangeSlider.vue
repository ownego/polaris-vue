<template lang="pug">
component(
  :is="elm",
  :id="`${id}`",
  :min="min",
  :max="max",
  :step="step",
  v-bind="sharedProps",
  v-model="model",
  @change="handleChange",
)
  template(v-if="hasLabel", #label)
    slot(v-if="slots.label", name="label")
    template(v-else) {{ props.label }}

  template(v-if="hasHelpText", #helpText)
    slot(v-if="slots.helpText", name="helpText")
    template(v-else) {{ props.helpText }}

  template(v-if="hasPrefix", #prefix)
    slot(v-if="slots.prefix", name="prefix")
    template(v-else) {{ props.prefix }}

  template(v-if="hasSuffix", #suffix)
    slot(v-if="slots.suffix", name="suffix")
    template(v-else) {{ props.suffix }}
</template>

<script setup lang="ts">
import { computed, h } from 'vue';
// @ts-ignore Note: using on template as string
import { SingleThumb, DualThumb } from './components';
import type {
  DualValue,
  RangeSliderValue,
  RangeSliderProps,
  RangeSliderSlots,
  RangeSliderEvents,
} from './types';
import useId from '@/use/useId';
import { useHasSlot } from '@/use/useHasSlot';

const props = withDefaults(defineProps<RangeSliderProps>(), {
  min: 0,
  max: 100,
  step: 1,
});
const slots = defineSlots<RangeSliderSlots>();
const emits = defineEmits<RangeSliderEvents>();

const model = defineModel<RangeSliderValue>({
  required: true,
});

const id = useId();
const { hasSlot } = useHasSlot();

const hasLabel = computed(() => hasSlot(slots.label) || props.label);
const hasHelpText = computed(() => hasSlot(slots.helpText) || props.helpText);
const hasPrefix = computed(() => hasSlot(slots.prefix) || props.prefix);
const hasSuffix = computed(() => hasSlot(slots.suffix) || props.suffix);

const sharedProps = computed(() => {
  const { id, min, max, step, ...rest } = props;
  return rest;
});

const elm = isDualThumb(model.value)
  ? h(DualThumb)
  : h(SingleThumb);

const handleChange = (value: RangeSliderValue) => {
  emits('change', value, `${id}`);
};

function isDualThumb(value?: RangeSliderValue): value is DualValue {
  return Array.isArray(value);
}
</script>
