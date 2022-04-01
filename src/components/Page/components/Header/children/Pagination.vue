<template lang="pug">
div(
  v-if="pagination && !isNavigationCollapsed",
  :class="styles.PaginationWrapper",
)
  Pagination(v-bind="pagination")
    template(v-if="hasSlot(slots.default)")
      slot
</template>

<script setup lang="ts">
import { useSlots } from 'vue';
import styles from '@/classes/Page-Header.json';
import { Pagination } from '@/components';
import type { PaginationProps } from '@/components/Pagination/utils';
import { UseMediaQuery } from '@/utilities/media-query';
import { hasSlot } from '@/utilities/has-slot';

defineProps<{
  pagination?: PaginationProps;
}>();

const slots = useSlots();

const { useMediaQuery } = UseMediaQuery();
const { isNavigationCollapsed } = useMediaQuery();
</script>
