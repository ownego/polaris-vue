<template lang="pug">
div(
  ref="scrollArea",
  :class="finalClassName",
  :tabindex="focusable ? 0 : undefined",
  v-bind="scrollable.props",
)
  slot
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  provide,
} from 'vue';
import { scrollable } from '@polaris/components/shared';
import { debounce } from '@polaris/utilities/debounce';
import { classNames, variationName } from '@/utilities/css';
import { StickyManager } from '@/utilities/sticky-manager';
import useLazyRef from '@/use/useLazyRef';
import type { VueNode } from '@/utilities/types';
import styles from '@polaris/components/Scrollable/Scrollable.module.css';

const MAX_SCROLL_HINT_DISTANCE = 100;
const LOW_RES_BUFFER = 2;

/**
 * In react version this prop will extends React.HTMLProps<HTMLDivElement>
 * But with Vue we don't need to do that just simple pass the attribute the same way we passing props
 */
export type ScrollableProps = {
  /** Scroll content vertically
   * @default true
   */
  vertical?: boolean;
  /** Scroll content horizontally
   * @default true
   */
  horizontal?: boolean;
  /** Add a shadow when content is scrollable */
  shadow?: boolean;
  /** Slightly hints content upon mounting when scrollable */
  hint?: boolean;
  /** Adds a tabIndex to scrollable when children are not focusable */
  focusable?: boolean;
  /** Browser determined scrollbar width */
  scrollbarWidth?: 'thin' | 'none';
  /** Adds space to one or both sides to prevent content shift when scrolling is necessary */
  scrollbarGutter?: 'stable' | 'stable both-edges';
}

export type ScrollableEmits = {
  /** Called when scrolled to the bottom of the scroll area */
  scrolledToBottom: [];
}

export interface ScrollToOptions {
  behavior?: 'instant' | 'smooth' | 'auto';
}

export interface ScrollableRef {
  scrollTo: (scrollY: number, options?: ScrollToOptions) => void;
}

export type ScrollableSlot = {
  /** Content inside scrollable */
  default: (_: VueNode) => null;
}

// Don't need to work with ...rest of props, attrs is enough
const props = withDefaults(defineProps<ScrollableProps>(), {
  vertical: true,
  horizontal: true,
});

const textSlots = defineSlots<ScrollableSlot>();

const emits = defineEmits<ScrollableEmits>();

const topShadow = ref<boolean>(false);
const bottomShadow = ref<boolean>(false);
const scrollArea = ref<HTMLDivElement | null>(null);

const stickyManager = useLazyRef(() => new StickyManager());

const finalClassName = computed(() => classNames(
  styles.Scrollable,
  props.vertical && styles.vertical,
  props.horizontal && styles.horizontal,
  props.shadow && topShadow.value && styles.hasTopShadow,
  props.shadow && bottomShadow.value && styles.hasBottomShadow,
  props.scrollbarWidth && styles[variationName('scrollbarWidth', props.scrollbarWidth)],
  props.scrollbarGutter && styles[ variationName('scrollbarGutter', props.scrollbarGutter.replace(' ', ''))],
));

const setTopShadow = (value: boolean) => {
  topShadow.value = value;
};

const setBottomShadow = (value: boolean) => {
  bottomShadow.value = value;
};

const scrollTo = (scrollY: number, options: ScrollToOptions = {}) => {
  const optionsBehavior = options.behavior || 'smooth';
  const behavior = prefersReducedMotion() ? 'auto' : optionsBehavior;

  scrollArea.value?.scrollTo({top: scrollY, behavior});
};

const handleScroll = () => {
  const currentScrollArea = scrollArea.value;

  if (!currentScrollArea) {
    return;
  }

  requestAnimationFrame(() => {
    const {
      scrollTop,
      clientHeight,
      scrollHeight,
    } = currentScrollArea;
    const canScroll = Boolean(scrollHeight > clientHeight);
    const isBelowTopOfScroll = Boolean(scrollTop > 0);
    const isAtBottomOfScroll = Boolean(scrollTop + clientHeight >= scrollHeight - LOW_RES_BUFFER);

    setTopShadow(isBelowTopOfScroll);
    setBottomShadow(!isAtBottomOfScroll);

    if (canScroll && isAtBottomOfScroll) {
      emits('scrolledToBottom')
    }
  });
};

const handleResize = debounce(handleScroll, 50, { trailing: true });

onMounted(() => {
  handleScroll();

  if (props.hint) {
    requestAnimationFrame(() => performScrollHint(scrollArea.value));
  }

  const currentScrollArea = scrollArea.value;

  if (currentScrollArea) {
    stickyManager.value.setContainer(currentScrollArea);
    currentScrollArea.addEventListener('scroll', handleScroll);
    globalThis.addEventListener('resize', handleResize);
  }
});

onBeforeUnmount(() => {
  const currentScrollArea = scrollArea.value;

  if (currentScrollArea) {
    currentScrollArea.removeEventListener('scroll', handleScroll);
    globalThis.removeEventListener('resize', handleResize);
  }
});

const prefersReducedMotion = () =>{
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (err) {
    return false;
  }
}

const performScrollHint = (elem?: HTMLDivElement | null) => {
  if (!elem || prefersReducedMotion()) {
    return;
  }

  const scrollableDistance = elem.scrollHeight - elem.clientHeight;
  const distanceToPeek = Math.min(MAX_SCROLL_HINT_DISTANCE, scrollableDistance) - LOW_RES_BUFFER;

  const goBackToTop = () => {
    requestAnimationFrame(() => {
      if (elem.scrollTop >= distanceToPeek) {
        elem.removeEventListener('scroll', goBackToTop);
        elem.scrollTo({top: 0, behavior: 'smooth'});
      }
    });
  };

  elem.addEventListener('scroll', goBackToTop);
  elem.scrollTo({top: MAX_SCROLL_HINT_DISTANCE, behavior: 'smooth'});
}

/**
 * AppProvider and this component both provide the stickyManager, check them if there is problem with injection
 */
provide('scrollable', scrollTo);
provide('sticky-manager', stickyManager);
</script>
