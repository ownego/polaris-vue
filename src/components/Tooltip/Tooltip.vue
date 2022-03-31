<template lang="pug">
component(
  :is="activatorWrapper",
  ref="activatorContainer",
  @focus="handleFocus",
  @blur="handleBlur",
  @mouseleave="handleMouseLeave",
  @mouseover="handleMouseEnterFix",
  @click="event => event.stopPropagation()",
  @keyup="handleKeyUp"
)
  slot
  Portal(v-if="activatorNode", idPrefix="tooltip")
    TooltipOverlay(
      :id="id",
      :preferredPosition="preferredPosition",
      :preventInteraction="dismissOnMouseOut",
      :activator="activatorNode",
      :active="active",
      :accessibilityLabel="accessibilityLabel",
    )
      slot(v-if="slots.content" name="content")
      template(v-else) {{ content }}
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { ref, useSlots, watch } from 'vue';
import { findFirstFocusableNode } from '@/utilities/focus';
import type { PositionedOverlayProps } from '@/components/PositionedOverlay/utils';
import { Key } from '../KeypressListener/utils';
import { UseUniqueId } from '@/use';
import { TooltipOverlay } from './components';
import { Portal } from '../Portal';

interface Props {
  /** Toggle whether the tooltip is visible */
  active?: boolean;
  /** The content to display within the tooltip */
  content?: string;
  /** Dismiss tooltip when not interacting with its children */
  dismissOnMouseOut?: PositionedOverlayProps['preventInteraction'];
  /**
   * The direction the tooltip tries to display
   * @default 'below'
   */
  preferredPosition?: PositionedOverlayProps['preferredPosition'];
  /**
   * The element type to wrap the activator in
   * @default 'span'
   */
  activatorWrapper?: string;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
}

const slots = useSlots();

const props = withDefaults(defineProps<Props>(), {
  activatorWrapper: 'span',
  preferredPosition: 'below',
  active: false,
});

const active = ref<boolean>(props.active);

const mouseEntered = ref<boolean>(false);

const activatorNode = ref<HTMLElement | null>(null);

const activatorContainer = ref<HTMLElement | null>(null);

const { useUniqueId, uniqueIdRef } = UseUniqueId();

const id = useUniqueId('TooltipContent');

watch(() => uniqueIdRef.value, () => {
  const firstFocusable = activatorContainer.value
    ? findFirstFocusableNode(activatorContainer.value)
    : null;
  const accessibilityNode = firstFocusable || activatorContainer.value;

  if (!accessibilityNode) {return;}

  accessibilityNode.tabIndex = 0;
  accessibilityNode.setAttribute('aria-describedby', id);
  accessibilityNode.setAttribute('data-polaris-tooltip-activator', 'true');
});

watch(() => activatorContainer.value, () => {
  const node = activatorContainer.value;
  if (node == null) {
    activatorNode.value = null;
  } else {
    if (node.firstElementChild instanceof HTMLElement){
      activatorNode.value = node.firstElementChild;
    }
  }
})

const handleBlur = () => {
  active.value = false;
}

const handleFocus = () => {
  active.value = true;
}

const handleKeyUp = (event: KeyboardEvent) => {
  if (event.key !== Key.Escape) {return;}
  handleBlur();
}

function handleMouseEnter() {
  mouseEntered.value = true;
  handleFocus();
}

function handleMouseLeave() {
  mouseEntered.value = false;
  handleBlur();
}

// https://github.com/facebook/react/issues/10109
// Mouseenter event not triggered when cursor moves from disabled button
function handleMouseEnterFix() {
  !mouseEntered.value && handleMouseEnter();
}
</script>
