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
import { classNames } from '@/utilities/css';
import { extractElement } from '@/utilities/extract-fragment';
import styles from '@/classes/ButtonGroup.json';
import { Item } from './components';

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
  let elms : VNodeArrayChildren = [];
  if (slots.default) {
    const groups = slots.default().map(group => {
      return extractElement(group);
    });
    elms = groups.flat();
  }

  return elms;
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
