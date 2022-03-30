<template lang="pug">
div(:class="styles.Navigation")
  Breadcrumb(:breadcrumbs="breadcrumbs")
  AdditionalNavigation
    slot
  Pagination(:pagination="pagination")
</template>

<script setup lang="ts">
import styles from '@/classes/Page-Header.json';
import Breadcrumb from './Breadcrumb.vue';
import Pagination from './Pagination.vue';
import AdditionalNavigation from './AdditionalNavigation.vue';
import type { PaginationProps } from '@/components/Pagination/utils';
import type { CallbackAction, LinkAction } from '@/utilities/type';

defineProps<{
  pagination: PaginationProps;
  breadcrumbs: (CallbackAction | LinkAction)[];
}>();
</script>
