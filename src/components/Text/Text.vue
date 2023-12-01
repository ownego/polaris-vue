<template lang="pug">
</template>

<script setup lang="ts">
import {
  type Component,
  computed,
} from 'vue';
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

export interface TextProps {
  /** Adjust horizontal alignment of text */
  alignment?: Alignment;
  /** The element type */
  as: Element;
  /** Prevent text from overflowing */
  breakWord?: boolean;
  /** Text to display */
  children: Component | HTMLElement;
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
</script>

<style lang="scss" module>
@import '@polaris/components/Text/Text.scss';
</style>

