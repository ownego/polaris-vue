<template lang="pug">
div(
  :class="styles.InlineGrid"
  :style="sanitizeCustomProperties(style)"
)
  slot
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import {
  getResponsiveProps,
  getResponsiveValue,
  sanitizeCustomProperties,
} from '@/utilities/css';
import type { ResponsiveValue } from '@/utilities/css';
import type { VueNode } from '@/utilities/types';
import type { InlineGridProps, Columns, ColumnsType } from './types';

defineSlots<{
  default: (_: VueNode) => any;
}>();

const props = defineProps<InlineGridProps>();

const styles = useCssModule();

const style = computed(() => {
  return {
    ...getResponsiveValue(
      'inline-grid',
      'grid-template-columns',
      formatInlineGrid(props.columns),
    ),
    ...getResponsiveProps('inline-grid', 'gap', 'space', props.gap),
    '--pc-inline-grid-align-items': props.alignItems,
  };
});

function formatInlineGrid(columns?: Columns): ResponsiveValue {
  if (
    typeof columns === 'object' &&
    columns !== null &&
    !Array.isArray(columns)
  ) {
    return Object.fromEntries(
      Object.entries(columns).map(([breakpointAlias, breakpointInlineGrid]) => [
        breakpointAlias,
        getColumnValue(breakpointInlineGrid),
      ]),
    );
  }

  return getColumnValue(columns);
}

function getColumnValue(columns?: ColumnsType) {
  if (!columns) return undefined;

  if (typeof columns === 'number' || !isNaN(Number(columns))) {
    return `repeat(${Number(columns)}, minmax(0, 1fr))`;
  }

  if (typeof columns === 'string') return columns;

  return columns
    .map((column) => {
      switch (column) {
        case 'oneThird':
          return 'minmax(0, 1fr)';
        case 'oneHalf':
          return 'minmax(0, 1fr)';
        case 'twoThirds':
          return 'minmax(0, 2fr)';
      }
    })
    .join(' ');
}
</script>
<style lang="scss" module>
@import '@polaris/components/InlineGrid/InlineGrid.scss';
</style>
