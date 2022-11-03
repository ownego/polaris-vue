<template lang="pug">
div(:class="styles.Tiles", :style="style")
  slot
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type {
  BreakpointsAlias,
  SpacingSpaceScale,
} from '@shopify/polaris-tokens';
import styles from '@/classes/Tiles.json';

type Columns = {
  [Breakpoint in BreakpointsAlias]?: number | string;
};

type Gap = {
  [Breakpoint in BreakpointsAlias]?: SpacingSpaceScale;
};

interface Props {
  /** Adjust spacing between elements */
  gap?: Gap;
  /** Adjust number of columns */
  columns?: Columns;
}

const props = defineProps<Props>();

const style = computed(() => {
  const fullStyles = {
    '--pc-tile-gap-xs': props.gap?.xs ? `var(--p-space-${props.gap?.xs})` : undefined,
    '--pc-tile-gap-sm': props.gap?.sm ? `var(--p-space-${props.gap?.sm})` : undefined,
    '--pc-tile-gap-md': props.gap?.md ? `var(--p-space-${props.gap?.md})` : undefined,
    '--pc-tile-gap-lg': props.gap?.lg ? `var(--p-space-${props.gap?.lg})` : undefined,
    '--pc-tile-gap-xl': props.gap?.xl ? `var(--p-space-${props.gap?.xl})` : undefined,
    '--pc-tile-xs': formatColumns(props.columns?.xs),
    '--pc-tile-sm': formatColumns(props.columns?.sm),
    '--pc-tile-md': formatColumns(props.columns?.md),
    '--pc-tile-lg': formatColumns(props.columns?.lg),
    '--pc-tile-xl': formatColumns(props.columns?.xl),
  };
  return Object.fromEntries(Object.entries(fullStyles).filter(([, value]) => value));
});

function formatColumns(columns?: number | string) {
  if (!columns) {
    return undefined;
  }

  return typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns;
}
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Tiles/Tiles.scss';
</style>
