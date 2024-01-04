<template lang="pug">
</template>

<script setup lang="ts">
import {
  useCssModule,
  nextTick,
  ref,
  computed,
  onMounted,
  onUpdated,
  onUnmounted,
} from 'vue';
import { classNames } from '@/utilities/css';
import {getRectForNode, Rect} from '@/utilities/geometry';
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
import type {PreferredPosition, PreferredAlignment} from './utilities/math';

type Positioning = 'above' | 'below';

interface OverlayDetails {
  left?: number;
  right?: number;
  desiredHeight: number;
  positioning: Positioning;
  measuring: boolean;
  activatorRect: Rect;
  chevronOffset: number;
}

export type PositionedOverlayProps = {
  active: boolean;
  activator: HTMLElement;
  preferInputActivator?: boolean;
  preferredPosition?: PreferredPosition;
  preferredAlignment?: PreferredAlignment;
  fullWidth?: boolean;
  fixed?: boolean;
  preventInteraction?: boolean;
  classNames?: string;
  zIndexOverride?: number;
}

type Emits = {
  scrollOut: [];
}

const OBSERVER_CONFIG = {
  childList: true,
  subtree: true,
  characterData: true,
  attributeFilter: ['style'],
}

const styles = useCssModule();

const props = defineProps<PositionedOverlayProps>();

const emits = defineEmits<Emits>();

const measuring = ref<boolean>(true);
const activatorRect = ref<Rect>(getRectForNode(props.activator));
const right = ref<number | undefined>(undefined);
const left = ref<number | undefined>(undefined);
const top = ref<number>(0);
const height = ref<number>(0);
const width = ref<number | null>(null);
const positioning = ref<Positioning>('below');
const zIndex = ref<number | null>(null);
const outsideScrollableContainer = ref<boolean>(false);
const lockPosition = ref<boolean>(false);
const chevronOffset = ref<number>(0);

const overlay = ref<HTMLElement | null>(null);
const scrollableContainers = ref<Array<HTMLElement | Document>>([]);
const observer = ref<MutationObserver>(new MutationObserver(handleMeasurement));

const style = computed(() => {
  return {
    top: top.value === null || Number.isNaN(top.value) ? undefined : `${top.value}px`,
    left: left.value === null || Number.isNaN(left.value) ? undefined : `${left.value}px`,
    right: right.value === null || Number.isNaN(right.value) ? undefined : `${right.value}px`,
    width: width.value === null || Number.isNaN(width.value) ? undefined : `${width.value}px`,
    zIndex: props.zIndexOverride || zIndex.value || undefined,
  }
});

const className = computed(() => {
  return classNames(
    styles.PositionedOverlay,
    props.fixed && styles.fixed,
    props.preventInteraction && styles.preventInteraction,
    props.classNames,
  )
});

const overlayDetails = computed<OverlayDetails>(() => {
  return {
    measuring: measuring.value,
    left: left.value,
    right: right.value,
    desiredHeight: height.value,
    positioning: positioning.value,
    activatorRect: activatorRect.value,
    chevronOffset: chevronOffset.value,
  };
});

const firstScrollableContainer = computed<HTMLElement | Document | null>(() => {
  return scrollableContainers.value[0] ?? null;
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
    && top.value !== 0
    && outsideScrollableContainer.value
  ) {
    emits('scrollOut');
  }
});

onUnmounted(() => {
  observer.value.disconnect();

  if (scrollableContainers.value.length && !props.fixed) {
    unregisterScrollHandlers();
  }
});

const setOverLay = (node: HTMLElement | null) => {
  overlay.value = node;
};

const setScrollableContainers = () => {
  const containers: Array<HTMLElement | Document> = [];
  let tmpScrollableContainers = forNode(props.activator);

  if (tmpScrollableContainers) {
    containers.push(tmpScrollableContainers);

    while(tmpScrollableContainers?.parentElement) {
      tmpScrollableContainers = forNode(tmpScrollableContainers.parentElement);

      containers.push(tmpScrollableContainers);
    }
  }

  scrollableContainers.value  = containers;
};

const registerScrollHandlers = () => {
  scrollableContainers.value.forEach((node) => {
    node.addEventListener('scroll',handleMeasurement);
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

const handleMeasurement = () => {
  observer.value.disconnect();

  // Set state
  height.value = 0;
  positioning.value = 'below';
  measuring.value = true;

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

  const preferredActivator = preferInputActivator
    ? activator.querySelector('input') || activator
    : activator;

  const tmpActivatorRect = getRectForNode(preferredActivator);

  const currentOverlayRect = getRectForNode(overlay.value);
  const scrollableElement = isDocument(firstScrollableContainer.value)
    ? document.body
    : firstScrollableContainer.value;
  const scrollableContainerRect = getRectForNode(scrollableElement);

  const overlayRect = fullWidth
    ? new Rect({ ...currentOverlayRect, width: tmpActivatorRect.width })
    : currentOverlayRect;

  // If `body` is 100% height, it still acts as though it were not constrained to that size. This adjusts for that.
  if (scrollableElement === document.body) {
    scrollableContainerRect.height = document.body.scrollHeight;
  }

  let topBarOffset = 0;
  
  const topBarElement = scrollableElement.querySelector(
    `${dataPolarisTopBar.selector}`,
  );
  if (topBarElement) {
    topBarOffset = topBarElement.clientHeight;
  }

  const overlayMargins = overlay.value.firstElementChild && overlay.value.firstChild instanceof HTMLElement
    ? getMarginsForNode(overlay.value.firstElementChild as HTMLElement)
    : {
      activator: 0,
      container: 0,
      horizontal: 0,
    };
  
  const containerRect = windowRect();
  const zIndexForLayer = getZIndexForLayerFromNode(activator);
  const tmpZIndex = zIndexForLayer == null ? zIndexForLayer : zIndexForLayer + 1;
  const verticalPosition = calculateVerticalPosition(
    tmpActivatorRect,
    overlayRect,
    overlayMargins,
    scrollableContainerRect,
    containerRect,
    preferredPosition,
    fixed,
    topBarOffset,
  );
  const horizontalPosition = calculateHorizontalPosition(
    tmpActivatorRect,
    overlayRect,
    containerRect,
    overlayMargins,
    preferredAlignment,
  );

  const tmpChevronOffset = tmpActivatorRect.center.x - horizontalPosition + overlayMargins.horizontal * 2;

  measuring.value = false;
  activatorRect.value = getRectForNode(activator);
  left.value = props.preferredAlignment !== 'right' ? horizontalPosition : undefined;
  right.value = props.preferredAlignment === 'right' ? horizontalPosition : undefined;
  lockPosition.value = Boolean(fixed);
  height.value = verticalPosition.height || 0;
  width.value = fullWidth ? overlayRect.width : null;
  positioning.value = verticalPosition.positioning as Positioning;
  outsideScrollableContainer.value = rectIsOutsideOfRect(tmpActivatorRect, intersectionWithViewport(scrollableContainerRect));
  zIndex.value = tmpZIndex;
  chevronOffset.value = tmpChevronOffset;

  if (!overlay.value) {
    return;
  }

  observer.value.observe(overlay.value, OBSERVER_CONFIG);
  observer.value.observe(activator, OBSERVER_CONFIG);
}
</script>

<style lang="scss" module>
@import '@polaris/components/PositionedOverlay/PositionOverlay.scss';
</style>
