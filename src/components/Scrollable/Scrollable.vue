<template lang="pug">
div(
  ref="scrollArea",
  v-bind="scrollable.props",
  :class="finalClassName",
  :tabindex="focusable ? 0 : undefined",
)
  slot
</template>

<script setup lang="ts">
import {
  provide, ref, reactive, computed, onMounted, onUpdated, onBeforeUnmount,
} from 'vue';
import debounce from 'lodash/debounce';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import { scrollable } from 'polaris/polaris-react/src/components/shared';
import { StickyManager } from '@/utilities/sticky-manager';
import styles from '@/classes/Scrollable.json';

const prevent = (event: Event): void => {
  event.preventDefault();
};

const prefersReducedMotion = (): boolean => {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (err) {
    return false;
  }
};

const MAX_SCROLL_DISTANCE = 100;
const DELTA_THRESHOLD = 0.2;
const DELTA_PERCENTAGE = 0.2;
const EVENTS_TO_LOCK = ['scroll', 'touchmove', 'wheel'];
const PREFERS_REDUCED_MOTION = prefersReducedMotion();
const LOW_RES_BUFFER = 2;

interface Props {
  /** Scroll content vertically */
  vertical?: boolean;
  /** Scroll content horizontally */
  horizontal?: boolean;
  /** Add a shadow when content is scrollable */
  shadow?: boolean;
  /** Slightly hints content upon mounting when scrollable */
  hint?: boolean;
  /** Adds a tabIndex to scrollable when children are not focusable */
  focusable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  vertical: true,
});

const emits = defineEmits<{ (event: 'scrolled-to-bottom'): void }>();

const scrollArea = ref<HTMLDivElement | null>(null);

const topShadow = ref(false);
const bottomShadow = ref(false);
const scrollPosition = ref(0);
const canScroll = ref(false);

const stickyManager = new StickyManager();
// const state = reactive({ stickyManager: { ...stickyManager } });

const scrollToPosition = (scrollY: number): void => {
  scrollPosition.value = scrollY;
};

provide('stickyManagerContext', stickyManager);
provide('scrollToPositionContext', scrollToPosition);

const finalClassName = computed(() => classNames(
  styles.Scrollable,
  props.vertical && styles.vertical,
  props.horizontal && styles.horizontal,
  topShadow.value && styles.hasTopShadow,
  bottomShadow.value && styles.hasBottomShadow,
  props.vertical && canScroll.value && styles.verticalHasScrolling,
));

const handleScroll = (): void => {
  if (!scrollArea.value) {
    return;
  }

  const { scrollTop, scrollHeight, clientHeight } = scrollArea.value;
  const shouldBottomShadow = Boolean(props.shadow && !(scrollTop + clientHeight >= scrollHeight));
  const shouldTopShadow = Boolean(props.shadow && scrollTop > 0 && scrollPosition.value > 0);
  const scrollAble = scrollHeight > clientHeight;
  const hasScrolledToBottom = scrollHeight - scrollTop <= clientHeight + LOW_RES_BUFFER;

  if (scrollAble && hasScrolledToBottom) {
    emits('scrolled-to-bottom');
  }

  topShadow.value = shouldTopShadow;
  bottomShadow.value = shouldBottomShadow;
  scrollPosition.value = scrollTop;
  canScroll.value = scrollAble;
};

const handleResize = debounce(
  () => {
    handleScroll();
  },
  50,
  { trailing: true },
);

const toggleLock = (shouldLock = true): void => {
  if (!scrollArea.value) {
    return;
  }

  EVENTS_TO_LOCK.forEach((eventName) => {
    if (shouldLock) {
      scrollArea.value?.addEventListener(eventName, prevent);
    } else {
      scrollArea.value?.removeEventListener(eventName, prevent);
    }
  });
};

const scrollStep = (): void => {
  const delta = scrollPosition.value * DELTA_PERCENTAGE;

  scrollPosition.value = delta < DELTA_THRESHOLD ? 0 : scrollPosition.value - delta;

  if (scrollPosition.value > 0) {
    window.requestAnimationFrame(scrollStep);
  } else {
    toggleLock(false);
  }
};

const scrollHint = (): void => {
  if (!scrollArea.value) {
    return;
  }

  const { clientHeight, scrollHeight } = scrollArea.value;

  if (
    PREFERS_REDUCED_MOTION
    || scrollPosition.value > 0
    || scrollHeight <= clientHeight
  ) {
    return;
  }

  const scrollDistance = scrollHeight - clientHeight;

  toggleLock();

  scrollPosition.value = scrollDistance > MAX_SCROLL_DISTANCE
    ? MAX_SCROLL_DISTANCE
    : scrollDistance;
  window.requestAnimationFrame(scrollStep);
};

onMounted(() => {
  if (!scrollArea.value) {
    return;
  }

  stickyManager.setContainer(scrollArea.value);
  scrollArea.value.scrollTop = scrollPosition.value;
  scrollArea.value.addEventListener('scroll', () => {
    window.requestAnimationFrame(handleScroll);
  });
  window.addEventListener('resize', handleResize);
  window.requestAnimationFrame(() => {
    handleScroll();

    if (props.hint) {
      scrollHint();
    }
  });
});

onUpdated(() => {
  if (scrollArea.value && scrollPosition.value > 0) {
    (scrollArea.value as HTMLDivElement).scrollTop = scrollPosition.value;
  }
});

onBeforeUnmount(() => {
  if (!scrollArea.value) {
    return;
  }

  scrollArea.value.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleResize);
  stickyManager.removeScrollListener();
});
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Scrollable/Scrollable.scss';
</style>
