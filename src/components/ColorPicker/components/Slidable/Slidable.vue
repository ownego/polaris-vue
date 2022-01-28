<template lang="pug">
div(
  ref="slidable",
  :class="className",
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
    :class="classDragger",
    ref="dragger",
  )
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import { isServer } from 'polaris-react/src/utilities/target';
import styles from '@/classes/ColorPicker.json';
import { EventListener } from '@/components/EventListener';

interface SlidableProps {
  draggerX?: number;
  draggerY?: number;
}

@Component({
  components: {
    EventListener,
  },
})
export default class Slidable extends Vue {
  @Prop({ type: Number, default: 0 })
  public draggerX?: SlidableProps['draggerX'];

  @Prop({ type: Number, default: 0 })
  public draggerY?: SlidableProps['draggerY'];

  public isDragging = false;

  public className = styles.Slidable;

  public classDragger = classNames(styles.Dragger);

  public isMouseMoveEvent = (event: Event) => event.type === 'mousemove';

  public isMouseDownEvent = (event: Event) => event.type === 'mousedown';

  public positionX = 0;

  public positionY = 0;

  get draggerPositioning() {
    return { transform: `translate3d(${this.positionX || this.draggerX}px, ${this.positionY || this.draggerY}px, 0)` };
  }

  created() {
    if (!isServer) {
      window.addEventListener('touchmove', (e) => {
        if (!this.isDragging) return;
        e.preventDefault();
      }, { passive: false });
    }
  }

  mounted() {
    const draggerHeight = this.$listeners['dragger-height'];
    if (!draggerHeight) {
      return;
    }

    const draggerNode = this.$refs.dragger as HTMLElement;
    if (draggerNode == null) {
      return;
    }

    this.$emit('dragger-height', draggerNode.clientWidth);
  }

  startDrag(event: Event) {
    if (this.isMouseDownEvent(event)) {
      const { clientX, clientY } = event as MouseEvent;
      this.handleDraggerMove(clientX, clientY);
    }

    this.isDragging = true;
  }

  handleDragEnd() {
    this.isDragging = false;
  }

  handleMove(event: MouseEvent | TouchEvent) {
    event.stopImmediatePropagation();
    event.stopPropagation();

    if (event.cancelable) {
      event.preventDefault();
    }

    if (this.isMouseMoveEvent(event)) {
      const eventMouse = event as MouseEvent;
      this.handleDraggerMove(eventMouse.clientX, eventMouse.clientY);
      return;
    }

    const eventTouch = event as TouchEvent;
    this.handleDraggerMove(eventTouch.touches[0].clientX, eventTouch.touches[0].clientY);
  }

  handleDraggerMove(x: number, y: number) {
    const $el = this.$refs.slidable as HTMLElement;

    if (!$el) return;

    const rect = $el.getBoundingClientRect();
    const offsetX = x - rect.left;
    const offsetY = y - rect.top;

    this.$emit('change', { x: offsetX, y: offsetY });
  }
}
</script>
