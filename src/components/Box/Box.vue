<template lang="pug">
component(
  :is="as",
  :class="className",
  :id="id",
  :ref="ref",
  :style="style",
)
  slot
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { classNames } from '@/utilities/css';

import type {
  DepthShadowAlias,
  SpacingSpaceScale,
} from '@shopify/polaris-tokens';

import type { BackgroundColorTokenScale } from './utils';
import styles from '@/classes/Box.json';

type Element = 'div' | 'span' | 'section';

type Overflow = 'hidden' | 'scroll';

type ColorTokenScale =
  | 'text'
  | 'text-critical'
  | 'text-disabled'
  | 'text-highlight'
  | 'text-on-critical'
  | 'text-on-dark'
  | 'text-on-interactive'
  | 'text-on-primary'
  | 'text-primary'
  | 'text-primary-hovered'
  | 'text-primary-pressed'
  | 'text-subdued'
  | 'text-subdued-on-dark'
  | 'text-success'
  | 'text-warning';

type BorderTokenAlias =
  | 'base'
  | 'dark'
  | 'divider'
  | 'divider-on-dark'
  | 'transparent';

interface Border {
  blockStart: BorderTokenAlias;
  blockEnd: BorderTokenAlias;
  inlineStart: BorderTokenAlias;
  inlineEnd: BorderTokenAlias;
}

type BorderRadiusTokenScale =
  | '05'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | 'base'
  | 'large'
  | 'half';

interface BorderRadius {
  startStart: BorderRadiusTokenScale;
  startEnd: BorderRadiusTokenScale;
  endStart: BorderRadiusTokenScale;
  endEnd: BorderRadiusTokenScale;
}

interface Spacing {
  blockStart: SpacingSpaceScale;
  blockEnd: SpacingSpaceScale;
  inlineStart: SpacingSpaceScale;
  inlineEnd: SpacingSpaceScale;
}

interface Props {
  /** HTML Element type */
  as?: Element;
  /** Background color */
  background?: BackgroundColorTokenScale;
  /** Border style */
  border?: BorderTokenAlias;
  /** Vertical end border style */
  borderBlockEnd?: BorderTokenAlias;
  /** Horizontal start border style */
  borderInlineStart?: BorderTokenAlias;
  /** Horizontal end border style */
  borderInlineEnd?: BorderTokenAlias;
  /** Vertical start border style */
  borderBlockStart?: BorderTokenAlias;
  /** Border radius */
  borderRadius?: BorderRadiusTokenScale;
  /** Vertical end horizontal start border radius */
  borderRadiusEndStart?: BorderRadiusTokenScale;
  /** Vertical end horizontal end border radius */
  borderRadiusEndEnd?: BorderRadiusTokenScale;
  /** Vertical start horizontal start border radius */
  borderRadiusStartStart?: BorderRadiusTokenScale;
  /** Verital start horizontal end border radius */
  borderRadiusStartEnd?: BorderRadiusTokenScale;
  /** Color of children */
  color?: ColorTokenScale;
  /** HTML id attribute */
  id?: string;
  /** Set minimum height of container */
  minHeight?: string;
  /** Set minimum width of container */
  minWidth?: string;
  /** Set maximum width of container */
  maxWidth?: string;
  /** Clip horizontal content of children */
  overflowX?: Overflow;
  /** Clip vertical content of children */
  overflowY?: Overflow;
  /** Spacing around children */
  padding?: SpacingSpaceScale;
  /** Vertical start spacing around children */
  paddingBlockStart?: SpacingSpaceScale;
  /** Vertical end spacing around children */
  paddingBlockEnd?: SpacingSpaceScale;
  /** Horizontal start spacing around children */
  paddingInlineStart?: SpacingSpaceScale;
  /** Horizontal end spacing around children */
  paddingInlineEnd?: SpacingSpaceScale;
  /** Shadow */
  shadow?: DepthShadowAlias;
  /** Set width of container */
  width?: string;
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
});

const borders = computed(() => ({
  blockEnd: props.borderBlockEnd,
  inlineStart: props.borderInlineStart,
  inlineEnd: props.borderInlineEnd,
  blockStart: props.borderBlockStart,
} as Border));

const borderRadiuses = computed(() => ({
  endStart: props.borderRadiusEndStart,
  endEnd: props.borderRadiusEndEnd,
  startStart: props.borderRadiusStartStart,
  startEnd: props.borderRadiusStartEnd,
} as BorderRadius));

const paddings = computed(() => ({
  blockEnd: props.paddingBlockEnd,
  inlineStart: props.paddingInlineStart,
  inlineEnd: props.paddingInlineEnd,
  blockStart: props.paddingBlockStart,
} as Spacing));

const style = computed(() => {
  const fullStyle = {
    '--pc-box-color': props.color ? `var(--p-${props.color})` : undefined,
    '--pc-box-background': props.background ? `var(--p-${props.background})` : undefined,
    '--pc-box-border': props.border ? `var(--p-border-${props.border})` : undefined,
    '--pc-box-border-block-end': borders.value.blockEnd
      ? `var(--p-border-${borders.value.blockEnd})`
      : undefined,
    '--pc-box-border-inline-start': borders.value.inlineStart
      ? `var(--p-border-${borders.value.inlineStart})`
      : undefined,
    '--pc-box-border-inline-end': borders.value.inlineEnd
      ? `var(--p-border-${borders.value.inlineEnd})`
      : undefined,
    '--pc-box-border-block-start': borders.value.blockStart
      ? `var(--p-border-${borders.value.blockStart})`
      : undefined,
    '--pc-box-border-radius': props.borderRadius
      ? `var(--p-border-radius-${props.borderRadius})`
      : undefined,
    '--pc-box-border-radius-end-start': borderRadiuses.value.endStart
      ? `var(--p-border-radius-${borderRadiuses.value.endStart})`
      : undefined,
    '--pc-box-border-radius-end-end': borderRadiuses.value.endEnd
      ? `var(--p-border-radius-${borderRadiuses.value.endEnd})`
      : undefined,
    '--pc-box-border-radius-start-start': borderRadiuses.value.startStart
      ? `var(--p-border-radius-${borderRadiuses.value.startStart})`
      : undefined,
    '--pc-box-border-radius-start-end': borderRadiuses.value.startEnd
      ? `var(--p-border-radius-${borderRadiuses.value.startEnd})`
      : undefined,
    '--pc-box-min-height': props.minHeight,
    '--pc-box-min-width': props.minWidth,
    '--pc-box-max-width': props.maxWidth,
    '--pc-box-overflow-x': props.overflowX,
    '--pc-box-overflow-y': props.overflowY,
    '--pc-box-padding': props.padding ? `var(--p-space-${props.padding})` : undefined,
    '--pc-box-padding-block-end': paddings.value.blockEnd
      ? `var(--p-space-${paddings.value.blockEnd})`
      : undefined,
    '--pc-box-padding-inline-start': paddings.value.inlineStart
      ? `var(--p-space-${paddings.value.inlineStart})`
      : undefined,
    '--pc-box-padding-inline-end': paddings.value.inlineEnd
      ? `var(--p-space-${paddings.value.inlineEnd})`
      : undefined,
    '--pc-box-padding-block-start': paddings.value.blockStart
      ? `var(--p-space-${paddings.value.blockStart})`
      : undefined,
    '--pc-box-shadow': props.shadow ? `var(--p-shadow-${props.shadow})` : undefined,
    '--pc-box-width': props.width,
  };

  // Remove all undefined values
  return Object.keys(fullStyle).reduce((acc, key) => {
    if (fullStyle[key] !== undefined) {
      acc[key] = fullStyle[key];
    }
    return acc;
  }, {} as Record<string, string>);
});

const className = classNames(styles.Box);
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Box/Box.scss';
</style>
