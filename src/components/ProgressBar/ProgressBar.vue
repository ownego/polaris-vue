<template lang="pug">
div(:class="className")
  progress(
    :class="styles.Progress",
    :value="parsedProgress",
    max="100",
  )
  div(
    :class="classNames(styles.Indicator, animated, styles.Animated)",
    :style="{ width: `${parsedProgress}%` }",
  )
    span(:class="styles.Label") {{ parsedProgress }}%
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { classNames, variationName } from 'polaris/polaris-react/src/utilities/css';
import styles from '@/classes/ProgressBar.json';

type Size = 'small' | 'medium' | 'large';
type Color = 'highlight' | 'primary' | 'success' | 'critical';

interface Props {
  /**
   * The progression of certain tasks
   * @default 0
   */
  progress?: number;
  /**
   * Size of progressbar
   * @default 'medium'
   */
  size?: Size;
  /**
   * Color of progressbar
   * @default 'highlight'
   */
  color?: Color;
  /**
   * Whether the fill animation is triggered
   * @default 'true'
   */
  animated?: boolean;
}

const props = withDefaults(defineProps<Props>(),{
  progress: 0,
  size: 'medium',
  color: 'highlight',
  animated: true,
});

const lang = inject('lang') as Record<string, any>;

const className =  computed(() => classNames(
  styles.ProgressBar,
  props.size && styles[variationName('size', props.size)],
  props.color && styles[variationName('color', props.color)],
));

const warningMessage = computed(() => {
  return props.progress < 0
    ? lang.Polaris.ProgressBar.negativeWarningMessage.replace('{progress}', props.progress)
    : lang.Polaris.ProgressBar.exceedWarningMessage.replace('{progress}', props.progress);
});

const parseProgress = (progress: number, message: string) => {
  let progressWidth;
  if (progress < 0) {
    if (import.meta.env.NODE_ENV === 'development') {
      console.warn(message);
    }
    progressWidth = 0;
  } else if (progress > 100) {
    if (import.meta.env.NODE_ENV === 'development') {
      console.warn(message);
    }
    progressWidth = 100;
  } else {
    progressWidth = progress;
  }
  return progressWidth;
}

const parsedProgress = computed(() => parseProgress(props.progress, warningMessage.value));

</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/ProgressBar/ProgressBar.scss';
</style>
