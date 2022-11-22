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
import { computed } from 'vue';
import type {
  BreakpointsAlias,
  ColorsActionTokenAlias,
  ColorsBackdropTokenAlias,
  ColorsBackgroundTokenAlias,
  ColorsOverlayTokenAlias,
  ColorsSurfaceTokenAlias,
  SpacingSpaceScale,
} from '@shopify/polaris-tokens';
import { breakpoints } from '@shopify/polaris-tokens';
import { Box } from '@/components';

type BackgroundColors =
  | ColorsBackdropTokenAlias
  | ColorsBackgroundTokenAlias
  | ColorsOverlayTokenAlias
  | ColorsActionTokenAlias
  | ColorsSurfaceTokenAlias;

interface Props {
  /** Background color
   * @default 'surface'
   */
  background?: BackgroundColors;
  /** The spacing around the card
   * @default '5'
   */
  padding?: SpacingSpaceScale;
  /** Border radius value above a set breakpoint */
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
