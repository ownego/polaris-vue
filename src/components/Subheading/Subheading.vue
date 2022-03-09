<template lang="pug">
component(
  :is="element",
  :class="styles.Subheading",
)
  slot
</template>

<script setup lang="ts">
import type { HeadingTagName } from 'types/type';
import styles from '@/classes/Subheading.json';

interface SubheadingProps {
  /**
   * The element name to use for the subheading
   * @default 'h3'
   */
  element?: HeadingTagName;
}

const props = withDefaults(defineProps<SubheadingProps>(), {
  element: 'h3',
});
</script>

<style lang="scss">
@import 'polaris-react/src/components/Subheading/Subheading.scss';
</style>
