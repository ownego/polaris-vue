<template lang="pug">
div(
  :class="className",
  :data-buttongroup-segmented="segmented",
  :data-buttongroup-connected-top="connectedTop",
  :data-buttongroup-full-width="fullWidth",
)
  Item(
    v-if="!noItemWrap",
    v-for="(item, index) in itemMarkup",
    :key="index"
  )
    component(:is="item")
  slot(v-else)
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { VNodeArrayChildren } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import { Item } from './components';
import styles from '@/classes/ButtonGroup.json';

type Spacing = 'extraTight' | 'tight' | 'loose';

interface Props {
  /** Determines the space between button group items */
  spacing?: Spacing;
  /** Join buttons as segmented group */
  segmented?: boolean;
  /** Buttons will stretch/shrink to occupy the full width */
  fullWidth?: boolean;
  /** Remove top left and right border radius */
  connectedTop?: boolean;
  /** No wrap all stack elements with ButtonGroupItem  */
  noItemWrap?: boolean;
}

const props = defineProps<Props>();

const slots = useSlots();

const itemMarkup = computed(() => {
  const items : VNodeArrayChildren = [];
  if (slots.default) {
    slots.default().map(item => {
      const children = item.children as VNodeArrayChildren;
      if (typeof children === 'string' && children === 'v-if') {
        return;
      }

      if (item.type.toString() === 'Symbol(Fragment)' || item.type.toString() === 'Symbol()') {
        for (const child of children) {
          items.push(child);
        }
      } else {
        items.push(item);
      }
    });
  }
  return items;
});

const className = computed(() => {
  return classNames(
    styles.ButtonGroup,
    props.spacing && styles[props.spacing],
    props.segmented && styles.segmented,
    props.fullWidth && styles.fullWidth,
  );
})
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/ButtonGroup/ButtonGroup.scss';
</style>
