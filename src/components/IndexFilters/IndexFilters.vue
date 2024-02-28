<template lang="pug">
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import useI18n from '@/use/useI18n';
import { useToggle } from '@/use/useToggle';
import { classNames } from '@/utilities/css';
import { useEventListener } from '@/utilities/use-event-listener';
import { useOnValueChange } from '@/utilities/use-on-value-change';
import { useBreakpoints } from '@/utilities/breakpoints';
import {
  InlineStack,
  Spinner,
  Filters,
  Tabs,
} from '@/components';
import {
  Container,
  SortButton,
  SearchFilterButton,
  UpdateButtons,
  EditColumnsButton,
} from './components';
import {
  type IndexFiltersCancelAction,
  type IndexFiltersPrimaryAction,
  type SortButtonChoice,
  IndexFiltersMode,
} from './types';
import styles from '@polaris/components/IndexFilters/IndexFilters.module.scss';


const DEFAULT_IGNORED_TAGS = ['INPUT', 'SELECT', 'TEXTAREA'];

const TRANSITION_DURATION = 150;

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
  cancelAction: IndexFiltersCancelAction;
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
  /** Optional override to the default keyboard shortcuts available */
  disableKeyboardShortcuts?: boolean;
  /** Whether to display the edit columns button with the other default mode filter actions */
  showEditColumnsButton?: boolean;
}

type IndexFiltersEvents = {
  /** Optional callback invoked when a merchant changes the sort order. Required if using sorting */
  'sort'?: [value: string[]];
  /** Optional callback when using saved views and changing the sort key */
  'sort-key-change'?: [value: string];
  /** Optional callback when using saved views and changing the sort direction */
  'sort-direction-change'?: [value: string];
  /** Callback when the add filter button is clicked, to be passed to AlphaFilters. */
  'filter-click'?: [];
  /** Callback to set the mode of the IndexFilters component */
  'set-mode': [mode: IndexFiltersMode];
  /** Callback invoked when a merchant creates a new view */
  'create-new-view'?: [name: string];
  /** Optional callback invoked when a merchant begins to edit a view */
  'edit-start'?: [mode: ActionableIndexFiltersMode];
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
});
const emits: any = defineEmits<IndexFiltersEvents>();

const i18n = useI18n();
const breakpoints = useBreakpoints();
const {
  value: filtersFocused,
  setFalse: setFiltersUnFocused,
  setTrue: setFiltersFocused,
} = useToggle(props.mode === IndexFiltersMode.Filtering);

const defaultRef = ref<HTMLElement | null>(null);
const filteringRef = ref<HTMLElement | null>(null);

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

const handleModeChange = (newMode: IndexFiltersMode) => {
  if (newMode === IndexFiltersMode.Filtering) {
    setFiltersFocused();
  } else {
    setFiltersUnFocused();
  }
};

useOnValueChange(props.mode, handleModeChange);

useEventListener('keydown', (event) => {
  if (props.disableKeyboardShortcuts) return;

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

function onPressEscape() {
  props.cancelAction?.onAction();
  emits('set-mode', IndexFiltersMode.Default);
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
</script>
