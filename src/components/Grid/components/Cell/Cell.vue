<template lang="pug">
div(
  :class="className",
  :style="style",
)
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from '@/utilities/css';
import styles from '@polaris/components/Grid/components/Cell/Cell.module.css';

type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type Cell = {
  [Breakpoint in Breakpoints]?: string;
};

interface Columns {
  /** Number of columns the section should span on extra small screens */
  xs?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Number of columns the section should span on small screens */
  sm?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Number of columns the section should span on medium screens */
  md?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Number of columns the section should span on large screens */
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /** Number of columns the section should span on extra large screens */
  xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

interface CellProps {
  /**
   * Set grid-template-areas
   * @deprecated To avoid a11y issues, nest layout components in individual grid
   * cells instead. See:
   * https://polaris.shopify.com/components/layout-and-structure
   */
  area?: string;
  column?: Cell;
  columnSpan?: Columns;
  row?: Cell;
}

const props = defineProps<CellProps>();

const className = computed(() => {
  return classNames(
    styles.Cell,
    props.columnSpan?.xs && styles[`Cell-${props.columnSpan.xs}-column-xs`],
    props.columnSpan?.sm && styles[`Cell-${props.columnSpan.sm}-column-sm`],
    props.columnSpan?.md && styles[`Cell-${props.columnSpan.md}-column-md`],
    props.columnSpan?.lg && styles[`Cell-${props.columnSpan.lg}-column-lg`],
    props.columnSpan?.xl && styles[`Cell-${props.columnSpan.xl}-column-xl`],
  );
});

const style = computed(() => {
  return {
    'gridArea': props.area,
    '--pc-column-xs': props.column?.xs,
    '--pc-column-sm': props.column?.sm,
    '--pc-column-md': props.column?.md,
    '--pc-column-lg': props.column?.lg,
    '--pc-column-xl': props.column?.xl,
    '--pc-row-xs': props.row?.xs,
    '--pc-row-sm': props.row?.sm,
    '--pc-row-md': props.row?.md,
    '--pc-row-lg': props.row?.lg,
    '--pc-row-xl': props.row?.xl,
  };
});
</script>
