<template lang="pug">
span(:class="className")
  Image(
    v-if="typeof source === 'string'",
    :alt="alt",
    :source="source",
  )
  Icon(
    v-else,
    :accessibilityLabel="alt",
    :source="source",
  )
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames, variationName } from '@/utilities/css';
import { type IconSource } from '@/utilities/types';
import styles from '@polaris/components/Thumbnail/Thumbnail.module.css';
import type { Source } from '../Icon/type';

type Size = 'extraSmall' | 'small' | 'medium' | 'large';

export interface ThumbnailProps {
  /**
   * Size of thumbnail
   * @default 'medium'
   */
  size?: Size;
  /** URL for the image */
    source: string | Source | IconSource;
  /** Alt text for the thumbnail image */
  alt: string;
  /** Transparent background */
  transparent?: boolean;
}

const props = withDefaults(defineProps<ThumbnailProps>(), {
  size: 'medium',
});

const className = computed(() =>
  classNames(
    styles.Thumbnail,
    props.size && styles[variationName('size', props.size)],
    props.transparent && styles.transparent,
  ),
);

</script>
