<template lang="pug">
div(:class="styles.Inline", :style="style")
  div(
    v-for="item, index in slotsElms",
    :key="index",
  )
    component(:is="item")
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue';
import type { VNodeArrayChildren } from 'vue';
import type { SpacingSpaceScale } from '@shopify/polaris-tokens';
import { extractElement } from '@/utilities/extract-fragment';
import styles from '@/classes/Inline.json';

const AlignY = {
  top: 'start',
  center: 'center',
  bottom: 'end',
  baseline: 'baseline',
};

type Align = 'start' | 'center' | 'end';

interface Props {
  /** Wrap stack elements to additional rows as needed on small screens (Defaults to true) */
  wrap?: boolean;
  /** Adjust spacing between elements */
  spacing?: SpacingSpaceScale;
  /** Adjust vertical alignment of elements */
  alignY?: keyof typeof AlignY;
  /** Adjust horizontal alignment of elements */
  align?: Align;
}

const props = withDefaults(defineProps<Props>(), {
  spacing: '1',
});

const slots = useSlots();

const style = computed(() => {
  const fullStyles = {
    '--pc-inline-align': props.align,
    '--pc-inline-align-y': props.alignY ? AlignY[props.alignY] : undefined,
    '--pc-inline-wrap': props.wrap ? 'wrap' : 'nowrap',
    '--pc-inline-spacing': `var(--p-space-${props.spacing})`,
  };

  return Object.fromEntries(Object.entries(fullStyles).filter(([, value]) => value));
});

const slotsElms = computed(() => {
  let elms : VNodeArrayChildren = [];
  if (slots.default) {
    const groups = slots.default().map(group => {
      return extractElement(group);
    });
    elms = groups.flat();
  }

  return elms;
});
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Inline/Inline.scss';
</style>
