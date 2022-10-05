<template lang="pug">
component(
  :is="RowWrapper",
  :key="id",
  :class="rowClassName",
  @mouseenter="setHoverIn",
  @mouseleave="setHoverOut",
  @click="handleRowClick",
  ref="tableRowRef",
)
  Checkbox(v-if="selectable")
  slot
</template>

<script setup lang="ts">
import type { ComputedRef, Ref } from 'vue';
import { ref, computed, useAttrs, provide, onMounted } from 'vue';
import { classNames, variationName } from 'polaris/polaris-react/src/utilities/css';
import {
  useIndexRow,
  useIndexSelectionChange,
} from '@/utilities/index-provider';
import type { RowContextType } from '@/utilities/index-table';
import { Checkbox } from '../Checkbox';
import styles from '@/classes/IndexTable.json';

type RowStatus = 'success' | 'subdued';

interface Props {
  id: string;
  selected?: boolean;
  position: number;
  subdued?: boolean;
  status?: RowStatus;
  disabled?: boolean;
}

const props = defineProps<Props>();

const attrs = useAttrs();

const emits = defineEmits<{
  (e: 'click'): void;
  (e: 'navigation', id: string): void;
}>();

const { selectable, selectMode, condensed } = useIndexRow();
const onSelectionChange = useIndexSelectionChange();

const primaryLinkElement = ref<HTMLAnchorElement | null>(null);
const isNavigating = ref<boolean>(false);
const tableRowRef = ref<(HTMLTableRowElement & HTMLLIElement) | null>(null);
const hovered = ref(false);

const setHoverIn = () => {
  hovered.value = true;
};

const setHoverOut = () => {
  hovered.value = false;
};

const contextValue = computed<RowContextType>(() => {
  return {
    itemId: props.id,
    selected: props.selected,
    disabled: props.disabled,
    position: props.position,
    onInteraction: handleInteraction,
  } as RowContextType;
});

const handleInteraction = (event: MouseEvent | KeyboardEvent) => {
  event.stopPropagation();

  if (('key' in event && event.key !== ' ') || !onSelectionChange) {
    return;
  }

  const selectionType = event.shiftKey
    ? 'multi'
    : 'single';

  onSelectionChange(selectionType, !props.selected, props.id, props.position);
};

const rowClassName = computed(() => classNames(
  styles.TableRow,
  selectable.value && condensed?.value && styles.condensedRow,
  props.selected && styles['TableRow-selected'],
  props.subdued && styles['TableRow-subdued'],
  hovered.value && styles['TableRow-hovered'],
  props.disabled && styles['TableRow-disabled'],
  props.status && styles[variationName('status', props.status)],
  !selectable.value &&
    !primaryLinkElement.value &&
    styles['TableRow-unclickable'],
));

const RowWrapper = computed(() => condensed?.value ? 'li' : 'tr');

const handleRowClick = (event: Event) => {
  if ((props.disabled || !selectable.value) && !primaryLinkElement.value) {
    return;
  }

  if (!tableRowRef.value || isNavigating.value) {
    return;
  }

  event.stopPropagation();
  event.preventDefault();

  if (attrs.onClick) {
    emits('click');
    return;
  }

  if (primaryLinkElement.value && !selectMode.value) {
    isNavigating.value = true;
    const { ctrlKey, metaKey } = event as KeyboardEvent;

    if (attrs.onNavigation) {
      emits('navigation', props.id);
    }

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
    handleInteraction(event as any);
  }
};

onMounted(() => {
  const el = tableRowRef.value?.querySelector('[data-primary-link]');

  if (el) {
    primaryLinkElement.value = el as HTMLAnchorElement;
  }
});

provide<ComputedRef<RowContextType>>('RowContext', contextValue);
provide<(Ref<boolean>) | undefined>('RowHoveredContext', hovered);
</script>
