<template lang="pug">
th(
  v-if="stickyHeadingCell",
  v-bind="{ ...headerCell.props, ...colSpanProp }",
  :ref="setRef",
  :class="className",
  :aria-sort="sortDirection",
  :style="stickyHeadingStyle",
  data-index-table-sticky-heading="true",
)
  button(
    v-if="sortable",
    :class="headerClassName",
    :tabIndex="focusable ? 0 : -1",
    @click="$emit('sort')",
    @focus="$emit('focus', $event)",
  )
    span(:class="iconClassName")
      Icon(:source="source", :accessibilityLabel="sortAccessibilityLabel")
    slot
  template(v-else)
    slot

template(v-else)
  th(
    v-if="header",
    v-bind="{ ...headerCell.props, ...colSpanProp }",
    :ref="setRef",
    :class="className",
    scope="col",
    :aria-sort="sortDirection",
    :style="firstColumn ? { minWidth: `${firstColumnMinWidth}px` } : {}",
  )
    button(
      v-if="sortable",
      :class="headerClassName",
      :tabIndex="focusable ? 0 : -1",
      @click="$emit('sort')",
      @focus="$emit('focus', $event)",
    )
      span(:class="iconClassName")
        Icon(:source="source", :accessibilityLabel="sortAccessibilityLabel")
      slot
    template(v-else)
      slot

  th(
    v-else-if="firstColumn",
    v-bind="colSpanProp",
    :ref="(ref) => { setRef(ref) }",
    :style="{ minWidth: `${firstColumnMinWidth}px` }",
    :class="className",
    scope="row",
  )
    TruncatedText(:class="styles.TooltipContent")
      slot
  td(v-else, :class="className", v-bind="colSpanProp")
    slot
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { classNames, variationName } from 'polaris/polaris-react/src/utilities/css';
import { headerCell } from 'polaris/polaris-react/src/components/shared';
import SortAscendingMajor from '@icons/SortAscendingMajor.svg';
import SortDescendingMajor from '@icons/SortDescendingMajor.svg';
import { Icon, TruncatedText } from '@/components';
import { UseI18n } from '@/use';
import styles from '@/classes/DataTable.json';
import type { SortDirection, VerticalAlign } from '../../types';

interface CellProps {
  contentType?: string;
  firstColumn?: boolean;
  truncate?: boolean;
  header?: boolean;
  total?: boolean;
  totalInFooter?: boolean;
  sorted?: boolean;
  sortable?: boolean;
  sortDirection?: SortDirection;
  defaultSortDirection?: SortDirection;
  verticalAlign?: VerticalAlign;
  colSpan?: number;
  stickyHeadingCell?: boolean;
  stickyCellWidth?: number;
  hovered?: boolean;
  inFixedFirstColumn?: boolean;
  hasFixedFirstColumn?: boolean;
  fixedCellVisible?: boolean;
  firstColumnMinWidth?: string;
  setRef?: (ref: any) => void;
}

const props = withDefaults(defineProps<CellProps>(), {
  verticalAlign: 'top',
  defaultSortDirection: 'ascending',
  stickyHeadingCell: false,
  hovered: false,
  hasFixedFirstColumn: false,
  fixedCellVisible: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setRef: () => {},
});

const i18n = UseI18n();
const slots = useSlots();

const numeric = computed(() => props.contentType === 'numeric');

const slotText = computed(() => {
  return slots.default && slots.default()[0].el?.innerText;
})

const className = computed(() => classNames(
  styles.Cell,
  styles[`Cell-${variationName('verticalAlign', props.verticalAlign)}`],
  props.firstColumn && styles['Cell-firstColumn'],
  props.firstColumn && props.truncate && styles['Cell-truncated'],
  props.header && styles['Cell-header'],
  props.total && styles['Cell-total'],
  props.totalInFooter && styles['Cell-total-footer'],
  numeric.value && styles['Cell-numeric'],
  props.sortable && styles['Cell-sortable'],
  props.sorted && styles['Cell-sorted'],
  // props.stickyHeadingCell && styles.StickyHeaderCell,
  props.hovered && styles['Cell-hovered'],
  props.fixedCellVisible && styles.separate,
  props.firstColumn &&
    props.inFixedFirstColumn &&
    props.stickyHeadingCell &&
    styles.FixedFirstColumn,
));

const headerClassName = computed(() => classNames(
  props.header && styles.Heading,
  props.header && props.contentType === 'text' && styles['Heading-left'],
));

const iconClassName = computed(() => classNames(props.sortable && styles.Icon));
const direction = computed(() => props.sorted && props.sortDirection ? props.sortDirection : props.defaultSortDirection);
const source = computed(() => direction.value === 'descending' ? SortDescendingMajor : SortAscendingMajor);
const oppositeDirection = computed(() => props.sortDirection === 'ascending' ? 'descending' : 'ascending');

const sortAccessibilityLabel = computed(() => i18n.translate(
  'Polaris.DataTable.sortAccessibilityLabel',
  { direction: props.sorted ? oppositeDirection.value : direction.value },
));

const focusable = computed(() => props.stickyHeadingCell || !(props.hasFixedFirstColumn && props.firstColumn && !props.inFixedFirstColumn));

const colSpanProp = computed(() => props.colSpan && props.colSpan > 1 ? { colSpan: props.colSpan } : {});

const stickyHeadingStyle = computed(() => props.firstColumn && props.firstColumnMinWidth
  ? { minWidth: `${props.firstColumnMinWidth}px` }
  : { minWidth: `${props.stickyCellWidth}px` },
);
</script>
