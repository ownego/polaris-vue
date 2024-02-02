<template lang="pug">
div(:class="classNames(styles.Tabs, fitted && styles.fitted)")
  div(
    v-for="index in count",
    :key="index",
    :class="classNames(styles.Tab)",
  )
    div(:class="styles.TabText")
</template>

<script setup lang="ts">
import { classNames } from '@/utilities/css';
import styles from '@polaris/components/SkeletonTabs/SkeletonTabs.module.scss';

export interface SkeletonTabsProps {
  count?: number;
  /** Fit tabs to container */
  fitted?: boolean;
}

withDefaults(defineProps<SkeletonTabsProps>(), {
  count: 2,
  fitted: false,
});
</script>
