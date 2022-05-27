<template lang="pug">
div(:class="className")
  progress(
    :class="styles.Progress",
    :value="parsedProgress",
    max="100",
  )
  transition(
    appear,
    :duration="parseInt(progressBarDuration, 10)",
    @enter="onTransitionEnter",
  )
    div(
      :class="classNames(styles.Indicator)",
      :style="indicatorStyles",
    )
      span(:class="styles.Label") {{ parsedProgress }}%
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames, variationName } from 'polaris/polaris-react/src/utilities/css';
import { tokens } from '@shopify/polaris-tokens';
import { UseI18n } from '@/use';
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

const i18n = UseI18n();

const className =  computed(() => classNames(
  styles.ProgressBar,
  props.size && styles[variationName('size', props.size)],
  props.color && styles[variationName('color', props.color)],
));

const warningMessage = computed(() => {
  return props.progress < 0
    ? i18n.translate('Polaris.ProgressBar.negativeWarningMessage', { progress: props.progress })
    : i18n.translate('Polaris.ProgressBar.exceedWarningMessage', { progress: props.progress });
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

const progressBarDuration = computed(() => props.animated
  ? tokens.motion['duration-500'].value
  : tokens.motion['duration-0'].value,
);

const indicatorStyles = computed(() => {
  return {
    '--pc-progress-bar-duration': progressBarDuration.value,
    '--pc-progress-bar-percent': parsedProgress.value / 100,
  } as any;
});

const parsedProgress = computed(() => parseProgress(props.progress, warningMessage.value));

const onTransitionEnter = (el: Element, done) => {
  setTimeout(() => {
    el.classList.add(styles.IndicatorAppearDone);
    done();
  }, 1);
}
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/ProgressBar/ProgressBar.scss';
</style>
