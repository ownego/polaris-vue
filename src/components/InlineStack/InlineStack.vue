<template lang="pug">
component(
  :is="as",
  :class="className",
  :style="style",
)
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { VueNode } from '@/utilities/types';
import { getResponsiveProps, classNames, getResponsiveValue } from '@/utilities/css';
import type { InlineStackProps } from './types';
import styles from '@polaris/components/InlineStack/InlineStack.module.css';

export type InlineStackSlots = {
  default: (_: VueNode) => any;
}

defineSlots<InlineStackSlots>();

const props = withDefaults(defineProps<InlineStackProps>(), {
  as: 'div',
  wrap: true,
  direction: 'row',
});

const style = computed(() => {
  return {
    '--pc-inline-stack-align': props.align,
    '--pc-inline-stack-block-align': props.blockAlign,
    '--pc-inline-stack-wrap': props.wrap ? 'wrap' : 'nowrap',
    ...getResponsiveProps('inline-stack', 'gap', 'space', props.gap),
    ...getResponsiveValue('inline-stack', 'flex-direction', props.direction),
  }
});

const className = computed(() => {
  return classNames(
    styles.InlineStack,
  );
});
</script>
