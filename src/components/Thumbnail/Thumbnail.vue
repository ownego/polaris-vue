<template lang="pug">
span(:class="className")
  Image(
    v-if="typeof source === 'string'",
    :alt="alt",
    :source="source",
  )
  Icon(v-else, :accessibilityLabel="alt", :source="source")
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames, variationName } from 'polaris-react/src/utilities/css';
import type { IconSource } from '@/utilities/type';
import styles from '@/classes/Thumbnail.json';
import { Image } from '../Image';
import { Icon } from '../Icon';

type Size = 'small' | 'medium' | 'large';

interface Props {
  /**
   * Size of thumbnail
   * @default 'medium'
   */
  size?: Size;
  /** URL for the image */
  source: string | IconSource;
  /** Alt text for the thumbnail image */
  alt: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
});

const className = computed(() => {
  const size = variationName('size', props.size) as keyof typeof styles;

  return classNames(
    styles.Thumbnail,
    size && styles[size],
  );
})
</script>

<style lang="scss">
@import 'polaris-react/src/components/Thumbnail/Thumbnail.scss';
</style>
