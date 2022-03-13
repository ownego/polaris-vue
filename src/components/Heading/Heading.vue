<template lang="pug">
component(
  :is="element",
  :id="id",
  :class="styles.Heading",
)
  slot
</template>

<script setup lang="ts">
import type { HeadingTagName } from '@/utilities/type';
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

const props = withDefaults(defineProps<Props>(), {
  element: 'h2',
});
</script>

<style lang="scss">
@import 'polaris-react/src/components/Heading/Heading.scss';
</style>
