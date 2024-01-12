<template lang="pug">
div(
  v-if="message",
  :class="styles.InlineError",
  :id="errorTextID(fieldId)",
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
import type { Error } from '@/utilities/types';
import { errorTextID } from './utils';
import CircleAlertMajor from '@icons/CircleAlertMajor.svg';

interface InlineErrorProps {
  /** Content briefly explaining how to resolve the invalid form field input. */
  message: Error;
  /** Unique identifier of the invalid form field that the message describes */
  fieldId: string;
}

const styles = useCssModule();

defineProps<InlineErrorProps>();
</script>

<style lang="scss" module>
@import '@polaris/components/InlineError/InlineError.module.scss';
</style>
