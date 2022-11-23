<template lang="pug">
div(
  v-if="fixed",
  :style="style",
  :class="className"
)
  Section(v-if="sectioned")
    slot
  slot(v-else)
Scrollable(
  v-else,
  shadow,
  :style="style",
  :class="className",
  @scrolled-to-bottom="emit('scrolled-to-bottom')",
)
  Section(v-if="sectioned")
    slot
  slot(v-else)
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from '@/utilities/css';
import { Scrollable } from '@/components/Scrollable';
import styles from '@/classes/Popover.json';
import { Section } from '../Section';

interface Props {
  fixed?: boolean;
  sectioned?: boolean;
  /** Sets a fixed height and max-height on the Scrollable */
  height?: string;
  /**
   * Prevents page scrolling when the end of the scrollable Popover content is reached
   * @default false
   */
   captureOverscroll?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  captureOverscroll: false,
});
const emit = defineEmits<{ (event: 'scrolled-to-bottom'): void }>();

const style = props.height
  ? { height: props.height, maxHeight: props.height, minHeight: props.height }
  : undefined;

const className = computed(() => classNames(
  styles.Pane,
  props.fixed && styles['Pane-fixed'],
  props.captureOverscroll && styles['Pane-captureOverscroll'],
));
</script>
