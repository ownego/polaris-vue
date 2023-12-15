<template lang="pug">
component(
  :is="as",
  :class="className",
  :style="sanitizeCustomProperties(style)",
)
  slot
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import {
  getResponsiveProps,
  classNames,
  sanitizeCustomProperties,
} from '@/utilities/css';
import type { VueNode } from '@/utilities/types';
import type { BoxProps } from './types';

export type BoxSlots = {
  /** Inner content of the box */
  default: (_: VueNode) => null;
}

const props = withDefaults(defineProps<BoxProps>(), {
  as: 'div',
});

defineSlots<BoxSlots>();

// defineEmits<{
//   /** Callback when the theme is changed by the user */
//   updated: [id: number];
//   /** Callback when the theme is changed by the user */
//   bar: [name: string, attr: string, value: number];
// }>();

const styles = useCssModule();

const borderStyleValue = props.borderStyle
  ? props.borderStyle
  : props.borderColor ||
    props.borderWidth ||
    props.borderBlockStartWidth ||
    props.borderBlockEndWidth ||
    props.borderInlineStartWidth ||
    props.borderInlineEndWidth
  ? 'solid'
  : undefined;

// eslint-disable-next-line no-nested-ternary
const outlineStyleValue = props.outlineStyle
  ? props.outlineStyle
  : props.outlineColor || props.outlineWidth
  ? 'solid'
  : undefined;

const style = {
  '--pc-box-color': props.color ? `var(--p-color-${props.color})` : undefined,
  '--pc-box-background': props.background
    ? `var(--p-color-${props.background})`
    : undefined,
  // eslint-disable-next-line no-nested-ternary
  '--pc-box-border-color': props.borderColor
    ? props.borderColor === 'transparent'
      ? 'transparent'
      : `var(--p-color-${props.borderColor})`
    : undefined,
  '--pc-box-border-style': borderStyleValue,
  '--pc-box-border-radius': props.borderRadius
    ? `var(--p-border-radius-${props.borderRadius})`
    : undefined,
  '--pc-box-border-end-start-radius': props.borderEndStartRadius
    ? `var(--p-border-radius-${props.borderEndStartRadius})`
    : undefined,
  '--pc-box-border-end-end-radius': props.borderEndEndRadius
    ? `var(--p-border-radius-${props.borderEndEndRadius})`
    : undefined,
  '--pc-box-border-start-start-radius': props.borderStartStartRadius
    ? `var(--p-border-radius-${props.borderStartStartRadius})`
    : undefined,
  '--pc-box-border-start-end-radius': props.borderStartEndRadius
    ? `var(--p-border-radius-${props.borderStartEndRadius})`
    : undefined,
  '--pc-box-border-width': props.borderWidth
    ? `var(--p-border-width-${props.borderWidth})`
    : undefined,
  '--pc-box-border-block-start-width': props.borderBlockStartWidth
    ? `var(--p-border-width-${props.borderBlockStartWidth})`
    : undefined,
  '--pc-box-border-block-end-width': props.borderBlockEndWidth
    ? `var(--p-border-width-${props.borderBlockEndWidth})`
    : undefined,
  '--pc-box-border-inline-start-width': props.borderInlineStartWidth
    ? `var(--p-border-width-${props.borderInlineStartWidth})`
    : undefined,
  '--pc-box-border-inline-end-width': props.borderInlineEndWidth
    ? `var(--p-border-width-${props.borderInlineEndWidth})`
    : undefined,
  '--pc-box-min-height': props.minHeight,
  '--pc-box-min-width': props.minWidth,
  '--pc-box-max-width': props.maxWidth,
  '--pc-box-outline-color': props.outlineColor
    ? `var(--p-color-${props.outlineColor})`
    : undefined,
  '--pc-box-outline-style': outlineStyleValue,
  '--pc-box-outline-width': props.outlineWidth
    ? `var(--p-border-width-${props.outlineWidth})`
    : undefined,
  '--pc-box-overflow-x': props.overflowX,
  '--pc-box-overflow-y': props.overflowY,
  ...getResponsiveProps(
    'box',
    'padding-block-start',
    'space',
    props.paddingBlockStart || props.paddingBlock || props.padding,
  ),
  ...getResponsiveProps(
    'box',
    'padding-block-end',
    'space',
    props.paddingBlockEnd || props.paddingBlock || props.padding,
  ),
  ...getResponsiveProps(
    'box',
    'padding-inline-start',
    'space',
    props.paddingInlineStart || props.paddingInline || props.padding,
  ),
  ...getResponsiveProps(
    'box',
    'padding-inline-end',
    'space',
    props.paddingInlineEnd || props.paddingInline || props.padding,
  ),
  '--pc-box-shadow': props.shadow ? `var(--p-shadow-${props.shadow})` : undefined,
  '--pc-box-width': props.width,
  position: props.position,
  '--pc-box-inset-block-start': props.insetBlockStart
    ? `var(--p-space-${props.insetBlockStart})`
    : undefined,
  '--pc-box-inset-block-end': props.insetBlockEnd
    ? `var(--p-space-${props.insetBlockEnd})`
    : undefined,
  '--pc-box-inset-inline-start': props.insetInlineStart
    ? `var(--p-space-${props.insetInlineStart})`
    : undefined,
  '--pc-box-inset-inline-end': props.insetInlineEnd
    ? `var(--p-space-${props.insetInlineEnd})`
    : undefined,
  zIndex: props.zIndex,
  opacity: props.opacity,
}

const className = computed(() => {
  return classNames(
    styles.Box,
    props.visuallyHidden && styles.visuallyHidden,
    props.printHidden && styles.printHidden,
    props.as === 'ul' && styles.listReset,
  );
});
</script>

<style lang="scss" module>
@import '@polaris/components/Box/Box.scss';
</style>
