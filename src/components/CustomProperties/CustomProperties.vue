<template lang="pug">
component(
  v-bind="$attrs",
  :is="as",
  :p-color-scheme="colorScheme",
  :style="styles",
)
  slot
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { ColorScheme } from '@shopify/polaris-tokens';
import { DEFAULT_COLOR_SCHEME } from './utils';

interface CustomPropertiesProps {
  /** Determines what color scheme is applied to child content. */
  colorScheme?: ColorScheme;
  /** Element used for the root node. */
  as?: string;
  /** Inline styles applied to the root element. */
  style?: Record<string, string>;
}

const props = withDefaults(defineProps<CustomPropertiesProps>(), {
  colorScheme: DEFAULT_COLOR_SCHEME,
  as: 'div',
});

const styles = computed(() => ({
  color: 'var(--p-text)',
  ...props.style,
}));
</script>

<style lang="scss">
@import '@shopify/polaris-tokens/scss/styles.scss';
</style>
