<template lang="pug">
UnstyledButton(
  v-if="sortable && sortable[index]",
  :class="styles.TableHeadingSortButton",
  @click="() => handleSortHeadingClick(index, newDirection)",
)
  span(:class="className")
    Icon(:source="source", :accessibility-label="sortAccessibilityLabel")
  HeadingContent(:heading="heading")
HeadingContent(v-else, :heading="heading")
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import SortAscendingMajor from '@icons/SortAscendingMajor.svg';
import SortDescendingMajor from '@icons/SortDescendingMajor.svg';
import { UseI18n } from '@/use';
import { UnstyledButton, Icon } from '@/components';
import styles from '@/classes/IndexTable.json';
import HeadingContent from './HeadingContent.vue';
import type { IndexTableSortDirection, IndexTableHeading } from '../utils';

interface Props {
  heading: IndexTableHeading,
  index: number,
  sortable?: boolean[];
  defaultSortDirection?: IndexTableSortDirection;
  sortDirection?: IndexTableSortDirection;
  sortColumnIndex?: number;
}

const props = withDefaults(defineProps<Props>(), {
  defaultSortDirection: 'descending',
});

const emits = defineEmits<{
  (e: 'sort', sortColumnIndex: number, sortDirection: IndexTableSortDirection): void;
}>();

const i18n = UseI18n();

const isCurrentlySorted = computed(() => props.index === props.sortColumnIndex);
const isAscending = computed(() => props.sortDirection === 'ascending');
const newDirection = computed(() => {
  if (isCurrentlySorted.value) {
    return isAscending.value ? 'descending' : 'ascending';
  }
  return props.defaultSortDirection;
});
const source = computed(() => {
  if (isCurrentlySorted.value) {
    return props.sortDirection === 'ascending'
      ? SortAscendingMajor
      : SortDescendingMajor;
  }

  return props.defaultSortDirection === 'ascending'
    ? SortAscendingMajor
    : SortDescendingMajor;
});

const sortAccessibilityLabel = computed(() => i18n.translate(
  'Polaris.IndexTable.sortAccessibilityLabel',
  { direction: newDirection.value  },
));

const className = computed(() => classNames(
  styles.TableHeadingSortIcon,
  isCurrentlySorted.value && styles['TableHeadingSortIcon-visible'],
));

const handleSortHeadingClick = (
  index: number,
  direction: IndexTableSortDirection,
) => {
  emits('sort', index, direction);
}
</script>
