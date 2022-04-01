<template lang="pug">
div(
  v-if="pagination && !isNavigationCollapsed",
  :class="styles.PaginationWrapper",
)
  Pagination(v-bind="pagination")
    slot
</template>

<script setup lang="ts">
import styles from '@/classes/Page-Header.json';
import { Pagination } from '@/components';
import type { PaginationProps } from '@/components/Pagination/utils';
import { UseMediaQuery } from '@/utilities/media-query';

defineProps<{
  pagination?: PaginationProps;
}>();

const { useMediaQuery } = UseMediaQuery();
const { isNavigationCollapsed } = useMediaQuery();
</script>
