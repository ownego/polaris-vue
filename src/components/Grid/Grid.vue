<template lang="pug">
div(:class="styles.Grid", :style="style")
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import styles from '@/classes/Grid.json';

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

interface Props {
  /* Set grid-template-areas */
  areas?: Areas;
  /* Number of columns */
  columns?: Columns;
  /* Grid gap */
  gap?: Gap;
}

const props = defineProps<Props>();

const style = computed(() => {
  const gridStyle = {
    '--pc-grid-gap-xs': props.gap && props.gap.xs ? props.gap.xs : undefined,
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
  } as Record<string, any>;

  // Remove undefined properties
  Object.keys(gridStyle).forEach((key) => {
    if (!gridStyle[key]) {
      delete gridStyle[key];
    }
  });

  return gridStyle;
});

function formatAreas(areas?: string[]) {
  if (!areas) {
    return;
  }
  return `'${areas?.join(`' '`)}'`;
}
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Grid/Grid.scss';
</style>
