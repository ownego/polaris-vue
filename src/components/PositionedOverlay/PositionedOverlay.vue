<template lang="pug">
div(:class="className", :style="style", ref="overlay")
  div(:class="popoverClassName", v-bind="{...overlayAttr}")
    slot(
      name="overlay",
      :measuring="measuring",
      :left="left",
      :right="right",
      :desired-height="height",
      :positioning="positioning",
      :activator-rect="activatorRect",
    )
  EventListener(event="resize", :handler="handleMeasurement")
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Ref } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import { dataPolarisTopBar, overlay } from 'polaris-react/src/components/shared';
import {
  PreferredPosition,
  PreferredAlignment,
  calculateVerticalPosition,
  calculateHorizontalPosition,
  rectIsOutsideOfRect,
  intersectionWithViewport,
  windowRect,
} from './math';
import { getRectForNode, Rect } from '@/utilities/geometry';
import styles from '@/classes/PositionedOverlay.json';
import popoverStyles from '@/classes/Popover.json';
import { PopoverAutofocusTarget } from '../Popover/index';
import { isDocument, getMarginsForNode, getZIndexForLayerFromNode } from './utils';
import { Scrollable, EventListener } from '@/components';

const OBSERVER_CONFIG = {
  childList: true,
  subtree: true,
  characterData: true,
};

type Positioning = 'above' | 'below';

@Component({
  components: {
    Scrollable,
    EventListener,
  },
})
export default class PositionedOverlay extends Vue {
  @Prop({ type: Boolean }) public active!: boolean;

  @Prop({ type: HTMLElement }) public activator!: HTMLElement;

  @Prop({ type: Boolean }) public preferInputActivator!: boolean;

  @Prop({ type: String }) public preferredPosition!: PreferredPosition;

  @Prop({ type: String }) public preferredAlignment!: PreferredAlignment;

  @Prop({ type: Boolean }) public fullWidth!: boolean;

  @Prop({ type: Boolean }) public fullHeight?: boolean;

  @Prop({ type: Boolean }) public fluidContent?: boolean;

  @Prop({ type: Boolean }) public fixed!: boolean;

  @Prop({ type: Boolean }) public preventInteraction!: boolean;

  @Prop({ type: String }) public classNames!: string;

  @Prop({ type: Number }) public zIndexOverride!: number;

  @Prop({ type: String, default: 'container' }) public autofocusTarget?: PopoverAutofocusTarget;

  @Prop({ type: Boolean }) public hideOnPrint?: boolean;

  @Ref('overlay') overlayNode!: HTMLElement;

  get className() {
    const propClassNames = this.classNames;

    return classNames(
      styles.PositionedOverlay,
      this.fixed && styles.fixed,
      this.preventInteraction && styles.preventInteraction,
      propClassNames,
    );
  }

  get popoverClassName() {
    return classNames(
      popoverStyles.Popover,
      this.positioning === 'above' && popoverStyles.positionedAbove,
      this.fullWidth && popoverStyles.fullWidth,
      this.measuring && popoverStyles.measuring,
      this.hideOnPrint && popoverStyles['PopoverOverlay-hideOnPrint'],
    );
  }

  public right ?: number | null = null;

  public left ?: number | null = null;

  public top = 0;

  public height = 0;

  public width : number | null = null;

  public zIndex: number | null = null;

  public measuring = true;

  public positioning = 'below';

  public activatorRect = getRectForNode(this.activator);

  public lockPosition = false;

  public outsideScrollableContainer = false;

  private overlay: HTMLElement | null = null;

  private scrollableContainer: HTMLElement | Document | null = null;

  private observer!: MutationObserver;

  public overlayAttr = overlay.props;

  get style() {
    return {
      top: this.top == null || Number.isNaN(this.top) ? undefined : `${this.top}px`,
      left: this.left == null || Number.isNaN(this.left) ? undefined : `${this.left}px`,
      right: this.right == null || Number.isNaN(this.right) ? undefined : `${this.right}px`,
      width: this.width == null || Number.isNaN(this.width) ? undefined : `${this.width}px`,
      zIndex: this.zIndexOverride || this.zIndex || undefined,
    };
  }

  public handleMeasurement() {
    const { lockPosition, top } = this;

    this.observer.disconnect();
    this.height = 0;
    this.positioning = 'below';
    this.measuring = true;

    if (this.overlayNode == null || this.scrollableContainer == null) {
      return;
    }
    const {
      activator,
      preferredPosition = 'below',
      preferredAlignment = 'center',
      fullWidth,
      fixed,
      preferInputActivator = true,
    } = this;

    const preferredActivator = preferInputActivator
      ? activator.querySelector('input') || activator
      : activator;

    const activatorRect = getRectForNode(preferredActivator);

    const currentOverlayRect = getRectForNode(this.overlay);
    const scrollableElement = isDocument(this.scrollableContainer)
      ? document.body
      : this.scrollableContainer;
    const scrollableContainerRect = getRectForNode(scrollableElement);
    const overlayRect = fullWidth
      ? new Rect({ ...currentOverlayRect, width: activatorRect.width })
      : currentOverlayRect;

    // If `body` is 100% height, it still acts as though it were not constrained to that size.
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

    const overlayMargins = this.overlayNode.firstElementChild
          && this.overlayNode.firstChild instanceof HTMLElement
      ? getMarginsForNode(this.overlayNode.firstElementChild as HTMLElement)
      : { activator: 0, container: 0, horizontal: 0 };

    const containerRect = windowRect();
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

    this.measuring = false;
    this.activatorRect = getRectForNode(activator);
    this.left = preferredAlignment !== 'right' ? horizontalPosition : undefined;
    this.right = preferredAlignment === 'right' ? horizontalPosition : undefined;
    this.top = lockPosition ? top : verticalPosition.top;
    this.lockPosition = Boolean(fixed);
    this.height = verticalPosition.height || 0;
    this.width = fullWidth ? overlayRect.width : null;
    this.positioning = verticalPosition.positioning as Positioning;
    this.outsideScrollableContainer = rectIsOutsideOfRect(
      activatorRect,
      intersectionWithViewport(scrollableContainerRect),
    );
    this.zIndex = zIndex;
    this.$emit('change-content-styles', { height: `${this.height}px` });
    if (!this.overlay) return;
    this.observer.observe(this.overlay, OBSERVER_CONFIG);
    this.observer.observe(activator, OBSERVER_CONFIG);
  }

  created(): void {
    this.observer = new MutationObserver(this.handleMeasurement);
  }

  updated(): void {
    if (this.active && this.top !== 0 && this.outsideScrollableContainer) {
      this.$emit('scroll-out');
    }
  }

  mounted(): void {
    this.scrollableContainer = Scrollable.forNode(this.activator);
    if (this.scrollableContainer && !this.fixed) {
      this.scrollableContainer.addEventListener('scroll', this.handleMeasurement);
    }
    this.handleMeasurement();
  }

  beforeDestroy(): void {
    if (this.scrollableContainer && !this.fixed) {
      this.scrollableContainer.removeEventListener('scroll', this.handleMeasurement);
    }
  }
}
</script>
<style lang="scss">
@import 'polaris-react/src/components/PositionedOverlay/PositionedOverlay.scss';
</style>
