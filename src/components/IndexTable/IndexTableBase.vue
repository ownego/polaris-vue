<template lang="pug">
div(:class="styles.IndexTable")
  div(:class="styles.IndexTableWrapper")
    //- loadingMarkup
    component(
      v-if="!condensed && loading",
      :is="loadingMarkup",
    )
    //- tableContentMarkup
    template(v-if="itemCount > 0")
      EventListener(event="resize", :handler="handleResize")
      div(
        :class="stickyTableClassNames",
        role="presentation",
      )
        Sticky(:boundingElement="stickyWrapper", @sticky-change="onStickyChange")
          div(
            v-if="condensed",
            :class="headerWrapperClassNames",
          )
            component(:is="loadingMarkup")
            slot(name="sort")

          div(
            v-else,
            :class="stickyHeaderClassNames",
            ref="stickyHeaderWrapperElement",
          )
            component(:is="loadingMarkup")
            div(:class="styles.StickyTableHeadings", ref="stickyHeaderElement")
              template(
                v-for="heading, index in headings",
                :key="getHeadingKey(heading)",
              )
                component(
                  v-for="headingEl in renderHeading(heading, index, 'div', { 'data-index-table-sticky-heading': true })",
                  :is="headingEl",
                )

          component(
            v-if="!condensed",
            :is="bulkActionsMarkup",
          )

      //- bodyMarkup
      ul(
        v-if="condensed",
        ref="condensedListElement",
        :class="condensedClassNames",
        :data-selectmode="Boolean(selectMode)",
      )
        slot

      ScrollContainer(
        v-else,
        ref="scrollableContainerElementRef",
        @scroll="handleScrollContainerScroll",
      )
        table(ref="tableElement", :class="tableClassNames")
          thead
            tr(:class="styles.HeadingRow")
              template(v-for="heading, index in headings")
                component(
                  v-for="headingEl in renderHeading(heading, index, 'th', { 'data-index-table-heading': true }, getHeadingKey(heading))",
                  :is="headingEl",
                )

          tbody(:ref="tableBodyRef")
            slot

    div(v-else, :class="styles.EmptySearchResultWrapper")
      slot(v-if="hasSlot(slots.emptyState)", name="emptyState")
      EmptySearchResult(
        v-else,
        with-illustration,
        :title="i18n.translate('Polaris.IndexTable.emptySearchTitle', { resourceNamePlural: contextResourceName.plural })",
        :description="i18n.translate('Polaris.IndexTable.emptySearchDescription')",
      )

    //- scrollBarMarkup
    div(
      v-if="itemCount > 0",
      ref="scrollContainerElement",
      :class="scrollBarWrapperClassNames",
    )
      div(
        ref="scrollBarElement",
        :class="styles.ScrollBar",
        @scroll="handleScrollBarScroll",
      )
        div(:class="scrollBarClassNames")

    div(v-if="pagination", :class="styles.PaginationWrapper")
      Pagination(type="table", v-bind="pagination")
</template>

<script setup lang="ts">
import { type VNode, computed, h, onMounted, ref, toRef, watch } from 'vue';
import { debounce } from '@polaris/utilities/debounce';
import { classNames } from '@/utilities/css';
import { useToggle } from '@/use/useToggle';
import useI18n from '@/use/useI18n';
import { useHasSlot } from '@/use/useHasSlot';
import {
  Badge,
  Checkbox as PolarisCheckbox,
  EmptySearchResult,
  EventListener,
  LegacyStack,
  Sticky,
  Spinner,
  Text,
  Tooltip,
  UnstyledButton,
  BulkActions,
  Pagination,
} from '@/components';
import {
  useIndexContext,
  useIndexSelectionChangeContext,
} from '@/components/IndexProvider/context';
import { SELECT_ALL_ITEMS, SelectionType } from '@/components/IndexProvider/types';
import type { BorderRadius, Padding } from '@/components/Tooltip/types';
import type { TooltipOverlayProps } from '@/components/Tooltip/components/TooltipOverlay/utils';
import { getTableHeadingsBySelector } from './utils';
import { ScrollContainer } from './components';
import type {
  IndexTableBaseProps,
  IndexTableBaseEvents,
  IndexTableSlots,
  IndexTableHeading,
  IndexTableSortDirection,
  TableHeadingRect,
} from './types';

import SortAscendingIcon from '@icons/SortAscendingIcon.svg';
import SortDescendingIcon from '@icons/SortDescendingIcon.svg';
import styles from '@polaris/components/IndexTable/IndexTable.module.css';


const SCROLL_BAR_PADDING = 16;
const SCROLL_BAR_DEBOUNCE_PERIOD = 300;

const props = withDefaults(defineProps<IndexTableBaseProps>(), {
  // IndexTableBaseProps
  bulkActions: () => [],
  promotedBulkActions: () => [],
  lastColumnSticky: false,
  defaultSortDirection: 'descending',
});
const slots = defineSlots<IndexTableSlots>();
const emits = defineEmits<IndexTableBaseEvents>();

const i18n = useI18n();
const { hasSlot } = useHasSlot();

const {
  loading,
  bulkSelectState,
  resourceName: contextResourceName,
  bulkActionsAccessibilityLabel,
  selectMode,
  selectable = toRef(props, 'selectable'),
  paginatedSelectAllText,
  itemCount,
  hasMoreItems,
  selectedItemsCount,
  condensed,
} = useIndexContext();
const handleSelectionChange = useIndexSelectionChangeContext();

const {
  value: hasMoreLeftColumns,
  toggle: toggleHasMoreLeftColumns,
} = useToggle(false);

const tablePosition = ref({ top: 0, left: 0 });
const tableHeadingRects = ref<TableHeadingRect[]>([]);

const scrollableContainerElement = ref<HTMLDivElement | null>(null);
const scrollableContainerElementRef = ref<InstanceType<typeof ScrollContainer> | null>(null);
const tableElement = ref<HTMLTableElement | null>(null);
const tableBodyElement = ref<Element | null>(null);
const condensedListElement = ref<HTMLUListElement | null>(null);

const tableInitialized = ref(false);
const stickyWrapper = ref<HTMLElement | null>(null);
const hideScrollContainer = ref(true);
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
const lastSortedColumnIndex = ref<number | undefined>(props.sortColumnIndex);
const renderAfterSelectEvent = ref(false);
const lastSelectedItemsCount = ref<number | 'All'>(0);
const hasSelected = ref(false);

const selectedItemsCountValue = computed(() => {
  if (selectedItemsCount.value === SELECT_ALL_ITEMS || selectedItemsCount.value > 0) {
    return selectedItemsCount.value === SELECT_ALL_ITEMS
      ? `${itemCount.value}+`
      : selectedItemsCount.value;
  }
});

const selectAllActionsLabel = computed(() => i18n.translate('Polaris.IndexTable.selected', {
  selectedItemsCount: `${selectedItemsCountValue.value}`,
}));


const paginatedSelectAllAction = computed(() => {
  if (!selectable?.value || !hasMoreItems?.value) {
    return;
  }

  const customActionText =
    props.paginatedSelectAllActionText ??
    i18n.translate('Polaris.IndexTable.selectAllItems', {
      itemsLength: itemCount.value,
      resourceNamePlural: contextResourceName.plural.toLocaleLowerCase(),
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
  hasMoreLeftColumns.value && styles['StickyTable-scrolling'],
  condensed?.value && styles['StickyTable-condensed'],
));

const scrollBarWrapperClassNames = computed(() => classNames(
  styles.ScrollBarContainer,
  props.pagination && styles.ScrollBarContainerWithPagination,
  condensed?.value && styles.scrollBarContainerCondensed,
  hideScrollContainer.value && styles.scrollBarContainerHidden,
));

const scrollBarClassNames = computed(() => classNames(
  tableElement.value && tableInitialized.value && styles.ScrollBarContent,
));

const shouldShowActions = computed(() =>
  !condensed?.value || selectedItemsCount.value,
);

const promotedActions = computed(() =>
  shouldShowActions.value ? props.promotedBulkActions : [],
);

const actions = computed(() => shouldShowActions.value ? props.bulkActions : []);

const headerWrapperClassNames = computed(() => classNames(
  styles.HeaderWrapper,
  (!selectable.value || condensed?.value) && styles.unselectable,
));

const stickyHeaderClassNames = computed(() => classNames(
  styles.StickyTableHeader,
  isSticky.value && styles['StickyTableHeader-isSticky'],
  // Has a sticky left column enabled
  canFitStickyColumn.value && styles['StickyTableHeader-sticky'],
  // ie; is scrolled to the right
  hasMoreLeftColumns.value && styles['StickyTableHeader-scrolling'],
  // Has a sticky right column enabled
  canFitStickyColumn.value &&
    props.lastColumnSticky &&
    styles['StickyTableHeader-sticky-last'],
  // ie; is scrolled to the left
  canFitStickyColumn.value &&
    props.lastColumnSticky &&
    canScrollRight.value &&
    styles['StickyTableHeader-sticky-scrolling'],
));

const condensedClassNames = computed(() => classNames(
  styles.CondensedList,
  props.hasZebraStriping && styles.ZebraStriping,
));

const isSortable = computed(() => props.sortable?.some((v) => v));

const tableClassNames = computed(() => classNames(
  styles.Table,
  hasMoreLeftColumns.value && styles['Table-scrolling'],
  selectMode.value && styles.disableTextSelection,
  !selectable.value && styles['Table-unselectable'],
  canFitStickyColumn.value && styles['Table-sticky'],
  isSortable.value && styles['Table-sortable'],
  canFitStickyColumn.value && props.lastColumnSticky && styles['Table-sticky-last'],
  canFitStickyColumn.value &&
    props.lastColumnSticky &&
    canScrollRight.value &&
    styles['Table-sticky-scrolling'],
  props.hasZebraStriping && styles.ZebraStriping,
));

const bulkActionsClassName = computed(() => classNames(
  styles.BulkActionsWrapper,
  selectMode.value && styles.BulkActionsWrapperVisible,
  condensed?.value && styles['StickyTableHeader-condensed'],
  isSticky.value && styles['StickyTableHeader-isSticky'],
));

const isSticky = ref(false);
const onStickyChange = (value: boolean) => {
  isSticky.value = value;
};

const resizeTableHeadings = debounce(() => {
  if (!tableElement.value || !scrollableContainerElement.value) {
    return;
  }

  const boundingRect = scrollableContainerElement.value.getBoundingClientRect();
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

    if (stickyTableHeadings.value.length) {
      stickyTableHeadings.value[1].style.left = `${tableHeadingRects.value[0].offsetWidth}px`;
    }
  }

  if (stickyTableHeadings.value.length) {
    stickyTableHeadings.value.forEach((heading, index) => {
      heading.style.minWidth = `${tableHeadingRects.value[index]?.offsetWidth || 0}px`;
    });
  }
});

onMounted(() => {
  isMounted.value = true;

  handleCanScrollRight();

  if (selectedItemsCount.value !== lastSelectedItemsCount.value) {
    renderAfterSelectEvent.value = true;
    lastSelectedItemsCount.value = selectedItemsCount.value;
  }

  if (!hasSelected.value && selectedItemsCount.value !== 0) {
    hasSelected.value = true;
  }

  if (scrollableContainerElementRef.value) {
    const { scrollableContainerRef } = scrollableContainerElementRef.value;
    scrollableContainerElement.value = scrollableContainerRef;
  }

  triggerResizeTableHeadings();
  triggerResizeTableScrollBar();
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
  () => [tableElement.value?.offsetWidth, scrollableContainerElementRef.value],
  () => {
    if (scrollableContainerElementRef.value) {
      const { scrollableContainerRef } = scrollableContainerElementRef.value;
      scrollableContainerElement.value = scrollableContainerRef;
    }

    if (tableElement.value) {
      resizeTableScrollBar();
      // Resize header headings after the scroll bar is resized
      triggerResizeTableHeadings();
    }
  }
);

watch(
  () => tableInitialized.value,
  () => {
    if (tableInitialized.value) {
      handleCanFitStickyColumn();
    }
  },
);

const tableBodyRef = (node: any) => {
  if (node !== null && !tableInitialized.value) {
    tableInitialized.value = true;
  }

  tableBodyElement.value = node;
};

const handleSelectAllItemsInStore = () => {
  handleSelectionChange(
    selectedItemsCount.value === SELECT_ALL_ITEMS
    ? SelectionType.Page
    : SelectionType.All,
    true,
  );
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
    !scrollableContainerElement.value
  ) {
    return;
  }

  const tableRect = tableElement.value.getBoundingClientRect();
  const scrollableRect = scrollableContainerElement.value.getBoundingClientRect();

  canScrollRight.value = tableRect.width > scrollableRect.width;
});

const handleCanFitStickyColumn = () => {
  if (!scrollableContainerElement.value || !tableHeadings.value.length) {
    return;
  }
  const scrollableRect = scrollableContainerElement.value?.getBoundingClientRect();
  const checkboxColumnWidth = selectable.value
    ? tableHeadings.value[0].getBoundingClientRect().width
    : 0;
  const firstStickyColumnWidth =
    tableHeadings.value[selectable.value ? 1 : 0].getBoundingClientRect().width;
  const lastColumnIsNotTheFirst = selectable.value
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

  canFitStickyColumn.value = (scrollableRect?.width || 0) >
    firstStickyColumnWidth + checkboxColumnWidth + lastStickyColumnWidth + restOfContentMinWidth;
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
  handleCanFitStickyColumn();
};

const handleScrollContainerScroll = (tmpCanScrollLeft: boolean, tmpCanScrollRight: boolean) => {
  if (!scrollableContainerElement.value || !scrollBarElement.value) {
    console.log('No scrollableContainerElement or scrollBarElement found');
    return;
  }

  if (!scrollingWithBar.value) {
    scrollingContainer.value = true;
    scrollBarElement.value.scrollLeft =
    scrollableContainerElement.value.scrollLeft;
  }
  scrollingWithBar.value = false;

  if (stickyHeaderElement.value) {
    stickyHeaderElement.value.scrollLeft = scrollableContainerElement.value.scrollLeft;
  }

  if (
    (tmpCanScrollLeft && !hasMoreLeftColumns.value) ||
    (!tmpCanScrollLeft && hasMoreLeftColumns.value)
  ) {
    toggleHasMoreLeftColumns();
  }

  canScrollRight.value = tmpCanScrollRight;
};

const handleScrollBarScroll = () => {
  if (!scrollableContainerElement.value || !scrollBarElement.value) {
    return;
  }

  if (!scrollingContainer.value) {
    scrollingWithBar.value = true;
    scrollableContainerElement.value.scrollLeft = scrollBarElement.value.scrollLeft;
  }
  scrollingContainer.value = false;
};

const handleTogglePage = () => {
  handleSelectionChange(
    SelectionType.Page,
    Boolean(!bulkSelectState?.value || bulkSelectState?.value === 'indeterminate'),
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

function triggerResizeTableHeadings() {
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

function resizeTableScrollBar() {
  if (scrollBarElement.value && tableElement.value && tableInitialized.value) {
    scrollBarElement.value.style.setProperty(
      '--pc-index-table-scroll-bar-content-width',
      `${tableElement.value.offsetWidth - SCROLL_BAR_PADDING}px`,
    );


    hideScrollContainer.value = scrollContainerElement.value?.offsetWidth === tableElement.value?.offsetWidth;
  }
  console.log(hideScrollContainer.value, scrollContainerElement.value?.offsetWidth, tableElement.value?.offsetWidth, tableInitialized.value);
}

function triggerResizeTableScrollBar() {
  resizeTableScrollBar();
  stickyWrapper.value = condensed?.value
    ? condensedListElement.value : tableElement.value;
};

function handleSelectModeToggle() {
  handleSelectionChange(SelectionType.All, false);
}

function handleSelectPage(checked: boolean) {
  handleSelectionChange(SelectionType.Page, checked);
}

function handleSortHeadingClick(
  index: number,
  direction: IndexTableSortDirection,
) {
  renderAfterSelectEvent.value = false;
  hasSelected.value = false;
  lastSortedColumnIndex.value = props.sortColumnIndex;

  emits('sort', index, direction);
}

/**
 * ===== Render functions =====
 * This component is a bit complex, so we have to split the render functions
 * Based on original Polaris IndexTable markup functions
 */

// loadingMarkup
const loadingMarkup = computed(() => {
  return loading?.value && h(
    'div',
    {
      class: classNames(
        styles.LoadingPanel,
        loading?.value && styles.LoadingPanelEntered,
      )
    },
    [
      h(
        'div',
        { class: styles.LoadingPanelRow },
        [
          h(Spinner, { size: 'small' }),
          h(
            'span',
            { class: styles.LoadingPanelText },
            i18n.translate('Polaris.IndexTable.resourceLoadingAccessibilityLabel', {
              resourceNamePlural: contextResourceName.plural.toLocaleLowerCase(),
            }),
          ),
        ],
      ),
    ]
  );
});

const bulkActionsMarkup = computed(() => (
  shouldShowActions.value && !condensed?.value
  ? h(
    'div',
    { class: bulkActionsClassName.value },
    [
      h(
        BulkActions,
        {
          selectMode: selectMode.value,
          paginatedSelectAllText: paginatedSelectAllText?.value,
          paginatedSelectAllAction: paginatedSelectAllAction.value,
          accessibilityLabel: bulkActionsAccessibilityLabel?.value,
          selected: bulkSelectState?.value,
          promotedActions: promotedActions.value,
          actions: actions.value,
          label: selectAllActionsLabel.value,
          buttonSize: 'micro',
          onToggleAll: handleTogglePage,
          onSelectModeToggle: condensed?.value && handleSelectModeToggle,
        },
      ),
      loadingMarkup.value,
    ],
  )
  : null
));

// renderHeading
const renderHeading = (
  heading: IndexTableHeading,
  index: number,
  Tag: string,
  tagProps: {[x: string]: unknown},
  id?: string,
) => {
  const isSecond = index === 0;
  const isLast = index === props.headings.length - 1;
  const hasSortable = props.sortable?.some((value) => value === true);
  const headingAlignment = heading.alignment || 'start';

  const headingContentClassName = classNames(
    styles.TableHeading,
    headingAlignment === 'center' && styles['TableHeading-align-center'],
    headingAlignment === 'end' && styles['TableHeading-align-end'],
    hasSortable && styles['TableHeading-sortable'],
    isSecond && styles['TableHeading-second'],
    isLast && !heading.hidden && styles['TableHeading-last'],
    !selectable.value && styles['TableHeading-unselectable'],
    heading.flush && styles['TableHeading-flush'],
  );

  const stickyPositioningStyle =
    selectable.value !== false &&
    isSecond &&
    tableHeadingRects.value &&
    tableHeadingRects.value.length > 0
      ? {left: `${tableHeadingRects.value[0].offsetWidth}px`}
      : undefined;

  const headingContent = h(
    Tag,
    {
      id: id,
      class: headingContentClassName,
      key: getHeadingKey(heading),
      style: stickyPositioningStyle,
      ...tagProps,
    },
    renderHeadingContent(heading, index),
  );

  if (index !== 0 || !selectable.value) {
    return [headingContent];
  }

  const checkboxClassName = classNames(
    styles.TableHeading,
    hasSortable && styles['TableHeading-sortable'],
    index === 0 && styles['TableHeading-first'],
  );

  const checkboxContent = h(
    Tag,
    {
      class: checkboxClassName,
      key: `${heading}-${index}`,
      ...tagProps,
    },
    renderCheckboxContent(),
  );

  return [checkboxContent, headingContent];
};

// checkboxContent
function renderCheckboxContent() {
  return h(
    'div',
    { class: styles.ColumnHeaderCheckboxWrapper },
    h(
      PolarisCheckbox,
      {
        label: i18n.translate('Polaris.IndexTable.selectAllLabel', {
          resourceNamePlural: contextResourceName.plural,
        }),
        labelHidden: true,
        checked: bulkSelectState?.value,
        onChange: handleSelectPage,
      },
    ),
  );
}

// headingContent
function renderHeadingContent(heading: IndexTableHeading, index: number) {
  let headingContent: VNode;

  const defaultTooltipProps = {
    width: heading.tooltipWidth ?? 'default',
    activatorWrapper: 'div',
    dismissOnMouseOut: true,
    persistOnClick: heading.tooltipPersistsOnClick,
  };

  const defaultHeaderTooltipProps = {
    ...defaultTooltipProps,
    padding: '400' as Padding,
    borderRadius: '200' as BorderRadius,
    preferredPosition: 'above' as TooltipOverlayProps['preferredPosition'],
  };

  const headingTitle = h(
    Text,
    {
      as: 'span',
      variant: 'bodySm',
      fontWeight: 'medium',
      visuallyHidden: heading.hidden,
    },
    () => heading.title,
  );

  if (heading.new) {
    headingContent = h(
      LegacyStack,
      { wrap: false, alignment: 'center' },
      () => [
        headingTitle,
        h(Badge, { tone: 'new' }, i18n.translate('Polaris.IndexTable.onboardingBadgeText')),
      ]
    );
  } else {
    headingContent = headingTitle;
  }

  const style = {
    '--pc-index-table-heading-extra-padding-right': heading.paddingBlockEnd
      ? `var(--p-space-${heading.paddingBlockEnd})`
      : '0',
  }

  if (props.sortable?.[index]) {
    const isCurrentlySorted = index === props.sortColumnIndex;
    const isPreviouslySorted =
      !isCurrentlySorted && index === lastSortedColumnIndex.value;
    const isRenderAfterSelectEvent =
      renderAfterSelectEvent.value || (!hasSelected.value && selectedItemsCount.value !== 0);
    const isAscending = props.sortDirection === 'ascending';

    let newDirection: IndexTableSortDirection = heading.defaultSortDirection ?? props.defaultSortDirection;

    let SourceComponent = newDirection === 'ascending' ? SortAscendingIcon : SortDescendingIcon;
    if (isCurrentlySorted) {
      newDirection = isAscending ? 'descending' : 'ascending';
      SourceComponent =
        props.sortDirection === 'ascending'
          ? SortAscendingIcon
          : SortDescendingIcon;
    }

    const iconMarkup = h(
      'span',
      {
        class: classNames(
          styles.TableHeadingSortIcon,
          heading?.alignment === 'end' &&
            styles['TableHeadingSortIcon-heading-align-end'],
          isCurrentlySorted && styles['TableHeadingSortIcon-visible'],
        ),
      },
      h(SourceComponent, { className: styles.TableHeadingSortSvg, ariaHidden: true, focusable: false }),
    );

    const defaultSortButtonProps = {
      onClick: () => handleSortHeadingClick(index, newDirection),
      class: classNames(
        styles.TableHeadingSortButton,
        !isCurrentlySorted &&
          heading?.alignment === 'end' &&
          styles['TableHeadingSortButton-heading-align-end'],
        isCurrentlySorted &&
          heading?.alignment === 'end' &&
          styles['TableHeadingSortButton-heading-align-end-currently-sorted'],
        isPreviouslySorted &&
          !isRenderAfterSelectEvent &&
          heading?.alignment === 'end' &&
          styles['TableHeadingSortButton-heading-align-end-previously-sorted'],
      ),
      tabIndex: selectMode.value ? -1 : 0,
    };

    const sortMarkup = h(
      UnstyledButton,
      defaultSortButtonProps,
      () => [
        iconMarkup,
        h(
          'span',
          {
            class: classNames(
              props.sortToggleLabels &&
              selectMode.value &&
              heading.tooltipContent &&
              styles.TableHeadingTooltipUnderlinePlaceholder,
            ),
          },
          headingContent,
        )
      ],
    );

    if (!props.sortToggleLabels || selectMode.value) {
      return h(
        'div', { class: styles.SortableTableHeadingWithCustomMarkup },
        sortMarkup,
      )
    }

    const tooltipDirection = isCurrentlySorted ? props.sortDirection! : newDirection;
    const sortTooltipContent = props.sortToggleLabels[index][tooltipDirection];

    if (!heading.tooltipContent) {
      return h(
        'div',
        {
          style,
          class: classNames(
            heading.paddingBlockEnd &&
            styles['TableHeading-extra-padding-right'],
          ),
        },
        h(
          Tooltip,
          {
            ...defaultTooltipProps,
            preferredPosition: 'above',
          },
          {
            content: () => sortTooltipContent,
            default: () => sortMarkup,
          },
        ),
      );
    }

    if (heading.tooltipContent) {
      return h(
        'div',
        {
          style,
          class: classNames(
            styles.SortableTableHeadingWithCustomMarkup,
            heading.paddingBlockEnd && styles['TableHeading-extra-padding-right'],
          ),
        },
        h(
          UnstyledButton,
          { ...defaultSortButtonProps },
          () => [
            h(
              Tooltip, { ...defaultHeaderTooltipProps },
              {
                content: () => heading.tooltipContent,
                default: () => h(
                  'span',
                  { class: styles.TableHeadingUnderline },
                  headingContent,
                ),
              }
            ),
            h(
              Tooltip, { ...defaultTooltipProps, preferredPosition: 'above' },
              () => iconMarkup,
            ),
          ],
        ),
      );
    }
  }

  if (heading.tooltipContent) {
    return h(
      'div',
      {
        style,
        class: classNames(heading.paddingBlockEnd && styles['TableHeading-extra-padding-right']),
      },
      h(
        Tooltip,
        { ...defaultHeaderTooltipProps, activatorWrapper: 'span' },
        {
          content: () => heading.tooltipContent,
          default: () => h(
            'span',
            { class: classNames(styles.TableHeadingUnderline, styles.SortableTableHeaderWrapper) },
            headingContent,
          ),
        },
      )
    )
  }

  return h(
    'div',
    {
      style,
      class: classNames(heading.paddingBlockEnd && styles['TableHeading-extra-padding-right']),
    },
    headingContent,
  );
}
</script>
