<template lang="pug">
div(
  v-if="message",
  :class="styles.InlineError",
  :id="errorTextId(fieldId)",
)
  div(:class="styles.Icon")
    Icon(
      :source="CircleAlertMajor",
    )
  template(v-if="typeof message === 'string'")
    span {{ message }}
  component(v-else, :is="message")
</template>

<script setup lang="ts">
import { Icon } from '@/components';
import type { Error } from '@/utilities/types';
import CircleAlertMajor from '@icons/CircleAlertMajor.svg';
import styles from '@polaris/components/InlineError/InlineError.module.scss';

interface InlineErrorProps {
  /** Content briefly explaining how to resolve the invalid form field input. */
  message: Error;
  /** Unique identifier of the invalid form field that the message describes */
  fieldId: string;
}

defineProps<InlineErrorProps>();

function errorTextId(id: string): string {
  return `${id}Error`;
}
</script>
