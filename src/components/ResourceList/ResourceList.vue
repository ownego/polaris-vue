<template lang="pug">
</template>

<script setup lang="ts">
import { type VNode , type VNodeArrayChildren, ref, computed } from 'vue';
import { themeDefault, toPx } from '@shopify/polaris-tokens';
import { debounce } from '@polaris/utilities/debounce';
import { classNames } from '@/utilities/css';
import useI18n from '@/use/useI18n';
import { useExtractFragment } from '@/use/useExtractFragment';
import { useHasSlot } from '@/use/useHasSlot';
import { VueNode } from '@/utilities/types';
import {
  Button,
  EventListener,
  Sticky,
  Spinner,
  Select,
  EmptySearchResult,
  BulkActions,
  CheckableButton,
  Pagination,
  SelectAllActions,
} from '@/components';
import type { PaginationProps } from '@/components/Pagination/Pagination.vue';
import type { BulkActionsProps } from '@/components/BulkAction/utils';
import type { SelectOption } from '@/components/Select/types';
import styles from '@polaris/components/ResourceList/ResourceList.module.scss';

const SMALL_SPINNER_HEIGHT = 28;
const LARGE_SPINNER_HEIGHT = 45;

export type ResourceListSelectedItems = string[] | 'All';

export const SELECT_ALL_ITEMS = 'All';

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
  return Object.prototype.hasOwnProperty.call(item, 'id')
    ? item.id
    : index.toString();
}

export type ResourceListPaginationProps = Omit<PaginationProps, 'type'>;

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
  'sort-change': [selected: string, id: string];
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
  selectedItems: [],
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
const checkableButtons = ref<HTMLInputElement | null>(null);
const isSticky = ref(false);


const defaultResourceName = {
  singular: i18n.translate('Polaris.ResourceList.defaultItemSingular'),
  plural: i18n.translate('Polaris.ResourceList.defaultItemPlural'),
};

const listRef = ref<HTMLUListElement | null>(null);
const headerRef = ref<HTMLDivElement | null>(null);

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
    isSelectable.value && selectMode.value && styles['HeaderWrapper-inSelectMode'],
    isSticky.value && styles['HeaderWrapper-isSticky'],
  );
});

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

const bulkActionsLabel = computed(() => {
  const selectedItemsCount =
    props.selectedItems === SELECT_ALL_ITEMS
    || (Array.isArray(props.selectedItems) && props.selectedItems.length === items.value.length)
      ? `${items.value.length}+`
      : props.selectedItems?.length;

  return i18n.translate('Polaris.ResourceList.selected', {
    selectedItemsCount: `${selectedItemsCount}`,
  });
});

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

const selectAllSelectState = (): boolean | 'indeterminate' => {
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
};

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

const emptySearchResultText = computed(() => ({
  title: i18n.translate('Polaris.ResourceList.emptySearchResultTitle', {
    resourceNamePlural: resourceName.value.plural,
  }),
  description: i18n.translate(
    'Polaris.ResourceList.emptySearchResultDescription',
  ),
}));
</script>
