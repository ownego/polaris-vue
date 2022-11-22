<template lang="pug">
div(:class="styles.Inline", :style="style")
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { SpacingSpaceScale } from '@shopify/polaris-tokens';
import styles from '@/classes/Inline.json';

type Align =
  | 'start'
  | 'center'
  | 'end'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';

  type BlockAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch';

interface Props {
  /** Adjust horizontal alignment of elements
   * @default 'start'
   */
   align?: Align;
  /** Adjust vertical alignment of elements
   * @default 'center'
   */
  blockAlign?: BlockAlign;
  /** The spacing between elements
   * @default '4'
   */
  spacing?: SpacingSpaceScale;
  /** Wrap stack elements to additional rows as needed on small screens
   * @default true
   */
  wrap?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  align: 'start',
  blockAlign: 'center',
  spacing: '4',
  wrap: true,
});

const style = computed(() => {
  const fullStyles = {
    '--pc-inline-align': props.align,
    '--pc-inline-block-align': props.blockAlign,
    '--pc-inline-wrap': props.wrap ? 'wrap' : 'nowrap',
    '--pc-inline-spacing': `var(--p-space-${props.spacing})`,
  };

  return Object.fromEntries(Object.entries(fullStyles).filter(([, value]) => value));
});
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Inline/Inline.scss';
</style>
