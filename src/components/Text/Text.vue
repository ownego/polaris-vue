<template lang="pug">
component(
  :is="element",
  :class="className",
  :id="id",
)
  slot
</template>

<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import { classNames } from '@/utilities/css';

type Element =
  | 'dt'
  | 'dd'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'strong'
  | 'legend';

type Variant =
  | 'headingSm'
  | 'headingMd'
  | 'headingLg'
  | 'headingXl'
  | 'heading2xl'
  | 'heading3xl'
  | 'bodyXs'
  | 'bodySm'
  | 'bodyMd'
  | 'bodyLg';

type Alignment = 'start' | 'center' | 'end' | 'justify';

type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold';

type Tone =
  | 'success'
  | 'critical'
  | 'caution'
  | 'subdued'
  | 'text-inverse'
  | 'magic'
  | 'magic-subdued';

type TextDecorationLine = 'line-through';

/**
 * This component will not use children props because of slot method in vue can do the same thing
 */

export interface TextProps {
  /** Adjust horizontal alignment of text */
  alignment?: Alignment;
  /** The element type */
  as: Element;
  /** Prevent text from overflowing */
  breakWord?: boolean;
  /** Adjust tone of text */
  tone?: Tone;
  /** Adjust weight of text */
  fontWeight?: FontWeight;
  /** HTML id attribute */
  id?: string;
  /** Use a numeric font variant with monospace appearance */
  numeric?: boolean;
  /** Truncate text overflow with ellipsis */
  truncate?: boolean;
  /** Typographic style of text */
  variant?: Variant;
  /** Visually hide the text */
  visuallyHidden?: boolean;
  /** Add a line-through to the text */
  textDecorationLine?: TextDecorationLine;
}

const styles = useCssModule();

const props = withDefaults(defineProps<TextProps>(), {
  numeric: false,
  truncate: false,
  visuallyHidden: false,
});

const className = computed(() => classNames(
  styles.root,
  props.variant && styles[props.variant],
  props.fontWeight && styles[props.fontWeight],
  (props.alignment || props.truncate) && styles.block,
  props.alignment && styles[props.alignment],
  props.breakWord && styles.breakWord,
  props.tone && styles[props.tone],
  props.numeric && styles.numeric,
  props.truncate && styles.truncate,
  props.visuallyHidden && styles.visuallyHidden, 
  props.textDecorationLine && styles[props.textDecorationLine],
))

const element = computed(() => {
  if (props.as) {
    return props.as;
  }

  return props.visuallyHidden ? 'span' : 'p';
});
</script>

<style lang="scss" module>
@import '@polaris/components/Text/Text.scss';
</style>

