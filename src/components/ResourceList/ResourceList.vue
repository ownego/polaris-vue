<template lang="pug">
div(:class="styles.ResourceListWrapper")
  div(v-if="hasSlot(slots.filterControl)", :class="styles.FiltersWrapper")
    slot(name="filterControl")
  div(v-if="showHeaderMarkup", :class="styles.HeaderOuterWrapper")
    Sticky(
      :bounding-element="listRef",
      @sticky-change="handleStickyChange",
    )
      div(:class="headerClassName")
        EventListener(event="resize", :handler="handleResize")
        div(v-if="loading", :class="styles['HeaderWrapper-overlay']")
        div(:class="styles.HeaderContentWrapper")
          div(:class="styles.HeaderTitleWrapper") {{ headerTitle }}
          div(v-if="isSelectable", :class="styles.CheckableButtonWrapper")
            CheckableButton(
              plain,
              :accessibilityLabel="bulkActionsAccessibilityLabel",
              :label="headerTitle",
              :disabled="loading",
              @toggle-all="handleToggleAll",
            )
          div(
            v-if="hasSlot(slots.alternateTool) && !showSortingSelect",
            :class="styles.AlternateToolWrapper",
          )
            slot(name="alternateTool")
          div(v-if="showSortingSelect && sortOptions", :className="styles.SortWrapper")
            Select(
              v-model="sortValue",
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
              :icon="EnableSelectionMinor",
              @click="() => handleSelectMode(true)",
            ) {{ i18n.translate('Polaris.ResourceList.selectButtonText') }}
        div(v-if="isSelectable", :class="styles.BulkActionsWrapper")
          BulkActions(
            :label="bulkActionsLabel",
            :accessibilityLabel="bulkActionsAccessibilityLabel",
            :selected="bulkSelectState()",
            :select-mode="selectMode",
            :promotedActions="promotedBulkActions",
            :paginatedSelectAllAction="paginatedSelectAllAction",
            :paginatedSelectAllText="paginatedSelectAllText",
            :actions="bulkActions",
            :disabled="loading",
            :smallScreen="smallScreen",
            @select-mode-toggle="handleSelectMode",
            @toggle-all="handleToggleAll",
          )
  ul(
    v-if="itemsExist",
    :class="resourceListClassName",
    ref="listRef",
    aria-live="polite",
    :aria-busy="loading",
  )
    template(v-if="loading")
      li(:class="styles.SpinnerContainer", :style="spinnerStyle")
        Spinner(:size="spinnerSize", accessibilityLabel="Items are loading")
      li(:class="styles.LoadingOverlay")
    slot
  template(v-if="showEmptySearchState && hasSlot(slots.emptySearchState)")
    slot(name="emptySearchState")
  template(v-else-if="showEmptySearchState")
    div(:class="styles.EmptySearchResultWrapper")
      EmptySearchResult(v-bind="emptySearchResultText", with-illustration)
  template(v-if="showEmptyState")
    slot(name="emptyState")
  div(v-if="loading && !itemsExist", :class="className", tabindex="-1")
    template(v-if="loading")
      li(:class="styles.SpinnerContainer", :style="spinnerStyle")
        Spinner(:size="spinnerSize", accessibilityLabel="Items are loading")
      li(:class="styles.LoadingOverlay")
</template>
<script setup lang="ts">
import { computed, ref, watch, provide, useSlots, onMounted } from 'vue';
import type { VNodeArrayChildren } from 'vue';
import { debounce } from 'polaris/polaris-react/src/utilities/debounce';
import type { CheckboxHandles } from '@/utilities/interface';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import { UseI18n } from '@/use';
import { hasSlot } from '@/utilities/has-slot';
import { Button, EventListener, Sticky, Spinner, Select, EmptySearchResult, BulkActions, CheckableButton } from '@/components';
import { SELECT_ALL_ITEMS } from '../../utilities/resource-list';
import type { CheckableButtonKey, CheckableButtons, ResourceListSelectedItems } from '../../utilities/resource-list';
import type { ResourceListContextType } from '../../utilities/resource-list';
import type { SelectOption } from '../Select/utils';
import type { BulkActionsProps } from '../BulkActions/utils';
import EnableSelectionMinor from '@icons/EnableSelectionMinor.svg';
import styles from '@/classes/ResourceList.json';

const SMALL_SCREEN_WIDTH = 458;
const SMALL_SPINNER_HEIGHT = 28;
const LARGE_SPINNER_HEIGHT = 45;

function getAllItemsOnPage<TItemType>(
  items: TItemType[],
  idForItem: (item: TItemType, index: number) => string,
) {
  return items.map((item: TItemType, index: number) => {
    return idForItem(item, index);
  });
}

const isSmallScreen = () => {
  return typeof window === 'undefined'
    ? false
    : window.innerWidth < SMALL_SCREEN_WIDTH;
};

const defaultIdForItem = (
  item: any,
  index: number,
) => {
  if (item.props?.id) {
    return item.props?.id;
  }
  return Object.prototype.hasOwnProperty.call(item, 'id')
    ? item.id
    : index.toString();
}

type TItemType = any;

interface ResourceListProps {
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
  /** Function to customize the unique ID for each item */
  idForItem?(item: TItemType, index: number): string;
  /** Function to resolve the ids of items */
  resolveItemId?(item: TItemType): string;
}

const props = withDefaults(defineProps<ResourceListProps>(), {
  selectedItems: [] as any,
  showHeader: true,
});

const i18n = UseI18n();
const slots = useSlots();

const emits = defineEmits<{
  /** Callback when sort option is changed */
  (e: 'sort-change', selected: string | undefined): void;
  /** Callback when selection is changed */
  (e: 'selection-change', selectedItems: ResourceListSelectedItems): void;
}>();

const selectMode = ref<boolean>(Boolean(props.selectedItems && props.selectedItems.length > 0));
const loadingPosition = ref(0);
const lastSelected = ref<number | undefined>();
const smallScreen = ref(isSmallScreen());
const checkableButtons = ref<CheckableButtons>(new Map());
const isSticky = ref(false);

const generateItemId = (item: any, index: number) => {
  if (props.idForItem) {
    return props.idForItem(item, index);
  }
  return defaultIdForItem(item, index);
};

const items = computed<TItemType[]>(() => {
  const tmpItems : VNodeArrayChildren = [];
  if (slots.default) {
    slots.default().map(item => {
      const children = item.children as VNodeArrayChildren;
      if (typeof children === 'string' && children === 'v-if') {
        return;
      }

      if (item.type.toString() === 'Symbol(Fragment)' || item.type.toString() === 'Symbol()') {
        for (const child of children) {
          tmpItems.push(child);
        }
      } else {
        tmpItems.push(item);
      }
    });
  }
  return tmpItems;
});

const defaultResourceName = {
  singular: i18n.translate('Polaris.ResourceList.defaultItemSingular'),
  plural: i18n.translate('Polaris.ResourceList.defaultItemPlural'),
};

const listRef = ref<HTMLUListElement | null>(null);
const headerRef = ref<HTMLDivElement | null>(null);

const isSelectable = computed(() => Boolean(
  (props.promotedBulkActions && props.promotedBulkActions.length > 0) ||
  (props.bulkActions && props.bulkActions.length > 0) ||
  props.selectable,
));

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

const handleStickyChange = (value: boolean) => {
  isSticky.value = value;
};

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

const defaultTopPadding = 8;
const topPadding = computed(() => loadingPosition.value > 0 ? loadingPosition.value : defaultTopPadding);
const spinnerStyle = computed(() => ({ paddingTop: `${topPadding.value}px` }));
const spinnerSize = computed(() => items.value.length < 2 ? 'small' : 'large');

onMounted(() => {
  if (props.loading) {
    setLoadingPosition();
  }
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
  ([newSelectedItems, newSelectMode], [oldSelectedItems, oldSelectMode]) => {
    if (newSelectedItems !== oldSelectedItems) {
      if (newSelectedItems && (newSelectedItems as string[]).length > 0 && !newSelectMode) {
        selectMode.value = true;
      }
      if ((!newSelectedItems || (newSelectedItems as string[]).length === 0) && !isSmallScreen()) {
        selectMode.value = false;
      }
    }
  },
);

const handleSelectAllItemsInStore = () => {
  const newlySelectedItems =
    props.selectedItems === SELECT_ALL_ITEMS
    || (Array.isArray(props.selectedItems) && props.selectedItems.length === items.value.length)
      ? []
      : getAllItemsOnPage(items.value, generateItemId);

  emits('selection-change', newlySelectedItems);
};

const bulkSelectState = (): boolean | 'indeterminate' => {
  let selectState: boolean | 'indeterminate' = 'indeterminate';

  if (
    !props.selectedItems ||
    (Array.isArray(props.selectedItems) && props.selectedItems.length === 0)
  ) {
    selectState = false;
  } else if (
    props.selectedItems === SELECT_ALL_ITEMS
    || (Array.isArray(props.selectedItems) && props.selectedItems.length === items.value.length)
  ) {
    selectState = true;
  }
  return selectState;
};

const handleSelectMode = (tmpSelectMode: boolean) => {
  selectMode.value = tmpSelectMode;
  if (!tmpSelectMode) {
    emits('selection-change', []);
  }
};

const handleResize = debounce(
  () => {
    const newSmallScreen = isSmallScreen();

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

const handleCheckableButtonRegistration = (
  key: CheckableButtonKey,
  button: CheckboxHandles,
) => {
  if (!checkableButtons.value.get(key)) {
    checkableButtons.value = new Map(checkableButtons.value).set(key, button);
  }
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
    || (Array.isArray(props.selectedItems) && props.selectedItems.length === items.value.length)
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

  if (newlySelectedItems.length === 0 && !isSmallScreen()) {
    handleSelectMode(false);
  } else if (newlySelectedItems.length > 0) {
    handleSelectMode(true);
  }

  emits('selection-change', newlySelectedItems);
};

const onSortChange = (selected: string | undefined) => {
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
      const ids = generateItemId && generateItemId(item, index);
      return ids;
    });
  }

  if (newlySelectedItems.length === 0 && !isSmallScreen()) {
    handleSelectMode(false);
  } else if (newlySelectedItems.length > 0) {
    handleSelectMode(true);
  }

  let checkbox: CheckboxHandles | undefined;

  if (isSmallScreen()) {
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

const selected = computed<ResourceListSelectedItems>(() => {
  return Object.keys(props.selectedItems).map((key) => props.selectedItems[key]);
});

const updateProvider = () => {
  provide<ResourceListContextType>('ResourceListContext', {
    selectable: isSelectable,
    selectedItems: selected,
    selectMode: selectMode,
    resourceName: props.resourceName,
    loading: props.loading,
    onSelectionChange: handleSelectionChange,
    registerCheckableButtons: handleCheckableButtonRegistration,
  });
};

updateProvider();
</script>
<style lang="scss">
@import 'polaris/polaris-react/src/components/ResourceList/ResourceList.scss';
</style>
