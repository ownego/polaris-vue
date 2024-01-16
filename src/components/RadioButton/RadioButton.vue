<template lang="pug">
Choice(
  :label-hidden="labelHidden",
  :disabled="disabled",
  :id="`${id}`",
  :label-class-name="styles.ChoiceLabel",
  :fill="fill",
  :tone="model === normalizedValue ? tone : undefined",
  v-bind="extraChoiceProps",
)
  template(#label)
    slot(v-if="hasSlot(slots.label)", name="label")
    template(v-else) {{ label }}
  template(#helpText)
    slot(v-if="hasSlot(slots.helpText)", name="helpText")
    template(v-else) {{ helpText }}

  span(:class="styles.RadioButton")
    input(
      ref="inputNode",
      :id="`${id}`",
      :name="`${name}`",
      :value="value",
      type="radio",
      :checked="model === normalizedValue",
      :disabled="disabled",
      :class="inputClassName",
      :aria-describedby="ariaDescribedBy",
      @change="handleChange",
      @focus="handleFocus",
      @blur="handleBlur",
    )
    span(:class="styles.Backdrop")
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { classNames, variationName } from '@/utilities/css';
import { Choice } from '@/components/Choice';
import { helpTextID } from '@/components/Choice/utils';
import { useHasSlot } from '@/use/useHasSlot';
import useId from '@/use/useId';
import type {
  RadioButtonProps,
  RadioButtonSlots,
  RadioButtonEvents,
} from './types';
import styles from '@polaris/components/RadioButton/RadioButton.module.scss';

const props = defineProps<RadioButtonProps>();
const slots = defineSlots<RadioButtonSlots>();
const emits = defineEmits<RadioButtonEvents>();

const { hasSlot } = useHasSlot();

const uniqId = useId();

const model = defineModel<string>();

const inputNode = ref<HTMLInputElement | null>(null);

const id = computed(() => props.id ?? uniqId);
const name = computed(() => props.name || id.value);
const normalizedValue = computed(() => String(props.value ?? id.value));
const ariaDescribedBy = computed(() => {
  const output: string[] = [];

  if (hasSlot(slots.helpText) || props.helpText) {
    output.push(helpTextID(`${id.value}`));
  }

  if (props.ariaDescribedBy) {
    output.push(props.ariaDescribedBy);
  }

  return output.length ? output.join(' ') : undefined;
});

const inputClassName = computed(() => classNames(
  styles.Input,
  props.tone && styles[variationName('tone', props.tone)],
));

const extraChoiceProps = computed(() => ({
  bleed: props.bleed,
  bleedBlockStart: props.bleedBlockStart,
  bleedBlockEnd: props.bleedBlockEnd,
  bleedInlineStart: props.bleedInlineStart,
  bleedInlineEnd: props.bleedInlineEnd,
}));

const handleBlur = () => {
  emits('blur');
};

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  model.value = normalizedValue.value;
  emits('change', target.checked, normalizedValue.value);
};

const handleFocus = () => {
  emits('focus');
};
</script>
