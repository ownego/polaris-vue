<template lang="pug">
component(
  :is="as",
  :class="className",
  :style="style",
)
  slot
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type {
  SpacingSpaceScale,
} from '@shopify/polaris-tokens';
import type { ResponsiveProp } from '@/utilities/css';
import { classNames, getResponsiveProps } from '@/utilities/css';

import styles from '@/classes/AlphaStack.json';

type Align = 'start' | 'end' | 'center';

type Element = 'div' | 'ul' | 'ol' | 'fieldset';

type Spacing = ResponsiveProp<SpacingSpaceScale>;

interface Props {
  /** HTML Element type
   * @default 'div'
   */
  as?: Element;
  /** The vertical alignment of elements
   * @default 'start'
   */
  align?: Align;
  /** Toggle elements to be full width */
  fullWidth?: boolean;
  /** The spacing between elements
   * @default '4'
   */
  spacing?: Spacing;
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  align: 'start',
  spacing: '4',
});

const className = computed(() => classNames(
  styles.AlphaStack,
  props.fullWidth && styles.fullWidth,
  props.as === 'ul' && styles.listReset,
));

const style = computed(() => {
  return {
    '--pc-stack-align': props.align ? `${props.align}` : '',
    ...getResponsiveProps('stack', 'spacing', 'space', props.spacing),
  };
});
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/AlphaStack/AlphaStack.scss';
</style>
