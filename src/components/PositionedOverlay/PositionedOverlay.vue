<template lang="pug">
div(:class="className", :style="style", ref="overlayRef")
  template(v-if="layout === 'tooltip'")
    div(:class="tooltipClassName", v-bind="{...layer.props}")
      slot
  template(v-else)
    div(:class="popoverClassName", v-bind="{...overlay.props}")
      slot
  EventListener(event="resize", :handler="handleMeasurement")
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { ref, computed, onBeforeMount, onUpdated, onMounted, onBeforeUnmount } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import { dataPolarisTopBar, overlay, layer } from 'polaris/polaris-react/src/components/shared';
import { getRectForNode, Rect } from '@/utilities/geometry';
import styles from '@/classes/PositionedOverlay.json';
import popoverStyles from '@/classes/Popover.json';
import tooltipStyles from '@/classes/Tooltip-TooltipOverlay.json';
import {
  calculateVerticalPosition,
  calculateHorizontalPosition,
  rectIsOutsideOfRect,
  intersectionWithViewport,
  windowRect,
} from './math';
import type { PreferredPosition, PreferredAlignment } from './math';
import { isDocument, getMarginsForNode, getZIndexForLayerFromNode } from './utils';
import { EventListener } from '../EventListener';
import { forNode } from '../Scrollable/utils';

const OBSERVER_CONFIG = {
  childList: true,
  subtree: true,
  characterData: true,
};

type Positioning = 'above' | 'below';

interface PositionedOverlayProps {
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
  hideOnPrint?: boolean;
  layout?: string;
}

const props = defineProps<PositionedOverlayProps>();

const emit = defineEmits<{
  (event: 'change-content-styles', value: Record<string, unknown>): void;
  (event: 'scroll-out'): void;
}>();

const overlayRef = ref<HTMLElement | null>(null);
const right = ref<number | null>(null);
const left = ref<number | null>(null);
const top = ref<number>(0);
const height = ref<number>(0);
const width = ref<number | null>(null);
const zIndex = ref<number | null>(null);
const measuring = ref<boolean>(true);
const positioning = ref<Positioning>('below');
const activatorRect = ref<Rect>(getRectForNode(props.activator));
const lockPosition = ref<boolean>(false);
const outsideScrollableContainer = ref<boolean>(false);
const scrollableContainer = ref<HTMLElement | Document | null>(null);
const observer = ref<MutationObserver | null>(null);

const className = computed(() => {
  const propClassNames = props.classNames;

  return classNames(
    styles.PositionedOverlay,
    props.fixed && styles.fixed,
    props.preventInteraction && styles.preventInteraction,
    propClassNames,
  );
});

const popoverClassName = computed(() =>
  classNames(
    popoverStyles.Popover,
    positioning.value === 'above' && popoverStyles.positionedAbove,
    props.fullWidth && popoverStyles.fullWidth,
    measuring.value && popoverStyles.measuring,
    props.hideOnPrint && popoverStyles['PopoverOverlay-hideOnPrint'],
  ),
);

const tooltipClassName = computed(() =>
  classNames(
    tooltipStyles.TooltipOverlay,
    measuring.value && tooltipStyles.measuring,
    positioning.value === 'above' && tooltipStyles.positionedAbove,
  ),
);

const style = computed(
  () =>
    ({
      top: top.value == null || Number.isNaN(top.value) ? undefined : `${top.value}px`,
      left: left.value == null || Number.isNaN(left.value) ? undefined : `${left.value}px`,
      right: right.value == null || Number.isNaN(right.value) ? undefined : `${right.value}px`,
      width: width.value == null || Number.isNaN(width.value) ? undefined : `${width.value}px`,
      zIndex: props.zIndexOverride || zIndex.value || undefined,
    } as Record<string, unknown>),
);

const handleMeasurement = () => {
  if (observer.value) {observer.value.disconnect();}
  height.value = 0;
  positioning.value = 'below';
  measuring.value = true;

  if (overlayRef.value && scrollableContainer.value) {
    const {
      activator,
      preferredPosition = 'below',
      preferredAlignment = 'center',
      fullWidth,
      fixed,
      preferInputActivator = true,
    } = props;

    const preferredActivator = preferInputActivator ? activator.querySelector('input') || activator : activator;

    const activatorRectValue = getRectForNode(preferredActivator);
    const currentOverlayRect = getRectForNode(overlayRef.value);
    const scrollableElement = isDocument(scrollableContainer.value) ? document.body : scrollableContainer.value;
    const scrollableContainerRect = getRectForNode(scrollableElement);
    const overlayRect = fullWidth
      ? new Rect({ ...currentOverlayRect, width: activatorRectValue.width })
      : currentOverlayRect;

    // If `body` is 100% height, it still acts as though it were not constrained to that size.
    if (scrollableElement === document.body) {
      scrollableContainerRect.height = document.body.scrollHeight;
    }

    let topBarOffset = 0;
    const topBarElement = scrollableElement.querySelector(`${dataPolarisTopBar.selector}`);
    if (topBarElement) {
      topBarOffset = topBarElement.clientHeight;
    }

    const overlayMargins =
      overlayRef.value.firstElementChild && overlayRef.value.firstChild
        ? getMarginsForNode(overlayRef.value.firstElementChild as HTMLElement)
        : { activator: 0, container: 0, horizontal: 0 };

    const containerRect = windowRect();
    const zIndexForLayer = getZIndexForLayerFromNode(activator);
    const zIndexValue = zIndexForLayer == null ? zIndexForLayer : zIndexForLayer + 1;
    const verticalPosition = calculateVerticalPosition(
      activatorRectValue,
      overlayRect,
      overlayMargins,
      scrollableContainerRect,
      containerRect,
      preferredPosition,
      fixed,
      topBarOffset,
    );
    const horizontalPosition = calculateHorizontalPosition(
      activatorRectValue,
      overlayRect,
      containerRect,
      overlayMargins,
      preferredAlignment,
    );

    measuring.value = false;
    activatorRect.value = getRectForNode(activator);
    left.value = preferredAlignment !== 'right' ? horizontalPosition : null;
    right.value = preferredAlignment === 'right' ? horizontalPosition : null;
    top.value = lockPosition.value ? top.value : verticalPosition.top;
    lockPosition.value = Boolean(fixed);
    height.value = verticalPosition.height || 0;
    width.value = fullWidth ? overlayRect.width : null;
    positioning.value = verticalPosition.positioning as Positioning;
    outsideScrollableContainer.value = rectIsOutsideOfRect(
      activatorRectValue,
      intersectionWithViewport(scrollableContainerRect),
    );
    zIndex.value = zIndexValue;
    emit('change-content-styles', { desiredHeight: height.value });
    if (observer.value) {
      observer.value.observe(overlayRef.value, OBSERVER_CONFIG);
      observer.value.observe(activator, OBSERVER_CONFIG);
    }
  }
};

onBeforeMount(() => {
  observer.value = new MutationObserver(handleMeasurement);
});

onUpdated(() => {
  if (props.active && top.value !== 0 && outsideScrollableContainer.value) {
    emit('scroll-out');
  }
});

onMounted(() => {
  scrollableContainer.value = forNode(props.activator);
  if (scrollableContainer.value && !props.fixed) {
    scrollableContainer.value.addEventListener('scroll', handleMeasurement);
  }
  handleMeasurement();
});

onBeforeUnmount(() => {
  if (scrollableContainer.value && !props.fixed) {
    scrollableContainer.value.removeEventListener('scroll', handleMeasurement);
  }
});
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/PositionedOverlay/PositionedOverlay.scss';
</style>
