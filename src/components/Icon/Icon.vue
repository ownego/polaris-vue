<template lang="pug">
span(:class="className")
  Text(
    v-if="accessibilityLabel",
    as="span",
  )

  component(
    :is="source",
    v-if="sourceType === 'function'",
    :class="className",
    :focusable="false",
    :aria-hidden="true",
  )

  div(
    v-if="sourceType === 'placeholder'",
    :class="styles.placeholder",
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
import { useCssModule, computed } from 'vue';
import { classNames, variationName } from '@/utilities/css';
import { Text } from '@/components';
import type { IconSource } from '@/utilities/types';
import type {
  Tone,
  Source,
} from './type';

export type IconProps = {
  /** The SVG contents to display in the icon (icons should fit in a 20 × 20 pixel viewBox) */
  source: IconSource;
  /** Set the color for the SVG fill */
  tone?: Tone;
  /** Descriptive text to be read to screenreaders */
  accessibilityLabel?: string;
};

const styles = useCssModule();

const props = defineProps<IconProps>();

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
))

if (
  props.tone
  && sourceType.value === 'external'
  // TODO: modify this condition to make it only work in dev env
) {
  console.warn('Recoloring external SVGs is not supported. Set the intended color on your SVG instead.');
}
</script>

<style lang="scss" module>
@import '@polaris/components/Icon/Icon.scss';
</style>
