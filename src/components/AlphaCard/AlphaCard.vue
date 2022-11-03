<template lang="pug">
Box(
  :background="background",
  :padding="padding",
  shadow="card",
  :border-radius="hasBorderRadius ? '2' : undefined",
)
  slot
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type {
  BreakpointsAlias,
  ColorsTokenName,
  SpacingSpaceScale,
} from '@shopify/polaris-tokens';
import { Box } from '@/components';
import type { BackgroundColorTokenScale } from '@/components/Box/utils';

import { breakpoints } from '@shopify/polaris-tokens';

interface Props {
  background?: BackgroundColorTokenScale;
  padding?: SpacingSpaceScale;
  roundedAbove?: BreakpointsAlias;
}

const props = withDefaults(defineProps<Props>(), {
  background: 'surface',
  padding: '5',
});

const hasBorderRadius = computed(() => {
  if (props.roundedAbove && breakpoints[`${props.roundedAbove}Up`]) {
    return true;
  }

  return !props.roundedAbove;
});

</script>
