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
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/Link.json';
import ExternalSmallMinor from '@icons/ExternalSmallMinor.svg';
import { UnstyledLink } from '../UnstyledLink';
import { Icon } from '../Icon';

const props = defineProps<{
  id?: string,
  url?: string,
  to?: string,
  external?: boolean,
  monochrome?: boolean,
  removeUnderline?: boolean,
  accessibilityLabel?: string,
}>();

const className = computed(() => classNames(
  styles.Link,
  props.monochrome && styles.monochrome,
  props.removeUnderline && styles.removeUnderline,
));
</script>

<style lang="scss">
@import 'polaris-react/src/components/Link/Link.scss';
</style>
