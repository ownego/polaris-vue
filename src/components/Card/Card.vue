<template lang="pug">
ShadowBevel(
  box-shadow="100",
  :bevel="isSmUp",
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
import { useBreakpoints } from '@/utilities/breakpoints';
import type { VueNode } from '@/utilities/types';
import Box from '../Box/Box.vue';
import ShadowBevel from '../ShadowBevel/ShadowBevel.vue';
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
