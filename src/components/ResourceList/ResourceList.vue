<template lang="pug">
//-FilterControl
div(
  v-if="hasSlot(slots.filterControl)",
  :class="classNames(!flushFilters && styles.FiltersWrapper)",
)
  slot(name="filterControl")
div(
  ref="tableMeasurerRef",
  :class="resourceListWrapperClassName",
)
  //-HeaderMarkup
  div(
    v-if="showHeaderMarkup",
    :class="styles.HeaderOuterWrapper",
  )
    Sticky(
      :bounding-element="listRef",
      @sticky-change="handleStickyChange",
    )
      div(:class="headerClassName")
        //- Header wrapper overlay
        div(v-if="loading", :class="styles['HeaderWrapper-overlay']")
        //- Header content wrapper
        div(:class="styles.HeaderContentWrapper")
          div(:class="styles.HeaderTitleWrapper") {{ headerTitle }}
          div(v-if="isSelectable", :class="styles.CheckableButtonWrapper")
            CheckableButton(
              :accessibilityLabel="bulkActionsAccessibilityLabel",
              :label="headerTitle",
              :disabled="loading",
              :selected="selectAllSelectState",
              @toggle-all="handleToggleAll",
              ref="checkableButtonRef",
            )
          div(
            v-if="hasSlot(slots.alternateTool) && !showSortingSelect",
            :class="styles.AlternateToolWrapper",
          )
            slot(name="alternateTool")
          div(v-if="showSortingSelect && sortOptions", :className="styles.SortWrapper")
            Select(
              :value="sortValueSelect",
              :labelInline="!smallScreen",
              :labelHidden="smallScreen",
              :options="sortOptions",
              :disabled="selectMode",
              @change="onSortChange",
            )
              template(#label) {{ i18n.translate('Polaris.ResourceList.sortingLabel') }}

          div(v-if="isSelectable", :class="styles.SelectButtonWrapper")
            Button(
              :disabled="selectMode",
              :icon="CheckboxIcon",
              @click="() => handleSelectMode(true)",
            ) {{ i18n.translate('Polaris.ResourceList.selectButtonText') }}
        //- BulkAction
        div(
          v-if="showBulkActions",
          :class="bulkActionsClassName",
        )
          BulkActions(
            ref="CheckableButtonRef",
            button-size="medium",
            :accessibility-label="bulkActionsAccessibilityLabel",
            :selected="selectAllSelectState",
            :promotedActions="promotedBulkActions",
            :actions="bulkActions",
            :disabled="loading",
            :select-mode="selectMode",
            @toggle-all="handleToggleAll",
            @select-mode-toggle="handleSelectMode",
          )
    //- SelectAllActions
    div(
      v-if="isSelectable",
      :class="selectAllActionsClassNames",
      :style="selectAllActionsStyles",
    )
      SelectAllActions(
        ref="checkableButtonRef"
        :label="selectAllActionsLabel",
        :selected="selectAllSelectState",
        :accessibilityLabel="bulkActionsAccessibilityLabel",
        :selectMode="selectMode",
        :paginatedSelectAllAction="paginatedSelectAllAction",
        :paginatedSelectAllText="paginatedSelectAllText",
        :disabled="loading",
        @toggle-all="handleToggleAll",
      )
  //-List
  ul(
    v-if="itemsExist",
    :class="resourceListClassName",
    :aria-busy="loading",
    ref="listRef",
    aria-live="polite",
  )
    template(v-if="loading")
      li(
        :class="styles.SpinnerContainer",
        :style="spinnerStyle",
      )
        Spinner(
          :size="spinnerSize",
          accessibilityLabel="Items are loading",
        )
      li(:class="styles.LoadingOverlay")
    slot
  //- Empty Search
  template(v-if="showEmptySearchState && hasSlot(slots.emptySearchState)")
    slot(name="emptySearchState")
  template(v-else-if="showEmptySearchState")
    div(:class="styles.EmptySearchResultWrapper")
      EmptySearchResult(v-bind="emptySearchResultText", with-illustration)
  //- Empty State
  template(v-if="showEmptyState")
    slot(name="emptyState")
  //- Loading
  div(v-if="loading && !itemsExist", :class="className", tabindex="-1")
    template(v-if="loading")
      li(:class="styles.SpinnerContainer", :style="spinnerStyle")
        Spinner(:size="spinnerSize", accessibilityLabel="Items are loading")
      li(:class="styles.LoadingOverlay")
  //- Pagination
  div(
    v-if="pagination",
    :class="paginationWrapperClassNames",
    :style="paginationStyles",
  )
    Pagination(type="table", v-bind="pagination")
div(ref="selectAllActionsIntersectionRef")
</template>

<script setup lang="ts">
import { type VNode , type VNodeArrayChildren, ref, computed, onMounted, watch, provide, type CSSProperties } from 'vue';
import { themeDefault, toPx } from '@shopify/polaris-tokens';
import { debounce } from '@polaris/utilities/debounce';
import { useEventListener } from '@/utilities/use-event-listener';
import { classNames } from '@/utilities/css';
import useI18n from '@/use/useI18n';
import { useExtractFragment } from '@/use/useExtractFragment';
import { useHasSlot } from '@/use/useHasSlot';
import type { CheckableButtons, CheckboxHandles, VueNode, ResourceListContextType } from '@/utilities/types';
import {
  Button,
  Sticky,
  Spinner,
  Select,
  EmptySearchResult,
  BulkActions,
  CheckableButton,
  Pagination,
  SelectAllActions,
} from '@/components';
import type { PaginationProps } from '@/components/Pagination/types';
import type { BulkActionsProps } from '@/components/BulkActions/utils';
import type { SelectOption } from '@/components/Select/types';
import { useIsSelectAllActionsSticky } from '@/use/useIsSelectAllActionsSticky';
import styles from '@polaris/components/ResourceList/ResourceList.module.scss';
import CheckboxIcon from '@icons/CheckboxIcon.svg';

const SMALL_SPINNER_HEIGHT = 28;
const LARGE_SPINNER_HEIGHT = 45;

type ResourceListSelectedItems = string[] | 'All';

const SELECT_ALL_ITEMS = 'All';

interface ResourceListItemData {
  [data: string]: any;
}

function getAllItemsOnPage<TItemType extends ResourceListItemData>(
  items: TItemType[],
  idForItem: (item: TItemType, index: number) => string,
) {
  return items.map((item: TItemType, index: number) => {
    return idForItem(item, index);
  });
}

const isBreakpointsXS = () => {
  return typeof window === 'undefined'
    ? false
    : window.innerWidth <
        parseFloat(toPx(themeDefault.breakpoints['breakpoints-sm']) ?? '');
};

function defaultIdForItem<TItemType extends ResourceListItemData>(
  item: TItemType,
  index: number,
): string {
  if (item.props.id) {
    return item.props.id;
  }

  return Object.prototype.hasOwnProperty.call(item, 'id')
    ? item.id
    : index.toString();
}

export type ResourceListPaginationProps = Omit<PaginationProps, 'type'>;
type TItemType = any;
export interface ResourceListProps<
  TItemType extends ResourceListItemData = ResourceListItemData,
> {
  /** Item data; each item is passed to renderItem */
  items: TItemType[];
  /** Whether to remove all padding around the filter controls. Should be true if using Filters, and false if using LegacyFilters.  */
  flushFilters?: boolean;
  /** Name of the resource, such as customers or products */
  resourceName?: {
    singular: string;
    plural: string;
  };
  /** Up to 2 bulk actions that will be given more prominence */
  promotedBulkActions?: BulkActionsProps['promotedActions'];
  /** Actions available on the currently selected items */
  bulkActions?: BulkActionsProps['actions'];
  /** Collection of IDs for the currently selected items */
  selectedItems?: ResourceListSelectedItems;
  /** Whether or not the list has filter(s) applied */
  isFiltered?: boolean;
  /** Renders a Select All button at the top of the list and checkboxes in front of each list item. For use when bulkActions aren't provided. **/
  selectable?: boolean;
  /** Whether or not there are more items than currently set on the items prop. Determines whether or not to set the paginatedSelectAllAction and paginatedSelectAllText props on the BulkActions component. */
  hasMoreItems?: boolean;
  /** Overlays item list with a spinner while a background action is being performed */
  loading?: boolean;
  /** Boolean to show or hide the header */
  showHeader?: boolean;
  /** Total number of resources */
  totalItemsCount?: number;
  /** Current value of the sort control */
  sortValue?: string;
  /** Collection of sort options to choose from */
  sortOptions?: SelectOption[];
  /** ReactNode to display instead of the sort control */
  alternateTool?: React.ReactNode;
  /** Custom header text displayed above the list instead of the resource count. */
  headerContent?: string;
  /** Function to customize the unique ID for each item */
  idForItem?(item: TItemType, index: number): string;
  /** Function to resolve the ids of items */
  resolveItemId?(item: TItemType): string;
  /** Properties to enable pagination at the bottom of the list. */
  pagination?: ResourceListPaginationProps;
}

export type ResourceListEmits = {
  /** Callback when sort option is changed */
  'selection-change': [selectedItems: ResourceListSelectedItems];
  /** Callback when selection is changed */
  'sort-change': [selected: string, id?: string];
};

export type ResourceListSlots = {
  filterControl?: (_?: VueNode) => VNode[];
  /** The markup to display when no resources exist yet. Renders when set and items is empty. */
  emptyState?: (_?: VueNode) => VNode[];
  /** The markup to display when no results are returned on search or filter of the list. Renders when `filterControl` is set, items are empty, and `emptyState` is not set.
   * @default EmptySearchResult
   */
  emptySearchState?: (_?: VueNode) => VNode[];
   /** Node to display instead of the sort control */
  alternateTool?: (_?: VueNode) => VNode[];
  default?: (_?: VueNode) => VNode[];
};

const props = withDefaults(defineProps<ResourceListProps>(), {
  selectedItems: [] as any,
  showHeader: true,
});
const emits = defineEmits<ResourceListEmits>();
const slots = defineSlots<ResourceListSlots>();

const i18n = useI18n();
const { extractElement } = useExtractFragment();
const { hasSlot } = useHasSlot();

const selectMode = ref<boolean>(Boolean(props.selectedItems && props.selectedItems.length > 0));
const loadingPosition = ref(0);
const lastSelected = ref<number | undefined>();
const smallScreen = ref(isBreakpointsXS());
const checkableButtons = ref<CheckableButtons>(new Map());
const isSticky = ref(false);
const {
  selectAllActionsIntersectionRef,
  tableMeasurerRef,
  isSelectAllActionsSticky,
  selectAllActionsAbsoluteOffset,
  selectAllActionsMaxWidth,
  selectAllActionsOffsetLeft,
  selectAllActionsOffsetBottom,
  computeTableDimensions,
  isScrolledPastTop,
  selectAllActionsPastTopOffset,
} = useIsSelectAllActionsSticky({
  selectMode: selectMode,
  hasPagination: Boolean(props.pagination),
  tableType: 'resource-list',
});

const defaultResourceName = {
  singular: i18n.translate('Polaris.ResourceList.defaultItemSingular'),
  plural: i18n.translate('Polaris.ResourceList.defaultItemPlural'),
};

const listRef = ref<HTMLUListElement | null>(null);

const items = computed(() => {
  let tmpItems: VNodeArrayChildren = [];
  if (slots.default) {
    const groups = slots.default().map(group => {
      return extractElement(group);
    });
    tmpItems = groups.flat();
  }

  return tmpItems;
});
const selectedItemsCount = ref(props.selectedItems === SELECT_ALL_ITEMS ? `${items.value.length}+` : props.selectedItems?.length);

const sortValueSelect = computed(() => {
  return props.sortValue || '';
});

const isSelectable = computed(() => {
  return Boolean(
    (props.promotedBulkActions && props.promotedBulkActions.length > 0) ||
    (props.bulkActions && props.bulkActions.length > 0) ||
    props.selectable,
  ) && !smallScreen.value;
});

const resourceName = computed(() => props.resourceName
  ? props.resourceName
  : defaultResourceName,
);

const className = computed(() => classNames(
  styles.ItemWrapper,
  props.loading && styles['ItemWrapper-isLoading'],
));

const resourceListClassName = computed(() => classNames(
  styles.ResourceList,
  // props.loading && styles.disabledPointerEvents,
  selectMode.value && styles.disableTextSelection,
));

const itemsExist = computed(() => items.value.length > 0);

const needsHeader = computed(() => {
  return isSelectable.value || (props.sortOptions && props.sortOptions.length > 0) || hasSlot(slots.alternateTool);
});

const showEmptyState = computed(() => hasSlot(slots.emptyState) && !itemsExist.value && !props.loading);

const showEmptySearchState = computed(() => !showEmptyState.value && hasSlot(slots.filterControl) && !itemsExist.value && !props.loading);

const showSortingSelect = computed(() => props.sortOptions && props.sortOptions.length > 0 && !hasSlot(slots.alternateTool));

const showBulkActions = computed(() => {
  return Boolean(isSelectable.value
    && (props.bulkActions || props.promotedBulkActions));
});

const showHeaderMarkup = computed(() => {
  return !showEmptyState.value
    && props.showHeader
    && !showEmptySearchState.value
    && (props.showHeader || needsHeader.value)
    && listRef.value;
});
const defaultTopPadding = 8;
const topPadding = computed(() => loadingPosition.value > 0 ? loadingPosition.value : defaultTopPadding);
const spinnerStyle = computed(() => ({ paddingTop: `${topPadding.value}px` }));
const spinnerSize = computed(() => items.value.length < 2 ? 'small' : 'large');

const resourceListWrapperClassName = computed(() => classNames(
  styles.ResourceListWrapper,
  Boolean(isSelectable.value) && selectMode.value
    && !props.pagination && styles.ResourceListWrapperWithBulkActions,
));

const headerClassName = computed(() => {
  return classNames(
    styles.HeaderWrapper,
    props.sortOptions &&
      props.sortOptions.length > 0 &&
      !hasSlot(slots.alternateTool) &&
      styles['HeaderWrapper-hasSort'],
    hasSlot(slots.alternateTool) && styles['HeaderWrapper-hasAlternateTool'],
    isSelectable.value && styles['HeaderWrapper-hasSelect'],
    props.loading && styles['HeaderWrapper-disabled'],
    isSelectable.value && selectMode.value && showBulkActions.value && styles['HeaderWrapper-inSelectMode'],
    isSticky.value && styles['HeaderWrapper-isSticky'],
  );
});

const bulkActionsClassName = computed(() => classNames(
  styles.BulkActionsWrapper,
  selectMode.value && styles.BulkActionsWrapperVisible,
));

const headerTitle = computed(() => {
  const itemsCount = items.value.length;
  const resource =
    !props.loading &&
    ((!props.totalItemsCount && itemsCount === 1) || props.totalItemsCount === 1)
      ? resourceName.value.singular
      : resourceName.value.plural;

  if (props.loading) {
    return i18n.translate('Polaris.ResourceList.loading', {resource});
  } else if (props.totalItemsCount) {
    return i18n.translate('Polaris.ResourceList.showingTotalCount', {
      itemsCount,
      totalItemsCount: props.totalItemsCount,
      resource,
    });
  } else {
    return i18n.translate('Polaris.ResourceList.showing', {
      itemsCount,
      resource,
    });
  }
});

const selectAllActionsLabel = computed(() => i18n.translate( 'Polaris.ResourceList.selected', {
  selectedItemsCount: `${selectedItemsCount.value}`,
}));

const bulkActionsAccessibilityLabel = computed(() => {
  const selectedItemsCount = props.selectedItems?.length;
  const totalItemsCount = items.value.length;
  const allSelected = selectedItemsCount === totalItemsCount;

  if (totalItemsCount === 1 && allSelected) {
    return i18n.translate(
      'Polaris.ResourceList.a11yCheckboxDeselectAllSingle',
      {
        resourceNameSingular: resourceName.value.singular,
      },
    );
  } else if (totalItemsCount === 1) {
    return i18n.translate(
      'Polaris.ResourceList.a11yCheckboxSelectAllSingle',
      {
        resourceNameSingular: resourceName.value.singular,
      },
    );
  } else if (allSelected) {
    return i18n.translate(
      'Polaris.ResourceList.a11yCheckboxDeselectAllMultiple',
      {
        itemsLength: items.value.length,
        resourceNamePlural: resourceName.value.plural,
      },
    );
  } else {
    return i18n.translate(
      'Polaris.ResourceList.a11yCheckboxSelectAllMultiple',
      {
        itemsLength: items.value.length,
        resourceNamePlural: resourceName.value.plural,
      },
    );
  }
});

const handleStickyChange = (value: boolean) => {
  isSticky.value = value;
};

const selectAllSelectState = computed<boolean | 'indeterminate'>(() => {
  const { selectedItems, items } = props;
  let selectState: boolean | 'indeterminate' = 'indeterminate';
  if (
    !selectedItems ||
    (Array.isArray(selectedItems) && selectedItems.length === 0)
  ) {
    selectState = false;
  } else if (
    selectedItems === SELECT_ALL_ITEMS ||
    (Array.isArray(selectedItems) && selectedItems.length === items.length)
  ) {
    selectState = true;
  }

  return selectState;
});

const selectAllActionsClassNames = computed(() => classNames(
  styles.SelectAllActionsWrapper,
  isSelectAllActionsSticky.value && styles.SelectAllActionsWrapperSticky,
  !isSelectAllActionsSticky.value &&
    !props.pagination &&
    styles.SelectAllActionsWrapperAtEnd,
  selectMode.value &&
    !isSelectAllActionsSticky.value &&
    !props.pagination &&
    styles.SelectAllActionsWrapperAtEndAppear,
));

const selectAllActionsStyles = computed<CSSProperties>(() => {
  return {
    top: isSelectAllActionsSticky.value
      ? undefined
      : `${selectAllActionsAbsoluteOffset.value}px`,
    width: `${selectAllActionsMaxWidth.value}px`,
    bottom: isSelectAllActionsSticky.value
      ? `${selectAllActionsOffsetBottom.value}px`
      : undefined,
    left: isSelectAllActionsSticky.value
      ? `${selectAllActionsOffsetLeft.value}px`
      : undefined,
  }
});

const paginationWrapperClassNames = computed(() => classNames(
  styles.PaginationWrapper,
  props.selectedItems &&
    props.selectedItems.length &&
    styles.PaginationWrapperWithSelectAllActions,
  isScrolledPastTop.value && styles.PaginationWrapperScrolledPastTop,
));

const paginationStyles = computed<CSSProperties>(() => {
  return {
    top: `${selectAllActionsPastTopOffset}px`,
  };
});

const paginatedSelectAllText = computed(() => {
  if (!isSelectable.value || !props.hasMoreItems) {
    return;
  }

  if (props.selectedItems === SELECT_ALL_ITEMS
  || (Array.isArray(props.selectedItems) && props.selectedItems.length === items.value.length)
  ) {
    return i18n.translate(
      props.isFiltered
        ? 'Polaris.ResourceList.allFilteredItemsSelected'
        : 'Polaris.ResourceList.allItemsSelected',
      {
        itemsLength: items.value.length,
        resourceNamePlural: resourceName.value.plural,
      },
    );
  }

  return '';
});

const paginatedSelectAllAction = computed(() => {
  if (!isSelectable.value || !props.hasMoreItems) {
    return;
  }

  const actionText =
    props.selectedItems === SELECT_ALL_ITEMS
    || (Array.isArray(props.selectedItems) && props.selectedItems.length === items.value.length)
      ? i18n.translate('Polaris.Common.undo')
      : i18n.translate(
        props.isFiltered
          ? 'Polaris.ResourceList.selectAllFilteredItems'
          : 'Polaris.ResourceList.selectAllItems',
        {
          itemsLength: items.value.length,
          resourceNamePlural: resourceName.value.plural,
        },
      );

  return {
    content: actionText,
    onAction: handleSelectAllItemsInStore,
  };
});

const generateItemId = (item: any, index: number) => {
  if (props.idForItem) {
    return props.idForItem(item, index);
  }
  return defaultIdForItem(item, index);
};

const emptySearchResultText = computed(() => ({
  title: i18n.translate('Polaris.ResourceList.emptySearchResultTitle', {
    resourceNamePlural: resourceName.value.plural,
  }),
  description: i18n.translate(
    'Polaris.ResourceList.emptySearchResultDescription',
  ),
}));

const handleSelectAllItemsInStore = () => {
  const newlySelectedItems =
    props.selectedItems === SELECT_ALL_ITEMS
    || (Array.isArray(props.selectedItems) && props.selectedItems.length === items.value.length)
      ? []
      : getAllItemsOnPage(items.value, generateItemId);

  emits('selection-change', newlySelectedItems);
};

const handleSelectMode = (tmpSelectMode: boolean) => {
  selectMode.value = tmpSelectMode;
  if (!tmpSelectMode) {
    emits('selection-change', []);
  }
};

const handleResize = debounce(
  () => {
    const newSmallScreen = isBreakpointsXS();

    if (
      props.selectedItems &&
      props.selectedItems.length === 0 &&
      selectMode &&
      !newSmallScreen
    ) {
      handleSelectMode(false);
    }

    if (smallScreen.value !== newSmallScreen) {
      smallScreen.value = newSmallScreen;
    }
  },
  50,
  {leading: true, trailing: true, maxWait: 50},
);

const setLoadingPosition = () => {
  if (listRef.value != null) {
    if (typeof window === 'undefined') {
      return;
    }

    const overlay = listRef.value.getBoundingClientRect();

    const viewportHeight = Math.max(
      document.documentElement ? document.documentElement.clientHeight : 0,
      window.innerHeight || 0,
    );

    const overflow = viewportHeight - overlay.height;

    const spinnerHeight =
      items.value.length === 1 ? SMALL_SPINNER_HEIGHT : LARGE_SPINNER_HEIGHT;

    const spinnerPosition =
      overflow > 0
        ? (overlay.height - spinnerHeight) / 2
        : (viewportHeight - overlay.top - spinnerHeight) / 2;

    loadingPosition.value = spinnerPosition;
  }
};

const handleMultiSelectionChange = (
  lastSelectedChange: number,
  currentSelected: number,
  resolveItemId: (item: TItemType) => string,
) => {
  const min = Math.min(lastSelectedChange, currentSelected);
  const max = Math.max(lastSelectedChange, currentSelected);
  return items.value.slice(min, max + 1).map(resolveItemId);
};

const handleSelectionChange = (
  selected: boolean,
  id: string,
  sortOrder: number | undefined,
  shiftKey: boolean,
) => {
  if (props.selectedItems === null) {
    return;
  }

  let newlySelectedItems =
    props.selectedItems === SELECT_ALL_ITEMS
      ? getAllItemsOnPage(items.value, generateItemId)
      : [...(props.selectedItems as string[])];

  if (sortOrder !== undefined) {
    lastSelected.value = sortOrder;
  }

  const lastSelectedFromState = lastSelected.value;

  let selectedIds: string[] = [id];

  if (
    shiftKey &&
    lastSelectedFromState != null &&
    sortOrder !== undefined &&
    props.resolveItemId
  ) {
    selectedIds = handleMultiSelectionChange(
      lastSelectedFromState,
      sortOrder,
      props.resolveItemId,
    );
  }
  newlySelectedItems = [...new Set([...newlySelectedItems, ...selectedIds])];

  if (!selected) {
    for (const selectedId of selectedIds) {
      newlySelectedItems.splice(newlySelectedItems.indexOf(selectedId), 1);
    }
  }

  if (newlySelectedItems.length === 0 && !isBreakpointsXS()) {
    handleSelectMode(false);
  } else if (newlySelectedItems.length > 0) {
    handleSelectMode(true);
  }

  emits('selection-change', newlySelectedItems);
};

const onSortChange = (selected: string) => {
  emits('sort-change', selected);
};

const handleToggleAll = () => {
  let newlySelectedItems: string[];

  if (
    (Array.isArray(props.selectedItems) && props.selectedItems.length === items.value.length)
    || props.selectedItems === SELECT_ALL_ITEMS
  ) {
    newlySelectedItems = [];
  } else {
    newlySelectedItems = items.value.map((item, index) => {
      return generateItemId(item, index);
    });
  }

  if (newlySelectedItems.length === 0 && !isBreakpointsXS()) {
    handleSelectMode(false);
  } else if (newlySelectedItems.length > 0) {
    handleSelectMode(true);
  }

  let checkbox: CheckboxHandles | undefined;

  if (isBreakpointsXS()) {
    checkbox = checkableButtons.value.get('bulkSm');
  } else if (newlySelectedItems.length === 0) {
    checkbox = checkableButtons.value.get('plain');
  } else {
    checkbox = checkableButtons.value.get('bulkLg');
  }

  emits('selection-change', newlySelectedItems);

  // setTimeout ensures execution after the Transition on BulkActions
  setTimeout(() => {
    checkbox && checkbox.focus();
  }, 0);
};

onMounted(() => {
  if (props.loading) {
    setLoadingPosition();
  }

  useEventListener('resize', handleResize);
});

watch(
  () => props.loading,
  (newLoading) => {
    if (newLoading) {
      setLoadingPosition();
    }
  },
);

watch(
  () => [props.selectedItems, selectMode.value],
  ([newSelectedItems, newSelectMode], [oldSelectedItems]) => {
    if (newSelectedItems !== oldSelectedItems) {
      if (newSelectedItems && (newSelectedItems as string[]).length > 0 && !newSelectMode) {
        selectMode.value = true;
      }
      if ((!newSelectedItems || (newSelectedItems as string[]).length === 0) && !isBreakpointsXS()) {
        selectMode.value = false;
      }
    }
  },
);

watch(
  () => items.value.length,
  () => {
    computeTableDimensions();
  },
);

watch(
  () => props.selectedItems,
  (newSelectedItems) => {
    if (newSelectedItems && (newSelectedItems === SELECT_ALL_ITEMS || newSelectedItems.length > 0)) {
      selectedItemsCount.value = newSelectedItems === SELECT_ALL_ITEMS
        ? `${items.value.length}+`
        : newSelectedItems.length;
    }
  },
  {
    immediate: true,
  }
);

const selected = computed(() => {
  return props.selectedItems || [];
});

provide<ResourceListContextType>('resource-list-context', {
  selectable: isSelectable,
  selectedItems: selected,
  selectMode: selectMode,
  resourceName: props.resourceName,
  loading: props.loading,
  hasBulkActions: Boolean(props.bulkActions),
  onSelectionChange: handleSelectionChange,
});
</script>
