<template lang="pug">
div(:class="styles.Filters")
  ConnectedFilterControl(
    :rightPopoverableActions="transformedFilters",
    :disabled="disabled",
    :forceShowMorefiltersButton="filters.length > transformedFilters.length",
    :queryFieldHidden="hideQueryField",
  )
    template(
      v-for="action in transformedFilters",
      :key="action.key",
      #[`popover-${action.key}`],
    )
      div(ref="focusNode")
        Stack(vertical, spacing="tight")
          slot(
            v-if="hasSlot(slots[`filter-${action.key}`])",
            :name="`filter-${action.key}`",
          )
          Button(
            v-if="action.popoverContent.hideClearButton !== false",
            plain,
            :disabled="!hasRemoveHandler(action.key)",
            :accessibilityLabel="i18n.translate('Polaris.Filters.clearLabel', {filterName: action.popoverContent.label})",
            @click="removeHandler(action.key)",
          )
            | {{ i18n.translate('Polaris.Filters.clear') }}
    template(#auxiliary)
      slot
    template(#rightAction)
      div(v-if="filters.length", ref="moreFiltersButtonContainer")
        Button(@click="toggleFilters", :disabled="disabled") {{ moreFiltersLabel }}
    TextField(
      v-if="!hideQueryField",
      v-model="modelValue",
      :focused="focused",
      :placeholder="queryPlaceholder || i18n.translate('Polaris.Filters.filter', { resourceName: filterResourceName.plural })",
      labelHidden,
      clearButton,
      :disabled="disabled || disableQueryField",
      autoComplete="off",
      @clear-button-click="handleClearTextField",
      @change="handleQueryChange",
      @blur="emits('query-blur')",
      @focus="emits('query-focus')",
    )
      template(#label)
        | {{ queryPlaceholder || i18n.translate('Polaris.Filters.filter', { resourceName: filterResourceName.plural }) }}
      template(#prefix)
        span(:class="styles.SearchIcon")
          Icon(:source="SearchMinor")
  Sheet(
    v-if="isNavigationCollapsed",
    :accessibilityLabel="moreFiltersLabel",
    :open="open",
    @close="closeFilters",
    @entered="setReadyForFocus(true)",
    @exit="setReadyForFocus(false)",
  )
    div(:class="filtersContainerHeaderClassname")
      Button(
        :icon="CancelSmallMinor",
        plain,
        :accessibilityLabel="i18n.translate('Polaris.Filters.cancel')",
        @click="closeFilters",
      )
      DisplayText(size="small", element="h3")
        | {{ moreFiltersLabel }}
      Button(@click="closeFilters", primary)
        | {{ i18n.translate('Polaris.Filters.done') }}
    Scrollable(:class="filtersMobileContainerContentClassName", shadow)
      div(
        v-for="filter, index in filters",
        :key="filter.key",
        :class="filterClassName(filter, index)",
      )
        button(
          @click="() => toggleFilter(filter.key)",
          :class="buttonClassName",
          :id="`${filter.key}ToggleButton`",
          type="button",
          :aria-controls="`${filter.key}Collapsible`",
          :aria-expanded="filterIsOpen(filter, index)",
        )
          div(:class="styles.FilterTriggerLabelContainer")
            h3(:class="styles.FilterTriggerTitle")
              TextStyle(
                :variation="disabled || filter.disabled ? 'subdued' : undefined",
              ) {{ filter.label }}
            span
              Icon(:source="filterIsOpen(filter, index) ? ChevronUpMinor : ChevronDownMinor", color="base")
          div(v-if="getAppliedFilterContent(filter.key)", :class="styles.AppliedFilterBadgeContainer")
            Badge(size="small", status="new") {{ getAppliedFilterContent(filter.key) }}
        Collapsible(:id="`${filter.key}Collapsible`", :open="filterIsOpen(filter, index)")
          div(:class="styles.FilterNodeContainer")
            Focus(
              :disabled="!filterIsOpen(filter, index) || !readyForFocus || !open",
              :root="focusNode",
            )
              div(ref="focusNode")
                Stack(vertical, spacing="tight")
                  slot(:name="`filter-${filter.key}`")
                  Button(
                    v-if="filter.hideClearButton !== false",
                    plain,
                    :disabled="!hasRemoveHandler(filter.key)",
                    @click="removeHandler(filter.key)",
                    :accessibilityLabel="i18n.translate('Polaris.Filters.clearLabel', {filterName: filter.label})",
                  )
                    | {{ i18n.translate('Polaris.Filters.clear') }}
      div(:class="styles.FiltersMobileContainerFooter")
        Button(v-if="hasAppliedFilters", @click="emits('clear-all')", fullWidth)
          | {{ i18n.translate('Polaris.Filters.clearAllFilters') }}
        div(v-else, :class="styles.EmptyFooterState")
          TextStyle(variation="subdued")
            p {{ i18n.translate('Polaris.Filters.noFiltersApplied') }}
  Sheet(
    v-else,
    :accessibilityLabel="moreFiltersLabel",
    :open="open",
    @close="closeFilters",
    @entered="setReadyForFocus(true)",
    @exit="setReadyForFocus(false)",
  )
    div(:class="styles.FiltersContainer")
      div(:class="filtersContainerHeaderClassname")
        DisplayText(size="small", element="h3")
          | {{ moreFiltersLabel }}
        Button(
          :icon="CancelSmallMinor",
          plain,
          :accessibilityLabel="i18n.translate('Polaris.Filters.cancel')",
          @click="closeFilters",
        )
      Scrollable(
        :class="filtersDesktopContainerContentClassName",
        shadow,
      )
        div(
          v-for="filter, index in filters",
          :key="filter.key",
          :class="filterClassName(filter, index)",
        )
          button(
            @click="() => toggleFilter(filter.key)",
            :class="buttonClassName",
            :id="`${filter.key}ToggleButton`",
            type="button",
            :aria-controls="`${filter.key}Collapsible`",
            :aria-expanded="filterIsOpen(filter, index)",
          )
            div(:class="styles.FilterTriggerLabelContainer")
              h3(:class="styles.FilterTriggerTitle")
                TextStyle(
                  :variation="disabled || filter.disabled ? 'subdued' : undefined",
                ) {{ filter.label }}
              span
                Icon(:source="filterIsOpen(filter, index) ? ChevronUpMinor : ChevronDownMinor", color="base")
            div(v-if="getAppliedFilterContent(filter.key)", :class="styles.AppliedFilterBadgeContainer")
              Badge(size="small", status="new") {{ getAppliedFilterContent(filter.key) }}
          Collapsible(:id="`${filter.key}Collapsible`", :open="filterIsOpen(filter, index)")
            div(:class="styles.FilterNodeContainer")
              Focus(
                :disabled="!filterIsOpen(filter, index) || !readyForFocus || !open",
                :root="focusNode",
              )
                div(ref="focusNode")
                  Stack(vertical, spacing="tight")
                    slot(:name="`filter-${filter.key}`")
                    Button(
                      v-if="filter.hideClearButton !== false",
                      plain,
                      :disabled="!hasRemoveHandler(filter.key)",
                      @click="removeHandler(filter.key)",
                      :accessibilityLabel="i18n.translate('Polaris.Filters.clearLabel', {filterName: filter.label})",
                    )
                      | {{ i18n.translate('Polaris.Filters.clear') }}
      div(:class="filtersDesktopFooterClassname")
        Button(
          @click="handleClearAll",
          :disabled="hasAppliedFilters",
        )
          | {{ i18n.translate('Polaris.Filters.clearAllFilters') }}
        div(ref="moreFiltersDoneButtonContainer")
          Button(@click="closeFilters", primary)
            | {{ i18n.translate('Polaris.Filters.done') }}
  TagsWrapper(v-if="!hideTags", :hidden="shouldHideTagsContainer")
    div(:class="styles.TagsContainer", aria-live="polite")
      template(v-if="appliedFilters && appliedFilters.length")
        Tag(
          v-for="filter in appliedFilters",
          :key="filter.key",
          :disabled="disabled",
          @remove="() => { filter.onRemove(filter.key) }",
        ) {{ filter.label }}
  div(
    v-if="hasSlot(slots['help-text'])",
    id="FiltersHelpText",
    :class="styles.HelpText",
  )
    TextStyle(variation="subdued")
      slot(name="help-text")
  template(v-if="open")
    ScrollLock
    div(:class="styles.Backdrop", @click="closeFilters")
  KeypressListener(:keyCode="Key.Escape", :handler="closeFilters")
</template>
<script setup lang="ts">
import { computed, ref, inject, reactive, provide, useSlots } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import { UseI18n } from '@/use';
import { hasSlot } from '@/utilities/has-slot';
import { UseMediaQuery } from '@/utilities/media-query';
import { focusFirstFocusableNode } from '@/utilities/focus';
import type { ResourceListContextType } from '@/utilities/resource-list';
import {
  Button,
  DisplayText,
  Collapsible,
  Scrollable,
  ScrollLock,
  Icon,
  TextField,
  Tag,
  TextStyle,
  Badge,
  Focus,
  Sheet,
  Stack,
  Key,
  KeypressListener,
} from '@/components';

import SearchMinor from '@icons/SearchMinor.svg';
import ChevronUpMinor from '@icons/ChevronUpMinor.svg';
import ChevronDownMinor from '@icons/ChevronDownMinor.svg';
import CancelSmallMinor from '@icons/CancelSmallMinor.svg';
import styles from '@/classes/Filters.json';

import type { PopoverableAction, ConnectedFilterControlProps, AppliedFilterInterface, FilterInterface } from './utils';
import { ConnectedFilterControl, TagsWrapper } from './components';

interface TransformedFiltersProps extends PopoverableAction {
  popoverContent: FilterInterface;
}

interface FiltersProps {
  /** Currently entered text in the query field */
  modelValue?: string;
  /** Placeholder text for the query field */
  queryPlaceholder?: string;
  /** Whether the query field is focused */
  focused?: boolean;
  /** Available filters added to the sheet. Shortcut filters are exposed outside of the sheet. */
  filters: FilterInterface[];
  /** Applied filters which are rendered as tags. The remove callback is called with the respective key */
  appliedFilters?: AppliedFilterInterface[];
  /** Disable all filters */
  disabled?: boolean;
  /** Hide tags for applied filters */
  hideTags?: boolean;
  /** Hide the query field */
  hideQueryField?: boolean;
  /** Disable the query field */
  disableQueryField?: boolean;
}

const props = withDefaults(defineProps<FiltersProps>(), {
  disabled: false,
  disableQueryField: false,
});

const i18n = UseI18n();
const { useMediaQuery } = UseMediaQuery();
const { isNavigationCollapsed } = useMediaQuery();

const slots = useSlots();

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  /** Callback when the query field is changed */
  (e: 'query-change', queryValue: string): void;
  /** Callback when the clear button is triggered */
  (e: 'query-clear', id?: string): void;
  /** Callback when the reset all button is pressed */
  (e: 'clear-all'): void;
  /** Callback when the query field is blurred */
  (e: 'query-blur'): void;
  /** Callback when the query field is focused */
  (e: 'query-focus'): void;
}>();

const open = ref<boolean>(false);
const readyForFocus = ref<boolean>(false);
const stateFilter = reactive<Record<string, boolean>>({});

const Suffix = {
  Filter: 'Filter',
  Shortcut: 'Shortcut',
};

const resourceListContext = inject('ResourceListContext', {}) as ResourceListContextType;
const { resourceName } = resourceListContext;

const moreFiltersButtonContainer = ref<HTMLDivElement | null>(null);
const moreFiltersDoneButtonContainer = ref<HTMLDivElement | null>(null);
const focusNode = ref<HTMLDivElement | null>(null);

const filtersContainerHeaderClassname = classNames(styles.FiltersContainerHeader);
const filtersDesktopFooterClassname = classNames(styles.FiltersContainerFooter);
const filtersMobileContainerContentClassName = classNames(styles.FiltersMobileContainerContent);
const filtersDesktopContainerContentClassName = classNames(styles.FiltersDesktopContainerContent);

const shouldHideTagsContainer = computed(() =>
  !props.appliedFilters || props.appliedFilters.length < 1,
)

const buttonClassName = classNames(styles.FilterTrigger);

const transformedFilters = computed(() => transformFilters(props.filters));

const hasAppliedFilters = computed<boolean>(() => {
  const {appliedFilters, modelValue} = props;
  const filtersApplied = Boolean(appliedFilters && appliedFilters.length > 0);
  const queryApplied = Boolean(modelValue && modelValue !== '');

  return filtersApplied || queryApplied;
});

const appliedFiltersCount = computed(() => props.appliedFilters ? props.appliedFilters.length : 0);
const moreFiltersLabel = computed(() => {
  return props.hideTags && appliedFiltersCount.value > 0
    ? i18n.translate('Polaris.Filters.moreFiltersWithCount', {
      count: appliedFiltersCount.value,
    })
    : i18n.translate('Polaris.Filters.moreFilters');
});

const filterResourceName = computed(() => resourceName || {
  singular: i18n.translate('Polaris.ResourceList.defaultItemSingular'),
  plural: i18n.translate('Polaris.ResourceList.defaultItemPlural'),
});

// Filter functions
const filterIsOpen = (filter: FilterInterface, index:number) => stateFilter[`${filter.key}${Suffix.Filter}`] === true;

const filterClassName = (filter: FilterInterface, index: number) => classNames(
  styles.FilterTriggerContainer,
  filterIsOpen(filter, index) && styles.open,
  index === 0 && styles.first,
  props.filters.length !== 1 && index === props.filters.length - 1 && styles.last,
);

// Whole functions
const getAppliedFilterContent = (key: string) => {
  const {appliedFilters} = props;

  if (!appliedFilters) {
    return undefined;
  }

  const filter = appliedFilters.find((f) => f.key === key);

  return filter == null ? undefined : filter.label;
};

const getAppliedFilterRemoveHandler = (key: string) => {
  const { appliedFilters } = props;

  if (!appliedFilters) {
    return undefined;
  }

  const filter = appliedFilters.find((f) => f.key === key);

  return filter == null ? undefined : filter.onRemove;
}

const openFilters = () => {
  open.value = true;
}

const closeFilters = () => {
  open.value = false;
  if (moreFiltersButtonContainer.value) {
    focusFirstFocusableNode(moreFiltersButtonContainer.value, false);
  }
};

const toggleFilters = () => {
  if (open.value === true) {
    closeFilters();
  } else {
    openFilters();
  }
};

const setReadyForFocus = (newState: boolean) => () => {
  readyForFocus.value = newState;
};

const openFilter = (key: string) => {
  stateFilter[`${key}${Suffix.Filter}`] = true;
}

const closeFilter = (key: string) => {
  stateFilter[`${key}${Suffix.Filter}`] = false;
}

const toggleFilter = (key: string) => {
  if (stateFilter[`${key}${Suffix.Filter}`] === true) {
    closeFilter(key);
  } else {
    openFilter(key);
  }
}

const openFilterShortcut = (key: string) => {
  stateFilter[`${key}${Suffix.Shortcut}`] = true;
}

const closeFilterShortcut = (key: string) => {
  stateFilter[`${key}${Suffix.Shortcut}`] = false;
}

const toggleFilterShortcut = (key: string) => {
  if (stateFilter[`${key}${Suffix.Shortcut}`] === true) {
    closeFilterShortcut(key);
  } else {
    openFilterShortcut(key);
  }
}

const transformFilters = (filters: FilterInterface[]) => {
  const transformedActions: Required<TransformedFiltersProps[]> = [];

  getShortcutFilters(filters).forEach((filter) => {
    const {key, label, disabled} = filter;

    transformedActions.push({
      popoverContent: filter,
      popoverOpen: Boolean(stateFilter[`${key}${Suffix.Shortcut}`]),
      key,
      content: label,
      disabled,
      onAction: () => toggleFilterShortcut(key),
    });
  });
  return transformedActions;
}

const handleClearAll = () => {
  emits('clear-all');

  moreFiltersDoneButtonContainer.value &&
    focusFirstFocusableNode(
      moreFiltersDoneButtonContainer.value,
      false,
    );
};

const handleClearTextField = (id?: string) => {
  emits('query-clear', id);
};

const handleQueryChange = (event) => {
  emits('update:modelValue', event.target.value);
  emits('query-change', event.target.value || '')
};

const getShortcutFilters = (filters: FilterInterface[]) => {
  return filters.filter((filter) => filter.shortcut === true);
};

const hasRemoveHandler = (key: string) => {
  const handler = getAppliedFilterRemoveHandler(key);

  if (handler) {
    return true;
  }

  return null;
}

const removeHandler = (key: string) => {
  const handler = getAppliedFilterRemoveHandler(key);
  if (handler) {
    return handler(key);
  }

  return null;
};

provide('withinFilterContext', true);
</script>
<style lang="scss">
@import 'polaris/polaris-react/src/components/Filters/Filters.scss';
</style>
