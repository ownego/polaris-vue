<template lang="pug">
div
  div(ref="placeHolderNode")
  div(ref="stickyNode", :style="style")
    slot
</template>
<script setup lang="ts">
import { inject, ref, onMounted, onBeforeUnmount } from 'vue';
import { getRectForNode } from '@/utilities/geometry';
import type { StickyManager } from '@/utilities/sticky-manager';

interface StickyProps {
  /** Element outlining the fixed position boundaries */
  boundingElement?: HTMLElement | null;
  /** Offset vertical spacing from the top of the scrollable container */
  offset?: boolean;
  /** Should the element remain in a fixed position when the layout is stacked (smaller screens)  */
  disableWhenStacked?: boolean;
}

const props = withDefaults(defineProps<StickyProps>(), {
  offset: false,
  disableWhenStacked: false,
});

const emits = defineEmits<{
  (e: 'sticky-change', isSticky: boolean): void;
}>();

const stickyManager = inject<StickyManager>('stickyManagerContext', {} as StickyManager);

const isSticky = ref(false);
const style = ref({});
const placeHolderNode = ref<HTMLElement | null>(null);
const stickyNode = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!stickyNode.value || !placeHolderNode.value) {
    return;
  }

  stickyManager.registerStickyItem({
    stickyNode: stickyNode.value,
    placeHolderNode: placeHolderNode.value,
    handlePositioning: handlePositioning,
    offset: props.offset,
    boundingElement: props.boundingElement,
    disableWhenStacked: props.disableWhenStacked,
  });
});

onBeforeUnmount(() => {
  if (!stickyNode.value) {
    return;
  }
  stickyManager.unregisterStickyItem(stickyNode.value);
});

const handlePositioning = (
  stick: boolean,
  top = 0,
  left = 0,
  width = 0,
) => {
  if ((stick && !isSticky.value) || (!stick && isSticky.value)) {
    adjustPlaceHolderNode(stick);
    isSticky.value = !isSticky.value;

    emits('sticky-change', isSticky.value);

    if (!props.boundingElement) {
      return;
    }

    props.boundingElement.toggleAttribute('data-sticky-active');
  }
  style.value = stick
    ? {
      position: 'fixed',
      top: `${top}px`,
      left: `${left}px`,
      width: `${width}px`,
    }
    : {};
};

const adjustPlaceHolderNode = (add: boolean) => {
  if (placeHolderNode.value && stickyNode.value) {
    placeHolderNode.value.style.paddingBottom = add
      ? `${getRectForNode(stickyNode.value).height}px`
      : '0px';
  }
};

function isFunction(arg: any): boolean {
  return typeof arg === 'function';
}
</script>
