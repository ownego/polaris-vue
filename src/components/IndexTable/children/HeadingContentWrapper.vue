<template lang="pug">
Tooltip(v-if="sortable && sortable[index] && sortToggleLabels", :content="tooltipContent")
  UnstyledButton(
    :class="styles.TableHeadingSortButton",
    @click="() => handleSortHeadingClick(index, newDirection)",
  )
    span(:class="className")
      SourceComponent(
        focusable="false",
        aria-hidden="true",
        :class="styles.TableHeadingSortSvg",
      )

    HeadingContent(:heading="heading")
UnstyledButton(
  v-else-if="sortable && sortable[index]",
  :class="styles.TableHeadingSortButton",
  @click="() => handleSortHeadingClick(index, newDirection)",
)
  span(:class="className")
    SourceComponent(
      focusable="false",
      aria-hidden="true",
      :class="styles.TableHeadingSortSvg",
    )

  HeadingContent(:heading="heading")
HeadingContent(v-else, :heading="heading")
</template>
<script setup lang="ts">
import { computed, VueElement } from 'vue';
import { classNames } from '@/utilities/css';
import SortAscendingMajor from '@icons/SortAscendingMajor.svg';
import SortDescendingMajor from '@icons/SortDescendingMajor.svg';
import { UseI18n } from '@/use';
import { UnstyledButton, Tooltip } from '@/components';
import styles from '@/classes/IndexTable.json';
import HeadingContent from './HeadingContent.vue';
import type { IndexTableSortDirection, IndexTableHeading, IndexTableSortToggleLabels } from '../utils';

interface Props {
  heading: IndexTableHeading,
  index: number,
  sortable?: boolean[];
  defaultSortDirection?: IndexTableSortDirection;
  sortDirection?: IndexTableSortDirection;
  sortColumnIndex?: number;
  sortToggleLabels?: IndexTableSortToggleLabels;
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
const SourceComponent = computed(() => {
  if (isCurrentlySorted.value) {
    return (props.sortDirection === 'ascending'
      ? SortAscendingMajor
      : SortDescendingMajor) as any;
  }

  return (props.defaultSortDirection === 'ascending'
    ? SortAscendingMajor
    : SortDescendingMajor) as any;
});

const className = computed(() => classNames(
  styles.TableHeadingSortIcon,
  isCurrentlySorted.value && styles['TableHeadingSortIcon-visible'],
));

const tooltipDirection = computed(() => (
  isCurrentlySorted.value
    ? props.sortDirection
    : props.defaultSortDirection
));

const tooltipContent = computed(() => props.sortToggleLabels?.[props.index][tooltipDirection.value as string]);

const handleSortHeadingClick = (
  index: number,
  direction: IndexTableSortDirection,
) => {
  emits('sort', index, direction);
}
</script>
