<template lang="pug">
UnstyledLink(
  v-if="url || to",
  :id="id",
  :to="to",
  :url="url",
  :class="className",
  :external="external",
  :aria-label="accessibilityLabel",
)
  <!-- Slot for displaying content inside the link -->
  slot
  span(:class="styles.IconLockup")
    span(:class="styles.IconLayout")
      Icon(:source="ExternalSmallMinor")
button(
  v-else,
  :id="id",
  type="button",
  :class="className",
  :aria-label="accessibilityLabel",
  @click="$emit('click')",
)
  <!-- Slot for displaying content inside the link -->
  slot
  span(:class="styles.IconLockup")
    span(:class="styles.IconLayout")
      Icon(:source="ExternalSmallMinor")
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import styles from '@/classes/Link.json';
import ExternalSmallMinor from '@icons/ExternalSmallMinor.svg';
import { UnstyledLink } from '../UnstyledLink';
import { Icon } from '../Icon';

const props = defineProps<{
  /** ID for the link */
  id?: string;
  /** The url to link to */
  url?: string;
  /** Using with vue-router */
  to?: string | Record<string, unknown>;
  /** Makes the link open in a new tab */
  external?: boolean;
  /** Makes the link color the same as the current text color and adds an underline */
  monochrome?: boolean;
  /** Removes text decoration underline to the link */
  removeUnderline?: boolean;
  /** Descriptive text to be read to screenreaders */
  accessibilityLabel?: string;
}>();

const className = computed(() => classNames(
  styles.Link,
  props.monochrome && styles.monochrome,
  props.removeUnderline && styles.removeUnderline,
));
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Link/Link.scss';
</style>
