<template lang="pug">
div(
  ref="scrollArea",
  v-bind="scrollable.props",
  :class="[$attrs.class, finalClassName]",
  :tabindex="focusable ? 0 : undefined",
)
  slot
</template>

<script setup lang="ts">
import {
  provide, ref, computed, onMounted, onBeforeUnmount,
} from 'vue';
import { debounce } from 'polaris/polaris-react/src/utilities/debounce';
import { classNames } from '@/utilities/css';
import { scrollable } from 'polaris/polaris-react/src/components/shared';
import { StickyManager } from '@/utilities/sticky-manager';
import styles from '@/classes/Scrollable.json';

const MAX_SCROLL_HINT_DISTANCE = 100;
const LOW_RES_BUFFER = 2;

interface Props {
  /** Scroll content vertically
   * @default true
   * */
   vertical?: boolean;
  /** Scroll content horizontally
   * @default true
   * */
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
  horizontal: true,
});

const emits = defineEmits<{ (event: 'scrolled-to-bottom'): void }>();

const scrollArea = ref<HTMLDivElement | null>(null);

const topShadow = ref(false);
const bottomShadow = ref(false);

const stickyManager = new StickyManager();
// const state = reactive({ stickyManager: { ...stickyManager } });

const finalClassName = computed(() => classNames(
  styles.Scrollable,
  props.vertical && styles.vertical,
  props.horizontal && styles.horizontal,
  props.shadow && topShadow.value && styles.hasTopShadow,
  props.shadow && bottomShadow.value && styles.hasBottomShadow,
));

const scrollTo = (scrollY: number) => {
  const behavior = prefersReducedMotion() ? 'auto' : 'smooth';
  scrollArea.value?.scrollTo({ top: scrollY, behavior});
};

provide('stickyManagerContext', stickyManager);
provide('scrollableContext', scrollTo);

const handleScroll = (): void => {
  const currentScrollArea = scrollArea.value;

  if (!currentScrollArea) {
    return;
  }

  requestAnimationFrame(() => {
    const {scrollTop, clientHeight, scrollHeight} = currentScrollArea;
    const canScroll = Boolean(scrollHeight > clientHeight);
    const isBelowTopOfScroll = Boolean(scrollTop > 0);
    const isAtBottomOfScroll = Boolean(
      scrollTop + clientHeight >= scrollHeight - LOW_RES_BUFFER,
    );

    topShadow.value = isBelowTopOfScroll;
    bottomShadow.value = !isAtBottomOfScroll

    if (canScroll && isAtBottomOfScroll) {
      emits('scrolled-to-bottom');
    }
  });
};

const handleResize = debounce(handleScroll, 50, {trailing: true});

onMounted(() => {
  handleScroll();

  if (props.hint) {
    window.requestAnimationFrame(() => performScrollHint(scrollArea.value));
  }

  const currentScrollArea = scrollArea.value;

  if (!currentScrollArea) {
    return;
  }

  stickyManager.setContainer(currentScrollArea);
  currentScrollArea.addEventListener('scroll', handleScroll);
  document.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  if (!scrollArea.value) {
    return;
  }

  scrollArea.value.removeEventListener('scroll', handleScroll);
  document.removeEventListener('resize', handleResize);
  stickyManager.removeScrollListener();
});

function prefersReducedMotion() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (err) {
    return false;
  }
}

function performScrollHint(elem?: HTMLDivElement | null) {
  if (!elem || prefersReducedMotion()) {
    return;
  }

  const scrollableDistance = elem.scrollHeight - elem.clientHeight;
  const distanceToPeek =
    Math.min(MAX_SCROLL_HINT_DISTANCE, scrollableDistance) - LOW_RES_BUFFER;

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
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Scrollable/Scrollable.scss';
</style>
