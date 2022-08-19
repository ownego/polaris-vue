<template lang="pug">
UnstyledLink(
  v-if="url || to",
  :id="id",
  :to="to",
  :url="url",
  :class="className",
  :external="external",
  :aria-label="accessibilityLabel",
  :data-primary-link="dataPrimaryLink",
  @click="$emit('click')",
)
  slot
button(
  v-else,
  :id="id",
  type="button",
  :class="className",
  :aria-label="accessibilityLabel",
  :data-primary-link="dataPrimaryLink",
  @click="$emit('click')",
)
  slot
</template>

<script setup lang="ts">
import { computed, inject, useSlots } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import styles from '@/classes/Link.json';
import { UnstyledLink } from '../UnstyledLink';

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
  /** Indicates whether or not the link is the primary navigation link when rendered inside of an `IndexTable.Row` */
  dataPrimaryLink?: boolean;
}>();

const slots = useSlots();

const BannerContext = inject('BannerContext', false);

const shouldBeMonochrome = computed(() => props.monochrome || BannerContext);

const className = computed(() => classNames(
  styles.Link,
  shouldBeMonochrome.value && styles.monochrome,
  props.removeUnderline && styles.removeUnderline,
));
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Link/Link.scss';
</style>
