<template lang="pug">
div(
  v-if="message",
  :class="styles.InlineError",
  :id="errorTextId(fieldID)",
)
  div(:class="styles.Icon")
    Icon(
      :source="CircleAlertMajor",
    )
  span {{ message }}
</template>

<script setup lang="ts">
import { useCssModule } from 'vue';
import { Icon } from '@/components';
import CircleAlertMajor from '@icons/CircleAlertMajor.svg';

interface InlineErrorProps {
  /** Content briefly explaining how to resolve the invalid form field input. */
  message: string;
  /** Unique identifier of the invalid form field that the message describes */
  fieldID: string;
}

const styles = useCssModule();

defineProps<InlineErrorProps>();

function errorTextId(id: string): string {
  return `${id}Error`;
}
</script>

<style lang="scss" module>
@import '@polaris/components/InlineError/InlineError.scss';
</style>
