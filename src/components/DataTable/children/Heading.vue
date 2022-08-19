<template lang="pug">
Cell(
  v-if="!inFixedFirstColumn || !inStickyHeader",
  header,
  :setRef="setRef",
  :stickyHeadingCell="inStickyHeader",
  :contentType="columnContentTypes && columnContentTypes[headingIndex]",
  :firstColumn="headingIndex === 0",
  :truncate="truncate",
  v-bind="sortableHeadingProps",
  :verticalAlign="verticalAlign",
  :stickyCellWidth="stickyCellWidth",
  :fixedCellVisible="!isScrolledFarthestLeft",
  :firstColumnMinWidth="firstColumnMinWidth",
  :inFixedFirstColumn="inFixedFirstColumn",
  @focus="handleFocus",
  @sort="$emit('sort')",
)
  slot
template(v-else)
  Cell(
    header,
    :setRef="setRef",
    :stickyHeadingCell="inStickyHeader",
    :contentType="columnContentTypes && columnContentTypes[headingIndex]",
    :firstColumn="headingIndex === 0",
    :truncate="truncate",
    v-bind="sortableHeadingProps",
    :verticalAlign="verticalAlign",
    :stickyCellWidth="stickyCellWidth",
    :fixedCellVisible="!isScrolledFarthestLeft",
    :firstColumnMinWidth="firstColumnMinWidth",
    :inFixedFirstColumn="false",
    @focus="handleFocus",
    @sort="$emit('sort')",
  )
    slot
  Cell(
    v-if="!inFixedFirstColumn || !inStickyHeader",
    header,
    :setRef="setRef",
    :stickyHeadingCell="inStickyHeader",
    :contentType="columnContentTypes && columnContentTypes[headingIndex]",
    :firstColumn="headingIndex === 0",
    :truncate="truncate",
    v-bind="sortableHeadingProps",
    :verticalAlign="verticalAlign",
    :stickyCellWidth="stickyCellWidth",
    :fixedCellVisible="!isScrolledFarthestLeft",
    :firstColumnMinWidth="firstColumnMinWidth",
    :inFixedFirstColumn="true",
    @focus="handleFocus",
    @sort="$emit('sort')",
  )
    slot
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { ColumnContentType, SortDirection, VerticalAlign } from '../types';
import { Cell } from '../components';

interface Props {
  headingIndex: number;
  inFixedFirstColumn: boolean;
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
      hasFixedFirstColumn: props.hasFixedFirstColumn,
      inFixedFirstColumn: props.hasFixedFirstColumn && props.inFixedFirstColumn,
    };
  }

  return {};
});

const handleFocus = (e: Event) => {
  emits('focus', e);
}
</script>
