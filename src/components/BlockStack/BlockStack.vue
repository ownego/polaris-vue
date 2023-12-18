<template lang="pug">
component(
  :is="as",
  :class="className",
  :style="sanitizeCustomProperties(style)",
)
  slot
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import {
  classNames,
  sanitizeCustomProperties,
  getResponsiveProps,
} from '@/utilities/css';
import type { BlockStackProps } from './types';

const props = withDefaults(defineProps<BlockStackProps>(), {
  as: 'div',
  reverseOrder: false,
});

const styles = useCssModule();

const style: any = {
  '--pc-block-stack-align': props.align ? `${props.align}` : null,
  '--pc-block-stack-inline-align': props.inlineAlign ? `${props.inlineAlign}` : null,
  '--pc-block-stack-order': props.reverseOrder ? 'column-reverse' : 'column',
  ...getResponsiveProps('block-stack', 'gap', 'space', props.gap),
};

const className = computed(() => {
  return classNames(
    styles.BlockStack,
    (props.as === 'ul' || props.as === 'ol') && styles.listReset,
    props.as === 'fieldset' && styles.fieldsetReset,
  );
});
</script>

<style lang="scss" module>
@import '@polaris/components/BlockStack/BlockStack.scss';
</style>
