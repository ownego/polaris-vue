<template lang="pug">
div(:className="className" :style="sanitizeCustomProperties(style)")
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { SpaceScale } from '@shopify/polaris-tokens';
import {
  getResponsiveProps,
  sanitizeCustomProperties,
  classNames,
} from '@/utilities/css';
import type { VueNode } from '@/utilities/types';
import type { ResponsiveProp } from '../../utilities/css';
import styles from '@polaris/components/Bleed/Bleed.module.scss';

type Spacing = ResponsiveProp<SpaceScale>;

interface BleedProps {
  /** Negative horizontal space around children */
  marginInline?: Spacing;
  /** Negative vertical space around children */
  marginBlock?: Spacing;
  /** Negative top space around children */
  marginBlockStart?: Spacing;
  /** Negative bottom space around children */
  marginBlockEnd?: Spacing;
  /** Negative left space around children */
  marginInlineStart?: Spacing;
  /** Negative right space around children */
  marginInlineEnd?: Spacing;
}

export type BleedSlots = {
  default: (_: VueNode) => any;
}

defineSlots<BleedSlots>();

const props = defineProps<BleedProps>();

const className = computed(() => {
  return classNames(
    styles.Bleed,
  );
});

const style = computed(() => {
  return {
    ...getResponsiveProps(
      'bleed',
      'margin-block-start',
      'space',
      negativeMarginBlockStart,
    ),
    ...getResponsiveProps(
      'bleed',
      'margin-block-end',
      'space',
      negativeMarginBlockEnd,
    ),
    ...getResponsiveProps(
      'bleed',
      'margin-inline-start',
      'space',
      negativeMarginInlineStart,
    ),
    ...getResponsiveProps(
      'bleed',
      'margin-inline-end',
      'space',
      negativeMarginInlineEnd,
    ),
  };
});

const getNegativeMargins = (direction: string) => {
    const xAxis = ['marginInlineStart', 'marginInlineEnd'];
    const yAxis = ['marginBlockStart', 'marginBlockEnd'];

    const directionValues: {[key: string]: Spacing | undefined} = {
      marginBlockStart: props.marginBlockStart,
      marginBlockEnd: props.marginBlockEnd,
      marginInlineStart: props.marginInlineStart,
      marginInlineEnd: props.marginInlineEnd,
      marginInline: props.marginInline,
      marginBlock: props.marginBlock,
    };

    if (directionValues[direction]) {
      return directionValues[direction];
    } else if (xAxis.includes(direction) && props.marginInline) {
      return directionValues.marginInline;
    } else if (yAxis.includes(direction) && props.marginBlock) {
      return directionValues.marginBlock;
    }
  };

const negativeMarginBlockStart = getNegativeMargins('marginBlockStart');
const negativeMarginBlockEnd = getNegativeMargins('marginBlockEnd');
const negativeMarginInlineStart = getNegativeMargins('marginInlineStart');
const negativeMarginInlineEnd = getNegativeMargins('marginInlineEnd');
</script>
