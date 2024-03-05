<template lang="pug">
component(
  :is="condensed ? 'li' : 'tr'",
  :key="id",
  :id="id",
  :class="rowClassName",
  ref="tableRowRef",
  @click="handleRowClick",
  @mouseenter="setHoverIn",
  @mouseleave="setHoverOut",
)
  Checkbox(
    v-if="selectable",
    :accessibilityLabel="accessibilityLabel",
  )
  slot
</template>

<script setup lang="ts">
import { type VNode, ref, computed, provide, onMounted, type Ref, toRef } from 'vue';
import { useToggle } from '@/use/useToggle';
import { classNames, variationName } from '@/utilities/css';
import type { VueNode } from '@/utilities/types';
import { useIndexRowContext, useIndexSelectionChangeContext } from '@/components/IndexProvider/context';
import { SelectionType, type Range } from '@/components/IndexProvider/types';
import { type RowContextType } from '../../context';
import { Checkbox } from '../Checkbox';
import styles from '@polaris/components/IndexTable/IndexTable.module.scss';

type RowType = 'data' | 'subheader' | 'child';
type RowStatus = 'subdued' | 'success' | 'warning' | 'critical';
type TableRowElementType = HTMLTableRowElement & HTMLLIElement;

export type RowProps = {
  /** A unique identifier for the row */
  id: string;
  /** Whether the row is selected */
  selected?: boolean | 'indeterminate';
  /** The zero-indexed position of the row. Used for Shift key multi-selection */
  position: number;
  /** Whether the row should visually indicate its status with a background color */
  tone?: RowStatus;
  /** Whether the row should be disabled */
  disabled?: boolean;
  /** A tuple array with the first and last index of the range of other rows that this row describes. All rows in the range are selected when the selection range row is selected. */
  selectionRange?: Range;
  /**
   * Indicates the relationship or role of the row's contents. A "subheader" row displays the same as the table header. Rows of type "child" are indented.
   *  @default 'data' */
  rowType?: RowType;
  /** Label set on the row's checkbox
   * @default "Select {resourceName}"
   */
  accessibilityLabel?: string;
}

type RowSlots = {
  default: (_: VueNode) => VNode[];
}

type RowEvents = {
  /** Callback fired when the row is clicked and contains a data-primary-link */
  'navigation': [id: string];
  /** Callback fired when the row is clicked. Overrides the default click behaviour. */
  'click': [];
}

const props = withDefaults(defineProps<RowProps>(), {
  rowType: 'data',
});
const slots = defineSlots<RowSlots>();
const emits = defineEmits<RowEvents>();

const { selectable, selectMode, condensed } = useIndexRowContext();
const onSelectionChange = useIndexSelectionChangeContext();

const {
  value: hovered,
  setTrue: setHoverIn,
  setFalse: setHoverOut,
} = useToggle(false);

const primaryLinkElement = ref<HTMLAnchorElement | null>(null);
const isNavigating = ref<boolean>(false);
const tableRowRef = ref<TableRowElementType | null>(null);

const rowClassName = computed(() => classNames(
  styles.TableRow,
  props.rowType === 'subheader' && styles['TableRow-subheader'],
  props.rowType === 'child' && styles['TableRow-child'],
  selectable.value && condensed?.value && styles.condensedRow,
  props.selected && styles['TableRow-selected'],
  hovered.value && !condensed?.value && styles['TableRow-hovered'],
  props.disabled && styles['TableRow-disabled'],
  props.tone && styles[variationName('tone', props.tone)],
  !selectable.value &&
    !primaryLinkElement.value &&
    styles['TableRow-unclickable'],
));

const handleInteraction = (event: MouseEvent | KeyboardEvent) => {
  event.stopPropagation();
  let selectionType = SelectionType.Single;

  if (('key' in event && event.key !== ' ') || !onSelectionChange) return;

  if (event.shiftKey) {
    selectionType = SelectionType.Multi;
  } else if (props.selectionRange) {
    selectionType = SelectionType.Range;
  }

  const selection: string | Range = props.selectionRange ?? props.id;

  onSelectionChange(selectionType, !props.selected, selection, props.position);
};

const handleRowClick = (event: MouseEvent) => {
  if ((props.disabled || !selectable.value) && !primaryLinkElement.value) {
    return;
  }

  if (props.rowType === 'subheader') {
    return;
  }

  if (!tableRowRef.value || isNavigating.value) {
    return;
  }

  event.stopPropagation();
  event.preventDefault();

  emits('click');

  if (primaryLinkElement.value && !selectMode.value) {
    isNavigating.value = true;
    const {ctrlKey, metaKey} = event;

    emits('navigation', props.id);

    if (
      (ctrlKey || metaKey) &&
      primaryLinkElement.value instanceof HTMLAnchorElement
    ) {
      isNavigating.value = false;
      window.open(primaryLinkElement.value.href, '_blank');
      return;
    }

    primaryLinkElement.value.dispatchEvent(
      new MouseEvent(event.type, event),
    );
  } else {
    isNavigating.value = false;
    handleInteraction(event);
  }
};

onMounted(() => {
  const el = tableRowRef.value?.querySelector('[data-primary-link]');

  if (el) {
    primaryLinkElement.value = el as HTMLAnchorElement;
  }
});

const contextValue = {
  itemId: toRef(props, 'id'),
  selected: toRef(props, 'selected'),
  disabled: toRef(props, 'disabled'),
  position: toRef(props, 'position'),
  onInteraction: handleInteraction,
};

provide<RowContextType>('rowContext', contextValue);
provide<Ref<boolean> | undefined>('rowHoveredContext', hovered);
</script>
