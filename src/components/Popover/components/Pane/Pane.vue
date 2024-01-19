<template lang="pug">
div(
  v-if="fixed",
  :class="className",
  :styles="style",
)
  component(:is="content")

Scrollable(
  v-else,
  shadow,
  :style="style",
  :class="className",
  @scrolled-to-bottom="emits('scrolled-to-bottom')",
)
  component(:is="content")
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from '@/utilities/css';
import { wrapWithComponent } from '@/utilities/component';
import type { VueNode } from '@/utilities/types';
import { Scrollable } from '@/components';
import { Section } from '../Section';
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

type Slots = {
  /** Default slot */
  default: (_?: VueNode) => any;
}

type Emits = {
  /** Called when scrolled to the bottom of the scroll area */
  'scrolled-to-bottom': [];
}

const props = withDefaults(defineProps<PaneProps>(), {
  captureOverscroll: false,
})

const emits = defineEmits<Emits>();

const slots = defineSlots<Slots>();

const children = computed(() => {
  return slots.default;
});

const content = computed(() => {
  return props.sectioned ? wrapWithComponent(children.value(), Section, {}) : children.value;
})

const className = computed(() => classNames(
  styles.Pane,
  props.fixed && styles['Pane-fixed'],
  props.subdued && styles['Pane-subdued'],
  props.captureOverscroll && styles['Pane-captureOverscroll'],
));

const style = computed(() => props.height
  ? {
    height: props.height,
    maxHeight: props.height,
    mingHeight: props.height,
  }
  : undefined);
</script>
