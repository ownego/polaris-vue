<template lang="pug">
UnstyledLink(
  v-if="url",
  :class="className",
  :url="url",
  :external="external",
  :target="target",
  :aria-label="accessibilityLabel",
  :data-primary-link="dataPrimaryLink",
)
  slot

button(
  v-else,
  type="button",
  :class="className",
  :aria-label="accessibilityLabel",
  :data-primary-link="dataPrimaryLink",
)
  slot
</template>

<script setup lang="ts">
import {
  useCssModule,
  inject,
  computed,
} from 'vue';
import { UnstyledLink } from '@/components';
import { classNames } from '@/utilities/css';
import type { Target } from '@polaris/types';

export interface LinkProps {
  /** ID for the link */
  id?: string;
  /** The url to link to */
  url?: string;
  /** Makes the link open in a new tab
   * @deprecated use `target` set to `_blank` instead
   */
  external?: boolean;
  /** Where to display the url */
  target?: Target;
  /** Makes the link color the same as the current text color and adds an underline */
  monochrome?: boolean;
  /** Removes text decoration underline to the link */
  removeUnderline?: boolean;
  /** Descriptive text to be read to screenreaders */
  accessibilityLabel?: string;
  /** Indicates whether or not the link is the primary navigation link when rendered inside of an `IndexTable.Row` */
  dataPrimaryLink?: boolean;
}

const styles = useCssModule();

const bannerContext = inject('banner-context');

const props = defineProps<LinkProps>();

const shouldBeMonochrome = computed(() => Boolean(props.monochrome || bannerContext));

const className = computed(() => classNames(
  styles.Link,
  shouldBeMonochrome.value && styles.monochrome,
  props.removeUnderline && styles.removeUnderline,
));
</script>

<style lang="scss" module>
@import '@polaris/components/Link/Link.scss';
</style>
