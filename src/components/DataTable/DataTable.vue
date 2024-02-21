<template lang="pug">
div(
  ref="dataTable",
  :class="wrapperClassName",
)
  //- stickyHeaderMarkup
  div(
    v-if="stickyHeader && isMounted",
    role="presentation",
    :class="styles.StickyHeaderWrapper",
  )
    Sticky(
      :bounding-element="dataTable",
      @sticky-change="stickyHandler",
    )
      div(:class="stickyHeaderInnerClassNames")
        div
          component(v-if="!hideScrollIndicator", :is="navigationMarkup('sticky')")
        table(
          ref="stickyTable",
          :class="stickyHeaderTableClassNames",
        )
          thead
            tr(:class="styles.StickyTableHeadingsRow")
              //- Render headings
              template(v-for="(heading, headingIndex) in headings", :key="headingIndex")
                component(
                  :is="renderHeading({heading, headingIndex, inFixedNthColumn: Boolean(headingIndex <= fixedFirstColumns - 1 && fixedFirstColumns), inStickyHeader: true})",
                )

  //- navigationMarkup('header')
  //- component(v-if="!hideScrollIndicator", :is="navigationMarkup('header')")

  div(:class="className")
    div(
      ref="scrollContainer",
      :class="styles.ScrollContainer",
    )
      EventListener(event="resize", :handler="handleResize")
      EventListener(
        event="scroll",
        capture,
        passive,
        :handler="scrollListener",
      )
      //- fixedNthColumnMarkup
      table(
        :class="fixedFirstColumnClassName",
        :style="{width: `${columnVisibilityData[fixedFirstColumns - 1]?.rightEdge}px`}",
      )
        thead
          tr(:style="{height: `${headerRowHeights[0]}px`}")
            //- Render headings
            template(v-for="(heading, headingIndex) in nthHeadings", :key="headingIndex")
              component(
                :is="renderHeading({heading, headingIndex, inFixedNthColumn: true, inStickyHeader: false})",
              )
          tr(
            v-if="totals && !showTotalsInFooter",
            :style="{height: `${headerRowHeights[1]}px`}"
          )
            //- Render totals
            component(
              v-for="(total, index) in nthTotals", :key="index",
              :is="renderTotals({total, index})",
            )
        tbody
          //- Render rows
          component(
            v-for="row, index in nthColumns",
            :is="defaultRenderRow({row, index, inFixedNthColumn: true, rowHeights: bodyRowHeights})",
          )
        tfoot(v-if="totals && showTotalsInFooter")
          tr
            component(
              v-for="(total, index) in nthTotals",
              :is="renderTotals({total, index})",
            )

      table(ref="table", :class="styles.Table")
        thead
          //- headingMarkup
          tr
            component(
              v-for="(heading, headingIndex) in headings",
              :is="renderHeading({heading, headingIndex, inFixedNthColumn: false, inStickyHeader: false})",
            )
          //- headerTotalsMarkup
          tr(v-if="!showTotalsInFooter && totals")
            component(
              v-for="(total, index) in totals",
              :is="renderTotals({total, index})",
            )
        tbody
          //- bodyMarkup
          component(
            v-for="row, index in rows",
            :is="defaultRenderRow({row, index, inFixedNthColumn: false})",
          )
        //- footerTotalsMarkup
        tfoot(v-if="showTotalsInFooter")
          tr(v-if="totals")
            component(
              v-for="(total, index) in totals",
              :is="renderTotals({total, index})",
            )

    //- paginationMarkup
    Pagination(
      v-if="pagination",
      v-bind="pagination",
    )

    //- footerMarkup
    div(
      v-if="footerContent",
      :class="styles.Footer",
    )
      component(:is="footerContent")
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  toRaw,
  h,
} from 'vue';
import { debounce } from '@polaris/utilities/debounce';
import { classNames } from '@/utilities/css';
import type { VueNode } from '@/utilities/types';
import useI18n from '@/use/useI18n';
import { headerCell } from '@polaris/components/shared';
import {
  EventListener,
  Sticky,
  Pagination,
} from '@/components';
import {
  measureColumn,
  getPrevAndCurrentColumns,
} from '@polaris/components/DataTable/utilities';

import { Cell, Navigation } from './components';
import type {
  DataTableProps,
  SortDirection,
  ColumnVisibilityData,
  DataTableEvents,
  TableData,
} from './types';
import styles from '@polaris/components/DataTable/DataTable.module.scss';

const props = withDefaults(defineProps<DataTableProps>(), {
  hideScrollIndicator: false,
  increasedTableDensity: false,
  hasZebraStripingOnData: false,
  stickyHeader: false,
  fixedFirstColumn: false,
  hoverable: true,
});
const emits = defineEmits<DataTableEvents>();

const i18n = useI18n();

// DataTableState
const isMounted = ref(false);
const condensed = ref(false);
const columnVisibilityData = ref<ColumnVisibilityData[]>([]);
const previousColumn = ref<ColumnVisibilityData | undefined>(undefined);
const currentColumn = ref<ColumnVisibilityData | undefined>(undefined);
const sortedColumnIndex = ref<number | undefined>(undefined);
const sortDirection = ref<SortDirection | undefined>(undefined);
const isScrolledFarthestLeft = ref(true);
const isScrolledFarthestRight = ref(false);
const rowHovered = ref<number | undefined>();

const dataTable = ref<HTMLDivElement | null>(null);
const scrollContainer = ref<HTMLDivElement | null>(null);
const table = ref<HTMLTableElement | null>(null);
const stickyTable = ref<HTMLTableElement | null>(null);
const stickyNav = ref<HTMLDivElement | null>(null);
const headerNav = ref<HTMLDivElement | null>(null);
const tableHeadings = ref<HTMLTableCellElement[]>([]);
const stickyHeadings = ref<HTMLDivElement[]>([]);
const tableHeadingWidths = ref<number[]>([]);
const stickyHeaderActive = ref(false);
const scrollStopTimer = ref<ReturnType<typeof setTimeout> | null>(null);

const handleResize = debounce(() => {
  let tmpCondensed = false;

  if (table.value && scrollContainer.value) {
    // safari sometimes incorrectly sets the scrollwidth too large by 1px
    tmpCondensed = table.value.scrollWidth > scrollContainer.value.clientWidth + 1;
  }
  calculateColumnVisibilityData(tmpCondensed);
  condensed.value = tmpCondensed;
}, 40, {trailing: true, leading: true, maxWait: 40});

const fixedFirstColumns = computed(() => {
  const numberOfFixedFirstColumns =
    props.hasFixedFirstColumn && !props.fixedFirstColumns ? 1 : (props.fixedFirstColumns || 0);

  if (numberOfFixedFirstColumns >= props.headings.length) {
    return 0;
  }

  return numberOfFixedFirstColumns;
});

const rowCountIsEven = computed(() => props.rows.length % 2 === 0);

const className = computed(() => classNames(
  styles.DataTable,
  condensed.value && styles.condensed,
  props.totals && styles.ShowTotals,
  props.showTotalsInFooter && styles.ShowTotalsInFooter,
  props.hasZebraStripingOnData && styles.ZebraStripingOnData,
  props.hasZebraStripingOnData && rowCountIsEven.value && styles.RowCountIsEven,
));

const wrapperClassName = computed(() => classNames(
  styles.TableWrapper,
  condensed.value && styles.condensed,
  props.increasedTableDensity && styles.IncreasedTableDensity,
  props.stickyHeader && styles.StickyHeaderEnabled,
));

const nthColumns = computed(() => props.rows.map((row) => row.slice(0, fixedFirstColumns.value)));
const nthHeadings = computed(() => props.headings.slice(0, fixedFirstColumns.value));
const nthTotals = computed(() => props.totals?.slice(0, fixedFirstColumns.value));
const tableHeaderRows = computed(() => table.value?.children[0].childNodes);
const tableBodyRows = computed(() => table.value?.children[1].childNodes);
const headerRowHeights = computed(() => getRowClientHeights(tableHeaderRows.value));
const bodyRowHeights = computed(() => getRowClientHeights(tableBodyRows.value));

const fixedFirstColumnClassName = computed(() => classNames(
  styles.FixedFirstColumn,
  !isScrolledFarthestLeft.value && styles.separate,
));

const tableRowClassName = computed(() => classNames(
  styles.TableRow,
  props.hoverable && styles.hoverable,
));

const stickyHeaderInnerClassNames = computed(() => classNames(
  styles.StickyHeaderInner,
  stickyHeaderActive.value && styles['StickyHeaderInner-isSticky'],
));

const stickyHeaderTableClassNames = computed(() => classNames(
  styles.StickyHeaderTable,
  !isScrolledFarthestLeft.value && styles.separate,
));

const totalsRowHeading = computed(() => {
  const totalsLabel = props.totalsName
    ? props.totalsName
    : {
        singular: i18n.translate('Polaris.DataTable.totalRowHeading'),
        plural: i18n.translate('Polaris.DataTable.totalsRowHeading'),
      };

  return props.totals && props.totals.filter((total) => total !== '').length > 1
    ? totalsLabel.plural
    : totalsLabel.singular;
});

onMounted(() => {
  isMounted.value = true;
  handleResize();
});

onBeforeUnmount(() => {
  handleResize.cancel();
});

const getRowClientHeights = (rows?: NodeList) => {
  const heights: number[] = [];
  if (!rows) {
    return heights;
  }
  rows.forEach((row) => {
    heights.push((row as Element).clientHeight);
  });
  return heights;
};

const setCellRef = ({
  cellRef,
  index,
  inStickyHeader,
}: {
  cellRef: HTMLTableCellElement | null;
  index: number;
  inStickyHeader: boolean;
}) => {
  if (!cellRef) {
    return;
  }

  if (inStickyHeader) {
    stickyHeadings.value[index] = cellRef;
    const button = cellRef.querySelector('button');
    if (!button) {
      return;
    }
    button.addEventListener('focus', handleHeaderButtonFocus);
  } else {
    tableHeadings.value[index] = cellRef;
    tableHeadingWidths.value[index] = cellRef.clientWidth;
  }
};

const changeHeadingFocus = () => {
  const stickyFocusedItemIndex = stickyHeadings.value.findIndex(
    (item) => item === document.activeElement?.parentElement,
  );

  const tableFocusedItemIndex = tableHeadings.value.findIndex(
    (item) => item === document.activeElement?.parentElement,
  );

  const arrowsInStickyNav = stickyNav.value?.querySelectorAll('button');
  const arrowsInHeaderNav = headerNav.value?.querySelectorAll('button');

  let stickyFocusedNavIndex = -1;

  arrowsInStickyNav?.forEach((item: HTMLButtonElement, index: number) => {
    if (item === document.activeElement) {
      stickyFocusedNavIndex = index;
    }
  });

  let headerFocusedNavIndex = -1;

  arrowsInHeaderNav?.forEach((item: HTMLButtonElement, index: number) => {
    if (item === document.activeElement) {
      headerFocusedNavIndex = index;
    }
  });

  if (
    stickyFocusedItemIndex < 0 &&
    tableFocusedItemIndex < 0 &&
    stickyFocusedNavIndex < 0 &&
    headerFocusedNavIndex < 0
  ) {
    return null;
  }

  let button;

  if (stickyFocusedItemIndex >= 0) {
    button = tableHeadings.value[stickyFocusedItemIndex].querySelector('button');
  } else if (tableFocusedItemIndex >= 0) {
    button = stickyHeadings.value[tableFocusedItemIndex].querySelector('button');
  }

  if (stickyFocusedNavIndex >= 0) {
    button = arrowsInHeaderNav?.[stickyFocusedNavIndex];
  } else if (headerFocusedNavIndex >= 0) {
    button = arrowsInStickyNav?.[headerFocusedNavIndex];
  }

  if (!button) {
    return null;
  }

  button.style.visibility = 'visible';
  button.focus();
  button.style.removeProperty('visibility');
};

const calculateColumnVisibilityData = (tmpCondensed: boolean) => {
  if ((props.stickyHeader || tmpCondensed) && table.value && scrollContainer.value && dataTable.value) {
    const headerCells = table.value.querySelectorAll<HTMLTableCellElement>(
      headerCell.selector,
    );

    const rightMostHeader = headerCells[fixedFirstColumns.value - 1];
    const nthColumnWidth = fixedFirstColumns.value
      ? rightMostHeader.offsetLeft + rightMostHeader.offsetWidth
      : 0;

    if (headerCells.length > 0) {
      const firstVisibleColumnIndex = headerCells.length - 1;
      const tableLeftVisibleEdge =
        scrollContainer.value.scrollLeft + nthColumnWidth;

      const tableRightVisibleEdge =
        scrollContainer.value.scrollLeft + dataTable.value.offsetWidth;

      const tableData = {
        firstVisibleColumnIndex,
        tableLeftVisibleEdge,
        tableRightVisibleEdge,
      };

      const tmpColumnVisibilityData = [...headerCells].map(
        measureColumn(tableData),
      );

      const lastColumn =
        tmpColumnVisibilityData[tmpColumnVisibilityData.length - 1];

      const tmpIsScrolledFarthestLeft = fixedFirstColumns.value
        ? tableLeftVisibleEdge === nthColumnWidth
        : tableLeftVisibleEdge === 0;

      const {
        previousColumn: tmpPreviousColumn,
        currentColumn: tmpCurrentColumn,
      } = getPrevAndCurrentColumns(tableData, tmpColumnVisibilityData);

      // Set state
      columnVisibilityData.value = tmpColumnVisibilityData;
      isScrolledFarthestLeft.value = tmpIsScrolledFarthestLeft;
      isScrolledFarthestRight.value = lastColumn.rightEdge <= tableRightVisibleEdge;
      previousColumn.value = tmpPreviousColumn;
      currentColumn.value = tmpCurrentColumn;

      return;
    }
  }

  // Set state
  columnVisibilityData.value = [];
  previousColumn.value = undefined;
  currentColumn.value = undefined;
};

const handleHeaderButtonFocus = (event: Event) => {
  if (
    !scrollContainer.value ||
    event.target == null ||
    columnVisibilityData.value.length === 0
  ) {
    return;
  }

  const target = event.target as HTMLElement;
  const currentCell = target.parentNode as HTMLTableCellElement;

  const tableScrollLeft = scrollContainer.value.scrollLeft;
  const tableViewableWidth = scrollContainer.value.offsetWidth;
  const tableRightEdge = tableScrollLeft + tableViewableWidth;
  const nthColumnWidth =
    columnVisibilityData.value.length > 0
      ? columnVisibilityData.value[fixedFirstColumns.value]?.rightEdge
      : 0;
  const currentColumnLeftEdge = currentCell.offsetLeft;
  const currentColumnRightEdge = currentCell.offsetLeft + currentCell.offsetWidth;

  if (tableScrollLeft > currentColumnLeftEdge - nthColumnWidth) {
    scrollContainer.value.scrollLeft = currentColumnLeftEdge - nthColumnWidth;
  }

  if (currentColumnRightEdge > tableRightEdge) {
    scrollContainer.value.scrollLeft =
      currentColumnRightEdge - tableViewableWidth;
  }
};

const stickyHeaderScrolling = () => {
  if (!stickyTable.value || !scrollContainer.value) {
    return;
  }

  stickyTable.value.scrollLeft = scrollContainer.value.scrollLeft;
};

const scrollListener = () => {
  if (scrollStopTimer.value) {
    clearTimeout(scrollStopTimer.value);
  }

  scrollStopTimer.value = setTimeout(() => {
    calculateColumnVisibilityData(condensed.value);
  }, 100);

  if (isScrolledFarthestLeft.value !== (scrollContainer.value?.scrollLeft === 0)) {
    isScrolledFarthestLeft.value = scrollContainer.value?.scrollLeft === 0;
  }

  if (props.stickyHeader && stickyHeaderActive.value) {
    stickyHeaderScrolling();
  }
};

const handleHover = (row?: number) => () => {
  rowHovered.value = row;
};

const handleFocus = (event: FocusEvent) => {
  if (!scrollContainer.value || !event.target) {
    return;
  }

  const currentCell = (event.target as Element).parentNode as HTMLTableCellElement;

  const hasFixedFirstColumn = columnVisibilityData.value.length > 0;
  const nthColumnWidth = hasFixedFirstColumn
    ? columnVisibilityData.value[fixedFirstColumns.value]?.rightEdge
    : 0;
  const currentColumnLeftEdge = currentCell.offsetLeft;
  const desiredScrollLeft = currentColumnLeftEdge - nthColumnWidth;

  if (scrollContainer.value.scrollLeft > desiredScrollLeft) {
    scrollContainer.value.scrollLeft = desiredScrollLeft;
  }

  // focus fixed first column if present
};

const navigateTable = (direction: string) => {
  const nthColumnWidth = columnVisibilityData.value[fixedFirstColumns.value - 1]?.rightEdge;
  if (!currentColumn.value || !previousColumn.value) {
    return;
  }

  let prevWidths = 0;
  for (let index = 0; index < currentColumn.value.index; index++) {
    prevWidths += columnVisibilityData.value[index].width;
  }

  const handleScroll = () => {
    let newScrollLeft = 0;
    if (fixedFirstColumns.value) {
      newScrollLeft =
        direction === 'right'
          ? prevWidths - nthColumnWidth + (currentColumn.value?.width ?? 0)
          : prevWidths - (previousColumn.value?.width ?? 0) - nthColumnWidth;
    } else {
      newScrollLeft =
        direction === 'right'
          ? (currentColumn.value?.rightEdge ?? 0)
          : (previousColumn.value?.leftEdge ?? 0);
    }

    if (scrollContainer.value) {
      scrollContainer.value.scrollLeft = newScrollLeft;

      requestAnimationFrame(() => {
        calculateColumnVisibilityData(condensed.value);
      });
    }
  };

  return handleScroll;
};

const getColSpan = (
  rowLength: number,
  headingsLength: number,
  contentTypesLength: number,
  cellIndex: number,
) => {
  if (fixedFirstColumns.value) {
    return 1;
  }
  const rowLen = rowLength ? rowLength : 1;
  const colLen = headingsLength ? headingsLength : contentTypesLength;
  const colSpan = Math.floor(colLen / rowLen);
  const remainder = colLen % rowLen;

  return cellIndex === 0 ? colSpan + remainder : colSpan;
};

const defaultOnSort = (headingIndex: number) => {
  sortDirection.value = sortDirection.value ?? toRaw(props.defaultSortDirection || 'ascending');
  sortedColumnIndex.value = sortedColumnIndex.value ?? toRaw(props.initialSortColumnIndex);

  let newSortDirection = props.defaultSortDirection || 'ascending';

  if (sortedColumnIndex.value === headingIndex) {
    newSortDirection =
      sortDirection.value === 'ascending' ? 'descending' : 'ascending';
  }

  const handleSort = () => {
    sortDirection.value = newSortDirection;
    sortedColumnIndex.value = headingIndex;
    emits('sort', headingIndex, newSortDirection);
  };

  return handleSort;
};

const stickyHandler = (isSticky: boolean) => {
  setTimeout(changeHeadingFocus, 10);
  stickyHeaderActive.value = isSticky;
};

/*
 * ===== Rendering functions =====
 * This component is a bit complex and has a lot of rendering logic
 * So we have a few rendering functions to keep the main template clean
 */

// Navigation markup
const navigationMarkup = (location: 'sticky' | 'header') => h(
  Navigation,
  {
    columnVisibilityData: columnVisibilityData.value,
    isScrolledFarthestLeft: isScrolledFarthestLeft.value,
    isScrolledFarthestRight: isScrolledFarthestRight.value,
    navigateTableLeft: navigateTable('left'),
    navigateTableRight: navigateTable('right'),
    fixedFirstColumns: fixedFirstColumns.value,
    setRef: (ref: HTMLDivElement) => {
      if (location === 'sticky') {
        stickyNav.value = ref;
      } else {
        headerNav.value = ref;
      }
    },
  },
);

// Render heading
const renderHeading = ({
  heading,
  headingIndex,
  inFixedNthColumn,
  inStickyHeader,
}: {
  heading: VueNode;
  headingIndex: number;
  inFixedNthColumn: boolean;
  inStickyHeader: boolean;
}) => {
  sortDirection.value = sortDirection.value ?? props.defaultSortDirection;
  sortedColumnIndex.value = sortedColumnIndex.value ?? (props.initialSortColumnIndex || 0);

  let sortableHeadingProps;
  const headingCellId = `heading-cell-${headingIndex}`;
  const stickyHeaderId = `stickyheader-${headingIndex}`;
  const id = inStickyHeader ? stickyHeaderId : headingCellId;

  if (props.sortable) {
    const isSortable = props.sortable[headingIndex];
    const isSorted = isSortable && sortedColumnIndex.value === headingIndex;
    const direction = isSorted ? sortDirection.value : 'none';

    sortableHeadingProps = {
      defaultSortDirection: props.defaultSortDirection,
      sorted: isSorted,
      sortable: isSortable,
      sortDirection: direction,
      fixedNthColumn: fixedFirstColumns.value,
      inFixedNthColumn: fixedFirstColumns.value,
      // onSort: this.defaultOnSort(headingIndex),
    };
  }

  const stickyCellWidth = inStickyHeader
    ? tableHeadingWidths.value[headingIndex]
    : undefined;

  const fixedCellVisible = !isScrolledFarthestLeft.value;

  const cellProps = {
    header: true,
    stickyHeadingCell: inStickyHeader,
    contentType: props.columnContentTypes[headingIndex],
    nthColumn: headingIndex < fixedFirstColumns.value,
    truncate: props.truncate,
    ...sortableHeadingProps,
    verticalAlign: props.verticalAlign,
    stickyCellWidth,
    fixedCellVisible,
    firstColumnMinWidth: props.firstColumnMinWidth,
    onFocus: handleFocus,
    onSort: defaultOnSort(headingIndex),
  };

  if (inFixedNthColumn && inStickyHeader) {
    // need two cells for fixed first column (actual cell and the overlapping one)
    // the sticky cell is second so that the index is associated with the sticky
    // cell and not the underlying one. This helps `changeHeadingFocus` to put
    // focus on the right cell when switching from sticky to non-sticky headers
    return () => [
      h(Cell, {
        key: `${id}`,
        ...cellProps,
        setRef: (ref: HTMLTableCellElement | null) => {
          setCellRef({cellRef: ref, index: headingIndex, inStickyHeader});
        },
        inFixedNthColumn: false,
      }, () => heading),
      h(Cell, {
        key: `${id}-sticky`,
        ...cellProps,
        setRef: (ref: HTMLTableCellElement | null) => {
          setCellRef({cellRef: ref, index: headingIndex, inStickyHeader});
        },
        inFixedNthColumn: Boolean(fixedFirstColumns.value),
        lastFixedFirstColumn: headingIndex === fixedFirstColumns.value - 1,
        style: {left: columnVisibilityData.value[headingIndex]?.leftEdge},
      }, () => heading),
    ];
  }

  return () => h(Cell, {
    key: `${id}`,
    ...cellProps,
    setRef: (ref: HTMLTableCellElement | null) => {
      setCellRef({cellRef: ref, index: headingIndex, inStickyHeader});
    },
    inFixedNthColumn,
    lastFixedFirstColumn: headingIndex === fixedFirstColumns.value - 1,
  }, () => heading);
};

// Render totals
const renderTotals = ({ total, index }: {
  total: TableData;
  index: number;
}) => {
  const id = `totals-cell-${index}`;

  let content: TableData;
  let contentType: string;

  if (!index) {
    content = totalsRowHeading.value;
  }

  if (total !== '' && index > 0) {
    content = total;
    contentType = props.columnContentTypes[index];
  }

  return () => h(Cell, {
    key: id,
    total: true,
    totalInFooter: props.showTotalsInFooter,
    nthColumn: index <= fixedFirstColumns.value - 1,
    firstColumn: !index,
    contentType,
    truncate: props.truncate,
    verticalAlign: props.verticalAlign,
  }, () => content);
};

// Default render row
const defaultRenderRow = ({
  row,
  index,
  inFixedNthColumn,
  rowHeights,
}: {
  row: TableData[];
  index: number;
  inFixedNthColumn: boolean;
  rowHeights?: number[];
}) => {
  console.log(row);
  return () => h(
    'tr',
    {
      key: `row-${index}`,
      class: tableRowClassName.value,
      onMouseenter: handleHover(index),
      onMouseleave: handleHover(),
    },
    () => row.map((content, cellIndex) => {
      const hovered = rowHovered.value === index;
      const id = `cell-${cellIndex}-row-${index}`;
      const colSpan = getColSpan(row.length, props.headings.length, props.columnContentTypes.length, cellIndex);

      console.log(content);

      return h(Cell, {
        key: id,
        contentType: props.columnContentTypes[cellIndex],
        nthColumn: cellIndex <= fixedFirstColumns.value - 1,
        firstColumn: cellIndex === 0,
        truncate: props.truncate,
        verticalAlign: props.verticalAlign,
        colSpan,
        hovered,
        inFixedNthColumn: condensed.value && inFixedNthColumn,
        style: { height: rowHeights ? `${rowHeights?.[index]}px` : undefined },
      }, () => content);
    }),
  );
};
</script>
