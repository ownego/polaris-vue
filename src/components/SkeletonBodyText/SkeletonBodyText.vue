<template lang="pug">
div(:class="styles.SkeletonBodyTextContainer")
  div(
    v-for="index in lines",
    :class="styles.SkeletonBodyText",
    :key="index",
  )
</template>

<script setup lang="ts">
import styles from '@polaris/components/SkeletonBodyText/SkeletonBodyText.module.scss';

export interface SkeletonBodyTextProps {
  /**
   * Number of lines to display
   * @default 3
   */
  lines?: number;
}

withDefaults(defineProps<SkeletonBodyTextProps>(), {
  lines: 3,
});
</script>
