<template lang="pug">
div(
  v-if="message",
  :id="errorTextID(fieldID)",
  :class="styles.InlineError",
)
  div(:class="styles.Icon")
    Icon(:source="AlertMinor")
  component(
    v-if="typeof message === 'object'",
    :is="message",
  )
  div(v-else) {{ message }}
</template>

<script setup lang="ts">
import AlertMinor from '@icons/AlertMinor.svg';
import styles from '@/classes/InlineError.json';
import type { Error } from '@/utilities/type';
import { errorTextID } from './utils';
import { Icon } from '../Icon';

interface Props {
  /** Content briefly explaining how to resolve the invalid form field input. */
  message: Error;
  /** Unique identifier of the invalid form field that the message describes */
  fieldID: string;
}

const props = defineProps<Props>();
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/InlineError/InlineError.scss';
</style>
