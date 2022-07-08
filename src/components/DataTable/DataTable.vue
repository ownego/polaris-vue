<template lang="pug">
div(:class="wrapperClassName")
  TableNavigation(
    v-if="!hideScrollIndicator",
    :columnVisibilityData="state.columnVisibilityData",
    :isScrolledFarthestLeft="state.isScrolledFarthestLeft",
    :isScrolledFarthestRight="state.isScrolledFarthestRight",
    :navigateTableLeft="navigateTable('left')",
    :navigateTableRight="navigateTable('right')",
    :fixedFirstColumn="hasFixedFirstColumn",
  )
  div(:class="className", ref="dataTable")
    div(
      v-if="stickyHeader",
      :class="styles.StickyTable",
      role="presentation"
    )
      Sticky(
        :boundingElement="dataTable",
        @sticky-change="stickyHandler",
      )
        table(:class="stickyHeaderClassNames")
          div
            TableNavigation(
              v-if="!hideScrollIndicator",
              :columnVisibilityData="state.columnVisibilityData",
              :isScrolledFarthestLeft="state.isScrolledFarthestLeft",
              :isScrolledFarthestRight="state.isScrolledFarthestRight",
              :navigateTableLeft="navigateTable('left')",
              :navigateTableRight="navigateTable('right')",
              :fixedFirstColumn="hasFixedFirstColumn",
            )
          tr(
            :class="styles.StickyTableHeadingsRow",
            ref="stickyTableHeadingsRow",
          )
            table(
              v-if="hasFixedFirstColumn",
              :class="classNames(!state.isScrolledFarthestLeft && styles.separate, styles.FixedFirstColumn)",
            )
              thead
                tr
                  TableHeading(
                    :headingIndex="0",
                    :inFixedFirstColumn="true",
                    :inStickyHeader="true",
                    :stickyCellWidth="tableHeadingWidths[0]",
                    :setRef="(ref) => { setCellRef({ cellRef: ref, index: 0, inStickyHeader: false, inFixedFirstColumn: true }) }",
                    v-bind="tableHeadingProps",
                    @focus="handleFocus",
                    @sort="defaultOnSort(0)",
                  )
                    template(v-if="hasSlot(slots['heading-0'])")
                      slot(name="heading-0")
                    template(v-else) okokok {{ headings[0] }}

            TableHeading(
              v-for="heading, index in headings",
              :key="`stickyheader-${index}`",
              :headingIndex="index",
              :inFixedFirstColumn="false",
              :inStickyHeader="true",
              :stickyCellWidth="tableHeadingWidths[index]",
              :setRef="(ref) => { setCellRef({ cellRef: ref, index, inStickyHeader: false, inFixedFirstColumn: true }) }",
              v-bind="tableHeadingProps",
              @focus="handleFocus",
              @sort="defaultOnSort(index)",
            )
              template(v-if="hasSlot(slots[`heading-${index}`])")
                slot(:name="`heading-${index}`")
              template(v-else) {{ heading }}

    div(:class="styles.ScrollContainer", ref="scrollContainer")
      EventListener(event="resize", :handler="handleResize")
      EventListener(
        capture,
        passive,
        event="scroll",
        :handler="scrollListener",
      )
      table(
        v-if="state.condensed && hasFixedFirstColumn",
        :class="fixedFirstColumnClassName",
        :style="{ maxWidth: `${state.columnVisibilityData[0].rightEdge}px` }",
      )
        thead
          tr
            TableHeading(
              v-for="heading, index in firstHeading",
              :key="`stickyheader-${index}`",
              :headingIndex="index",
              :inFixedFirstColumn="true",
              :inStickyHeader="false",
              :stickyCellWidth="tableHeadingWidths[index]",
              :setRef="(ref) => { setCellRef({ cellRef: ref, index, inStickyHeader: false, inFixedFirstColumn: true }) }",
              v-bind="tableHeadingProps",
              @focus="handleFocus",
              @sort="defaultOnSort(index)",
            )
              template(v-if="hasSlot(slots[`heading-${index}`])")
                slot(:name="`heading-${index}`")
              template(v-else) {{ heading }}

          tr(v-if="totals && !showTotalsInFooter")
            Cell(
              v-for="total, index in firstTotal",
              :key="`totals-cell-${index}`",
              total,
              :totalInFooter="showTotalsInFooter",
              :firstColumn="index === 0",
              :contentType="total !== '' && index > 0 ? 'numeric' : undefined",
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
            v-for="row, index in firstColumn",
            :key="`row-${index}`",
            :class="tableRowClassName",
            @mouseenter="handleHover(index)",
            @mouseleave="handleHover()",
          )
            Cell(
              v-for="content, cellIndex in row",
              :key="`cell-${cellIndex}-row-${index}`",
              content={content}
              :contentType="columnContentTypes[cellIndex]",
              :firstColumn="cellIndex === 0",
              :truncate="truncate",
              :verticalAlign="verticalAlign",
              :colSpan="getColSpan(row.length, headings.length, columnContentTypes.length, cellIndex)",
              :hovered="index === state.rowHovered",
              :inFixedFirstColumn="true",
            )
              template(v-if="hasSlot(slots[`cell-${cellIndex}-row-${index}`])")
                slot(:name="`cell-${cellIndex}-row-${index}`")
              template(v-else) {{ content }}

        tfoot(v-if="totals && showTotalsInFooter")
          tr
            Cell(
              v-for="total, index in firstTotal",
              :key="`totals-cell-${index}`",
              total,
              :totalInFooter="showTotalsInFooter",
              :firstColumn="index === 0",
              :contentType="total !== '' && index > 0 ? 'numeric' : undefined",
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
              :key="`stickyheader-${index}`",
              :headingIndex="index",
              :inFixedFirstColumn="false",
              :inStickyHeader="false",
              :stickyCellWidth="tableHeadingWidths[index]",
              :setRef="(ref) => { setCellRef({ cellRef: ref, index, inStickyHeader: false, inFixedFirstColumn: true }) }",
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
              :contentType="total !== '' && index > 0 ? 'numeric' : undefined",
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
              :contentType="columnContentTypes[cellIndex]",
              :firstColumn="cellIndex === 0",
              :truncate="truncate",
              :verticalAlign="verticalAlign",
              :colSpan="getColSpan(row.length, headings.length, columnContentTypes.length, cellIndex)",
              :hovered="index === state.rowHovered",
              :inFixedFirstColumn="false",
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
              :contentType="total !== '' && index > 0 ? 'numeric' : undefined",
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
import { ref, computed, reactive, onMounted, watch, onBeforeUnmount, useSlots } from 'vue';
import { debounce } from 'polaris/polaris-react/src/utilities/debounce';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
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
  /** Add a fixed first column on horizontal scroll. */
  hasFixedFirstColumn?: boolean;
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

const state = reactive<DataTableState>({
  condensed: false,
  columnVisibilityData: [],
  isScrolledFarthestLeft: true,
  isScrolledFarthestRight: false,
  rowHovered: undefined,
});

const isMounted = ref(false);
const dataTable = ref<HTMLDivElement | null>(null);
const scrollContainer = ref<HTMLDivElement | null>(null);
const table = ref<HTMLTableElement | null>(null);
const stickyTableHeadingsRow = ref<HTMLTableRowElement | null>(null);
const tableHeadings = ref<HTMLTableCellElement[]>([]);
const stickyHeadings = ref<HTMLDivElement[]>([]);
const tableHeadingWidths = ref<number[]>([]);
const stickyHeaderActive = ref(false);
const scrollStopTimer = ref<ReturnType<typeof setTimeout> | null>(null);

const handleResize = debounce(() => {
  let condensed = false;

  if (table.value && scrollContainer.value) {
    condensed = table.value.scrollWidth > scrollContainer.value.clientWidth;
  }

  setState(calculateColumnVisibilityData(condensed));
  state.condensed = condensed;
});

const setState = (newState: Partial<DataTableState>) => {
  Object.keys(newState).forEach((key) => {
    state[key] = newState[key];
  });
};

const rowCountIsEven = computed(() => props.rows.length % 2 === 0);

const className = computed(() => classNames(
  styles.DataTable,
  state.condensed && styles.condensed,
  props.totals && styles.ShowTotals,
  props.showTotalsInFooter && styles.ShowTotalsInFooter,
  props.hasZebraStripingOnData && styles.ZebraStripingOnData,
  props.hasZebraStripingOnData && rowCountIsEven && styles.RowCountIsEven,
));

const wrapperClassName = computed(() => classNames(
  // styles.TableWrapper,
  state.condensed && styles.condensed,
  props.increasedTableDensity && styles.IncreasedTableDensity,
  props.stickyHeader && styles.StickyHeaderEnabled,
));

const fixedFirstColumnClassName = computed(() => classNames(
  styles.FixedFirstColumn,
  !state.isScrolledFarthestLeft && styles.separate,
));

const firstColumn = computed(() => props.rows.map((row) => row.slice(0, 1)));
const firstHeading = computed(() => props.headings.slice(0, 1));
const firstTotal = computed(() => props.totals?.slice(0, 1));

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
    columnContentTypes: props.columnContentTypes,
    verticalAlign: props.verticalAlign,
    firstColumnMinWidth: props.firstColumnMinWidth,
    sortDirection: state.sortDirection || props.defaultSortDirection,
    defaultSortDirection: props.defaultSortDirection,
    sortedColumnIndex: state.sortedColumnIndex || props.initialSortColumnIndex,
    isScrolledFarthestLeft: state.isScrolledFarthestLeft,
    hasFixedFirstColumn: props.hasFixedFirstColumn,
  };
});

onMounted(() => {
  isMounted.value = true;
  handleResize();
});

watch(
  () => props,
  () => {
    handleResize();
  },
);

onBeforeUnmount(() => {
  handleResize.cancel();
});

const setCellRef = ({
  cellRef,
  index,
  inStickyHeader,
  inFixedFirstColumn,
}: {
  cellRef: HTMLTableCellElement | null;
  index: number;
  inStickyHeader: boolean;
  inFixedFirstColumn: boolean;
}) => {
  if (
    cellRef == null ||
    (props.hasFixedFirstColumn && !inFixedFirstColumn && index === 0)
  ) {
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
    tableHeadingWidths.value[index] = cellRef.getBoundingClientRect().width;
  }
};

const changeHeadingFocus = () => {
  const stickyFocusedItemIndex = stickyHeadings.value.findIndex(
    (item) => item === document.activeElement?.parentElement,
  );

  const tableFocusedItemIndex = tableHeadings.value.findIndex(
    (item) => item === document.activeElement?.parentElement,
  );

  if (stickyFocusedItemIndex < 0 && tableFocusedItemIndex < 0) {
    return null;
  }

  let button: HTMLButtonElement | null = null;

  if (stickyFocusedItemIndex >= 0) {
    button = tableHeadings.value[stickyFocusedItemIndex].querySelector('button') as HTMLButtonElement;
  } else if (tableFocusedItemIndex >= 0) {
    button = stickyHeadings.value[tableFocusedItemIndex].querySelector('button') as HTMLButtonElement;
  }

  if (button === null) {
    return null;
  }

  button.style.visibility = 'visible';
  button.focus();
  button.style.removeProperty('visibility');
};

const calculateColumnVisibilityData = (condensed: boolean) => {
  if (condensed && table.value && scrollContainer.value && dataTable.value) {
    const headerCells = table.value.querySelectorAll(headerCell.selector);

    const firstColumnWidth = props.hasFixedFirstColumn
      ? headerCells[0].clientWidth
      : 0;

    if (headerCells.length > 0) {
      const firstVisibleColumnIndex = headerCells.length - 1;
      const tableLeftVisibleEdge = scrollContainer.value.scrollLeft + firstColumnWidth;
      const tableRightVisibleEdge = scrollContainer.value.scrollLeft + dataTable.value.offsetWidth;

      const tableData: TableMeasurements = {
        firstVisibleColumnIndex,
        tableLeftVisibleEdge,
        tableRightVisibleEdge,
      };

      const columnVisibilityData = [...headerCells].map(
        measureColumn(tableData),
      );

      const lastColumn = columnVisibilityData[columnVisibilityData.length - 1];

      const isScrolledFarthestLeft = props.hasFixedFirstColumn
        ? tableLeftVisibleEdge === firstColumnWidth
        : tableLeftVisibleEdge === 0;

      return {
        columnVisibilityData,
        ...getPrevAndCurrentColumns(tableData, columnVisibilityData),
        isScrolledFarthestLeft,
        isScrolledFarthestRight: lastColumn.rightEdge <= tableRightVisibleEdge,
      };
    }
  }

  return {
    columnVisibilityData: [],
    previousColumn: undefined,
    currentColumn: undefined,
  };
};

const handleHeaderButtonFocus = (event: Event) => {
  if (
    !scrollContainer.value ||
    event.target == null ||
    state.columnVisibilityData.length === 0
  ) {
    return;
  }

  const target = event.target as HTMLElement;
  const currentCell = target.parentNode as HTMLTableCellElement;

  const tableScrollLeft = scrollContainer.value.scrollLeft;
  const tableViewableWidth = scrollContainer.value.offsetWidth;
  const tableRightEdge = tableScrollLeft + tableViewableWidth;
  const firstColumnWidth =
    state.columnVisibilityData.length > 0
      ? state.columnVisibilityData[0].rightEdge
      : 0;
  const currentColumnLeftEdge = currentCell.offsetLeft;
  const currentColumnRightEdge = currentCell.offsetLeft + currentCell.offsetWidth;

  if (tableScrollLeft > currentColumnLeftEdge - firstColumnWidth) {
    scrollContainer.value.scrollLeft =
      currentColumnLeftEdge - firstColumnWidth;
  }

  if (currentColumnRightEdge > tableRightEdge) {
    scrollContainer.value.scrollLeft =
      currentColumnRightEdge - tableViewableWidth;
  }
};

const stickyHeaderScrolling = () => {
  if (!stickyTableHeadingsRow.value || !scrollContainer.value) {
    return;
  }

  stickyTableHeadingsRow.value.scrollLeft = scrollContainer.value.scrollLeft;
};

const scrollListener = () => {
  if (scrollStopTimer.value) {
    clearTimeout(scrollStopTimer.value);
  }

  scrollStopTimer.value = setTimeout(() => {
    setState(calculateColumnVisibilityData(state.condensed));
  }, 100);

  setState({
    isScrolledFarthestLeft: scrollContainer.value?.scrollLeft === 0,
  });

  if (props.stickyHeader && stickyHeaderActive.value) {
    stickyHeaderScrolling();
  }
};

const handleHover = (row?: number) => {
  state.rowHovered = row;
};

const handleFocus = (event) => {
  if (!scrollContainer.value || event.target == null) {
    return;
  }

  const currentCell = event.target.parentNode as HTMLTableCellElement;
  const hasFixedFirstColumn = state.columnVisibilityData.length > 0;
  const firstColumnWidth = hasFixedFirstColumn
    ? state.columnVisibilityData[0].rightEdge
    : 0;
  const currentColumnLeftEdge = currentCell.offsetLeft;
  const desiredScrollLeft = currentColumnLeftEdge - firstColumnWidth;

  if (scrollContainer.value.scrollLeft > desiredScrollLeft) {
    scrollContainer.value.scrollLeft = desiredScrollLeft;
  }
};

const navigateTable = (direction: string) => {
  const { currentColumn, previousColumn } = state;
  const firstColumnWidth = state.columnVisibilityData[0]?.rightEdge;
  if (!currentColumn || !previousColumn) {
    return;
  }

  let prevWidths = 0;
  for (let index = 0; index < currentColumn.index; index++) {
    prevWidths += state.columnVisibilityData[index].width;
  }

  const handleScroll = () => {
    let newScrollLeft = 0;
    if (props.hasFixedFirstColumn) {
      newScrollLeft =
        direction === 'right'
          ? prevWidths - firstColumnWidth + currentColumn.width
          : prevWidths - previousColumn.width - firstColumnWidth;
    } else {
      newScrollLeft =
        direction === 'right'
          ? currentColumn.rightEdge
          : previousColumn.leftEdge;
    }

    if (scrollContainer.value) {
      scrollContainer.value.scrollLeft = newScrollLeft;

      requestAnimationFrame(() => {
        setState(calculateColumnVisibilityData(state.condensed));
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
  const rowLen = rowLength ? rowLength : 1;
  const colLen = headingsLength ? headingsLength : contentTypesLength;
  const colSpan = Math.floor(colLen / rowLen);
  const remainder = colLen % rowLen;

  return cellIndex === 0 ? colSpan + remainder : colSpan;
};

const defaultOnSort = (headingIndex: number) => {
  const {
    sortDirection = props.defaultSortDirection,
    sortedColumnIndex = props.initialSortColumnIndex,
  } = state;

  let newSortDirection = props.defaultSortDirection;

  if (sortedColumnIndex === headingIndex) {
    newSortDirection =
      sortDirection === 'ascending' ? 'descending' : 'ascending';
  }

  const handleSort = () => {
    setState(
      {
        sortDirection: newSortDirection,
        sortedColumnIndex: headingIndex,
      },
    );
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
  changeHeadingFocus();
  stickyHeaderActive.value = isSticky;
}

const stickyHeaderClassNames = computed(() => classNames(
  styles.StickyTableHeader,
  stickyHeaderActive.value && styles['StickyTableHeader-isSticky'],
  !state.isScrolledFarthestLeft && styles.separate,
));
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/DataTable/DataTable.scss';
</style>
