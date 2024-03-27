<template lang="pug">
div(v-if="hasDescription")
  label(
    :class="className",
    :for="id",
    :style="sanitizeCustomProperties(labelStyle)",
    @click="emits('click')",
  )
    span(:class="styles.Control")
      slot
    span(:class="styles.Label")
      span
        slot(v-if="hasSlot(slots.label)", name="label")
        template(v-else) {{ label }}

  div(:class="styles.Descriptions")
    div(
      v-if="error && (typeof error !== 'boolean')",
      :class="styles.Error",
    )
      InlineError(:message="error", :field-id="id")

    div(
      v-if="hasHelpText",
      :class="styles.HelpText",
      :id="helpTextID(id)",
    )
      Text(
        as="span",
        :tone="!disabled && 'subdued'",
      )
        slot(v-if="hasSlot(slots.helpText)", name="helpText")
        template(v-else) {{ helpText }}

label(
  v-else,
  :class="className",
  :for="id",
  :style="sanitizeCustomProperties(labelStyle)",
  @click="emits('click')",
)
  span(:class="styles.Control")
    slot
  span(:class="styles.Label")
    span
      slot(v-if="hasSlot(slots.label)", name="label")
      template(v-else) {{ label }}
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  classNames,
  variationName,
  getResponsiveProps,
  getResponsiveValue,
  sanitizeCustomProperties,
} from '@/utilities/css';
import { useHasSlot } from '@/use/useHasSlot';
import { InlineError } from '@/components';
import type { ChoiceProps, ChoiceSlots } from './types';
import { helpTextID } from './utils';
import styles from '@polaris/components/Choice/Choice.module.css';

type ChoiceEvents = {
  'click': [];
};

const props = defineProps<ChoiceProps>();
const slots = defineSlots<ChoiceSlots>();
const emits = defineEmits<ChoiceEvents>();

const { hasSlot } = useHasSlot();

const hasHelpText = computed(() => hasSlot(slots.helpText) || props.helpText);
const hasError = computed(() => props.error && typeof props.error !== 'boolean');
const hasDescription = computed(() => hasHelpText.value || hasError.value);

const className = computed(() => classNames(
  styles.Choice,
  props.labelHidden && styles.labelHidden,
  props.disabled && styles.disabled,
  props.tone && styles[variationName('tone', props.tone)],
  props.labelClassName,
));

const labelStyle = computed(() => ({
  // Pass through overrides for bleed values if they're set by the prop
  ...getResponsiveProps(
    'choice',
    'bleed-block-end',
    'space',
    props.bleedBlockEnd || props.bleed,
  ),
  ...getResponsiveProps(
    'choice',
    'bleed-block-start',
    'space',
    props.bleedBlockStart || props.bleed,
  ),
  ...getResponsiveProps(
    'choice',
    'bleed-inline-start',
    'space',
    props.bleedInlineStart || props.bleed,
  ),
  ...getResponsiveProps(
    'choice',
    'bleed-inline-end',
    'space',
    props.bleedInlineEnd || props.bleed,
  ),
  ...Object.fromEntries(
    Object.entries(getResponsiveValue('choice', 'fill', props.fill)).map(
      // Map "true" => "100%" and "false" => "auto" for use in
      // inline/block-size calc()
      ([key, value]) => [key, value ? '100%' : 'auto'],
    ),
  ),
}));
</script>
