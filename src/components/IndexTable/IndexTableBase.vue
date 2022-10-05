<template lang="pug">
div(:class="styles.IndexTable")
  transition(
    name="custom-indextable-loading-transition",
    appear,
    @before-enter="onTransitionBeforeEnter",
    @enter="onTransitionEnter",
    @after-enter="onTransitionAfterEnter",
    @before-leave="onTransitionBeforeLeave",
    @leave="onTransitionLeave",
    @after-leave="onTransitionAfterLeave"
  )
    div(
      v-if="!shouldShowBulkActions && !condensed && loading",
      :class="styles.LoadingPanel",
    )
      div(:class="styles.LoadingPanelRow")
        Spinner(size="small")
        span(:class="styles.LoadingPanelText") {{ loadingPanelTextContent }}
  template(v-if="itemCount > 0")
    EventListener(event="resize", :handler="handleResize")
    div(
      v-if="isMounted",
      :class="stickyTableClassNames",
      role="presentation",
    )
      Sticky(
        :boundingElement="stickyWrapper",
        @sticky-change="onStickyChange",
      )
        div(
          v-if="shouldShowBulkActions",
          :class="bulkActionClassNames",
          :data-condensed="condensed"
        )
          transition(
            name="custom-indextable-loading-transition",
            appear,
            @before-enter="onTransitionBeforeEnter",
            @enter="onTransitionEnter",
            @after-enter="onTransitionAfterEnter",
            @before-leave="onTransitionBeforeLeave",
            @leave="onTransitionLeave",
            @after-leave="onTransitionAfterLeave"
          )
            div(
              v-if="loading",
              :class="styles.LoadingPanel",
            )
              div(:class="styles.LoadingPanelRow")
                Spinner(size="small")
                span(:class="styles.LoadingPanelText") {{ loadingPanelTextContent }}
          BulkActions(
            :smallScreen="smallScreen",
            :label="bulkActionLabel",
            :accessibilityLabel="bulkActionsAccessibilityLabel",
            :selected="bulkSelectState",
            :selectMode="selectMode || isSmallScreenSelectable",
            :promotedActions="promotedActions",
            :actions="stickyActions",
            :paginatedSelectAllText="paginatedSelectAllText",
            :paginatedSelectAllAction="paginatedSelectAllAction",
            @toggle-all="handleTogglePage",
            @select-mode-toggle="handleSelectModeToggle",
          )

        template(v-else)
          div(
            v-if="condensed",
            :class="classNames(styles.HeaderWrapper, !selectable && styles.unselectable)",
          )
            transition(
              name="custom-indextable-loading-transition",
              appear,
              @before-enter="onTransitionBeforeEnter",
              @enter="onTransitionEnter",
              @after-enter="onTransitionAfterEnter",
              @before-leave="onTransitionBeforeLeave",
              @leave="onTransitionLeave",
              @after-leave="onTransitionAfterLeave"
            )
              div(
                v-if="loading",
                :class="styles.LoadingPanel",
              )
                div(:class="styles.LoadingPanelRow")
                  Spinner(size="small")
                  span(:class="styles.LoadingPanelText") {{ loadingPanelTextContent }}

            slot(name="sort")
            Button(
              v-if="selectable",
              :icon="EnableSelectionMinor",
              @click="toggleIsSmallScreenSelectable",
            ) {{ i18n.translate('Polaris.IndexTable.selectButtonText') }}
          div(
            v-else,
            :class="stickyHeaderClassNames",
            ref="stickyHeaderWrapperElement",
          )
            transition(
              name="custom-indextable-loading-transition",
              appear,
              @before-enter="onTransitionBeforeEnter",
              @enter="onTransitionEnter",
              @after-enter="onTransitionAfterEnter",
              @before-leave="onTransitionBeforeLeave",
              @leave="onTransitionLeave",
              @after-leave="onTransitionAfterLeave"
            )
              div(
                v-if="loading",
                :class="styles.LoadingPanel",
              )
                div(:class="styles.LoadingPanelRow")
                  Spinner(size="small")
                  span(:class="styles.LoadingPanelText") {{ loadingPanelTextContent }}

            div(:class="stickyColumnHeaderClassNames")
              div(
                :class="styles.TableHeading",
                :key="getHeadingKey(headings[0])",
                :style="stickyColumnHeaderStyle",
                data-index-table-sticky-heading="true",
              )
                Stack(
                  spacing="none",
                  :wrap="false",
                  alignment="center",
                  no-item-wrap,
                )
                  StackItem(v-if="selectable")
                    div(
                      :class="styles.FirstStickyHeaderElement",
                      ref="firstStickyHeaderElement",
                    )
                      div(:class="styles.ColumnHeaderCheckboxWrapper")
                        Checkbox(
                          labelHidden,
                          :checked="bulkSelectState",
                          @change="handleSelectPage",
                        )
                          template(#label) {{ checkboxLabel }}
                  StackItem(v-if="selectable")
                    div(:class="styles['StickyTableHeading-second-scrolling']")
                      HeadingContentWrapper(
                        :heading="headings[0]",
                        :index="0",
                        :sortable="sortable",
                        :defaultSortDirection="defaultSortDirection",
                        :sortDirection="sortDirection",
                        :sortColumnIndex="sortColumnIndex",
                        @sort="handleSort",
                      )
                  StackItem(v-if="!selectable")
                    div(
                      :class="styles.FirstStickyHeaderElement",
                      ref="firstStickyHeaderElement",
                    )
                      HeadingContentWrapper(
                        :heading="headings[0]",
                        :index="0",
                        :sortable="sortable",
                        :defaultSortDirection="defaultSortDirection",
                        :sortDirection="sortDirection",
                        :sortColumnIndex="sortColumnIndex",
                        @sort="handleSort",
                      )

            div(
              :class="styles.StickyTableHeadings",
              ref="stickyHeaderElement",
              v-once,
            )
              div(
                v-for="heading, index in headings",
                :key="getHeadingKey(heading)",
                :class="stickyHeadingClassName(index)",
                :style="renderStickyHeading(index)",
                data-index-table-sticky-heading="true",
              )
                HeadingContentWrapper(
                  :heading="heading",
                  :index="index",
                  :sortable="sortable",
                  :defaultSortDirection="defaultSortDirection",
                  :sortDirection="sortDirection",
                  :sortColumnIndex="sortColumnIndex",
                  @sort="handleSort",
                )
    ul(
      v-if="condensed",
      :data-selectmode="Boolean(selectMode || isSmallScreenSelectable)",
      :class="styles.CondensedList",
      ref="condensedListElement",
    )
      slot
    ScrollContainer(
      v-else,
      ref="scrollableContainerElement",
      @scroll="handleScrollContainerScroll",
    )
      table(ref="tableElement", :class="tableClassNames")
        thead
          tr
            template(
              v-for="heading, index in headings",
              :key="getHeadingKey(heading)",
            )
              th(
                v-if="index === 0 && selectable",
                :class="checkboxClassName(index)",
                data-index-table-heading="true",
              )
                div(:class="styles.ColumnHeaderCheckboxWrapper")
                  Checkbox(
                    labelHidden,
                    :checked="bulkSelectState",
                    @change="handleSelectPage",
                  )
                    template(#label) {{ checkboxLabel }}
              th(
                :class="headingContentClassName(heading, index)",
                :style="stickyPositioningStyle(index)",
                data-index-table-heading="true",
              )
                HeadingContentWrapper(
                  :heading="heading",
                  :index="index",
                  :sortable="sortable",
                  :defaultSortDirection="defaultSortDirection",
                  :sortDirection="sortDirection",
                  :sortColumnIndex="sortColumnIndex",
                  @sort="handleSort",
                )

        tbody(ref="tableBodyRef")
          slot

  div(
    v-else,
    :class="styles.EmptySearchResultWrapper",
  )
    template(v-if="hasSlot(slots.emptyState)")
      slot(name="emptyState")
    EmptySearchResult(
      v-else,
      :title="emptyStateTitle",
      :description="i18n.translate('Polaris.IndexTable.emptySearchDescription')",
      withIllustration,
    )
div(
  v-if="isMounted && itemCount > 0",
  :class="scrollBarWrapperClassNames",
  ref="scrollContainerElement",
)
  div(
    @scroll="handleScrollBarScroll",
    :class="styles.ScrollBar",
    ref="scrollBarElement",
  )
    div(:class="scrollBarClassNames")
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, useSlots } from 'vue';
import { debounce } from 'polaris/polaris-react/src/utilities/debounce';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import EnableSelectionMinor from '@icons/EnableSelectionMinor.svg';
import { tokens, motion, toPx } from '@shopify/polaris-tokens';
import { UseI18n } from '@/use';
import { hasSlot } from '@/utilities/has-slot';
import {
  BulkActions,
  Button,
  Checkbox,
  EmptySearchResult,
  EventListener,
  Stack,
  StackItem,
  Sticky,
  Spinner,
} from '@/components';
import {
  useIndexValue,
  useIndexSelectionChange,
  SELECT_ALL_ITEMS,
} from '@/utilities/index-provider';
import type { BulkActionsProps } from '../BulkActions/utils';
import { ScrollContainer } from './components';
import { HeadingContentWrapper } from './children';
import { getTableHeadingsBySelector } from './utils';
import type { IndexTableHeading, IndexTableSortDirection } from './utils';
import styles from '@/classes/IndexTable.json';

interface IndexTableBaseProps {
  headings: IndexTableHeading[];
  promotedBulkActions?: BulkActionsProps['promotedActions'];
  bulkActions?: BulkActionsProps['actions'];
  paginatedSelectAllActionText?: string;
  lastColumnSticky?: boolean;
  sortable?: boolean[];
  defaultSortDirection?: IndexTableSortDirection;
  sortDirection?: IndexTableSortDirection;
  sortColumnIndex?: number;
}

interface TableHeadingRect {
  offsetWidth: number;
  offsetLeft: number;
}

const SCROLL_BAR_PADDING = 4;
const SCROLL_BAR_DEBOUNCE_PERIOD = 300;

const props = withDefaults(defineProps<IndexTableBaseProps>(), {
  defaultSortDirection: 'descending',
  lastColumnSticky: false,
});

const emits = defineEmits<{
  (e: 'sort', index: number, direction: IndexTableSortDirection): void;
}>();

const slots = useSlots();

const {
  condensed,
  selectMode,
  selectable,
  loading,
  itemCount,
  selectedItemsCount,
  hasMoreItems,
  resourceName,
  bulkActionsAccessibilityLabel,
  bulkSelectState,
  paginatedSelectAllText,
} = useIndexValue();

const handleSelectionChange = useIndexSelectionChange();
const i18n = UseI18n();

const hasMoreLeftColumns = ref(false);

const toggleHasMoreLeftColumns = () => {
  hasMoreLeftColumns.value = !hasMoreLeftColumns.value;
};

const isBreakpointsXS = () => {
  return typeof window === 'undefined'
    ? false
    : window.innerWidth < parseFloat(toPx(tokens.breakpoints['breakpoints-sm']) ?? '');
};

const tablePosition = ref({ top: 0, left: 0 });
const tableHeadingRects = ref<TableHeadingRect[]>([]);

const scrollableContainerElement = ref<InstanceType<typeof ScrollContainer> | null>(null);
const tableElement = ref<HTMLTableElement | null>(null);
const condensedListElement = ref<HTMLUListElement | null>(null);

const tableInitialized = ref(false);
const isSmallScreenSelectable = ref(false);
const stickyWrapper = ref<HTMLElement | null>(null);
const hideScrollContainer = ref(false);
const smallScreen = ref(isBreakpointsXS());
const canFitStickyColumn = ref(true);

const tableHeadings = ref<HTMLElement[]>([]);
const stickyTableHeadings = ref<HTMLElement[]>([]);
const stickyHeaderWrapperElement = ref<HTMLDivElement | null>(null);
const firstStickyHeaderElement = ref<HTMLDivElement | null>(null);
const stickyHeaderElement = ref<HTMLDivElement | null>(null);
const scrollBarElement = ref<HTMLDivElement | null>(null);
const scrollContainerElement = ref<HTMLDivElement | null>(null);
const scrollingWithBar = ref(false);
const scrollingContainer = ref(false);
const canScrollRight = ref(true);
const isMounted = ref(false);
const stickyColumnHeaderStyle = ref<Record<string, string>>({});

const scrollContainerRef = computed(() => {
  return scrollableContainerElement.value
    && scrollableContainerElement.value.scrollableContainerRef;
});

const handleCanFitStickyColumn = () => {
  if (!scrollableContainerElement.value || !tableHeadings.value.length) {
    return;
  }
  const scrollableRect =
    (scrollableContainerElement.value as any).getBoundingClientRect();
  const checkboxColumnWidth = selectable
    ? tableHeadings.value[0].getBoundingClientRect().width
    : 0;
  const firstStickyColumnWidth =
    tableHeadings.value[selectable ? 1 : 0].getBoundingClientRect().width;
  const lastColumnIsNotTheFirst = selectable
    ? tableHeadings.value.length > 2
    : 1;
  // Don't consider the last column in the calculations if it's not sticky
  const lastStickyColumnWidth =
    props.lastColumnSticky && lastColumnIsNotTheFirst
      ? tableHeadings.value[
        tableHeadings.value.length - 1
      ].getBoundingClientRect().width
      : 0;
  // Secure some space for the remaining columns to be visible
  const restOfContentMinWidth = 100;

  canFitStickyColumn.value = scrollableRect.width >
    firstStickyColumnWidth + checkboxColumnWidth + lastStickyColumnWidth + restOfContentMinWidth;
};

const tableBodyRef = (node) => {
  if (node !== null && !tableInitialized.value) {
    tableInitialized.value = true;
  }
};

const toggleIsSmallScreenSelectable = () => {
  isSmallScreenSelectable.value = !isSmallScreenSelectable.value;
};

const handleSelectAllItemsInStore = () => {
  handleSelectionChange(
    selectedItemsCount.value === SELECT_ALL_ITEMS
      ? 'page'
      : 'all',
    true,
  );
};

const calculateFirstHeaderOffset = () => {
  if (!selectable?.value) {
    return tableHeadingRects.value[0].offsetWidth;
  }

  return condensed?.value
    ? tableHeadingRects.value[0].offsetWidth
    : tableHeadingRects.value[0].offsetWidth +
        tableHeadingRects.value[1].offsetWidth;
};

const resizeTableHeadings = debounce(
  () => {
    if (!tableElement.value || !scrollContainerRef.value) {
      return;
    }

    const boundingRect =
      scrollContainerRef.value.getBoundingClientRect();
    tablePosition.value = {
      top: boundingRect.top,
      left: boundingRect.left,
    };

    tableHeadingRects.value = tableHeadings.value.map((heading) => ({
      offsetWidth: heading.offsetWidth || 0,
      offsetLeft: heading.offsetLeft || 0,
    }));

    if (tableHeadings.value.length === 0) {
      return;
    }

    // update left offset for first column
    if (selectable?.value && tableHeadings.value.length > 1) {
      tableHeadings.value[1].style.left = `${tableHeadingRects.value[0].offsetWidth}px`;
    }

    // update the min width of the checkbox to be the be the un-padded width of the first heading
    if (selectable?.value && firstStickyHeaderElement?.value) {
      const elementStyle = getComputedStyle(tableHeadings.value[0]);
      const boxWidth = tableHeadings.value[0].offsetWidth;
      firstStickyHeaderElement.value.style.minWidth = `calc(${boxWidth}px - ${elementStyle.paddingLeft} - ${elementStyle.paddingRight} + 2px)`;
    }

    // update sticky header min-widths
    stickyTableHeadings.value.forEach((heading, index) => {
      let minWidth = 0;
      if (index === 0 && (!isBreakpointsXS() || !selectable?.value)) {
        minWidth = calculateFirstHeaderOffset();
      } else if (selectable?.value && tableHeadingRects.value.length > index) {
        minWidth = tableHeadingRects.value[index]?.offsetWidth || 0;
      } else if (
        !selectable?.value &&
        tableHeadingRects.value.length >= index
      ) {
        minWidth = tableHeadingRects.value[index - 1]?.offsetWidth || 0;
      }

      heading.style.minWidth = `${minWidth}px`;
    });
  },
);

const resizeTableScrollBar = () => {
  if (scrollBarElement.value && tableElement.value && tableInitialized) {
    scrollBarElement.value.style.setProperty(
      '--pc-index-table-scroll-bar-content-width',
      `${tableElement.value.offsetWidth - SCROLL_BAR_PADDING}px`,
    );

    hideScrollContainer.value = scrollContainerElement.value?.offsetWidth === tableElement.value?.offsetWidth;
  }
};

const debounceResizeTableScrollbar = () => debounce(
  resizeTableScrollBar,
  SCROLL_BAR_DEBOUNCE_PERIOD,
  {
    trailing: true,
  },
);

const handleCanScrollRight = debounce(() => {
  if (
    !props.lastColumnSticky ||
    !tableElement.value ||
    !scrollContainerRef.value
  ) {
    return;
  }

  const tableRect = tableElement.value.getBoundingClientRect();
  const scrollableRect = scrollContainerRef.value.getBoundingClientRect();

  canScrollRight.value = tableRect.width > scrollableRect.width;
});

const handleIsSmallScreen = () => {
  // Somehow, Shopify dev makes a stupid here, wth is this...
  // setSmallScreen(smallScreen);
};

const handleResize = () => {
  // hide the scrollbar when resizing
  scrollBarElement.value?.style.setProperty(
    '--pc-index-table-scroll-bar-content-width',
    `0px`,
  );

  resizeTableHeadings();
  debounceResizeTableScrollbar();
  handleCanScrollRight();
  handleIsSmallScreen();
  handleCanFitStickyColumn();
};

const handleScrollContainerScroll = (canScrollLeft, tmpCanScrollRight) => {
  if (!scrollContainerRef.value || !scrollBarElement.value) {
    return;
  }

  if (!scrollingWithBar.value) {
    scrollingContainer.value = true;
    scrollBarElement.value.scrollLeft =
      scrollContainerRef.value.scrollLeft;
  }
  scrollingWithBar.value = false;

  if (stickyHeaderElement.value) {
    stickyHeaderElement.value.scrollLeft =
      scrollContainerRef.value.scrollLeft;
  }

  if (
    (canScrollLeft && !hasMoreLeftColumns.value) ||
    (!canScrollLeft && hasMoreLeftColumns.value)
  ) {
    toggleHasMoreLeftColumns();
  }

  canScrollRight.value = tmpCanScrollRight;
};

const handleScrollBarScroll = () => {
  if (!scrollContainerRef.value || !scrollBarElement.value) {
    return;
  }

  if (!scrollingContainer.value) {
    scrollingWithBar.value = true;
    scrollContainerRef.value.scrollLeft =
      scrollBarElement.value.scrollLeft;
  }
  scrollingContainer.value = false;
};

const isSticky = ref(false);
const onStickyChange = (value: boolean) => {
  isSticky.value = value;
};

const triggerResizeTableHeadings = () => {
  tableHeadings.value = getTableHeadingsBySelector(
    tableElement.value,
    '[data-index-table-heading]',
  );
  stickyTableHeadings.value = getTableHeadingsBySelector(
    stickyHeaderWrapperElement.value,
    '[data-index-table-sticky-heading]',
  );
  resizeTableHeadings();
};

const triggerResizeTableScrollBar = () => {
  resizeTableScrollBar();
  stickyWrapper.value = condensed?.value
    ? condensedListElement.value : tableElement.value;
};

const checkIsSmallScreenSelectable = () => {
  if (!condensed?.value && isSmallScreenSelectable.value) {
    isSmallScreenSelectable.value = false;
  }
};

onMounted(() => {
  isMounted.value = true;
  handleCanScrollRight();

  if (tableHeadingRects.value && tableHeadingRects.value.length > 0) {
    stickyColumnHeaderStyle.value = { minWidth: `${calculateFirstHeaderOffset()}px` };
  }

  // Trigger on init
  triggerResizeTableHeadings();
  triggerResizeTableScrollBar();
  checkIsSmallScreenSelectable();
});

watch(
  () => [props.headings, firstStickyHeaderElement.value, tableInitialized.value],
  triggerResizeTableHeadings,
);

watch(
  () => [tableInitialized.value, condensed?.value],
  triggerResizeTableScrollBar,
);

watch(
  () => [isSmallScreenSelectable.value, condensed?.value],
  checkIsSmallScreenSelectable,
);

watch(
  () => [tableInitialized.value],
  handleCanFitStickyColumn,
)

const hasBulkActions = computed(() => Boolean(
  (props.promotedBulkActions && props.promotedBulkActions.length > 0) ||
    (props.bulkActions && props.bulkActions.length > 0),
));

const bulkActionsSelectable = computed(() => Boolean(
  (props.promotedBulkActions && props.promotedBulkActions.length > 0)
  || (props.bulkActions && props.bulkActions.length > 0),
));

const selectedItemsCountLabel = computed(() =>
  selectedItemsCount.value === SELECT_ALL_ITEMS
    ? `${itemCount.value}+`
    : selectedItemsCount.value,
);

const handleTogglePage = () => {
  handleSelectionChange(
    'page',
    Boolean(!bulkSelectState?.value || bulkSelectState?.value === 'indeterminate'),
  );
};

const stickyColumnHeaderClassNames = computed(() => classNames(
  styles.StickyTableColumnHeader,
  hasMoreLeftColumns.value && styles['StickyTableColumnHeader-isScrolling'],
));

const stickyHeaderClassNames = computed(() => classNames(
  styles.StickyTableHeader,
  isSticky.value && styles['StickyTableHeader-isSticky'],
));

const bulkActionClassNames = computed(() => classNames(
  styles.BulkActionsWrapper,
  condensed && styles['StickyTableHeader-condensed'],
  isSticky.value && styles['StickyTableHeader-isSticky'],
));

const shouldShowActions = computed(() =>
  !condensed?.value || selectedItemsCount.value,
);

const promotedActions = computed(() =>
  shouldShowActions.value ? props.promotedBulkActions : [],
);

const stickyActions = computed(() => shouldShowActions.value ? props.bulkActions : []);

const checkboxLabel = computed(() => {
  return i18n.translate('Polaris.IndexTable.selectAllLabel', {
    resourceNamePlural: resourceName.plural,
  });
});

const emptyStateTitle = computed(() => {
  return i18n.translate('Polaris.IndexTable.emptySearchTitle', {
    resourceNamePlural: resourceName.plural,
  });
});

const loadingPanelTextContent = computed(() => {
  return i18n.translate('Polaris.IndexTable.resourceLoadingAccessibilityLabel', {
    resourceNamePlural: resourceName.plural.toLocaleLowerCase(),
  });
});

const bulkActionLabel = computed(() => {
  return i18n.translate('Polaris.IndexTable.selected', {
    selectedItemsCount: selectedItemsCountLabel.value,
  });
});

const paginatedSelectAllAction = computed(() => {
  if (!selectable?.value || !hasBulkActions.value || !hasMoreItems?.value) {
    return;
  }

  const customActionText =
    props.paginatedSelectAllActionText ??
    i18n.translate('Polaris.IndexTable.selectAllItems', {
      itemsLength: itemCount.value,
      resourceNamePlural: resourceName.plural.toLocaleLowerCase(),
    });

  const actionText =
    selectedItemsCount.value === SELECT_ALL_ITEMS
      ? i18n.translate('Polaris.IndexTable.undo')
      : customActionText;

  return {
    content: actionText,
    onAction: handleSelectAllItemsInStore,
  };
});

const stickyTableClassNames = computed(() => classNames(
  styles.StickyTable,
  condensed?.value && styles['StickyTable-condensed'],
));

const shouldShowBulkActions = computed(() => (
  (bulkActionsSelectable.value && selectedItemsCount.value)
  || isSmallScreenSelectable.value
));

const scrollBarWrapperClassNames = computed(() => classNames(
  styles.ScrollBarContainer,
  condensed?.value && styles.scrollBarContainerCondensed,
  hideScrollContainer.value && styles.scrollBarContainerHidden,
));

const scrollBarClassNames = computed(() => classNames(
  tableElement.value && tableInitialized && styles.ScrollBarContent,
));

const tableClassNames = computed(() => classNames(
  styles.Table,
  hasMoreLeftColumns.value && styles['Table-scrolling'],
  selectMode.value && styles.disableTextSelection,
  selectMode.value && shouldShowBulkActions.value && styles.selectMode,
  !selectable?.value && styles['Table-unselectable'],
  canFitStickyColumn.value && props.lastColumnSticky && styles['Table-sticky-last'],
  canFitStickyColumn.value && styles['Table-sticky'],
  canFitStickyColumn.value &&
    props.lastColumnSticky &&
    canScrollRight.value && styles['Table-sticky-scrolling'],
));

const handleSelectModeToggle = (val: boolean) => {
  if (condensed?.value) {
    handleSelectionChange('all', false);
    isSmallScreenSelectable.value = val;
  }
};

// Heading markup condition
const isSecond = (index: number) => index === 0;
const isLast = (index: number) => index === props.headings.length - 1;
const headingContentClassName = (heading: IndexTableHeading, index: number) => {
  return classNames(
    styles.TableHeading,
    props.sortable?.some((value) => value === true) && styles['TableHeading-sortable'],
    isSecond(index) && styles['TableHeading-second'],
    isLast(index) && !heading.hidden && styles['TableHeading-last'],
    !selectable?.value && styles['TableHeading-unselectable'],
    heading.flush && styles['TableHeading-flush'],
  );
};

const getHeadingKey = (heading: IndexTableHeading): string => {
  if (heading.id) {
    return heading.id;
  }

  if (typeof heading.title === 'string') {
    return heading.title;
  }

  return '';
}

const stickyPositioningStyle = (index: number) => {
  return selectable?.value !== false &&
  isSecond(index) &&
  tableHeadingRects.value &&
  tableHeadingRects.value.length > 0
    ? { left: `${tableHeadingRects.value[0].offsetWidth}px` }
    : undefined;
}

const checkboxClassName = (index: number) => {
  return classNames(
    styles.TableHeading,
    props.sortable?.some((value) => value === true) && styles['TableHeading-sortable'],
    index === 0 && styles['TableHeading-first'],
  );
};

const handleSelectPage = (event: Event) => {
  const target = event.target as HTMLInputElement;

  handleSelectionChange('page', target.checked || false);
}

const handleSort = (headingIndex: number, direction: IndexTableSortDirection) => {
  emits('sort', headingIndex, direction);
};

const renderStickyHeading = (index: number) => {
  return tableHeadingRects.value && tableHeadingRects.value.length > (index + 1)
    ? { minWidth: `${tableHeadingRects.value[index + 1].offsetWidth}px` }
    : undefined;
};

const stickyHeadingClassName = (index: number) => {
  return classNames(
    styles.TableHeading,
    index === 0 && styles['StickyTableHeading-second'],
    index === 0 && !selectable?.value && styles.unselectable,
  );
};

// Animation
const loadingTransitionClassNames = {
  enter: styles['LoadingContainer-enter'],
  enterActive: styles['LoadingContainer-enter-active'],
  exit: styles['LoadingContainer-exit'],
  exitActive: styles['LoadingContainer-exit-active'],
};

const onTransitionBeforeEnter = (el: Element) => {
  el.classList.add(loadingTransitionClassNames.enter);
};

const onTransitionEnter = (el: Element, done) => {
  setTimeout(() => {
    el.classList.add(loadingTransitionClassNames.enterActive);
    done();
  }, 1);
};

const onTransitionAfterEnter = (el: Element) => {
  el.classList.remove(loadingTransitionClassNames.enter);
}

const onTransitionBeforeLeave = (el: Element) => {
  el.classList.remove(loadingTransitionClassNames.enterActive);
  el.classList.add(loadingTransitionClassNames.exit);
};

const onTransitionLeave = (el: Element, done) => {
  el.classList.add(loadingTransitionClassNames.exitActive);
  setTimeout(() => {
    done();
  }, parseInt(motion['duration-100'], 10));
};

const onTransitionAfterLeave = (el: Element) => {
  el.classList.remove(loadingTransitionClassNames.exit);
}
</script>
