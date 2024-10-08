<template lang="pug">
div(
  ref="overlay",
  :class="className",
  :style="style",
)
  EventListener(
    event="resize",
    :handler="handleMeasurement",
    :custom-window="overlay?.ownerDocument.defaultView",
  )
  slot
</template>

<script setup lang="ts">
import {
  type StyleValue,
  nextTick,
  ref,
  reactive,
  computed,
  onMounted,
  onUpdated,
  onBeforeUnmount,
} from 'vue';
import styles from '@polaris/components/PositionedOverlay/PositionedOverlay.module.css';
import { classNames } from '@/utilities/css';
import { getRectForNode, Rect } from '@/utilities/geometry';
import { forNode } from '@/utilities/scrollable/for-node';
import { EventListener } from '@/components';
import { dataPolarisTopBar } from '@polaris/components/shared';

import {
  getMarginsForNode,
  getZIndexForLayerFromNode,
  isDocument,
} from './utilities/node';
import {
  calculateVerticalPosition,
  calculateHorizontalPosition,
  rectIsOutsideOfRect,
  intersectionWithViewport,
  windowRect,
} from './utilities/math';
import type { PositionedOverlayProps } from './types';
import type { VueNode } from '@/utilities/types';

type Positioning = 'above' | 'below' | 'cover';

export interface OverlayDetails {
  left?: number;
  right?: number;
  desiredHeight: number;
  positioning: Positioning;
  measuring: boolean;
  activatorRect: Rect;
  chevronOffset: number;
}

interface State {
  measuring: boolean;
  activatorRect: Rect;
  left?: number;
  right?: number;
  top: number;
  height: number;
  width: number | null;
  positioning: Positioning;
  zIndex: number | null;
  outsideScrollableContainer: boolean;
  lockPosition: boolean;
  chevronOffset: number;
}

type PositionedOverlayEmits = {
  'scroll-out': [];
}
type PositionedOverlaySlots = {
  default: (_?: VueNode) => any;
}

const OBSERVER_CONFIG = {
  childList: true,
  subtree: true,
  characterData: true,
  attributeFilter: ['style'],
};

const props = defineProps<PositionedOverlayProps>();

const emits = defineEmits<PositionedOverlayEmits>();

const slots = defineSlots<PositionedOverlaySlots>();

const state = reactive<State>({
  measuring: true,
  activatorRect: getRectForNode(props.activator),
  right: undefined,
  left: undefined,
  top: 0,
  height: 0,
  width: null,
  positioning: 'below',
  zIndex: null,
  outsideScrollableContainer: false,
  lockPosition: false,
  chevronOffset: 0,
});

const overlay = ref<HTMLElement | null>(null);
const scrollableContainers = ref<Array<HTMLElement | Document>>([]);
const observer = ref<MutationObserver>(new MutationObserver(handleMeasurement));

const style = computed(() => {
  return {
    top: state.top == null || isNaN(state.top) ? undefined : `${state.top}px`,
    left: state.left == null || isNaN(state.left) ? undefined : `${state.left}px`,
    right: state.right == null || isNaN(state.right) ? undefined : `${state.right}px`,
    width: state.width == null || isNaN(state.width) ? undefined : `${state.width}px`,
    zIndex: props.zIndexOverride || state.zIndex || undefined,
  } as StyleValue;
});

const className = computed(() => {
  return classNames(
    styles.PositionedOverlay,
    props.fixed && styles.fixed,
    props.preventInteraction && styles.preventInteraction,
    props.classNames,
  );
});

const firstScrollableContainer = computed<HTMLElement | Document | null>(() => {
  return scrollableContainers.value[0] ?? null;
});

const overlayDetails = computed<OverlayDetails>(() => {
  return {
    measuring: state.measuring,
    left: state.left,
    right: state.right,
    desiredHeight: state.height,
    positioning: state.positioning,
    activatorRect: state.activatorRect,
    chevronOffset: state.chevronOffset,
  }
});

onMounted(() => {
  setScrollableContainers();

  if (scrollableContainers.value.length && !props.fixed) {
    registerScrollHandlers();
  }

  handleMeasurement();
});

onUpdated(() => {
  if (
    props.active
    && state.top !== 0
    && state.outsideScrollableContainer
  ) {
    emits('scroll-out');
  }
});

onBeforeUnmount(() => {
  observer.value.disconnect();

  if (scrollableContainers.value.length && !props.fixed) {
    unregisterScrollHandlers();
  }
});

const setScrollableContainers = () => {
  const containers: Array<HTMLElement | Document> = [];
  let tmpScrollableContainers = forNode(props.activator);

  if (tmpScrollableContainers) {
    containers.push(tmpScrollableContainers);

    while (tmpScrollableContainers?.parentElement) {
      tmpScrollableContainers = forNode(tmpScrollableContainers.parentElement);

      containers.push(tmpScrollableContainers);
    }
  }

  scrollableContainers.value = containers;
};

const registerScrollHandlers = () => {
  scrollableContainers.value.forEach((node) => {
    node.addEventListener('scroll', handleMeasurement);
  });
};

const unregisterScrollHandlers = () => {
  scrollableContainers.value.forEach((node) => {
    node.removeEventListener('scroll', handleMeasurement);
  });
};

const forceUpdatePosition = () => {
  // Wait a single animation frame before re-measuring.
  // Consumer's may also need to setup their own timers for
  // triggering forceUpdatePosition() `children` use animation.
  // Ideally, forceUpdatePosition() is fired at the end of a transition event.
  nextTick(handleMeasurement);
}

function handleMeasurement() {
  const { lockPosition, top } = state;

  observer.value.disconnect();

  // Set state
  state.height = 0;
  state.positioning = 'below';
  state.measuring = true;

  nextTick(() => {
    if (overlay.value === null || firstScrollableContainer.value === null) {
      return;
    }

    const {
      activator,
      preferredPosition = 'below',
      preferredAlignment = 'center',
      fullWidth,
      fixed,
      preferInputActivator = true,
    } = props;

    const document = activator.ownerDocument;

    const preferredActivator = preferInputActivator
      ? activator.querySelector('input') || activator
      : activator;

    const activatorRect = getRectForNode(preferredActivator);

    const currentOverlayRect = getRectForNode(overlay.value);

    const scrollableElement = isDocument(firstScrollableContainer.value)
      ? document.body
      : firstScrollableContainer.value;
    const scrollableContainerRect = getRectForNode(scrollableElement);

    const overlayRect = fullWidth || preferredPosition === 'cover'
      ? new Rect({ ...currentOverlayRect, width: activatorRect.width })
      : currentOverlayRect;

    // If `body` is 100% height, it still acts as though it were not constrained to that size. This adjusts for that.
    if (scrollableElement === document.body) {
      scrollableContainerRect.height = document.body.scrollHeight;
    }

    let topBarOffset = 0;

    const topBarElement = scrollableElement.querySelector(`${dataPolarisTopBar.selector}`);

    if (topBarElement) {
      topBarOffset = topBarElement.clientHeight;
    }

    /**
     * Original version of below code was overlay.value.firstElementChild && overlay.value.firstChild instanceof HTMLElement
     * overlay.value.firstChild will be true if there is a text node inside overlay.value
     * -> this case seem like will never happen
     * -> remove overlay.value.firstChild instanceof HTMLElement and use overlay.value.firstElementChild only
     *
     * Note:
     * - With original version if overlay.value.firstElementChild is available and overlay.value.firstChild is not then there will be small padding below popover
     */
    let overlayMargins = {activator: 0, container: 0, horizontal: 0};

    if (overlay.value.firstElementChild) {
      const nodeMargins = getMarginsForNode(
        overlay.value.firstElementChild as HTMLElement,
      );

      overlayMargins = nodeMargins;
    }

    const containerRect = windowRect(props.activator);
    const zIndexForLayer = getZIndexForLayerFromNode(activator);
    const zIndex = zIndexForLayer == null ? zIndexForLayer : zIndexForLayer + 1;
    const verticalPosition = calculateVerticalPosition(
      activatorRect,
      overlayRect,
      overlayMargins,
      scrollableContainerRect,
      containerRect,
      preferredPosition,
      fixed,
      topBarOffset,
    );

    const horizontalPosition = calculateHorizontalPosition(
      activatorRect,
      overlayRect,
      containerRect,
      overlayMargins,
      preferredAlignment,
    );

    const tmpChevronOffset = activatorRect.center.x - horizontalPosition + overlayMargins.horizontal * 2;

    state.measuring = false;
    state.activatorRect = getRectForNode(activator);
    state.left = preferredAlignment !== 'right' ? horizontalPosition : undefined;
    state.right = preferredAlignment === 'right' ? horizontalPosition : undefined;
    state.top = lockPosition ? top : verticalPosition.top;
    state.lockPosition = Boolean(fixed);
    state.height = verticalPosition.height || 0;
    state.width = fullWidth || preferredPosition === 'cover' ? overlayRect.width : null;
    state.positioning = verticalPosition.positioning as Positioning;
    state.outsideScrollableContainer = rectIsOutsideOfRect(activatorRect, intersectionWithViewport(scrollableContainerRect, containerRect));
    state.zIndex = zIndex;
    state.chevronOffset = tmpChevronOffset;

    nextTick(() => {
      if (!overlay.value) {
        return;
      }

      observer.value.observe(overlay.value, OBSERVER_CONFIG);
      observer.value.observe(activator, OBSERVER_CONFIG);
    });
  });
}

defineExpose({
  forceUpdatePosition,
  overlayDetails,
});
</script>
