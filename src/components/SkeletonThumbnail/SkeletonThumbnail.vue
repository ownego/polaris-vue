<template lang="pug">
div(:class="className")
</template>
<script setup lang="ts">
import { classNames, variationName } from 'polaris/polaris-react/src/utilities/css';
import styles from '@/classes/SkeletonThumbnail.json';

type Size = 'extraSmall' | 'small' | 'medium' | 'large';

interface Props {
  /**
   * Size of the thumbnail
   * @default 'medium'
   */
  size?: Size;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
});

const className = classNames(
  styles.SkeletonThumbnail,
  props.size && styles[variationName('size', props.size)],
);
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/SkeletonThumbnail/SkeletonThumbnail.scss';
</style>
