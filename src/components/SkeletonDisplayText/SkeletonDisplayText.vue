<template lang="pug">
div(
  :class="className",
  :style="sanitizeCustomProperties({ '--pc-skeleton-display-text-max-width': maxWidth ?? undefined })",
)
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  classNames,
  variationName,
  sanitizeCustomProperties,
} from '@/utilities/css';
import styles from '@polaris/components/SkeletonDisplayText/SkeletonDisplayText.module.scss';

type Size = 'small' | 'medium' | 'large' | 'extraLarge';

export interface SkeletonDisplayTextProps {
  /**
   * Size of the text
   * @default 'medium'
   */
  size?: Size;
  /**
   * Maxium width of the text
   * @default '120px'
   */
  maxWidth?: `${number}ch` | `${number}%`;
}

const props = withDefaults(defineProps<SkeletonDisplayTextProps>(), {
  size: 'medium',
});

const className = computed(() =>
  classNames(
    styles.DisplayText,
    props.size && styles[variationName('size', props.size)],
  ),
);
</script>
