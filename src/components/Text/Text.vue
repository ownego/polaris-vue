<template lang="pug">
component(
  :is="element",
  :class="className",
  :id="id",
)
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from '@/utilities/css';
import type { VueNode } from '@/utilities/types';
import type {
  Alignment,
  Element,
  Tone,
  FontWeight,
  Variant,
  TextDecorationLine,
} from './types';
import styles from '@polaris/components/Text/Text.module.scss';

/**
 * This component will not use children props because of slot method in vue can do the same thing
 */
export type TextProps = {
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

export type TextSlots = {
  /** Text to display */
  default: (_: VueNode) => null;
}

const deprecatedVariants: {[V in Variant]?: Variant} = {
  heading2xl: 'headingXl',
  heading3xl: 'headingXl',
};

const props = withDefaults(defineProps<TextProps>(), {
  numeric: false,
  truncate: false,
  visuallyHidden: false,
});

defineSlots<TextSlots>();

if (
  process.env.NODE_ENV === 'development' &&
  props.variant &&
  Object.prototype.hasOwnProperty.call(deprecatedVariants, props.variant)
) {
  // eslint-disable-next-line no-console
  console.warn(
    `Deprecation: <Text variant="${props.variant}" />. The value "${props.variant}" will be removed in a future major version of Polaris. Use "${deprecatedVariants[props.variant]}" instead.`,
  );
}

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
