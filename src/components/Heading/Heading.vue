<template lang="pug">
component(
  :is="element",
  :id="id",
  :class="styles.Heading",
)
  slot
</template>

<script setup lang="ts">
import type { HeadingTagName } from 'polaris-react/src/types';
import styles from '@/classes/Heading.json';

interface Props {
  /**
   * The element name to use for the heading
   * @default 'h2'
   */
  element?: HeadingTagName;
  /**
   * A unique identifier for the heading,
   * used for reference in anchor links
   */
  id?: string;
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { element = 'h2', id } = defineProps<Props>();
</script>

<style lang="scss">
@import 'polaris-react/src/components/Heading/Heading.scss';
</style>
