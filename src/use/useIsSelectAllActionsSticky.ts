import { computed, onMounted, ref, watch, type Ref, onBeforeUnmount } from 'vue';
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
  selectMode: Ref<boolean>;
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

  const initialPostOffset = tableType === 'index-table'
    ? INDEX_TABLE_INITIAL_OFFSET + SCROLL_BAR_CONTAINER_HEIGHT
    : RESOURCE_LIST_INITIAL_OFFSET;

  const postScrollOffset = initialPostOffset + SELECT_ALL_ACTIONS_HEIGHT;

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
      rootMargin: `0px 0px -${postScrollOffset}px 0px`,
      threshold: 0,
    }
  });

  const tableObserverRef = ref<IntersectionObserver | null>(hasIOSupport ? new IntersectionObserver(handleTableIntersect, tableOptions.value) : null);

  const getClosestScrollContainer = () => {
    let container = tableMeasurerRef.value;

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
      container = container.parentElement as HTMLDivElement;
    }

    return null;
  };

  const box = computed(() => tableMeasurerRef.value?.getBoundingClientRect());

  const computeTableDimensions = () => {
    if (!tableMeasurerRef.value) {
      return {
        maxWidth: 0,
        offsetHeight: 0,
        offsetLeft: 0,
        offsetBottom: 0,
      };
    }
    const scrollContainer = getClosestScrollContainer()?.getBoundingClientRect();

    if (!box.value) {
      return;
    }

    const paddingHeight = selectMode.value ? SELECT_ALL_ACTIONS_HEIGHT : 0;
    const offsetHeight = box.value.height - paddingHeight;
    const maxWidth = box.value.width - widthOffset.value;
    const offsetLeft = box.value.left;
    const offsetBottom = scrollContainer
      ? Math.round(scrollContainer.y + SCROLL_BAR_HEIGHT)
      : 0;

    selectAllActionsAbsoluteOffset.value = offsetHeight;
    selectAllActionsMaxWidth.value = maxWidth;
    selectAllActionsOffsetLeft.value = offsetLeft;
    selectAllActionsOffsetBottom.value = offsetBottom;
  };

  const computeDimensionsPastScroll = () => {
    selectAllActionsAbsoluteOffset.value = initialPostOffset;
  }

  const debouncedComputeTableHeight = debounce(
    computeTableDimensions,
    DEBOUNCE_PERIOD,
    {
      trailing: true,
    },
  );

  onMounted(() => {
    window.addEventListener('resize', debouncedComputeTableHeight);

    // Observer
    if (!observerRef.value || !tableObserverRef.value) {
      return;
    }

    if (selectAllActionsIntersectionRef.value) {
      observerRef.value.observe(selectAllActionsIntersectionRef.value);
    }

    if (tableMeasurerRef.value) {
      tableObserverRef.value.observe(tableMeasurerRef.value);
    }
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', debouncedComputeTableHeight);

    observerRef.value?.disconnect();
    tableObserverRef.value?.disconnect();
  });

  watch(
    () => isScrolledPastTop.value,
    (newValue) => {
      if (newValue) {
        computeDimensionsPastScroll();
      } else {
        computeTableDimensions();
      }
    },
  );

  watch(
    () => selectMode.value,
    () => {
      computeTableDimensions();
    },
    { flush: 'post' },
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
    scrollbarPastTopOffset: initialPostOffset - SCROLL_BAR_CONTAINER_HEIGHT,
  };
}

