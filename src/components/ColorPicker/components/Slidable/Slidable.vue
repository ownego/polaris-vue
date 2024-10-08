<template lang="pug">
div(
  ref="nodeRef",
  :class="styles.Slidable",
  @mousedown="startDrag",
  @touchstart="startDrag"
)
  EventListener(
    v-if="isDragging",
    event="mouseup",
    :handler="handleDragEnd",
  )
  EventListener(
    v-if="isDragging",
    event="mousemove",
    :handler="handleMove",
    :passive="false",
  )
  EventListener(
    v-if="isDragging",
    event="touchmove",
    :handler="handleMove",
    :passive="false",
  )
  EventListener(
    v-if="isDragging",
    event="touchend",
    :handler="handleDragEnd",
  )
  EventListener(
    v-if="isDragging",
    event="touchcancel",
    :handler="handleDragEnd",
  )

  div(
    ref="draggerNode",
    :style="draggerPositioning",
    :class="styles.Dragger",
  )
</template>

<script setup lang="ts">
import { computed, onMounted, ref, onBeforeUnmount } from 'vue';
import { isServer } from '@polaris/utilities/target';
import { EventListener } from '@/components';

import styles from '@polaris/components/ColorPicker/ColorPicker.module.css';

interface Position {
  x: number;
  y: number;
}

export type SlidableProps = {
  draggerX?: number;
  draggerY?: number;
}

type SlidableEvents = {
  'change': [position: Position];
  'dragger-height': [height: number];
}

const props = defineProps<SlidableProps>();
const emits = defineEmits<SlidableEvents>();

const isDragging = ref(false);

if (!isServer) {
  window.addEventListener('touchmove', (event) => {
    if (isDragging.value) {
      event.preventDefault();
    }
  }, { passive: false });
}

const nodeRef = ref<HTMLElement | null>(null);
const draggerNode = ref<HTMLElement | null>(null);
const observer = ref<ResizeObserver | null>(null);

const draggerPositioning = computed(() => ({
  transform: `translate3d(${props.draggerX}px, ${props.draggerY}px, 0)`,
}));

onMounted(() => {
  if (!draggerNode.value) {
    return;
  }

  observer.value = new ResizeObserver(() => {
    /**
     * This is a workaround to enable event listeners to be
     * re-attached when moving from one document to another
     * when using a React portal across iframes.
     * Using a resize observer works because when the clientWidth
     * will go from 0 to the real width after the node
     * gets rendered in its new place.
     */
    // if (window !== draggerNode.value?.ownerDocument.defaultView) {
    //   (window as Window) = draggerNode.value?.ownerDocument.defaultView as Window;
    // }
    handleResize();
  });

  observer.value.observe(draggerNode.value);
});

onBeforeUnmount(() => {
  observer.value?.disconnect();
});

const startDrag = (event: MouseEvent | TouchEvent) => {
  if (isMouseDownEvent(event)) {
    handleDraggerMove(event.clientX, event.clientY);
  }

  isDragging.value = true;
};

const handleResize = () => {
  if (!draggerNode.value) {
    return;
  }

  emits('dragger-height', draggerNode.value.clientWidth);
}

const handleDragEnd = () => {
  isDragging.value = false;
};

const handleMove = (event: MouseEvent | TouchEvent) => {
  event.stopImmediatePropagation();
  event.stopPropagation();

  if (event.cancelable) {
    event.preventDefault();
  }

  if (isMouseMoveEvent(event)) {
    handleDraggerMove(event.clientX, event.clientY);
    return;
  }

  handleDraggerMove(event.touches[0].clientX, event.touches[0].clientY);
};

const handleDraggerMove = (x: number, y: number) => {
  if (!nodeRef.value) {
    return;
  }

  const rect = nodeRef.value.getBoundingClientRect();
  const offsetX = x - rect.left;
  const offsetY = y - rect.top;

  emits('change', { x: offsetX, y: offsetY });
};

function isMouseMoveEvent(event: Event): event is MouseEvent {
  return event.type === 'mousemove';
}

function isMouseDownEvent(event: MouseEvent | TouchEvent): event is MouseEvent {
  return event.type === 'mousedown';
}
</script>
