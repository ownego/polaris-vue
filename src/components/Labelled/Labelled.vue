<template lang="pug">
div(:class="className")
  //- labelMarkup
  div(
    v-if="hasSlot(slots.label)"
    :class="styles.LabelWrapper",
  )
    Label(
      :id="id",
      :required-indicator="requiredIndicator",
      :hidden="false",
      v-bind="rest",
    )
      slot(name="label")
  //- Children
  slot
  //- errorMarkup
  div(
    v-if="error && (typeof error !== 'boolean')",
    :class="styles.Error",
  )
    InlineError(
      :message="error",
      :field-id="id",
    )
  //- helpTextMarkup
  div(
    v-if="hasSlot(slots.helpText)",
    :class="styles.HelpText",
    :id="helpTextID(id)",
    :aria-disabled="disabled",
  )
    Text(
      break-word,
      as="span",
      tone="subdued",
    )
      slot(name="helpText")
</template>

<script setup lang="ts">
import { computed, useCssModule, useAttrs } from 'vue';
import { classNames } from '@/utilities/css';
import { hasSlot } from '@/utilities/has-slot';
import type { Action, VueNode, Error } from '@/utilities/types';
import { Label, InlineError, Text } from '@/components';
import type { LabelProps } from '@/components/Label/Label.vue';

interface LabelledProps {
  /** A unique identifier for the label */
  id: LabelProps['id'];
  /** Error to display beneath the label */
  error?: Error | boolean;
  /** An action */
  action?: Action;
  /** Additional hint text to display */
  labelHidden?: boolean;
  /** Visual required indicator for the label */
  requiredIndicator?: boolean;
  /** Labels signify a disabled control */
  disabled?: boolean;
  /** Labels signify a readOnly control */
  readOnly?: boolean;
}

const styles = useCssModule();
const attrs = useAttrs();

const props = defineProps<LabelledProps>();
const slots = defineSlots<{
  /** Text for the label */
  label: (_?: VueNode) => any;
  /** Label content */
  default: (_?: VueNode) => any;
  /** Hint text to display */
  helpText: (_?: VueNode) => any;
}>();

const {
  id,
  error,
  action,
  labelHidden,
  requiredIndicator,
  disabled,
  readOnly,
  ...rest
}: any = attrs

const className = computed(() => {
  return classNames(
    props.labelHidden && styles.hidden,
    props.disabled && styles.disabled,
    props.readOnly && styles.readOnly,
  )
});

function helpTextID(id: string) {
  return `${id}HelpText`;
}
</script>

<style module lang="scss">
@import '@polaris/components/Labelled/Labelled.scss';
</style>
