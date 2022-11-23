<template lang="pug">
div(
  ref="dataTable",
  :class="wrapperClassName",
)
  div(
    v-if="stickyHeader",
    :class="styles.StickyHeaderWrapper",
    role="presentation"
  )
    Sticky(
      :boundingElement="dataTable",
      @sticky-change="stickyHandler",
    )
      div(:class="stickyHeaderInnerClassNames")
        div
          TableNavigation(
            v-if="!hideScrollIndicator",
            ref="stickyNav",
            :columnVisibilityData="columnVisibilityData",
            :isScrolledFarthestLeft="isScrolledFarthestLeft",
            :isScrolledFarthestRight="isScrolledFarthestRight",
            :fixedFirstColumns="fixedFirstColumns",
            @navigate-table-left="navigateTable('left')",
            @navigate-table-right="navigateTable('right')",
          )
        table(
          ref="stickyTable",
          :class="stickyHeaderTableClassNames",
        )
          thead
            tr(:class="styles.StickyTableHeadingsRow")
              TableHeading(
                v-for="heading, index in headings",
                :key="`stickyheader-${index}`",
                :headingIndex="index",
                :inFixedNthColumn="Boolean(index <= fixedFirstColumns - 1 && fixedFirstColumns)",
                :inStickyHeader="true",
                :stickyCellWidth="tableHeadingWidths[index]",
                :setRef="(ref) => { setCellRef({ cellRef: ref, index, inStickyHeader: false }) }",
                v-bind="tableHeadingProps",
                @focus="handleFocus",
                @sort="defaultOnSort(index)",
              )
                template(v-if="hasSlot(slots[`heading-${index}`])")
                  slot(:name="`heading-${index}`")
                template(v-else) {{ heading }}

  TableNavigation(
    v-if="!hideScrollIndicator",
    ref="headerNav",
    :columnVisibilityData="columnVisibilityData",
    :isScrolledFarthestLeft="isScrolledFarthestLeft",
    :isScrolledFarthestRight="isScrolledFarthestRight",
    :fixedFirstColumns="fixedFirstColumns",
    @navigate-table-left="navigateTable('left')",
    @navigate-table-right="navigateTable('right')",
  )
  div(:class="className")
    div(:class="styles.ScrollContainer", ref="scrollContainer")
      EventListener(event="resize", :handler="handleResize")
      EventListener(
        capture,
        passive,
        event="scroll",
        :handler="scrollListener",
      )
      table(
        v-if="condensed && fixedFirstColumns !== 0",
        v-memo="[ condensed, showTotalsInFooter, columnVisibilityData, columnContentTypes, hideScrollIndicator, hasFixedFirstColumn, truncate, verticalAlign]",
        :class="fixedFirstColumnClassName",
        :style="{ width: `${columnVisibilityData[fixedFirstColumns - 1]?.rightEdge}px` }",
      )
        thead
          tr(:style="{ height: `${headerRowHeights[0]}px` }")
            TableHeading(
              v-for="heading, index in nthHeadings",
              :key="`heading-cell-${index}`",
              :headingIndex="index",
              :inFixedNthColumn="true",
              :inStickyHeader="false",
              :setRef="(ref) => { setCellRef({ cellRef: ref, index, inStickyHeader: false }) }",
              v-bind="tableHeadingProps",
              @focus="handleFocus",
              @sort="defaultOnSort(index)",
            )
              template(v-if="hasSlot(slots[`heading-${index}`])")
                slot(:name="`heading-${index}`")
              template(v-else) {{ heading }}

          tr(
            v-if="totals && !showTotalsInFooter",
            :style="{ height: `${headerRowHeights[1]}px` }",
          )
            Cell(
              v-for="total, index in nthTotals",
              :key="`totals-cell-${index}`",
              total,
              :totalInFooter="showTotalsInFooter",
              :nthColumn="index <= fixedFirstColumns - 1",
              :firstColumn="index === 0",
              :contentType="total !== '' && index > 0 ? columnContentTypes[index] : undefined",
              :truncate="truncate",
              :verticalAlign="verticalAlign",
            )
              template(v-if="index === 0")
                template(v-if="hasSlot(slots['totalsName-plural']) && isTotalsNamePlural")
                  slot(name="totalsName-plural")
                template(v-else-if="hasSlot(slots['totalsName-singular']) && !isTotalsNamePlural")
                  slot(name="totalsName-singular")
                template(v-if="!hasSlot(slots['totalsName-plural']) && isTotalsNamePlural")
                  | {{ i18n.translate('Polaris.DataTable.totalsRowHeading') }}
                template(v-if="!hasSlot(slots['totalsName-singular']) && !isTotalsNamePlural")
                  | {{ i18n.translate('Polaris.DataTable.totalRowHeading') }}
              template(v-else-if="total !== '' && index > 0") {{ total }}

        tbody
          tr(
            v-for="row, index in nthColumns",
            :key="`row-${index}`",
            :class="tableRowClassName",
            v-memo="[ condensed, showTotalsInFooter, columnVisibilityData, columnContentTypes, hideScrollIndicator, hasFixedFirstColumn, truncate, verticalAlign, row]",
            @mouseenter="handleHover(index)",
            @mouseleave="handleHover()",
          )
            Cell(
              v-for="content, cellIndex in row",
              :key="`cell-${cellIndex}-row-${index}`",
              :contentType="columnContentTypes[cellIndex]",
              :nthColumn="cellIndex <= fixedFirstColumns - 1",
              :firstColumn="cellIndex === 0",
              :truncate="truncate",
              :verticalAlign="verticalAlign",
              :colSpan="getColSpan(row.length, headings.length, columnContentTypes.length, cellIndex)",
              :hovered="index === rowHovered",
              :style="bodyRowHeights ? { height: `${bodyRowHeights[index]}px` } : {}",
              :inFixedNthColumn="condensed && true",
            )
              template(v-if="hasSlot(slots[`cell-${cellIndex}-row-${index}`])")
                slot(:name="`cell-${cellIndex}-row-${index}`")
              template(v-else) {{ content }}

        tfoot(v-if="totals && showTotalsInFooter")
          tr
            Cell(
              v-for="total, index in nthTotals",
              :key="`totals-cell-${index}`",
              total,
              :totalInFooter="showTotalsInFooter",
              :nthColumn="index <= fixedFirstColumns - 1",
              :firstColumn="index === 0",
              :contentType="total !== '' && index > 0 ? columnContentTypes[index] : undefined",
              :truncate="truncate",
              :verticalAlign="verticalAlign",
            )
              template(v-if="index === 0")
                template(v-if="hasSlot(slots['totalsName-plural']) && isTotalsNamePlural")
                  slot(name="totalsName-plural")
                template(v-else-if="hasSlot(slots['totalsName-singular']) && !isTotalsNamePlural")
                  slot(name="totalsName-singular")
                template(v-if="!hasSlot(slots['totalsName-plural']) && isTotalsNamePlural")
                  | {{ i18n.translate('Polaris.DataTable.totalsRowHeading') }}
                template(v-if="!hasSlot(slots['totalsName-singular']) && !isTotalsNamePlural")
                  | {{ i18n.translate('Polaris.DataTable.totalRowHeading') }}
              template(v-else-if="total !== '' && index > 0") {{ total }}

      table(:class="styles.Table", ref="table")
        thead
          tr
            TableHeading(
              v-for="heading, index in headings",
              :key="`heading-cell-${index}`",
              :headingIndex="index",
              :inFixedNthColumn="false",
              :inStickyHeader="false",
              :setRef="(ref) => { setCellRef({ cellRef: ref, index, inStickyHeader: false }) }",
              v-bind="tableHeadingProps",
              @focus="handleFocus",
              @sort="defaultOnSort(index)",
            )
              template(v-if="hasSlot(slots[`heading-${index}`])")
                slot(:name="`heading-${index}`")
              template(v-else) {{ heading }}

          tr(v-if="!showTotalsInFooter")
            Cell(
              v-for="total, index in totals",
              :key="`totals-cell-${index}`",
              total,
              :totalInFooter="showTotalsInFooter",
              :firstColumn="index === 0",
              :contentType="total !== '' && index > 0 ? columnContentTypes[index] : undefined",
              :truncate="truncate",
              :verticalAlign="verticalAlign",
            )
              template(v-if="index === 0")
                template(v-if="hasSlot(slots['totalsName-plural']) && isTotalsNamePlural")
                  slot(name="totalsName-plural")
                template(v-else-if="hasSlot(slots['totalsName-singular']) && !isTotalsNamePlural")
                  slot(name="totalsName-singular")
                template(v-if="!hasSlot(slots['totalsName-plural']) && isTotalsNamePlural")
                  | {{ i18n.translate('Polaris.DataTable.totalsRowHeading') }}
                template(v-if="!hasSlot(slots['totalsName-singular']) && !isTotalsNamePlural")
                  | {{ i18n.translate('Polaris.DataTable.totalRowHeading') }}
              template(v-else-if="total !== '' && index > 0") {{ total }}

        tbody
          tr(
            v-for="row, index in rows",
            :key="`row-${index}`",
            :class="tableRowClassName",
            @mouseenter="handleHover(index)",
            @mouseleave="handleHover()",
          )
            Cell(
              v-for="content, cellIndex in row",
              :key="`cell-${cellIndex}-row-${index}`",
              v-memo="[ condensed, showTotalsInFooter, columnVisibilityData, columnContentTypes, hideScrollIndicator, hasFixedFirstColumn, truncate, verticalAlign]",
              :contentType="columnContentTypes[cellIndex]",
              :nthColumn="cellIndex <= fixedFirstColumns - 1",
              :firstColumn="cellIndex === 0",
              :truncate="truncate",
              :verticalAlign="verticalAlign",
              :colSpan="getColSpan(row.length, headings.length, columnContentTypes.length, cellIndex)",
              :hovered="index === rowHovered",
              :inFixedNthColumn="condensed && false",
            )
              template(v-if="hasSlot(slots[`cell-${cellIndex}-row-${index}`])")
                slot(:name="`cell-${cellIndex}-row-${index}`")
              template(v-else) {{ content }}

        tfoot(v-if="showTotalsInFooter")
          tr(v-if="totals")
            Cell(
              v-for="total, index in totals",
              :key="`totals-cell-${index}`",
              total,
              :totalInFooter="showTotalsInFooter",
              :firstColumn="index === 0",
              :contentType="total !== '' && index > 0 ? columnContentTypes[index] : undefined",
              :truncate="truncate",
              :verticalAlign="verticalAlign",
            )
              template(v-if="index === 0")
                template(v-if="hasCustomTotalsNamePlural && isTotalsNamePlural")
                  slot(v-if="hasSlot(slots['totalsName-plural'])", name="totalsName-plural")
                  template(v-else) {{ totalsName?.plural }}
                template(v-else-if="hasCustomTotalsNameSingular && !isTotalsNamePlural")
                  slot(v-if="hasSlot(slots['totalsName-singular'])", name="totalsName-singular")
                  template(v-else) {{ totalsName?.singular }}
                template(v-if="!hasCustomTotalsNamePlural && isTotalsNamePlural")
                  | {{ i18n.translate('Polaris.DataTable.totalsRowHeading') }}
                template(v-if="!hasCustomTotalsNameSingular && !isTotalsNamePlural")
                  | {{ i18n.translate('Polaris.DataTable.totalRowHeading') }}
              template(v-else-if="total !== '' && index > 0") {{ total }}

    div(v-if="hasSlot(slots.footerContent) || footerContent", :class="styles.Footer")
      template(v-if="!hasSlot(slots.footerContent)") {{ footerContent }}
      slot(v-else, name="footerContent")
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, useSlots, watch, toRaw } from 'vue';
import { debounce } from 'polaris/polaris-react/src/utilities/debounce';
import { classNames } from '@/utilities/css';
import { headerCell } from 'polaris/polaris-react/src/components/shared';
import {
  EventListener,
  Sticky,
} from '@/components';
import { UseI18n } from '@/use';
import { hasSlot } from '@/utilities/has-slot';
import styles from '@/classes/DataTable.json';
import { Cell, TableNavigation } from './components';
import { TableHeading } from './children';
import { measureColumn, getPrevAndCurrentColumns } from './utils';
import type { TableMeasurements } from './utils';
import type { TableData, ColumnContentType, DataTableState, SortDirection, VerticalAlign } from './types';

interface DataTableProps {
  /** List of data types, which determines content alignment for each column. Data types are "text," which aligns left, or "numeric," which aligns right. */
  columnContentTypes: ColumnContentType[];
  /** List of column headings. */
  headings: string[];
  /** List of numeric column totals, highlighted in the table’s header below column headings. Use empty strings as placeholders for columns with no total. */
  totals?: TableData[];
  /** Custom totals row heading */
  totalsName?: {
    singular: string;
    plural: string;
  };
  /** Placement of totals row within table */
  showTotalsInFooter?: boolean;
  /** Lists of data points which map to table body rows. */
  rows: TableData[][];
  /** Hide column visibility and navigation buttons above the header when the table horizontally collapses to be scrollable.
   * @default false
   */
  hideScrollIndicator?: boolean;
  /** Truncate content in first column instead of wrapping.
   * @default true
   */
  truncate?: boolean;
  /** Vertical alignment of content in the cells.
   * @default 'top'
   */
  verticalAlign?: VerticalAlign;
  /** Content centered in the full width cell of the table footer row. */
  footerContent?: TableData;
  /** Table row has hover state. Defaults to true. */
  hoverable?: boolean;
  /** List of booleans, which maps to whether sorting is enabled or not for each column. Defaults to false for all columns.  */
  sortable?: boolean[];
  /**
   * The direction to sort the table rows on first click or keypress of a sortable column heading. Defaults to ascending.
   * @default 'ascending'
   */
  defaultSortDirection?: SortDirection;
  /**
   * The index of the heading that the table rows are initially sorted by. Defaults to the first column.
   * @default 0
   */
  initialSortColumnIndex?: number;
  /** Increased density */
  increasedTableDensity?: boolean;
  /** Add zebra striping to data rows */
  hasZebraStripingOnData?: boolean;
  /** Header becomes sticky and pins to top of table when scrolling  */
  stickyHeader?: boolean;
  /** @deprecated Add a fixed first column on horizontal scroll. Use fixedFirstColumns={n} instead. */
  hasFixedFirstColumn?: boolean;
  /** Add fixed columns on horizontal scroll. */
  fixedFirstColumns?: number;
  /** Specify a min width for the first column if neccessary */
  firstColumnMinWidth?: string;
}

const props = withDefaults(defineProps<DataTableProps>(), {
  hideScrollIndicator: false,
  truncate: true,
  verticalAlign: 'top',
  defaultSortDirection: 'ascending',
  initialSortColumnIndex: 0,
  hoverable: true,
});

const i18n = UseI18n();
const slots = useSlots();

const emits = defineEmits<{
  (e: 'sort', headingIndex: number, direction: SortDirection): void;
}>();

const isMounted = ref(false);
const dataTable = ref<HTMLDivElement | null>(null);
const scrollContainer = ref<HTMLDivElement | null>(null);
const table = ref<HTMLTableElement | null>(null);
const stickyTable = ref<HTMLTableElement | null>(null);
const stickyNav = ref<InstanceType<typeof TableNavigation> | null>(null);
const headerNav = ref<InstanceType<typeof TableNavigation> | null>(null);
const tableHeadings = ref<HTMLTableCellElement[]>([]);
const stickyHeadings = ref<HTMLDivElement[]>([]);
const tableHeadingWidths = ref<number[]>([]);
const stickyHeaderActive = ref(false);
const scrollStopTimer = ref<ReturnType<typeof setTimeout> | null>(null);

// DataTableState
const condensed = ref(false);
const columnVisibilityData = ref<DataTableState['columnVisibilityData']>([]);
const previousColumn = ref<DataTableState['previousColumn']>(undefined);
const currentColumn = ref<DataTableState['currentColumn']>(undefined);
const sortedColumnIndex = ref<DataTableState['sortedColumnIndex']>(undefined);
const sortDirection = ref<DataTableState['sortDirection']>(undefined);
const isScrolledFarthestLeft = ref(true);
const isScrolledFarthestRight = ref(false);
const rowHovered = ref<number | undefined>(undefined);

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
  props.hasZebraStripingOnData && rowCountIsEven && styles.RowCountIsEven,
));

const wrapperClassName = computed(() => classNames(
  // styles.TableWrapper,
  condensed.value && styles.condensed,
  props.increasedTableDensity && styles.IncreasedTableDensity,
  props.stickyHeader && styles.StickyHeaderEnabled,
));

const fixedFirstColumnClassName = computed(() => classNames(
  styles.FixedFirstColumn,
  !isScrolledFarthestLeft.value && styles['Cell-separate'],
));

const nthColumns = computed(() => props.rows.map((row) => row.slice(0, fixedFirstColumns.value)));
const nthHeadings = computed(() => props.headings.slice(0, fixedFirstColumns.value));
const nthTotals = computed(() => props.totals?.slice(0, fixedFirstColumns.value));
const tableHeaderRows = computed(() => table.value?.children[0].childNodes);
const tableBodyRows = computed(() => table.value?.children[1].childNodes);
const headerRowHeights = computed(() => getRowClientHeights(tableHeaderRows.value));
const bodyRowHeights = computed(() => getRowClientHeights(tableBodyRows.value));

const tableRowClassName = computed(() => {
  return classNames(
    styles.TableRow,
    props.hoverable && styles.hoverable,
  );
});

const tableHeadingProps = computed(() => {
  return {
    sortable: props.sortable,
    truncate: props.truncate,
    fixedFirstColumns: fixedFirstColumns.value,
    columnContentTypes: props.columnContentTypes,
    verticalAlign: props.verticalAlign,
    firstColumnMinWidth: props.firstColumnMinWidth,
    sortDirection: sortDirection.value || props.defaultSortDirection,
    defaultSortDirection: props.defaultSortDirection,
    sortedColumnIndex: sortedColumnIndex.value || props.initialSortColumnIndex,
    isScrolledFarthestLeft: isScrolledFarthestLeft.value,
    hasFixedFirstColumn: props.hasFixedFirstColumn,
    columnVisibilityData: columnVisibilityData.value,
  };
});

onMounted(() => {
  isMounted.value = true;
  setTimeout(handleResize, 10);
});

onBeforeUnmount(() => {
  handleResize.cancel();
});

const getRowClientHeights = (rows: NodeList | undefined) => {
  const heights: number[] = [];
  if (!rows) {
    return heights;
  }
  rows.forEach((row) => {
    heights.push((row as HTMLTableRowElement).clientHeight);
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
  if (cellRef == null) {
    return;
  }

  if (inStickyHeader) {
    stickyHeadings.value[index] = cellRef;
    const button = cellRef.querySelector('button');
    if (button == null) {
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

  const arrowsInStickyNav = stickyNav.value?.el?.querySelectorAll('button');
  const arrowsInHeaderNav = headerNav.value?.el?.querySelectorAll('button');

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
    button = tableHeadings[stickyFocusedItemIndex].querySelector('button');
  } else if (tableFocusedItemIndex >= 0) {
    button = stickyHeadings[tableFocusedItemIndex].querySelector('button');
  }

  if (stickyFocusedNavIndex >= 0) {
    button = arrowsInHeaderNav?.[stickyFocusedNavIndex];
  } else if (headerFocusedNavIndex >= 0) {
    button = arrowsInStickyNav?.[headerFocusedNavIndex];
  }

  if (button == null) {
    return null;
  }

  button.style.visibility = 'visible';
  button.focus();
  button.style.removeProperty('visibility');
};

const calculateColumnVisibilityData = (tmpCondensed: boolean) => {
  if ((props.stickyHeader || tmpCondensed) && table.value && scrollContainer.value && dataTable.value) {
    const headerCells = table.value.querySelectorAll<HTMLTableCellElement>(headerCell.selector);

    const rightMostHeader = headerCells[fixedFirstColumns.value - 1];

    const nthColumnWidth = fixedFirstColumns.value
      ? rightMostHeader.offsetLeft + rightMostHeader.offsetWidth
      : 0;

    if (headerCells.length > 0) {
      const firstVisibleColumnIndex = headerCells.length - 1;
      const tableLeftVisibleEdge = scrollContainer.value.scrollLeft + nthColumnWidth;
      const tableRightVisibleEdge = scrollContainer.value.scrollLeft + dataTable.value.offsetWidth;

      const tableData: TableMeasurements = {
        firstVisibleColumnIndex,
        tableLeftVisibleEdge,
        tableRightVisibleEdge,
      };

      const tmpColumnVisibilityData = [...headerCells].map(
        measureColumn(tableData),
      );

      const lastColumn = tmpColumnVisibilityData[tmpColumnVisibilityData.length - 1];

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
    scrollContainer.value.scrollLeft =
      currentColumnLeftEdge - nthColumnWidth;
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

const handleHover = (row?: number) => {
  rowHovered.value = row;
};

const handleFocus = (event) => {
  if (!scrollContainer.value || event.target == null) {
    return;
  }

  const currentCell = event.target.parentNode as HTMLTableCellElement;
  const hasFixedFirstColumn = columnVisibilityData.value.length > 0;
  const nthColumnWidth = hasFixedFirstColumn
    ? columnVisibilityData.value[fixedFirstColumns.value]?.rightEdge
    : 0;
  const currentColumnLeftEdge = currentCell.offsetLeft;
  const desiredScrollLeft = currentColumnLeftEdge - nthColumnWidth;

  if (scrollContainer.value.scrollLeft > desiredScrollLeft) {
    scrollContainer.value.scrollLeft = desiredScrollLeft;
  }
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

  return handleScroll();
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
  sortDirection.value = sortDirection.value ?? toRaw(props.defaultSortDirection);
  sortedColumnIndex.value = sortedColumnIndex.value ?? toRaw(props.initialSortColumnIndex);

  let newSortDirection = toRaw(props.defaultSortDirection);

  if (sortedColumnIndex.value === headingIndex) {
    newSortDirection =
      sortDirection.value === 'ascending' ? 'descending' : 'ascending';
  }

  const handleSort = () => {
    sortDirection.value = newSortDirection;
    sortedColumnIndex.value = headingIndex;
    emits('sort', headingIndex, newSortDirection);
  };

  return handleSort();
};

const isTotalsNamePlural = computed(() => {
  return props.totals && props.totals.filter((total) => total !== '').length > 1
});

const hasCustomTotalsNamePlural = computed(() => {
  return hasSlot(slots['totalsName-plural']) || props.totalsName?.plural;
});

const hasCustomTotalsNameSingular = computed(() => {
  return hasSlot(slots['totalsName-singular']) || props.totalsName?.singular;
});

const stickyHandler = (isSticky: boolean) => {
  setTimeout(changeHeadingFocus, 10);
  stickyHeaderActive.value = isSticky;
}

const stickyHeaderInnerClassNames = computed(() => classNames(
  styles.StickyHeaderInner,
  stickyHeaderActive.value && styles['StickyHeaderInner-isSticky'],
));

const stickyHeaderTableClassNames = computed(() => classNames(
  styles.StickyHeaderTable,
  !isScrolledFarthestLeft.value && styles['Cell-separate'],
));
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/DataTable/DataTable.scss';
</style>
