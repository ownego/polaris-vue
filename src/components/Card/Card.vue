<template lang="pug">
ShadowBevel(
  :bevel="isSmUp",
  box-shadow="100",
  :border-radius="hasBorderRadius ? defaultBorderRadius : '0'",
  z-index="32",
)
  Box(
    :background="background",
    :padding="padding",
    overflow-x="clip",
    overflow-y="clip",
    min-height="100%",
  )
    slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { BorderRadiusAliasOrScale } from '@shopify/polaris-tokens';
import { useBreakpoints } from '@/use/useBreakpoints';
import type { VueNode } from '@/utilities/types';
import { Box, ShadowBevel } from '@/components';
import type { CardProps } from './types';

export type CardSlots = {
  /** Inner content of the box */
  default: (_: VueNode) => any;
}

defineSlots<CardSlots>();

const props = withDefaults(defineProps<CardProps>(), {
  background: 'bg-surface',
  padding: '400',
  roundedAbove: 'sm',
});

const breakpoints = useBreakpoints();
const defaultBorderRadius: BorderRadiusAliasOrScale = '300';

const isSmUp = computed(() => Boolean(breakpoints.value.smUp));

const hasBorderRadius = computed<boolean>(() => !!breakpoints.value[`${props.roundedAbove}Up`]);
</script>
