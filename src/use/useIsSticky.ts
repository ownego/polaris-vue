import { computed, onMounted, ref, watch, onBeforeUnmount, type Ref } from 'vue';
import { debounce } from '@polaris/utilities/debounce';
import type { IndexFiltersMode } from '@/components/IndexFilters/types';

const DEBOUNCE_PERIOD = 250;

export function useIsSticky(
  mode: IndexFiltersMode,
  disabled: boolean,
  isFlushWhenSticky: boolean,
) {
  const hasIOSupport = typeof window !== 'undefined' && Boolean(window.IntersectionObserver);

  const indexFilteringHeight = ref(0);
  const isSticky = ref(false);
  const measurerRef = ref<HTMLDivElement | null>(null);
  const intersectionRef = ref<HTMLDivElement | null>(null);

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
     entries.forEach((entry: IntersectionObserverEntry) => {
      isSticky.value = !entry.isIntersecting;
    });
  };

  const options = {
    root: null,
    rootMargin: `${isFlushWhenSticky ? '0px' : '-56px'} 0px 0px 0px`,
    threshold: 0,
  };

  const observerRef = ref<IntersectionObserver | null>(hasIOSupport ? new IntersectionObserver(handleIntersect, options) : null);

  const box = computed(() => measurerRef.value?.getBoundingClientRect());

  const computeTableDimensions = () => {
    if (!measurerRef.value) {
      return {
        height: 0,
      };
    }
    if (!box.value) {
      return;
    }

    const height = box.value.height;

    indexFilteringHeight.value = height;
  };

  const debouncedComputeDimensions = debounce(
    computeTableDimensions,
    DEBOUNCE_PERIOD,
    {
      trailing: true,
    },
  );

  onMounted(() => {
    window.addEventListener('resize', debouncedComputeDimensions);

    // Observer
    if (!observerRef.value) {
      return;
    }

    if (intersectionRef.value) {
      observerRef.value.observe(intersectionRef.value);
    }
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', debouncedComputeDimensions);

    observerRef.value?.disconnect();
  });

  watch(
    () => mode,
    () => {
      computeTableDimensions();
    },
    { flush: 'post' },
  );

  return {
    intersectionRef: intersectionRef as Ref<HTMLDivElement>,
    measurerRef,
    isSticky: isSticky.value && !disabled,
    indexFilteringHeight,
  };
}

