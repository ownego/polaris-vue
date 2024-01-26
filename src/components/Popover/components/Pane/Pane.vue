<template lang="pug">
div(
  v-if="fixed",
  :class="className",
  :styles="style",
)
  template(v-if="sectioned")
    Section
      slot
  template(v-else)
    slot

Scrollable(
  v-else,
  shadow,
  :style="style",
  :class="className",
  @scrolled-to-bottom="emits('scrolled-to-bottom')",
)
  template(v-if="sectioned")
    Section
      slot
  template(v-else)
    slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from '@/utilities/css';
import type { VueNode } from '@/utilities/types';
import { Scrollable } from '@/components';
import { PopoverSection as Section } from '../Section';
import styles from '@polaris/components/Popover/Popover.module.scss';

export type PaneProps = {
  /** Fix the pane to the top of the popover */
  fixed?: boolean;
  /** Automatically wrap children in padded sections */
  sectioned?: boolean;
  /** Sets a fixed height and max-height on the Scrollable */
  height?: string;
  /**
   * Prevents page scrolling when the end of the scrollable Popover content is reached
   * @default false
   */
  captureOverscroll?: boolean;
  /**
   * Sets a subdued background to the pane
   * @default false
   */
  subdued?: boolean;
}

type PaneSlots = {
  /** Default slot */
  default: (_?: VueNode) => any;
}

type PaneEmits = {
  /** Called when scrolled to the bottom of the scroll area */
  'scrolled-to-bottom': [];
}

const props = withDefaults(defineProps<PaneProps>(), {
  captureOverscroll: false,
})

const emits = defineEmits<PaneEmits>();

const slots = defineSlots<PaneSlots>();

const className = computed(() => classNames(
  styles.Pane,
  props.fixed && styles['Pane-fixed'],
  props.subdued && styles['Pane-subdued'],
  props.captureOverscroll && styles['Pane-captureOverscroll'],
));

const style = computed(() => props.height
  ? {
    height: `${props.height}px`,
    maxHeight: `${props.height}px`,
    minHeight: `${props.height}px`,
  }
  : undefined);
</script>
