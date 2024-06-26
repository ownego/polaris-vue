<template lang="pug">
span(:class="className")
  Text(
    as="span",
    visually-hidden,
  ) {{ accessibilityLabel }}

  component(
    :is="source",
    v-if="sourceType === 'function'",
    :class="styles.Svg",
    :focusable="false",
    :aria-hidden="true",
    v-bind="iconAttrs",
  )

  div(
    v-if="sourceType === 'placeholder'",
    :class="styles.Placeholder",
  )

  img(
    v-if="sourceType === 'external'",
    alt="",
    :class="styles.Img",
    :src="`data:image/svg+xml;utf8,${source}`",
    :aria-hidden="true",
  )
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames, variationName } from '@/utilities/css';
import { Text } from '@/components';
import type { IconSource } from '@/utilities/types';
import { useBreakpoints } from '@/use/useBreakpoints';
import type {
  Tone,
  Source,
} from './type';
import styles from '@polaris/components/Icon/Icon.module.css';

export type IconProps = {
  /** The SVG contents to display in the icon (icons should fit in a 20 × 20 pixel viewBox) */
  source: IconSource;
  /** Set the color for the SVG fill */
  tone?: Tone;
  /** Descriptive text to be read to screenreaders */
  accessibilityLabel?: string;
};

const props = defineProps<IconProps>();

const breakpoints = useBreakpoints();
const { mdDown } = breakpoints.value;

const sourceType = computed<Source>(() => {
  // Because of svgLoader so we need to check if the source is a function AND an object
  const functionTypes = ['function', 'object']

  if (functionTypes.includes(typeof props.source)) {
    return 'function';
  }

  return props.source === 'placeholder' ? 'placeholder' : 'external';
});

const className = computed(() => classNames(
  styles.Icon,
  props.tone && styles[variationName('tone', props.tone)],
  props.tone && styles.applyColor,
));

const iconAttrs = computed(() => {
  return mdDown ? { viewBox: '1 1 18 18' } : {};
});

if (
  props.tone
  && sourceType.value === 'external'
  // TODO: modify this condition to make it only work in dev env
) {
  console.warn('Recoloring external SVGs is not supported. Set the intended color on your SVG instead.');
}
</script>
