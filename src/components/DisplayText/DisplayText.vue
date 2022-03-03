<template lang="pug">
component(
  :is="element",
  :class="className",
)
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames, variationName } from 'polaris-react/src/utilities/css';
import type { HeadingTagName } from 'types/type';
import styles from '@/classes/DisplayText.json';

type Size = 'small' | 'medium' | 'large' | 'extraLarge';

interface DisplayTextProps {
  /**
   * Name of element to use for text
   * @default 'p'
   */
  element?: HeadingTagName;
  /**
   * Size of the text
   * @default 'medium'
   */
  size?: Size;
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { element = 'p', size = 'medium' } = defineProps<DisplayTextProps>();

const className = computed(() => classNames(
  styles.DisplayText,
  size && styles[variationName('size', size) as keyof typeof styles],
));
</script>

<style lang="scss">
@import 'polaris-react/src/components/DisplayText/DisplayText.scss';
</style>
