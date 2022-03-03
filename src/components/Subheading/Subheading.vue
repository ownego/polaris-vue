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

// eslint-disable-next-line vue/no-setup-props-destructure
const { element = 'h3' } = defineProps<SubheadingProps>();
</script>

<style lang="scss">
@import 'polaris-react/src/components/Subheading/Subheading.scss';
</style>
