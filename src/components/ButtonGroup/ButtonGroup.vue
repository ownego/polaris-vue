<template lang="pug">
div(
  :class="className",
  :data-buttongroup-variant="variant",
  :data-buttongroup-connected-top="connectedTop",
  :data-buttongroup-full-width="fullWidth",
  :data-buttongroup-no-wrap="noWrap",
)
  Item(
    v-for="item, index in itemMarkup",
    :key="index",
    :button-prop="item",
  )
</template>

<script setup lang="ts">
import { computed, useCssModule, type VNode } from 'vue';
import type { VNodeArrayChildren } from 'vue';
import { classNames, variationName } from '@/utilities/css';
import { extractElement } from '@/utilities/extract-fragment';
import type { VueNode } from '@/utilities/types';
import { Item } from './components';
import type { ButtonGroupProps } from './types';

const styles = useCssModule();

const props = defineProps<ButtonGroupProps>();

const slots = defineSlots<{
  /** Button components */
  default: (_?: VueNode) => any;
}>();

const className = computed(() => classNames(
  styles.ButtonGroup,
  props.gap && styles[props.gap],
  props.variant && styles[variationName('variant', props.variant)],
  props.fullWidth && styles.fullWidth,
  props.noWrap && styles.noWrap,
));

const itemMarkup = computed(() => {
  let elms : VNodeArrayChildren = [];
  if (slots.default) {
    const groups = slots.default().map((group: VNode) => {
      return extractElement(group);
    });
    elms = groups.flat();
  }

  return elms;
});
</script>

<style lang="scss" module>
@import '@polaris/components/ButtonGroup/ButtonGroup.scss';
</style>
