
import { onMounted, onUnmounted, ref, watch, type Ref } from 'vue';
import {debounce} from '@polaris/utilities/debounce';

const DEBOUNCE_PERIOD = 250;

const PADDING_IN_SELECT_MODE = 92;

export function useIsBulkActionsSticky(selectMode: Ref<boolean>) {
  const hasIOSupport = typeof window !== 'undefined' && Boolean(window.IntersectionObserver);

  const isBulkActionsSticky = ref(false);
  const bulkActionsAbsoluteOffset = ref(0);
  const bulkActionsMaxWidth = ref(0);
  const bulkActionsOffsetLeft = ref(0);
  const bulkActionsIntersectionRef = ref<HTMLDivElement | null>(null);
  const tableMeasurerRef = ref<HTMLDivElement | null>(null);

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      isBulkActionsSticky.value = !entry.isIntersecting;
    });
  };

  const options = {
    root: null,
    rootMargin: '-12px',
    threshold: 0,
  };

  const observerRef = ref<IntersectionObserver | null>(hasIOSupport ? new IntersectionObserver(handleIntersect, options) : null);

  const computeTableDimensions = () => {
    const node = tableMeasurerRef.value;
    if (!node) {
      return {
        maxWidth: 0,
        offsetHeight: 0,
        offsetLeft: 0,
      };
    }
    const box = node.getBoundingClientRect();
    const paddingHeight = selectMode.value ? PADDING_IN_SELECT_MODE : 0;
    const offsetHeight = box.height - paddingHeight;
    const maxWidth = box.width;
    const offsetLeft = box.left;

    bulkActionsAbsoluteOffset.value = offsetHeight;
    bulkActionsMaxWidth.value = maxWidth;
    bulkActionsOffsetLeft.value = offsetLeft;
  };

  let debouncedComputeTableHeight = debounce(
    computeTableDimensions,
    DEBOUNCE_PERIOD,
    {
      trailing: true,
    },
  );

  onMounted(() => {
    computeTableDimensions();

    window.addEventListener('resize', debouncedComputeTableHeight);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', debouncedComputeTableHeight);
  });

  watch(computeTableDimensions, () => {
      // Cleanup
      window.removeEventListener('resize', debouncedComputeTableHeight);

      // Recreate the debounced function
      debouncedComputeTableHeight = debounce(
        computeTableDimensions,
        DEBOUNCE_PERIOD,
        {
          trailing: true,
        },
      );

      window.addEventListener('resize', debouncedComputeTableHeight);
  });

  watch(
    () => selectMode.value,
    () => computeTableDimensions
  );

  watch(
    () => bulkActionsIntersectionRef.value,
    () => {
      const observer = observerRef.value;
      if (!observer) {
        return;
      }

      const node = bulkActionsIntersectionRef.value;

      if (node) {
        observer.observe(node);
      }
    }
  );

  return {
    bulkActionsIntersectionRef,
    tableMeasurerRef,
    isBulkActionsSticky,
    bulkActionsAbsoluteOffset,
    bulkActionsMaxWidth,
    bulkActionsOffsetLeft,
    computeTableDimensions,
  }
}
