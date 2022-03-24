<template lang="pug">
div(
  :class="className",
)
</template>
<script setup lang="ts">
import styles from '@/classes/SkeletonDisplayText.json';
import { classNames, variationName } from 'polaris-react/src/utilities/css';

type Size = 'small' | 'medium' | 'large' | 'extraLarge';

interface Props {
  /**
   * Size of the text
   * @default 'medium'
   */
  size?: Size;
}
const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
});

const className = classNames(
  styles.DisplayText,
  props.size && styles[variationName('size', props.size)],
);
</script>
<style lang="scss">
@import 'polaris-react/src/components/SkeletonDisplayText/SkeletonDisplayText.scss';
</style>
