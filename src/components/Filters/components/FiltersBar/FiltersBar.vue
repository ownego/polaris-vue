<template lang="pug">
div(
  aria-live="polite",
  :class="filterWrapperClass",
  :style="mountedStateStyles",
)
  div(:class="classNames(styles.FiltersInner)")
    div(:class="classNames(styles.FiltersStickyArea)")
      //- pinnedFiltersMarkup
      template(v-for="filter in pinnedFilters", :key="filter.key")
        FilterPill(
          v-bind="filter",
          :initial-active="hasMounted && !filter.pinned && !appliedFilter(filter.key)",
          :label="appliedFilter(filter.key)?.label || filter.label",
          :filter-key="filter.key",
          :disabled="filter.disabled || disableFilters",
          :close-on-child-overlay-click="closeOnChildOverlayClick",
          @remove="handleFilterPillRemove(filter.key)",
        )
      //- Add Button
      div(
        v-if="shouldShowAddButton",
        :class="addButtonClassName",
      )
        Popover(
          :active="popoverActive && !disabled",
          @close="togglePopoverActive",
        )
          template(#activator)
            div
              UnstyledButton(
                type="button",
                :class="styles.AddFilter",
                :aria-label="i18n.translate('Polaris.Filters.addFilter')",
                :disabled="disabled || (unsectionedFilters.length === 0 && sectionedFilters.length === 0) || disableFilters",
                @click="handleAddFilterClick",
              )
                Text(:variant="labelVariant", as="span") {{ i18n.translate('Polaris.Filters.addFilter') }}{{' '}}
          ActionList(
            action-role="menuitem",
            :items="unsectionedFilters",
            :sections="sectionedFilters",
          )
      //- Clear All Markup
      div(
        v-if="appliedFilters?.length || localPinnedFilters.length",
        :class="clearAllClassName",
      )
        Button(
          size="micro",
          variant="monochromePlain",
          @click="handleClearAllFilters",
        ) {{ i18n.translate('Polaris.Filters.clearFilters') }}
  Box(
    v-if="hideQueryField",
    padding-inline-end="300",
    padding-block-end="200",
    padding-block-start="200",
  )
    InlineStack(
      align="start",
      block-align="center",
      :gap="{ xs: '400', md: '300' }",
    )
      slot
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import {
  Popover,
  ActionList,
  Text,
  UnstyledButton,
  InlineStack,
  Box,
  Button,
} from '@/components';
import FilterPill from '../FilterPill/FilterPill.vue';
import { useOnValueChange } from '@/utilities/use-on-value-change';
import { classNames } from '@/utilities/css';
import { useBreakpoints } from '@/utilities/breakpoints';
import type {
  ActionListItemDescriptor,
  AppliedFilterInterface,
  FilterInterface,
} from '@/utilities/types';
import useI18n from '@/use/useI18n';
import styles from '@polaris/components/Filters/Filters.module.scss';

interface FiltersBarProps {
  /** Currently entered text in the query field */
  queryValue?: string;
  /** Placeholder text for the query field. */
  queryPlaceholder?: string;
  /** Whether the query field is focused. */
  focused?: boolean;
  /** Available filters added to the filter bar. Shortcut filters are pinned to the front of the bar. */
  filters: FilterInterface[];
  /** Applied filters which are rendered as filter pills. The remove callback is called with the respective key. */
  appliedFilters?: AppliedFilterInterface[];
  /** Disable all filters. */
  disabled?: boolean;
  /** Hide the query field. */
  hideQueryField?: boolean;
  /** Disable the filters */
  disableFilters?: boolean;
  /** Whether the filter should close when clicking inside another Popover. */
  closeOnChildOverlayClick?: boolean;
  mountedStateStyles?: any;
}

type FilterBarEvents = {
  /** Callback when the reset all button is pressed. */
  'clear-all': [];
  /** Callback when the add filter button is clicked. */
  'add-filter-click': [];
};

const props = defineProps<FiltersBarProps>();
const emits = defineEmits<FilterBarEvents>();

const i18n = useI18n();
const breakpoints = useBreakpoints();

const popoverActive = ref(false);
const hasMounted = ref(false);

const togglePopoverActive = () => {
  popoverActive.value = !popoverActive.value;
};

const handleAddFilterClick = () => {
  emits('add-filter-click');
  togglePopoverActive();
};

const appliedFilterKeys = computed(() => props.appliedFilters?.map((filter) => filter.key) || []);
const pinnedFiltersFromPropsAndAppliedFilters = computed<FilterInterface[]>(() => {
  return props.filters.filter((filter) => {
    const isPinnedOrApplied = Boolean(filter.pinned || appliedFilterKeys.value.includes(filter.key));

    return isPinnedOrApplied;
  });
});

const localPinnedFilters = ref<string[]>(
  pinnedFiltersFromPropsAndAppliedFilters.value.map((filter) => filter.key),
);

useOnValueChange(props.filters.length, () => {
  localPinnedFilters.value = pinnedFiltersFromPropsAndAppliedFilters.value.map((filter) => filter.key);
});

const pinnedFilters = computed(() => {
  return localPinnedFilters.value
    .map((key) => props.filters.find((filter) => filter.key === key))
    .reduce<FilterInterface[]>(
      (acc, filter) => (filter ? [...acc, filter] : acc),
      [],
    );
});

const onFilterClick = (filter: FilterInterface) => {
  setTimeout(() => {
    localPinnedFilters.value = [
      ...new Set([...localPinnedFilters.value, filter.key]),
    ];
    filter.onAction?.();
    togglePopoverActive();
  }, 0);
};

const filterToActionItem = (filter: FilterInterface) => ({
  ...filter,
  content: filter.label,
  onAction: () => { onFilterClick(filter) },
});


const unpinnedFilters = computed(() => props.filters.filter(
  (filter) => !pinnedFilters.value.some(({key}) => key === filter.key),
));

const unsectionedFilters = computed(() => unpinnedFilters.value
  .filter((filter) => !filter.section && !filter.hidden)
  .map(filterToActionItem));

const sectionedFilters = computed(() => unpinnedFilters.value
  .filter((filter) => filter.section)
  .reduce(
    (acc, filter) => {
      const filterActionItem = filterToActionItem(filter);
      const sectionIndex = acc.findIndex(
        (section) => section.title === filter.section,
      );

      if (sectionIndex === -1) {
        acc.push({
          title: filter.section!,
          items: [filterActionItem],
        });
      } else {
        acc[sectionIndex].items.push(filterActionItem);
      }

      return acc;
    },
    [] as {
      title: string;
      items: ActionListItemDescriptor[];
    }[],
  ));

const hasOneOrMorePinnedFilters = computed(() => pinnedFilters.value.length >= 1);

const labelVariant = computed(() => breakpoints.value.mdDown ? 'bodyLg' : 'bodySm');

const shouldShowAddButton = computed(() => props.filters.some((filter) => !filter.pinned));
const filterWrapperClass = computed(() => classNames(
  styles.FilterWrapper,
  shouldShowAddButton.value &&
    hasOneOrMorePinnedFilters.value &&
    styles.FilterWrapperWithAddButton,
));
const addButtonClassName = computed(() => classNames(
  styles.AddFilterActivator,
  hasOneOrMorePinnedFilters.value && styles.AddFilterActivatorMultiple,
));
const clearAllClassName = computed(() => classNames(
  styles.ClearAll,
  hasOneOrMorePinnedFilters.value &&
    shouldShowAddButton.value &&
    styles.MultiplePinnedFilterClearAll,
));

const appliedFilter = (filterKey: string) => {
  return props.appliedFilters?.find((filter) => filter.key === filterKey);
};

const handleFilterPillRemove = (filterKey: string) => {
  const appliedFiltered = appliedFilter(filterKey);
  localPinnedFilters.value = localPinnedFilters.value.filter((key) => key !== filterKey);

  appliedFiltered?.onRemove(filterKey);
};

const handleClearAllFilters = () => {
  localPinnedFilters.value = [];

  emits('clear-all');
}

onMounted(() => {
  hasMounted.value = true;
});
</script>
