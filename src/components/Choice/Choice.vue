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
      slot(name="label")
  div(:class="styles.Descriptions")
    div(
      v-if="$slots['help-text']",
      :id="helpTextID(id)",
      :class="styles.HelpText",
    )
      slot(name="help-text")
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
    slot(name="label")
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/Choice.json';
import type { Error } from 'types/type';
import { helpTextID } from './utils';
import { InlineError } from '../InlineError';

interface Props {
  /** A unique identifier for the choice */
  id: string;
  /** Whether the associated form control is disabled */
  disabled?: boolean;
  /** Display an error message */
  error?: Error | boolean;
  /** Visually hide the label */
  labelHidden?: boolean;
}

const props = defineProps<Props>();

const className = computed(() => classNames(
  styles.Choice,
  props.labelHidden && styles.labelHidden,
  props.disabled && styles.disabled,
));
</script>

<style lang="scss">
@import 'polaris-react/src/components/Choice/Choice.scss';
</style>
