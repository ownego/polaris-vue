<template lang="pug">
template(v-if="inFixedNthColumn && inStickyHeader")
  Cell(
    :setRef="setRef",
    v-bind="cellProps",
    :inFixedNthColumn="false",
    @focus="handleFocus",
    @sort="$emit('sort')",
  )
    slot
  Cell(
    :setRef="setRef",
    v-bind="cellProps",
    :inFixedNthColumn="!!fixedFirstColumns",
    :lastFixedFirstColumn="headingIndex === fixedFirstColumns - 1",
    :style="{left: columnVisibilityData ? `${columnVisibilityData[headingIndex]?.leftEdge}px` : '0px'}",
    @focus="handleFocus",
    @sort="$emit('sort')",
  )
    slot
Cell(
  v-else,
  :setRef="setRef",
  v-bind="cellProps",
  :inFixedNthColumn="inFixedNthColumn",
  :lastFixedFirstColumn="headingIndex === fixedFirstColumns - 1",
  @focus="handleFocus",
  @sort="$emit('sort')",
)
  slot
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { ColumnContentType, SortDirection, VerticalAlign, DataTableState } from '../types';
import { Cell } from '../components';

interface Props {
  headingIndex: number;
  inFixedNthColumn: boolean;
  inStickyHeader: boolean;
  sortable?: boolean[];
  truncate: boolean;
  columnContentTypes?: ColumnContentType[];
  verticalAlign: VerticalAlign;
  firstColumnMinWidth?: string;
  sortDirection: SortDirection;
  defaultSortDirection: SortDirection;
  sortedColumnIndex: number;
  isScrolledFarthestLeft?: boolean;
  hasFixedFirstColumn?: boolean;
  stickyCellWidth?: number;
  fixedFirstColumns: number;
  columnVisibilityData: DataTableState['columnVisibilityData'];
  setRef: (ref: any) => void;
}

const props = withDefaults(defineProps<Props>(), {
  truncate: false,
  initialSortColumnIndex: 0,
});

const slots = useSlots();

const emits = defineEmits<{
  (e: 'focus', event: Event): void;
  (e: 'sort'): void;
}>();

// const headingCellId = computed(() => `heading-cell-${props.headingIndex}`);
// const stickyHeaderId = computed(() => `stickyheader-${props.headingIndex}`);
// const id = computed(() => props.inStickyHeader ? stickyHeaderId.value : headingCellId.value);

const isSortable = computed(() => props.sortable && props.sortable[props.headingIndex]);
const isSorted = computed(() => isSortable.value && props.sortedColumnIndex === props.headingIndex);
const direction = computed(() => isSorted.value ? props.sortDirection : 'none');

const sortableHeadingProps = computed(() => {
  if (props.sortable) {
    return {
      defaultSortDirection: props.defaultSortDirection,
      sorted: isSorted.value,
      sortable: isSortable.value,
      sortDirection: direction.value,
      // hasFixedFirstColumn: props.hasFixedFirstColumn,
      // fixedNthColumn: props.fixedFirstColumns,
      inFixedNthColumn: props.fixedFirstColumns,
    };
  }

  return {};
});

const cellProps = computed(() => {
  return {
    header: true,
    stickyHeadingCell: props.inStickyHeader,
    contentType: props.columnContentTypes?.[props.headingIndex],
    nthColumn: props.headingIndex < props.fixedFirstColumns,
    // fixedFirstColumns: props.fixedFirstColumns,
    truncate: props.truncate,
    // headingIndex: props.headingIndex,
    ...sortableHeadingProps.value,
    verticalAlign: props.verticalAlign,
    stickyCellWidth: props.stickyCellWidth,
    fixedCellVisible: props.isScrolledFarthestLeft,
    firstColumnMinWidth: props.firstColumnMinWidth,
  };
});

const handleFocus = (e: Event) => {
  emits('focus', e);
}
</script>
