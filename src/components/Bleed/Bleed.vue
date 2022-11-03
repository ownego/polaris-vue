<template lang="pug">
div(
  :class="styles.Bleed",
  :style="style",
)
  slot
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { SpacingSpaceScale } from '@shopify/polaris-tokens';
import styles from '@/classes/Bleed.json';

interface Spacing {
  bottom: SpacingSpaceScale;
  left: SpacingSpaceScale;
  right: SpacingSpaceScale;
  top: SpacingSpaceScale;
}

interface Props {
  spacing?: SpacingSpaceScale;
  horizontal?: SpacingSpaceScale;
  vertical?: SpacingSpaceScale;
  top?: SpacingSpaceScale;
  bottom?: SpacingSpaceScale;
  left?: SpacingSpaceScale;
  right?: SpacingSpaceScale;
}

const props = defineProps<Props>();

const getNegativeMargins = (direction: string) => {
  const xAxis = ['left', 'right'];
  const yAxis = ['top', 'bottom'];

  const directionValues: {[key: string]: string | undefined} = {
    top: props.top,
    bottom: props.bottom,
    left: props.left,
    right: props.right,
    horizontal: props.horizontal,
    vertical: props.vertical,
  };

  if (directionValues[direction]) {
    return directionValues[direction];
  } else if (!yAxis.includes(direction) && props.horizontal) {
    return directionValues.horizontal;
  } else if (!xAxis.includes(direction) && props.vertical) {
    return directionValues.vertical;
  } else {
    return props.spacing;
  }
};

const negativeMargins = computed(() => {
  return {
    top: getNegativeMargins('top'),
    left: getNegativeMargins('left'),
    right: getNegativeMargins('right'),
    bottom: getNegativeMargins('bottom'),
  } as Spacing;
});

const style = computed(() => {
  return {
    ...(negativeMargins.value.bottom
      ? {'--pc-bleed-margin-bottom': `var(--p-space-${negativeMargins.value.bottom})`}
      : undefined),
    ...(negativeMargins.value.left
      ? {'--pc-bleed-margin-left': `var(--p-space-${negativeMargins.value.left})`}
      : undefined),
    ...(negativeMargins.value.right
      ? {'--pc-bleed-margin-right': `var(--p-space-${negativeMargins.value.right})`}
      : undefined),
    ...(negativeMargins.value.top
      ? {'--pc-bleed-margin-top': `var(--p-space-${negativeMargins.value.top})`}
      : undefined),
  } as Record<string, any>;
});
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Bleed/Bleed.scss';
</style>
