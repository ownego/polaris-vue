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

    //- actionMarkup
    div(
      v-if="action"
      :class="styles.Action",
    )
      ButtonFrom(
        :action="action",
        :overrides="{ variant: 'plain' }",
      )
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
import { computed, useCssModule } from 'vue';
import { classNames } from '@/utilities/css';
import { hasSlot } from '@/utilities/has-slot';
import type { VueNode } from '@/utilities/types';
import { Label, InlineError, Text, ButtonFrom } from '@/components';
import type { LabelledProps } from './types';
import { helpTextID } from './utils';

const styles = useCssModule();

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
}: any = props;

const className = computed(() => {
  return classNames(
    props.labelHidden && styles.hidden,
    props.disabled && styles.disabled,
    props.readOnly && styles.readOnly,
  )
});
</script>

<style module lang="scss">
@import '@polaris/components/Labelled/Labelled.scss';
</style>
