<template lang="pug">
Choice(
  :id="id",
  :label-hidden="labelHidden",
  :disabled="disabled",
  :label-class-name="classNames(styles.ChoiceLabel, labelClassName)",
  :fill="fill",
  :tone="tone",
  v-bind="extraChoiceProps",
)
  template(v-if="hasSlot(slots.label) || label", #label)
    slot(v-if="hasSlot(slots.label)", name="label")
    template(v-else) {{ props.label }}

  template(v-if="hasSlot(slots.helpText) || helpText", #helpText)
    slot(v-if="hasSlot(slots.helpText)", name="helpText")
    template(v-else) {{ props.helpText }}

  span(:class="wrapperClassName")
    input(
      ref="inputNode",
      type="checkbox",
      :id="id",
      :name="name",
      :value="value",
      :checked="isChecked",
      :disabled="disabled",
      :class="inputClassName",
      :aria-invalid="Boolean(error)",
      :aria-controls="ariaControls",
      :aria-describedby="ariaDescribedBy",
      :role="isWithinListbox ? 'presentation' : 'checkbox'",
      v-bind="indeterminateAttributes",
      @blur="handleBlur",
      @click="handleOnClick",
      @focus="handleFocus",
    )
    span(
      :class="styles.Backdrop",
      @click.stop="() => {}",
      @keyup.stop="() => {}",
    )
    span(
      :class="classNames(styles.Icon, !isIndeterminate && styles.animated)",,
    )
      Icon(
        v-if="isIndeterminate",
        :source="MinusIcon",
      )
      svg(
        v-else
        viewBox="0 0 16 16"
        shape-rendering="geometricPrecision"
        text-rendering="geometricPrecision"
      )
        path(
          :class="svgPathClassName"
          d="M1.5,5.5L3.44655,8.22517C3.72862,8.62007,4.30578,8.64717,4.62362,8.28044L10.5,1.5"
          transform="translate(2 2.980376)"
          opacity="0"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          pathLength="1"
        )
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { classNames, variationName, type ResponsiveProp } from '@/utilities/css';
import type { Error, VueNode } from '@/utilities/types';
import { useWithinListbox } from '@/use/useListbox';
import { useHasSlot } from '@/use/useHasSlot';
import useId from '@/use/useId';
import {
  Choice,
  Icon,
} from '@/components';
import { helpTextID } from '../Choice/utils';
import type { ChoiceBleedProps } from '../Choice/types';
import { errorTextID } from '../InlineError/utils';

import MinusIcon from '@icons/MinusIcon.svg';
import styles from '@polaris/components/Checkbox/Checkbox.module.scss';

export interface CheckboxProps extends ChoiceBleedProps {
  /** Indicates the ID of the element that is controlled by the checkbox */
  ariaControls?: string;
  /** Indicates the ID of the element that describes the checkbox */
  ariaDescribedBy?: string;
  /** Label for the checkbox */
  label?: string;
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
  value?: string;
  /** Added to the wrapping label */
  labelClassName?: string;
  /** Grow to fill the space. Equivalent to width: 100%; height: 100% */
  fill?: ResponsiveProp<boolean>;
  /** Additional text to aide in use */
  helpText?: string;
  /** Display an error message */
  error?: Error | boolean;
  /** Indicates the tone of the checkbox */
  tone?: 'magic';
}

type CheckboxSlots = {
  /** Label for the checkbox */
  label: (_: VueNode) => any;
  /** Additional text to aide in use */
  helpText: (_: VueNode) => any;
};

type CheckboxEvents = {
  /** Callback when checkbox is toggled */
  'change': [checked: boolean, id: string];
  /** Callback when checkbox is focused */
  'focus': [];
  /** Callback when focus is removed */
  'blur': [];
};

const props = defineProps<CheckboxProps>();
const slots = defineSlots<CheckboxSlots>();
const emits = defineEmits<CheckboxEvents>();

const model = defineModel<boolean | string>();

const isWithinListbox = useWithinListbox();
const uniqId = useId();
const { hasSlot } = useHasSlot();

defineExpose({
  focus: () => {
    if (inputNode.value) {
      inputNode.value.focus();
    }
  },
});

const inputNode = ref<HTMLInputElement | null>(null);

const id = computed(() => props.id || `${uniqId}`);

const describedBy = computed(() => {
  const output = [];

  if (props.error && typeof props.error !== 'boolean') {
    output.push(errorTextID(id.value));
  }

  if (Boolean(slots.helpText) || props.helpText) {
    output.push(helpTextID(id.value));
  }

  if (props.ariaDescribedBy) {
    output.push(props.ariaDescribedBy);
  }

  return output;
});

const ariaDescribedBy = computed(() => describedBy.value.length
  ? describedBy.value.join(' ')
  : undefined
);
const wrapperClassName = computed(() => classNames(styles.Checkbox, props.error && styles.error));

const isIndeterminate = computed(() => props.checked === 'indeterminate');

const isChecked = computed(() => Boolean(!isIndeterminate.value && model.value));

const indeterminateAttributes = computed(() => isIndeterminate.value
  ? {indeterminate: true, 'aria-checked': 'mixed' as const}
  : {'aria-checked': isChecked.value}
);

const inputClassName = computed(() => classNames(
  styles.Input,
  isIndeterminate.value && styles['Input-indeterminate'],
  props.tone && styles[variationName('tone', props.tone)],
));

const extraChoiceProps = computed(() => ({
  error: props.error,
  bleed: props.bleed,
  bleedBlockStart: props.bleedBlockStart,
  bleedBlockEnd: props.bleedBlockEnd,
  bleedInlineStart: props.bleedInlineStart,
  bleedInlineEnd: props.bleedInlineEnd,
}));

const svgPathClassName = computed(() => classNames(isChecked.value && styles.checked));

const handleBlur = () => {
  emits('blur');
};

const handleFocus = () => {
  emits('focus');
};

const handleOnClick = () => {
  if (!inputNode.value || props.disabled) {
    return;
  }

  model.value = inputNode.value.checked;
  inputNode.value.focus();
  emits('change', inputNode.value.checked, props.value || id.value);
};
</script>
