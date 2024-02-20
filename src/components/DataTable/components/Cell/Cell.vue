<template lang="pug">
th(
  v-if="stickyHeadingCell",
  :ref="setRef",
  v-bind="{ ...headerCell.props, ...colSpanProp }",
  :class="className",
  :aria-sort="sortDirection",
  :style="{ ...props.style, ...minWidthStyles }",
  data-index-table-sticky-heading,
)
  button(
    v-if="sortable",
    :class="headerClassName",
    :tabindex="focusable ? 0 : -1",
    @click="emits('sort')",
    @focus="handleFocus",
  )
    span(:class="iconClassName")
      Icon(:source="source", :accessibilityLabel="sortAccessibilityLabel")
    slot
  slot(v-else)

template(v-if="header || firstColumn || nthColumn")
  th(
    v-if="header",
    :ref="setRef",
    v-bind="{ ...headerCell.props, ...colSpanProp }",
    :class="className",
    :aria-sort="sortDirection",
    scope="col",
    :style="{ ...minWidthStyles }",
  )
    button(
      v-if="sortable",
      :class="headerClassName",
      :tabindex="focusable ? 0 : -1",
      @click="emits('sort')",
      @focus="handleFocus",
    )
      span(:class="iconClassName")
        Icon(:source="source", :accessibilityLabel="sortAccessibilityLabel")
      slot
    slot(v-else)

  th(
    v-else,
    :ref="setRef",
    v-bind="{ ...colSpanProp }",
    :class="className",
    scope="row",
    :style="{ ...minWidthStyles }",
  )
    TruncatedText(v-if="truncate", :className="styles.TooltipContent")
      slot
    slot(v-else)

td(
  v-else,
  :class="className",
  v-bind="colSpanProp",
)
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import useI18n from '@/use/useI18n';
import { classNames, variationName } from '@/utilities/css';
import { headerCell } from '@polaris/components/shared';
import { Icon } from '@/components';
import { default as TruncatedText } from './TruncatedText.vue';
import type {
  CellProps,
  CellSlots,
  CellEvents,
} from '../../types';
import SortDescendingIcon from '@icons/SortDescendingIcon.svg';
import SortAscendingIcon from '@icons/SortAscendingIcon.svg';
import styles from '@polaris/components/DataTable/DataTable.module.scss';


const props = withDefaults(defineProps<CellProps>(), {
  verticalAlign: 'top',
  defaultSortDirection: 'ascending',
  stickyHeadingCell: false,
  hovered: false,
  hasFixedNthColumn: false,
  fixedCellVisible: false,
});

const slots = defineSlots<CellSlots>();
const emits = defineEmits<CellEvents>();

const i18n = useI18n();

const numeric = computed(() => props.contentType === 'numeric');
const className = computed(() => classNames(
  styles.Cell,
  styles[`Cell-${variationName('verticalAlign', props.verticalAlign)}`],
  props.firstColumn && styles['Cell-firstColumn'],
  props.truncate && styles['Cell-truncated'],
  props.header && styles['Cell-header'],
  props.total && styles['Cell-total'],
  props.totalInFooter && styles['Cell-total-footer'],
  numeric && styles['Cell-numeric'],
  props.sortable && styles['Cell-sortable'],
  props.sorted && styles['Cell-sorted'],
  props.stickyHeadingCell && styles.StickyHeaderCell,
  props.hovered && styles['Cell-hovered'],
  props.lastFixedFirstColumn &&
    props.inFixedNthColumn &&
    props.fixedCellVisible &&
    styles['Cell-separate'],
  props.nthColumn &&
    props.inFixedNthColumn &&
    props.stickyHeadingCell &&
    styles.FixedFirstColumn,
));

const headerClassName = computed(() => classNames(
  props.header && styles.Heading,
  props.header && props.contentType === 'text' && styles['Heading-left'],
));

const iconClassName = computed(() => classNames(props.sortable && styles.Icon));

const direction = computed(() => props.sorted && props.sortDirection ? props.sortDirection : props.defaultSortDirection);

const source = computed(() => direction.value === 'descending' ? SortDescendingIcon : SortAscendingIcon);
const oppositeDirection = computed(() => props.sortDirection === 'descending' ? 'ascending' : 'descending');

const sortAccessibilityLabel = computed(() => i18n.translate(
  'Polaris.DataTable.sortAccessibilityLabel',
  { direction: props.sorted ? oppositeDirection.value : direction.value },
));

const focusable = computed(() => !(
  props.stickyHeadingCell
  && props.hasFixedNthColumn
  && props.nthColumn
  && !props.inFixedNthColumn
));

const colSpanProp = computed(() => props.colSpan && props.colSpan > 1 ? { colSpan: props.colSpan } : {});

const minWidthStyles = computed(() => (
  props.nthColumn && props.firstColumnMinWidth
    ? { minWidth: `${props.firstColumnMinWidth}px` }
    : { minWidth: `${props.stickyCellWidth}px` }
));

const handleFocus = (e: FocusEvent) => {
  emits('focus', e);
}
</script>
