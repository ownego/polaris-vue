<template lang="pug">
div(:class="className")
  progress(
    max="100",
    :class="styles.Progress",
    :aria-labelledby="ariaLabelledBy",
    :value="parsedProgress",
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
      span(:class="styles.Label") {{ parsedProgress + " %" }}
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import type { Theme } from '@shopify/polaris-tokens';
import { classNames, variationName } from '@/utilities/css';
import useI18n from '@/use/useI18n';
import styles from '@polaris/components/ProgressBar/ProgressBar.module.scss';

type Size = 'small' | 'medium' | 'large';
type Color = 'highlight' | 'primary' | 'success' | 'critical';

export interface ProgressBarProps {
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
   * Whether the fill animation is triggered
   * @default 'true'
   */
  animated?: boolean;
  /**
   * Id (ids) of element (elements) that describes progressbar
   */
  ariaLabelledBy?: string;
  /**
   * Color of progressbar
   * @default 'highlight'
   */
  color?: Color;
}

const props = withDefaults(defineProps<ProgressBarProps>(), {
  progress: 0,
  size: 'medium',
  color: 'highlight',
  animated: true,
});

const theme = inject('theme', {} as Theme);
const i18n = useI18n();

const className = computed(() =>
  classNames(
    styles.ProgressBar,
    props.size && styles[variationName('size', props.size)],
    props.color && styles[variationName('tone', props.color)],
  ),
);

const warningMessage = computed(() =>
  i18n.translate(
    props.progress < 0
      ? 'Polaris.ProgressBar.negativeWarningMessage'
      : 'Polaris.ProgressBar.exceedWarningMessage',
    { progress: props.progress },
  ),
);

const parsedProgress = computed(() => {
  if (props.progress < 0) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(warningMessage.value);
    }

    return 0;
  } else if (props.progress > 100) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(warningMessage.value);
    }

    return 100;
  }

  return props.progress;
});

const progressBarDuration = computed(() =>
  props.animated
    ? theme.motion['motion-duration-500']
    : theme.motion['motion-duration-0'],
);

const indicatorStyles = computed(() => (
  {
    '--pc-progress-bar-duration': progressBarDuration.value,
    '--pc-progress-bar-percent': parsedProgress.value / 100,
  }
));

const onTransitionEnter = (el: Element, done: () => void) => {
  setTimeout(() => {
    el.classList.add(styles.IndicatorAppearDone);
    done();
  }, 1);
}
</script>
