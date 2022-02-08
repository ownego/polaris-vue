<template lang="pug">
div(
  ref="scrollArea",
  v-bind="scrollableAttr",
  :class="finalClassName",
  :tabindex="focusable ? 0 : undefined",
)
  <!-- Content to display in scrollable area -->
  slot
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Component,
  Prop,
  Ref,
  Provide,
  Watch,
} from 'vue-property-decorator';
import debounce from 'lodash/debounce';
import { classNames } from 'polaris-react/src/utilities/css';
import { scrollable } from 'polaris-react/src/components/shared';
import { StickyManager } from '@/utilities/sticky-manager';
import styles from '@/classes/Scrollable.json';

function prevent(evt: Event) {
  evt.preventDefault();
}

function prefersReducedMotion() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (err) {
    return false;
  }
}

const MAX_SCROLL_DISTANCE = 100;
const DELTA_THRESHOLD = 0.2;
const DELTA_PERCENTAGE = 0.2;
const EVENTS_TO_LOCK = ['scroll', 'touchmove', 'wheel'];
const PREFERS_REDUCED_MOTION = prefersReducedMotion();
const LOW_RES_BUFFER = 2;

@Component
export default class Scrollable extends Vue {
  private stickyManagerContext = new StickyManager();

  @Provide() stickyManager = this.stickyManagerContext;

  @Provide() scrollToPosition = this.scrollToPositionMethod;

  @Ref('scrollArea') scrollArea!: HTMLDivElement;

  /**
   * Scroll content vertically
   */
  @Prop({ type: Boolean, default: true })
  public vertical?: boolean;

  /**
   * Scroll content horizontally
   */
  @Prop({ type: Boolean })
  public horizontal?: boolean;

  /**
   * Add a shadow when content is scrollable
   */
  @Prop({ type: Boolean })
  public shadow?: boolean;

  /**
   * Slightly hints content upon mounting when scrollable
   */
  @Prop({ type: Boolean })
  public hint?: boolean;

  /**
   * Adds a tabIndex to scrollable when children are not focusable
   */
  @Prop({ type: Boolean })
  public focusable?: boolean;

  public topShadow = false;

  public bottomShadow = false;

  public scrollPosition = 0;

  public canScroll = false;

  public scrollableAttr = scrollable.props;

  get finalClassName(): string {
    return classNames(
      styles.Scrollable,
      this.vertical && styles.vertical,
      this.horizontal && styles.horizontal,
      this.topShadow && styles.hasTopShadow,
      this.bottomShadow && styles.hasBottomShadow,
      this.vertical && this.canScroll && styles.verticalHasScrolling,
    );
  }

  protected mounted() {
    if (!this.scrollArea) return;

    this.stickyManagerContext.setContainer(this.scrollArea);
    (this.$refs.scrollArea as HTMLDivElement).addEventListener('scroll', () => {
      window.requestAnimationFrame(this.handleScroll);
    });
    window.addEventListener('resize', this.handleResize);
    window.requestAnimationFrame(() => {
      this.handleScroll();
      if (this.hint) {
        this.scrollHint();
      }
    });
  }

  @Watch('scrollPosition')
  onScrollPositionChanged() {
    if (this.scrollArea && this.scrollPosition > 0) {
      (this.$refs.scrollArea as HTMLDivElement).scrollTop = this.scrollPosition;
    }
  }

  protected destroyed() {
    if (!this.scrollArea) return;

    (this.$refs.scrollArea as HTMLDivElement)
      .removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
    this.stickyManagerContext.removeScrollListener();
  }

  private handleResize = debounce(
    () => {
      this.handleScroll();
    },
    50,
    { trailing: true },
  );

  private handleScroll() {
    if (!this.scrollArea) return;

    const { scrollTop, clientHeight, scrollHeight } = this.scrollArea;
    const shouldBottomShadow = Boolean(
      this.shadow && !(scrollTop + clientHeight >= scrollHeight),
    );
    const shouldTopShadow = Boolean(
      this.shadow && scrollTop > 0 && this.scrollPosition > 0,
    );

    const canScroll = scrollHeight > clientHeight;
    const hasScrolledToBottom = scrollHeight - scrollTop <= clientHeight + LOW_RES_BUFFER;

    if (canScroll && hasScrolledToBottom) {
      /**
       * Called when scrolled to the bottom of the scroll area
       */
      this.$emit('scrolled-to-bottom');
    }

    this.topShadow = shouldTopShadow;
    this.bottomShadow = shouldBottomShadow;
    this.scrollPosition = scrollTop;
    this.canScroll = canScroll;
  }

  private scrollHint() {
    if (!this.scrollArea) return;

    const { clientHeight, scrollHeight } = this.scrollArea;

    if (
      PREFERS_REDUCED_MOTION
      || this.scrollPosition > 0
      || scrollHeight <= clientHeight
    ) {
      return;
    }

    const scrollDistance = scrollHeight - clientHeight;

    this.toggleLock();
    this.scrollPosition = scrollDistance > MAX_SCROLL_DISTANCE
      ? MAX_SCROLL_DISTANCE
      : scrollDistance;

    window.requestAnimationFrame(this.scrollStep);
  }

  private scrollStep(): void {
    const delta = this.scrollPosition * DELTA_PERCENTAGE;
    this.scrollPosition = delta < DELTA_THRESHOLD
      ? 0
      : this.scrollPosition - delta;

    if (this.scrollPosition > 0) {
      window.requestAnimationFrame(this.scrollStep);
    } else {
      this.toggleLock(false);
    }
  }

  private toggleLock(shouldLock = true): void {
    if (this.scrollArea) {
      EVENTS_TO_LOCK.forEach((eventName) => {
        if (shouldLock) {
          (this.$refs.scrollArea as HTMLDivElement)
            .addEventListener(eventName, prevent);
        } else {
          (this.$refs.scrollArea as HTMLDivElement)
            .removeEventListener(eventName, prevent);
        }
      });
    }
  }

  private scrollToPositionMethod(scrollY: number): void {
    this.scrollPosition = scrollY;
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Scrollable/Scrollable.scss';
</style>
