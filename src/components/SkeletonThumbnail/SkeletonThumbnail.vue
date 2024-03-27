<template lang="pug">
div(:class="className")
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames, variationName } from '@/utilities/css';
import styles from '@polaris/components/SkeletonThumbnail/SkeletonThumbnail.module.css';

type Size = 'extraSmall' | 'small' | 'medium' | 'large';

export interface SkeletonThumbnailProps {
  /**
   * Size of the thumbnail
   * @default 'medium'
   */
  size?: Size;
}

const props = withDefaults(defineProps<SkeletonThumbnailProps>(), {
  size: 'medium',
});

const className = computed(() =>
  classNames(
    styles.SkeletonThumbnail,
    props.size && styles[variationName('size', props.size)],
  ),
);
</script>
