<template lang="pug">
div(:class="styles.Navigation", :ref="setRef")
  Button(
    plain,
    :icon="ChevronLeftIcon",
    :disabled="isScrolledFarthestLeft",
    :accessibilityLabel="leftA11yLabel",
    @click="emits('navigate-table-left')",
  )
  template(
    v-for="column, index in columnVisibilityData",
    :key="`pip-${index}`",
  )
    div(
      v-if="fixedFirstColumns <= index",
      :class="classNames(styles.Pip, column.isVisible && styles['Pip-visible'])",
    )
  Button(
    plain,
    :icon="ChevronRightIcon",
    :disabled="isScrolledFarthestRight",
    :accessibilityLabel="rightA11yLabel",
    @click="emits('navigate-table-right')",
  )
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { classNames } from '@/utilities/css';
import useI18n from '@/use/useI18n';
import { Button } from '@/components';
import type { ColumnVisibilityData } from '../../types';

import styles from '@polaris/components/DataTable/DataTable.module.scss';
import ChevronLeftIcon from '@icons/ChevronLeftIcon.svg';
import ChevronRightIcon from '@icons/ChevronRightIcon.svg';

export type NavigationProps = {
  columnVisibilityData: ColumnVisibilityData[];
  isScrolledFarthestLeft?: boolean;
  isScrolledFarthestRight?: boolean;
  fixedFirstColumns: number;
  setRef?: (ref: any) => void;
};

type NavigationEvents = {
  'navigate-table-left': [];
  'navigate-table-right': [];
}

defineProps<NavigationProps>();
const emits = defineEmits<NavigationEvents>();

const i18n = useI18n();

const navigationRef = ref<HTMLDivElement | null>(null);

const leftA11yLabel = i18n.translate(
  'Polaris.DataTable.navAccessibilityLabel',
  { direction: 'left' },
);

const rightA11yLabel = i18n.translate(
  'Polaris.DataTable.navAccessibilityLabel',
  { direction: 'right' },
);

defineExpose({ el: navigationRef });
</script>
