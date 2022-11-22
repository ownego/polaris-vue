<template lang="pug">
component(
  :is="componentName",
  :class="className",
  :id="id",
)
  slot
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from '@/utilities/css';
import styles from '@/classes/Text.json';

type Element =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'legend';

type Variant =
  | 'headingXs'
  | 'headingSm'
  | 'headingMd'
  | 'headingLg'
  | 'headingXl'
  | 'heading2xl'
  | 'heading3xl'
  | 'heading4xl'
  | 'bodySm'
  | 'bodyMd'
  | 'bodyLg';

type Alignment = 'start' | 'center' | 'end' | 'justify';

type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold';

type Color = 'success' | 'critical' | 'warning' | 'subdued' | 'text-inverse';

const VariantFontWeightMapping: {[V in Variant]: FontWeight} = {
  headingXs: 'semibold',
  headingSm: 'semibold',
  headingMd: 'semibold',
  headingLg: 'semibold',
  headingXl: 'semibold',
  heading2xl: 'semibold',
  heading3xl: 'semibold',
  heading4xl: 'bold',
  bodySm: 'regular',
  bodyMd: 'regular',
  bodyLg: 'regular',
};

interface TextProps {
  /** Adjust horizontal alignment of text */
  alignment?: Alignment;
  /** The element type */
  as: Element;
  /** Prevent text from overflowing */
  breakWord?: boolean;
  /** Adjust color of text */
  color?: Color;
  /** Adjust weight of text */
  fontWeight?: FontWeight;
  /** HTML id attribute */
  id?: string;
  /** Truncate text overflow with ellipsis */
  truncate?: boolean;
  /** Typographic style of text */
  variant: Variant;
  /** Visually hide the text */
  visuallyHidden?: boolean;
}

const props = withDefaults(defineProps<TextProps>(), {
  truncate: false,
  visuallyHidden: false,
});

const componentName = computed(() => props.as || (props.visuallyHidden ? 'span' : 'p'));

const className = computed(() => classNames(
  styles.root,
  styles[props.variant],
  props.fontWeight ? styles[props.fontWeight] : styles[VariantFontWeightMapping[props.variant]],
  (props.alignment || props.truncate) && styles.block,
  props.alignment && styles[props.alignment],
  props.breakWord && styles.break,
  props.color && styles[props.color],
  props.truncate && styles.truncate,
  props.visuallyHidden && styles.visuallyHidden,
));
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Text/Text.scss';
</style>
