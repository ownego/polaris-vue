<template lang="pug">
div(:class="className")
  //- labelMarkup
  div(
    v-if="hasSlot(slots.label)"
    :class="styles.LabelWrapper",
  )
    Label(
      v-bind="props",
      :id="id",
      :required-indicator="requiredIndicator",
      :hidden="false",
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
      variant="bodyMd",
    )
      slot(name="helpText")
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from '@/utilities/css';
import type { VueNode } from '@/utilities/types';
import { useHasSlot } from '@/use/useHasSlot';
import { Label, InlineError, Text, ButtonFrom } from '@/components';
import type { LabelledProps } from './types';
import { helpTextID } from './utils';
import styles from '@polaris/components/Labelled/Labelled.module.css';

const { hasSlot } = useHasSlot();

const props = defineProps<LabelledProps>();
const slots = defineSlots<{
  /** Text for the label */
  label: (_?: VueNode) => any;
  /** Label content */
  default: (_?: VueNode) => any;
  /** Hint text to display */
  helpText: (_?: VueNode) => any;
}>();

const className = computed(() => {
  return classNames(
    props.labelHidden && styles.hidden,
    props.disabled && styles.disabled,
    props.readOnly && styles.readOnly,
  )
});
</script>
