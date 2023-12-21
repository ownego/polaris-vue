<template lang="pug">
ShadowBevel(
  :box-shadow="'100'",
  :border-radius="hasBorderRadius ? defaultBorderRadius : '0'",
  z-index="32",
)
  Box(
    :background="background",
    :padding="padding",
    overflow-x="hidden",
    overflow-y="hidden",
    min-height="100%",
  )
    slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type {
  BorderRadiusAliasOrScale,
} from '@shopify/polaris-tokens';
import {useBreakpoints} from '@/utilities/breakpoints';
import Box from '../Box/Box.vue';
import ShadowBevel from '../ShadowBevel/ShadowBevel.vue';
import type { VueNode } from '@/utilities/types';
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
const hasBorderRadius = computed<boolean>(() => !!breakpoints.value[`${props.roundedAbove}Up`]);
</script>
