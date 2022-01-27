<template lang="pug">
PositionedOverlay(
  :id="id",
  :fullWidth="fullWidth",
  :active="active",
  :activator="activator",
  :classNames="className",
  :preferInputActivator="preferInputActivator",
  :fixed="fixed",
  :preferredPosition="preferredPosition",
  :preferredAlignment="preferredAlignment",
  :zIndexOverride="zIndexOverride",
  @scroll-out="handleScrollOut",
  @on-click="handleClick",
  @change-content-styles="changeContentStyles",
)
  template(
    slot="overlay",
    slot-scope="props",
  )
    div(:class="focusTrackerClasses", tabIndex="0", @focus="handleFocusFirstItem")
    div(:class="popoverWrapperClasses")
      div(
        :tabIndex="autofocusTarget === 'none' ? undefined : -1",
        :style="contentStyles",
        :class="contentClassNames",
        ref="content",
      )
        slot(name="extra-content")
        Pane(
          :sectioned="sectioned",
          :fixed="fixed",
          @scrolled-to-bottom="$emit('scrolled-to-bottom')",
        )
          slot(
            name="overlay",
            :data="props",
          )
    div(:class="focusTrackerClasses", tabIndex="0", @focus="handleFocusLastItem")
    EventListener(event="click", :handler="handleClick")
    EventListener(event="touchstart", :handler="handleClick")
    KeypressListener(:keyCode="keyEscape", :handler="handleEscape")
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Component, Prop, Watch, Ref,
} from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import { durationFast } from '@shopify/polaris-tokens';
import { findFirstFocusableNode } from '@/utilities/focus';
import { PositionedOverlay, PreferredAlignment, PreferredPosition } from '@/components/PositionedOverlay';
import styles from '@/classes/Popover.json';
import { EventListener } from '@/components/EventListener';
import { KeypressListener, Key } from '@/components/KeypressListener';
import {
  PopoverCloseSource, PopoverAutofocusTarget, nodeContainsDescendant, TransitionStatus,
} from '../../utils';
import { Pane } from '../Pane';

@Component({
  components: {
    PositionedOverlay,
    Pane,
    EventListener,
    KeypressListener,
  },
})
export default class PopoverOverlay extends Vue {
  @Prop({ type: Boolean }) public fullWidth?: boolean;

  @Prop({ type: Boolean }) public fullHeight?: boolean;

  @Prop({ type: Boolean }) public fluidContent?: boolean;

  @Prop({ type: String }) public id?: string;

  @Prop({ type: String, default: 'below' }) public preferredPosition?: PreferredPosition;

  @Prop({ type: String, default: 'center' }) public preferredAlignment?: PreferredAlignment;

  @Prop({ type: Boolean }) public active!: boolean;

  @Prop({ type: Number }) public zIndexOverride?: number;

  @Prop({ type: HTMLElement }) public activator!: HTMLElement;

  @Prop({ type: Boolean, default: true }) public preferInputActivator?: boolean;

  @Prop({ type: Boolean }) public sectioned?: boolean;

  @Prop({ type: Boolean }) public fixed?: boolean;

  @Prop({ type: Boolean }) public hideOnPrint?: boolean;

  @Prop({ type: String, default: 'container' }) public autofocusTarget?: PopoverAutofocusTarget;

  @Watch('active')
  onActiveChanged() {
    const beforeStatus = this.active ? TransitionStatus.Entering : TransitionStatus.Exiting;
    const afterStatus = this.active ? TransitionStatus.Entered : TransitionStatus.Exited;

    this.changeTransitionStatus(beforeStatus);

    this.clearTransitionTimeout();
    const timer = window.setTimeout(() => {
      this.transitionStatus = afterStatus;
    }, durationFast);

    if (this.active) {
      this.enteringTimer = timer;
    } else {
      this.exitingTimer = timer;
    }
  }

  @Ref('content') contentNode!: HTMLElement;

  get className() {
    return classNames(
      styles.PopoverOverlay,
      this.transitionStatus === TransitionStatus.Entering && styles['PopoverOverlay-entering'],
      this.transitionStatus === TransitionStatus.Entered && styles['PopoverOverlay-open'],
      this.transitionStatus === TransitionStatus.Exiting && styles['PopoverOverlay-exiting'],
    );
  }

  get contentClassNames() {
    return classNames(
      styles.Content,
      this.fullHeight && styles['Content-fullHeight'],
      this.fluidContent && styles['Content-fluidContent'],
    );
  }

  public keyEscape = Key.Escape;

  public contentStyles: null | Record<string, unknown> = {};

  public popoverWrapperClasses = styles.Wrapper;

  public focusTrackerClasses = styles.FocusTracker;

  public transitionStatus : TransitionStatus = TransitionStatus.Exited;

  private enteringTimer?: number;

  private exitingTimer?: number;

  private changeTransitionStatus(transitionStatus: TransitionStatus) {
    this.transitionStatus = transitionStatus;
    // Forcing a reflow to enable the animation
    if (this.contentNode) this.contentNode.getBoundingClientRect();
  }

  private clearTransitionTimeout() {
    if (this.enteringTimer) {
      window.clearTimeout(this.enteringTimer);
    }

    if (this.exitingTimer) {
      window.clearTimeout(this.exitingTimer);
    }
  }

  public handleScrollOut() {
    this.$emit('close', PopoverCloseSource.ScrollOut);
  }

  public handleEscape() {
    this.$emit('close', PopoverCloseSource.EscapeKeypress);
  }

  public handleClick(event: Event) {
    const target = event.target as HTMLElement;
    const isDescendant = this.contentNode && nodeContainsDescendant(this.contentNode, target);
    const isActivatorDescendant = nodeContainsDescendant(this.activator, target);

    if (isDescendant || isActivatorDescendant
    || this.transitionStatus !== TransitionStatus.Entered) return;
    this.$emit('close', PopoverCloseSource.Click);
  }

  public handleFocusFirstItem() {
    this.$emit('close', PopoverCloseSource.FocusOut);
  }

  public handleFocusLastItem() {
    this.$emit('close', PopoverCloseSource.FocusOut);
  }

  public changeContentStyles(contentStyles : null | Record<string, unknown>) {
    this.contentStyles = contentStyles;
  }

  private focusContent() {
    const { autofocusTarget = 'container' } = this;

    if (autofocusTarget === 'none' || this.contentNode == null) {
      return;
    }

    requestAnimationFrame(() => {
      if (this.contentNode == null) {
        return;
      }

      const focusableChild = findFirstFocusableNode(this.contentNode);

      if (focusableChild && autofocusTarget === 'first-node') {
        focusableChild.focus();
      } else {
        this.contentNode.focus();
      }
    });
  }

  mounted(): void {
    if (this.active) {
      this.focusContent();
      this.changeTransitionStatus(TransitionStatus.Entered);
    }
  }

  beforeDestroy(): void {
    this.clearTransitionTimeout();
  }
}
</script>
