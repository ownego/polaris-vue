import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { debounce } from '@polaris/utilities/debounce';

const DEBOUNCE_PERIOD = 250;

const SELECT_ALL_ACTIONS_HEIGHT = 41;
const PAGINATION_WIDTH_OFFSET = 64;
const SCROLL_BAR_CONTAINER_HEIGHT = 13;
const SCROLL_BAR_HEIGHT = 8;
const INDEX_TABLE_INITIAL_OFFSET = 32;
const RESOURCE_LIST_INITIAL_OFFSET = 48;

type TableType = 'index-table' | 'resource-list';

export interface UseIsSelectAllActionsStickyProps {
  selectMode: boolean;
  hasPagination?: boolean;
  tableType: TableType;
}

export function useIsSelectAllActionsSticky({
  selectMode,
  hasPagination,
  tableType,
}: UseIsSelectAllActionsStickyProps) {
  const hasIOSupport = typeof window !== 'undefined' && Boolean(window.IntersectionObserver);

  const isSelectAllActionsSticky = ref(false);
  const isScrolledPastTop = ref(false);
  const selectAllActionsAbsoluteOffset = ref(0);
  const selectAllActionsMaxWidth = ref(0);
  const selectAllActionsOffsetLeft = ref(0);
  const selectAllActionsOffsetBottom = ref(0);
  const selectAllActionsIntersectionRef = ref<HTMLDivElement | null>(null);
  const tableMeasurerRef = ref<HTMLDivElement | null>(null);

  const widthOffset = computed(() => hasPagination ? PAGINATION_WIDTH_OFFSET : 0);
  const initialPostOffset = computed(() => {
    return tableType === 'index-table'
      ? INDEX_TABLE_INITIAL_OFFSET + SCROLL_BAR_CONTAINER_HEIGHT
      : RESOURCE_LIST_INITIAL_OFFSET;
  });
  const postScrollOffset = computed(() => {
    return initialPostOffset.value + SELECT_ALL_ACTIONS_HEIGHT;
  });

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      isSelectAllActionsSticky.value = !entry.isIntersecting;
    });
  };

  const handleTableIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      const isScrolledPastTopTmp =
        entry.boundingClientRect.top > 0 && !entry.isIntersecting;
      const rootBoundsHeight = entry.rootBounds?.height || 0;

      const hasTableOffscreen =
        entry.boundingClientRect.top + entry.boundingClientRect.height >
        rootBoundsHeight;

      if (hasTableOffscreen && entry.rootBounds) {
        isSelectAllActionsSticky.value = entry.isIntersecting;
      }

      isScrolledPastTop.value = isScrolledPastTopTmp;
    });
  };

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  };

  const observerRef = ref<IntersectionObserver | null>(hasIOSupport ? new IntersectionObserver(handleIntersect, options) : null);

  const tableOptions = computed(() => {
    return {
      root: null,
      rootMargin: `0px 0px -${postScrollOffset.value}px 0px`,
      threshold: 0,
    }
  });

  const tableObserverRef = ref<IntersectionObserver | null>(hasIOSupport ? new IntersectionObserver(handleTableIntersect, tableOptions.value) : null);

  const getClosestScrollContainer = (node: HTMLElement) => {
    let container: HTMLElement | null = node;

    while (container && container !== document.body) {
      const style = window.getComputedStyle(container);
      const isScrollContainer =
        style.overflow === 'auto' ||
        style.overflowX === 'auto' ||
        style.overflowY === 'auto' ||
        style.overflow === 'scroll' ||
        style.overflowX === 'scroll' ||
        style.overflowY === 'scroll';

      if (isScrollContainer) return container;
      container = container.parentElement;
    }

    return null;
  };


  const computeTableDimensions = () => {
    const node = tableMeasurerRef.value;
    if (!node) {
      return {
        maxWidth: 0,
        offsetHeight: 0,
        offsetLeft: 0,
        offsetBottom: 0,
      };
    }
    const scrollContainer = getClosestScrollContainer(node)?.getBoundingClientRect();

    const box = node.getBoundingClientRect();
    const paddingHeight = selectMode ? SELECT_ALL_ACTIONS_HEIGHT : 0;
    const offsetHeight = box.height - paddingHeight;
    const maxWidth = box.width - widthOffset.value;
    const offsetLeft = box.left;
    const offsetBottom = scrollContainer
      ? Math.round(scrollContainer.y + SCROLL_BAR_HEIGHT)
      : 0;

    selectAllActionsAbsoluteOffset.value = offsetHeight;
    selectAllActionsMaxWidth.value = maxWidth;
    selectAllActionsOffsetLeft.value = offsetLeft;
    selectAllActionsOffsetBottom.value = offsetBottom;
  };

  const computeDimensionsPastScroll = () => {
    selectAllActionsAbsoluteOffset.value = initialPostOffset.value;
  }

  let debouncedComputeTableHeight = debounce(
    computeTableDimensions,
    DEBOUNCE_PERIOD,
    {
      trailing: true,
    },
  );

  onMounted(() => {
    if (isScrolledPastTop.value) {
      computeDimensionsPastScroll();
    } else {
      computeTableDimensions();
    }

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
    () => [selectMode, widthOffset.value],
    () => computeTableDimensions
  );

  watch(
    () => selectAllActionsIntersectionRef.value,
    () => {
      const observer = observerRef.value;
      const tableObserver = tableObserverRef.value;
      if (!observer || !tableObserver) {
        return;
      }

      const node = selectAllActionsIntersectionRef.value;

      const tableNode = tableMeasurerRef.value;

      if (node) {
        observer.observe(node);
      }

      if (tableNode) {
        tableObserver.observe(tableNode);
      }
    }
  );

  return {
    selectAllActionsIntersectionRef,
    tableMeasurerRef,
    isSelectAllActionsSticky,
    selectAllActionsAbsoluteOffset,
    selectAllActionsMaxWidth,
    selectAllActionsOffsetLeft,
    selectAllActionsOffsetBottom,
    computeTableDimensions,
    isScrolledPastTop,
    selectAllActionsPastTopOffset: initialPostOffset,
    scrollbarPastTopOffset: initialPostOffset.value - SCROLL_BAR_CONTAINER_HEIGHT,
  };
}
