<template lang="pug">
span(:class="className")
  VisuallyHidden
    span {{ accessibilityLabel }}
  component(
    v-if="sourceType === 'icon'",
    :is="source",
    :class="styles.Svg",
  )
  div(
    v-else-if="sourceType === 'placeholder'",
    :class="styles.Placeholder",
  )
  img(
    v-else,
    :class="styles.Img",
    :src="`data:image/svg+xml;utf8,${encodedSvg}`",
    alt="",
    aria-hidden="true",
  )
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { classNames, variationName } from 'polaris-react/src/utilities/css';
import styles from '@/classes/Icon.json';
import config from '@/config';
import type { IconSource } from 'types/type';
import { VisuallyHidden } from '../VisuallyHidden';

type Color = 'base' | 'subdued' | 'critical' | 'interactive' | 'warning' | 'highlight' | 'success' | 'primary';

const COLORS_WITH_BACKDROPS: string[] = ['base', 'critical', 'highlight', 'success', 'warning'];

interface Props {
  /** The contents to display in the icon */
  source: IconSource;
  /** Set the color for the icon */
  color?: Color;
  /** Show a backdrop behind the icon */
  backdrop?: boolean;
  /** Descriptive text to be read to screenreaders */
  accessibilityLabel?: string;
}

const props = defineProps<Props>();

const colorClassName = computed(() => props.color
    && styles[variationName('color', props.color) as keyof typeof styles]);
const className = computed(() => classNames(
  styles.Icon,
  colorClassName.value,
  props.color && styles.applyColor,
  props.backdrop && styles.hasBackdrop,
));

const sourceType = computed(() => {
  if (typeof props.source === 'object') {
    return 'icon';
  }

  if (props.source === 'placeholder') {
    return 'placeholder';
  }

  return 'external';
});

const encodedSvg = computed(() => sourceType.value === 'external' 
  ? encodeURIComponent(String(props.source))
  : '',
);

const checkSupportedSvg = (): void => {
  if (
    props.color
    && sourceType.value === 'external'
    && config.env === 'development'
  ) {
    console.warn(
      'Recoloring external SVGs is not supported. Set the intended color on your SVG instead.',
    );
  }
};

const checkSupportedBackdrop = (): void => {
  if (
    props.backdrop
    && props.color
    && !COLORS_WITH_BACKDROPS.includes(props.color)
    && config.env === 'development'
  ) {
    console.warn(`The ${props.color} variant does not have a supported backdrop color`);
  }
};

onMounted(() => {
  checkSupportedSvg();
  checkSupportedBackdrop();
});
</script>

<style lang="scss">
@import 'polaris-react/src/components/Icon/Icon.scss';
</style>
