<template lang="pug">
div(:class="styles.Columns", :style="style")
  slot
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type {
  BreakpointsAlias,
  SpacingSpaceScale,
} from '@shopify/polaris-tokens';

import styles from '@/classes/Columns.json';


type Columns = {
  [Breakpoint in BreakpointsAlias]?: number | string;
};

type Spacing = {
  [Breakpoint in BreakpointsAlias]?: SpacingSpaceScale;
};

interface Props {
  /** The spacing between columns
   * @default '4'
   */
  spacing?: Spacing;
  /** The number of columns to display
   * @default {xs: 6, sm: 6, md: 6, lg: 6, xl: 6}
   */
  columns?: Columns;
}

const props = defineProps<Props>();

const style = computed(() => {
  const fullStyles = {
    '--pc-columns-xs': formatColumns(props.columns?.xs || 6),
    '--pc-columns-sm': formatColumns(props.columns?.sm),
    '--pc-columns-md': formatColumns(props.columns?.md),
    '--pc-columns-lg': formatColumns(props.columns?.lg),
    '--pc-columns-xl': formatColumns(props.columns?.xl),
    '--pc-columns-space-xs': props.spacing?.xs
      ? `var(--p-space-${props.spacing?.xs})`
      : undefined,
    '--pc-columns-space-sm': props.spacing?.sm
      ? `var(--p-space-${props.spacing?.sm})`
      : undefined,
    '--pc-columns-space-md': props.spacing?.md
      ? `var(--p-space-${props.spacing?.md})`
      : undefined,
    '--pc-columns-space-lg': props.spacing?.lg
      ? `var(--p-space-${props.spacing?.lg})`
      : undefined,
    '--pc-columns-space-xl': props.spacing?.xl
      ? `var(--p-space-${props.spacing?.xl})`
      : undefined,
  } as Record<string, any>;

  return Object.keys(fullStyles).reduce((acc, key) => {
    if (fullStyles[key] !== undefined) {
      acc[key] = fullStyles[key];
    }
    return acc;
  }, {});
});

function formatColumns(columns?: number | string) {
  if (!columns) {
    return undefined;
  }

  return typeof columns === 'number'
    ? `repeat(${columns}, minmax(0, 1fr))`
    : columns;
}
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Columns/Columns.scss';
</style>
