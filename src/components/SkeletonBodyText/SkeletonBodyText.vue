<template lang="pug">
div(
  v-for="index in lines",
  :key="index",
  :class="styles.SkeletonBodyText",
)
</template>

<script setup lang="ts">
import styles from '@/classes/SkeletonBodyText.json';

interface Props {
  /**
   * Number of lines to display
   * @default 3
   */
  lines?: number;
}

withDefaults(defineProps<Props>(), {
  lines: 3,
});

</script>
<style lang="scss">
@import 'polaris-react/src/components/SkeletonBodyText/SkeletonBodyText.scss';
</style>

