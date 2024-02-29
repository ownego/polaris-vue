<template lang="pug">
div(
  v-if="pagination && !isNavigationCollapsed",
  :class="styles.PaginationWrapper",
)
  Box(printHidden)
    Pagination(v-bind="pagination")
      template(v-if="hasSlot(slots.default)")
        slot
</template>

<script setup lang="ts">
import { useSlots } from 'vue';
import type { PaginationProps } from '@/components/Pagination/types.ts';
import { useMediaQueryContext } from '@/use/useMediaQuery';
import { useHasSlot } from '@/use/useHasSlot';
import styles from '@polaris/components/Page/components/Header/Header.module.scss';

defineProps<{
  pagination?: PaginationProps;
}>();

const slots = useSlots();
const { hasSlot } = useHasSlot();
const { isNavigationCollapsed } = useMediaQueryContext();
</script>
