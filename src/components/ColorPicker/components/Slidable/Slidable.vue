<template lang="pug">
div(
  ref="slidableRef",
  :class="styles.Slidable",
  :data-dragging="isDragging",
  @mousedown="startDrag",
  @touchstart="startDrag",
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
    :style="draggerPositioning",
    :class="styles.Dragger",
    ref="draggerRef",
  )
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useAttrs } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import { isServer } from 'polaris/polaris-react/src/utilities/target';
import styles from '@/classes/ColorPicker.json';
import { EventListener } from '@/components/EventListener';

interface Props {
  draggerX?: number;
  draggerY?: number;
}

const props = withDefaults(defineProps<Props>(), {
  draggerX: 0,
  draggerY: 0,
});

const emits = defineEmits<{
  (event: 'change', value: { x: number; y: number; }): void
  (event: 'dragger-height', value: number): void
}>();

const isDragging = ref(false);
const slidableRef = ref(null);
const draggerRef = ref(null);

const positionX = ref(0);
const positionY = ref(0);

const draggerPositioning = computed(() => {
  return { transform: `translate3d(${positionX.value || props.draggerX}px, ${positionY.value || props.draggerY}px, 0)` };
});

if (!isServer) {
  window.addEventListener('touchmove', (e) => {
    if (isDragging.value) {
      e.preventDefault();
    }
  }, { passive: false });
}

onMounted(() => {
  if (draggerRef.value) {
    emits('dragger-height', (draggerRef.value as HTMLElement).clientWidth);
  }
});

const startDrag = (event: Event) =>{
  if (isMouseDownEvent(event)) {
    const { clientX, clientY } = event as MouseEvent;
    handleDraggerMove(clientX, clientY);
  }

  isDragging.value = true;
}

const handleDragEnd = () => {
  isDragging.value = false;
}

const handleMove = (event: MouseEvent | TouchEvent) => {
  event.stopImmediatePropagation();
  event.stopPropagation();
  if (event.cancelable) {
    event.preventDefault();
  }

  if (isMouseMoveEvent(event)) {
    const eventMouse = event as MouseEvent;
    handleDraggerMove(eventMouse.clientX, eventMouse.clientY);
    return;
  }

  const eventTouch = event as TouchEvent;
  handleDraggerMove(eventTouch.touches[0].clientX, eventTouch.touches[0].clientY);
}

const handleDraggerMove = (x: number, y: number) => {
  if (slidableRef.value) {
    const rect = (slidableRef.value as HTMLElement).getBoundingClientRect();
    const offsetX = x - rect.left;
    const offsetY = y - rect.top;
    emits('change', { x: offsetX, y: offsetY });
  }
}

function isMouseMoveEvent(event: Event) {
  return event.type === 'mousemove';
}

function isMouseDownEvent(event: Event) {
  return event.type === 'mousedown';
}
</script>
