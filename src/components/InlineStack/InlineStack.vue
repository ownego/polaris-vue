<template lang="pug">
div(
  :class="className",
  :style="style",
)
  slot
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import type { VueNode } from '@/utilities/types';
import { getResponsiveProps, classNames } from '@/utilities/css';
import type { InlineStackProps } from './types';

export type InlineStackSlots = {
  /** Inner content of the box */
  default: (_: VueNode) => any;
}

defineSlots<InlineStackSlots>();

const props = withDefaults(defineProps<InlineStackProps>(), {
  wrap: true,
});

const styles = useCssModule();

const style = computed(() => {
  return {
    '--pc-inline-stack-align': props.align,
    '--pc-inline-stack-block-align': props.blockAlign,
    '--pc-inline-stack-wrap': props.wrap ? 'wrap' : 'nowrap',
    ...getResponsiveProps('inline-stack', 'gap', 'space', props.gap),
  }
});

const className = computed(() => {
  return classNames(
    styles.InlineStack,
  );
});
</script>

<style lang="scss" module>
@import '@polaris/components/InlineStack/InlineStack.scss'
</style>
