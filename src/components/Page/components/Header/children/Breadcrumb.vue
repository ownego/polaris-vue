<template lang="pug">
div(
  v-if="breadcrumbs.length > 0",
  :class="styles.BreadcrumbWrapper"
)
  Breadcrumbs(:breadcrumbs="breadcrumbs")
</template>

<script setup lang="ts">
import styles from '@/classes/Page-Header.json';
import { Breadcrumbs } from '@/components';
import type { CallbackAction, LinkAction } from '@/utilities/type';

defineProps<{
  breadcrumbs: (CallbackAction | LinkAction)[];
}>();
</script>
