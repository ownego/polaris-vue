<template lang="pug">
component(
  :is="as",
  :class="className",
  :style="sanitizeCustomProperties(style)",
)
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  classNames,
  sanitizeCustomProperties,
  getResponsiveProps,
} from '@/utilities/css';
import type { VueNode } from '@/utilities/types';
import type { BlockStackProps } from './types';
import styles from '@polaris/components/BlockStack/BlockStack.module.scss';

export type BlockStackSlots = {
  default: (_: VueNode) => any;
}

const props = withDefaults(defineProps<BlockStackProps>(), {
  as: 'div',
  reverseOrder: false,
});

defineSlots<BlockStackSlots>();

const style = computed<any>(() => {
  return {
    '--pc-block-stack-align': props.align ? `${props.align}` : null,
    '--pc-block-stack-inline-align': props.inlineAlign ? `${props.inlineAlign}` : null,
    '--pc-block-stack-order': props.reverseOrder ? 'column-reverse' : 'column',
    ...getResponsiveProps('block-stack', 'gap', 'space', props.gap),
  }
});

const className = computed(() => {
  return classNames(
    styles.BlockStack,
    (props.as === 'ul' || props.as === 'ol') && styles.listReset,
    props.as === 'fieldset' && styles.fieldsetReset,
  );
});
</script>
