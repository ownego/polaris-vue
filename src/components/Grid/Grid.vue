<template lang="pug">
div(
  :class="styles.Grid",
  :style="style",
)
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { VueNode } from '@/utilities/types';
import styles from '@polaris/components/Grid/Grid.module.scss';

export type GridSlots = {
  default: (_: VueNode) => any;
}

defineSlots<GridSlots>();

type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type Areas = {
  [Breakpoint in Breakpoints]?: string[];
};

type Columns = {
  [Breakpoint in Breakpoints]?: number;
};

type Gap = {
  [Breakpoint in Breakpoints]?: string;
};

interface GridProps {
  /**
   * Set grid-template-areas
   * @deprecated To avoid a11y issues, nest layout components in individual grid
   * cells instead. See:
   * https://polaris.shopify.com/components/layout-and-structure
   */
  areas?: Areas;
  /* Number of columns */
  columns?: Columns;
  /* Grid gap */
  gap?: Gap;
}

const props = defineProps<GridProps>();

const style = computed(() => {
  return {
    '--pc-grid-gap-xs': props.gap?.xs,
    '--pc-grid-gap-sm': props.gap?.sm,
    '--pc-grid-gap-md': props.gap?.md,
    '--pc-grid-gap-lg': props.gap?.lg,
    '--pc-grid-gap-xl': props.gap?.xl,
    '--pc-grid-columns-xs': props.columns?.xs,
    '--pc-grid-columns-sm': props.columns?.sm,
    '--pc-grid-columns-md': props.columns?.md,
    '--pc-grid-columns-lg': props.columns?.lg,
    '--pc-grid-columns-xl': props.columns?.xl,
    '--pc-grid-areas-xs': formatAreas(props.areas?.xs),
    '--pc-grid-areas-sm': formatAreas(props.areas?.sm),
    '--pc-grid-areas-md': formatAreas(props.areas?.md),
    '--pc-grid-areas-lg': formatAreas(props.areas?.lg),
    '--pc-grid-areas-xl': formatAreas(props.areas?.xl),
  };
});

function formatAreas(areas?: string[]) {
  if (!areas) return;
  return `'${areas?.join(`' '`)}'`;
}
</script>
