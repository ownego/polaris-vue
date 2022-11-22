<template lang="pug">
div(v-if="error && typeof error !== 'boolean' || $slots['help-text']")
  label(
    :class="className",
    @click="$emit('click')",
    @mouseover="$emit('mouseover')",
    @mouseout="$emit('mouseout')",
  )
    span(:class="styles.Control")
      slot
    span(:class="styles.Label")
      Text(as="span", variant="bodyMd")
        slot(v-if="$slots.label", name="label")
        template(v-else-if="label") {{ label }}
  div(:class="styles.Descriptions")
    div(
      v-if="$slots['help-text'] || helpText",
      :id="helpTextID(id)",
      :class="styles.HelpText",
    )
      Text(as="span", variant="bodyMd", color="subdued")
        slot(v-if="$slots['help-text']", name="help-text")
        template(v-else) {{ helpText }}
    InlineError(
      v-if="(error && typeof error !== 'boolean')",
      :fieldID="id",
      :message="error",
    )
label(
  v-else
  :class="className",
  @click="$emit('click')",
  @mouseover="$emit('mouseover')",
  @mouseout="$emit('mouseout')",
)
  span(:class="styles.Control")
    slot
  span(:class="styles.Label")
    Text(as="span", variant="bodyMd")
      slot(v-if="$slots.label", name="label")
      template(v-else-if="label") {{ label }}
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from '@/utilities/css';
import { Text } from '@/components';
import styles from '@/classes/Choice.json';
import type { Error } from '@/utilities/type';
import { helpTextID } from './utils';
import { InlineError } from '../InlineError';

interface Props {
  /** A unique identifier for the choice */
  id: string;
  /**	Label for the choice */
  label?: string;
  /** Whether the associated form control is disabled */
  disabled?: boolean;
  /** Display an error message */
  error?: Error;
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Additional text to aide in use */
  helpText?: string;
}

const props = defineProps<Props>();

const className = computed(() => classNames(
  styles.Choice,
  props.labelHidden && styles.labelHidden,
  props.disabled && styles.disabled,
));
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Choice/Choice.scss';
</style>
