<template lang="pug">
div(
  :class="styles.IndexFiltersWrapper",
  :style="{height: `${indexFilteringHeight}px`}",
)
  div(ref="intersectionRef")
  div(
    ref="measurerRef",
    :class="indexFiltersClassName",
  )
    div(ref="defaultRef")
      Container(v-show="mode !== IndexFiltersMode.Filtering")
        InlineStack(
          align="start",
          block-align="center",
          :gap="{ xs: '0', md: '200'}",
          :wrap="false",
        )
          div(:class="tabsWrapperClassName")
            div(
              :class="styles.TabsInner",
              :style="{...defaultStyle, ...transitionStyles[transitionButtonState]}",
            )
              Tabs(
                :tabs="tabs",
                :selected="selected",
                :disabled="Boolean(mode !== IndexFiltersMode.Default || disabled)",
                :can-create-new-view="canCreateNewView",
                @select="emits('select', $event)",
                @create-new-view="emits('create-new-view', $event)",
              )
            div(
              v-if="isLoading && breakpoints.mdDown",
              :class="styles.TabsLoading",
            )
              Spinner(size="small")
          div(:class="styles.ActionWrap")
            div(
              v-if="isLoading && !breakpoints.mdDown",
              :class="styles.DesktopLoading",
            )
              Spinner(size="small")
            Transition(
              name='custom-index-filters-button-transition',
              @before-enter="onTransitionButtonBeforeEnter",
              @enter="onTransitionButtonEnter",
              @after-enter="onTransitionButtonAfterEnter",
              @before-leave="onTransitionButtonBeforeLeave",
              @leave="onTransitionButtonLeave",
              @after-leave="onTransitionButtonAfterLeave",
            )
              SearchFilterButton(
                v-if="!(hideFilters && hideQueryField) && mode === IndexFiltersMode.Default",
                :label="searchFilterAriaLabel",
                :tooltip-content="searchFilterTooltip",
                :disabled="disabled",
                :hide-query-field="hideQueryField",
                :hide-filters="hideFilters",
                :style="{...defaultStyle, ...transitionStyles[transitionButtonState]}",
                @click="handleClickFilterButton",
              )
            template(v-if="mode === IndexFiltersMode.Default")
              EditColumnsButton(
                v-if="showEditColumnsButton",
                :disabled="disabled",
                @click="handleClickEditColumnsButton",
              )
              SortButton(
                v-if="sortOptions && sortOptions.length",
                :choices="sortOptions",
                :selected="sortSelected || ['']",
                :disabled="disabled",
                v-bind="sortButtonEvents",
              )
            template(v-if="mode === IndexFiltersMode.EditingColumns")
              UpdateButtons(
                v-if="enhancedCancelAction || enhancedPrimaryAction",
                :primaryAction="enhancedPrimaryAction",
                :cancelAction="enhancedCancelAction",
                :disabled="disabled",
                :view-names="viewNames",
              )
    div(ref="filteringRef")
      Transition(
        name='slide-fade',
        @before-enter="onTransitionFiltersBeforeEnter",
        @enter="onTransitionFiltersEnter",
        @after-enter="onTransitionFiltersAfterEnter",
        @before-leave="onTransitionFiltersBeforeLeave",
        @leave="onTransitionFiltersLeave",
      )
        Filters(
          v-if="mode === IndexFiltersMode.Filtering",
          borderless-query-field,
          :close-on-child-overlay-click="closeOnChildOverlayClick",
          :query-value="queryValue",
          :query-placeholder="queryPlaceholder",
          :filters="filters",
          :applied-filters="appliedFilters",
          :hide-filters="hideFilters",
          :hide-query-field="hideQueryField",
          :disable-query-field="disableQueryField",
          :focused="filtersFocused",
          :loading="loading || isActionLoading",
          :mounted-state="breakpoints.mdDown ? undefined : transitionFiltersState",
          @query-change="handleChangeSearch",
          @query-clear="handleClearSearch",
          @query-blur="handleQueryBlur",
          @query-focus="handleQueryFocus",
          @add-filter-click="emits('filter-click')",
          @clear-all="emits('clear-all')",
        )
          div(:class="styles.ButtonWrap")
            InlineStack(gap="200", align="start", block-align="center")
              div(:style="{...defaultStyle, ...transitionStyles[transitionFiltersState]}")
                UpdateButtons(
                  v-if="enhancedCancelAction || enhancedPrimaryAction",
                  :primaryAction="enhancedPrimaryAction",
                  :cancelAction="enhancedCancelAction",
                  :disabled="disabled",
                  :view-names="viewNames",
                )
              SortButton(
                v-if="sortOptions && sortOptions.length",
                :choices="sortOptions",
                :selected="sortSelected || ['']",
                :disabled="disabled",
                v-bind="sortButtonEvents",
              )
</template>

<script setup lang="ts">
import { ref, computed, getCurrentInstance, Transition, watch } from 'vue';
import useI18n from '@/use/useI18n';
import { useToggle } from '@/use/useToggle';
import { useIsSticky } from '@/use/useIsSticky';
import { useBreakpoints } from '@/use/useBreakpoints';
import { classNames } from '@/utilities/css';
import { useEventListener } from '@/utilities/use-event-listener';
import { useOnValueChange } from '@/utilities/use-on-value-change';
import {
  InlineStack,
  Spinner,
  Filters,
  Tabs,
} from '@/components';
import { type TabsProps } from '@/components/Tabs/Tabs.vue';
import {
  Container,
  SortButton,
  SearchFilterButton,
  UpdateButtons,
  EditColumnsButton,
} from './components';
import type { FiltersProps } from '@/components/Filters/Filters.vue';
import {
  type IndexFiltersCancelAction,
  type IndexFiltersPrimaryAction,
  type SortButtonChoice,
  IndexFiltersMode,
} from './types';
import styles from '@polaris/components/IndexFilters/IndexFilters.module.scss';

const TRANSITION_DURATION = 150;

const DEFAULT_IGNORED_TAGS = ['INPUT', 'SELECT', 'TEXTAREA'];

const defaultStyle = {
  transition: `opacity ${TRANSITION_DURATION}ms var(--p-motion-ease)`,
  opacity: 0,
};

const transitionStyles = {
  entering: {opacity: 1},
  entered: {opacity: 1},
  exiting: {opacity: 0},
  exited: {opacity: 0},
  unmounted: {opacity: 0},
};

type ExecutedCallback = (name: string) => Promise<boolean>;

type ActionableIndexFiltersMode = Exclude<
  IndexFiltersMode,
  IndexFiltersMode.Default
>;

interface IndexFiltersProps
  extends Omit<
      FiltersProps,
      'focused' | 'disableQueryField' | 'disableFilters'
    >,
    Pick<TabsProps, 'tabs' | 'selected'> {
  /** The available sorting choices. If not present, the sort button will not show */
  sortOptions?: SortButtonChoice[];
  /** The currently selected sort choice. Required if using sorting */
  sortSelected?: string[];
  /** The primary action to display  */
  primaryAction?: IndexFiltersPrimaryAction;
  /** The cancel action to display */
  cancelAction?: IndexFiltersCancelAction;
  /** The current mode of the IndexFilters component. Used to determine which view to show */
  mode: IndexFiltersMode;
  /** Will disable all the elements within the IndexFilters component */
  disabled?: boolean;
  /** Will disable just the query field */
  disableQueryField?: boolean;
  /** If true, the sticky interaction on smaller devices will be disabled */
  disableStickyMode?: boolean;
  /** If the component should go flush to the top of the page when sticking */
  isFlushWhenSticky?: boolean;
  /** Whether the index supports creating new views */
  canCreateNewView?: boolean;
  /** Optional override to the default aria-label for the button that toggles the filtering mode */
  filteringAccessibilityLabel?: string;
  /** Optional override to the default Tooltip message for the button that toggles the filtering mode */
  filteringAccessibilityTooltip?: string;
  /** Whether the filter should close when clicking inside another Popover. */
  closeOnChildOverlayClick?: boolean;
  /** Optional override to the default keyboard shortcuts available. Should be set to true for all instances
   * of this component not controlling a root-level index */
  disableKeyboardShortcuts?: boolean;
  /** Whether to display the edit columns button with the other default mode filter actions */
  showEditColumnsButton?: boolean;
  /** Whether or not to auto-focus the search field when it renders */
  autoFocusSearchField?: boolean;
}

type IndexFiltersEvents = {
  /** Optional callback invoked when a merchant changes the sort order. Required if using sorting */
  'sort': [value: string[]];
  /** Optional callback when using saved views and changing the sort key */
  'sort-key-change': [value: string];
  /** Optional callback when using saved views and changing the sort direction */
  'sort-direction-change': [value: string];
  /** Callback when the add filter button is clicked, to be passed to AlphaFilters. */
  'filter-click': [];
  /** Callback to set the mode of the IndexFilters component */
  'set-mode': [mode: IndexFiltersMode];
  /** Callback invoked when a merchant creates a new view */
  'create-new-view': [name: string];
  /** Optional callback invoked when a merchant begins to edit a view */
  'edit-start': [mode: ActionableIndexFiltersMode];
   /** Callback when the query field is changed. */
  'query-change': [string];
  /** Callback when the clear button is triggered. */
  'query-clear': [];
  /** Callback when the reset all button is pressed. */
  'clear-all': [];
  /** Callback when the query field is blurred. */
  'query-blur': [];
  /** Callback when the query field is focused. */
  'query-focus': [];
  /** Callback when the add filter button is clicked. */
  'add-filter-click': [];
  /** Tabs Events */
  'select': [selectedTabIndex: number];
}

const props = withDefaults(defineProps<IndexFiltersProps>(), {
  queryValue: '',
  isFlushWhenSticky: false,
  canCreateNewView: true,
  autoFocusSearchField: true,
});
const emits: any = defineEmits<IndexFiltersEvents>();

const currentInstance = getCurrentInstance();

const i18n = useI18n();
const breakpoints = useBreakpoints();
const {
  value: filtersFocused,
  setFalse: setFiltersUnFocused,
  setTrue: setFiltersFocused,
} = useToggle(props.mode === IndexFiltersMode.Filtering && props.autoFocusSearchField);
const {intersectionRef, measurerRef, indexFilteringHeight, isSticky} =
  useIsSticky(props.mode, Boolean(props.disableStickyMode), props.isFlushWhenSticky);

const defaultRef = ref<HTMLElement | null>(null);
const filteringRef = ref<HTMLElement | null>(null);
const transitionFiltersState = ref(props.mode === IndexFiltersMode.Filtering ? 'entering' : 'unmounted');
const transitionButtonState = ref('entering');

const isActionLoading = computed(() => props.primaryAction?.loading || props.cancelAction?.loading);
const searchFilterTooltipLabelId = computed(() => {
  return props.disableKeyboardShortcuts
    ? 'Polaris.IndexFilters.searchFilterTooltip'
    : 'Polaris.IndexFilters.searchFilterTooltipWithShortcut';
});
const searchFilterTooltip = computed(() => {
  return props.filteringAccessibilityTooltip || i18n.translate(searchFilterTooltipLabelId.value);
});
const searchFilterAriaLabel = computed(() => {
  return props.filteringAccessibilityLabel || i18n.translate('Polaris.IndexFilters.searchFilterAccessibilityLabel');
});
const isLoading = computed(() => isActionLoading.value || props.loading);
const enhancedPrimaryAction = computed(() => {
  if (!props.primaryAction) return undefined;
  return {
    ...props.primaryAction,
    onAction: onExecutedPrimaryAction,
  };
});
const enhancedCancelAction = computed(() => {
  if (!props.cancelAction) return undefined;
  return {
    ...props.cancelAction,
    onAction: onExecutedCancelAction,
  };
});
const viewNames = computed(() => props.tabs.map(({content}: any) => content));
const tabsWrapperClassName = computed(() => classNames(
  styles.TabsWrapper,
  breakpoints.value.mdDown && styles.SmallScreenTabsWrapper,
  isLoading.value && styles.TabsWrapperLoading,
));
const indexFiltersClassName = computed(() => classNames(
  styles.IndexFilters,
  isSticky && styles.IndexFiltersSticky,
  isSticky && props.isFlushWhenSticky && styles.IndexFiltersStickyFlush,
));
const sortButtonEvents = computed(() => {
  let events: any = {
    onChange: (value: string[]) => emits('sort', value),
  };

  if (currentInstance?.vnode.props?.onSortKeyChange) {
    events = {
      ...events,
      onChangeKey: (key: string) => emits('sort-key-change', key),
    }
  }

  if (currentInstance?.vnode.props?.onSortDirectionChange) {
    events = {
      ...events,
      onChangeDirection: (direction: string) => emits('sort-direction-change', direction),
    }
  }

  return events;
});

const useExecutedCallback = (action?: ExecutedCallback, afterEffect?: () => void) => {
  return async (name: string) => {
    if (!action) return;
    const executed = await action?.(name);
    if (executed) {
      emits('set-mode', IndexFiltersMode.Default);
      afterEffect?.();
    }
  };
};

const onExecutedPrimaryAction = useExecutedCallback(props.primaryAction?.onAction);

const onExecutedCancelAction = () => {
  props.cancelAction?.onAction();
  emits('set-mode', IndexFiltersMode.Default);
};

const handleModeChange = (newMode: IndexFiltersMode) => {
  if (newMode === IndexFiltersMode.Filtering && props.autoFocusSearchField) {
    setFiltersFocused();
  } else {
    setFiltersUnFocused();
  }
};

useEventListener('keydown', (event) => {
  const hasNoFiltersOrSearch = props.hideQueryField && props.hideFilters;
  if (props.disableKeyboardShortcuts || hasNoFiltersOrSearch) return;

  const {key} = event;
  const tag = document?.activeElement?.tagName;
  if (props.mode !== IndexFiltersMode.Default && event.key === 'Escape') {
    onPressEscape();
  }

  if (key === 'f' && props.mode === IndexFiltersMode.Default) {
    if (tag && DEFAULT_IGNORED_TAGS.includes(tag)) {
      return;
    }
    onPressF();
    event.preventDefault();
  }
});

const beginEdit = (mode: ActionableIndexFiltersMode) => {
  emits('set-mode', mode);
  emits('edit-start', mode);
};

function handleClickEditColumnsButton() {
  beginEdit(IndexFiltersMode.EditingColumns);
}

function handleClickFilterButton() {
  beginEdit(IndexFiltersMode.Filtering);
}

function onPressEscape() {
  props.cancelAction?.onAction();
  emits('set-mode', IndexFiltersMode.Default);
}

function handleChangeSearch(value: string) {
  emits('query-change', value);
}

function handleClearSearch() {
  emits('query-clear');
}

function handleQueryBlur() {
  setFiltersUnFocused();
}

function handleQueryFocus() {
  setFiltersFocused();
  emits('query-focus');
}

function onPressF() {
  if (props.mode !== IndexFiltersMode.Default) {
    return;
  }
  beginEdit(IndexFiltersMode.Filtering);
}

// Filters Mode Transition Action
function onTransitionFiltersBeforeEnter() {
  setTimeout(() => {
    transitionFiltersState.value = 'entering';
  }, 1);
}

function onTransitionFiltersEnter() {
  transitionFiltersState.value = 'entered';
}

function onTransitionFiltersAfterEnter() {
  transitionFiltersState.value = 'entered';
}

function onTransitionFiltersBeforeLeave() {
  transitionFiltersState.value = 'exiting';
}

function onTransitionFiltersLeave() {
  transitionFiltersState.value = 'exited';
}

function onTransitionFiltersAfterLeave() {
  transitionFiltersState.value = 'unmounted';
}

// - Button Filter Icon Transition Action
function onTransitionButtonBeforeEnter() {
  transitionButtonState.value = 'entering';
}

function onTransitionButtonEnter() {
  transitionButtonState.value = 'entered';
}

function onTransitionButtonAfterEnter() {
  transitionButtonState.value = 'entered';
}

function onTransitionButtonBeforeLeave() {
  transitionButtonState.value = 'exiting';
}

function onTransitionButtonLeave() {
  transitionButtonState.value = 'exited';
}

function onTransitionButtonAfterLeave() {
  transitionButtonState.value = 'unmounted';
}

watch(
  () => props.mode,
  () => {
    useOnValueChange(props.mode, handleModeChange(props.mode));
  },
  { flush: 'post' },
);
</script>
