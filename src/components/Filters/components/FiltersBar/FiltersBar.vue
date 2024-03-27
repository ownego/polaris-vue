<template lang="pug">
div(
  aria-live="polite",
  :class="filterWrapperClass",
)
  div(:class="classNames(styles.FiltersInner)")
    div(:class="classNames(styles.FiltersStickyArea)")
      //- pinnedFiltersMarkup
      template(v-for="filter in pinnedFilters", :key="filter.key")
        FilterPill(
          v-bind="filter",
          :initial-active="hasMounted && !filter.pinned && !appliedFilter(filter.name)",
          :label="appliedFilter(filter.name)?.label || filter.label",
          :filter-key="filter.name",
          :disabled="filter.disabled || disableFilters",
          :close-on-child-overlay-click="closeOnChildOverlayClick",
          :selected="appliedFilterKeys?.includes(filter.name)",
          @remove="handleFilterPillRemove(filter.name)",
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
                :disabled="activatorButtonDisabled",
                :aria-disabled="activatorButtonDisabled",
                @click="handleAddFilterClick",
              )
                Text(:variant="labelVariant", as="span") {{ i18n.translate('Polaris.Filters.addFilter') }}{{' '}}
                PlusIcon
          ActionList(
            action-role="menuitem",
            :items="unsectionedFilters",
            :sections="sectionedFilters",
          )
      //- Clear All Markup
      div(
        v-if="appliedFilters?.length",
        :class="clearAllClassName",
      )
        Button(
          size="micro",
          remove-underline,
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
import { ref, computed, onMounted, watch } from 'vue';
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
import { classNames } from '@/utilities/css';
import { useBreakpoints } from '@/use/useBreakpoints';
import type {
  ActionListItemDescriptor,
  AppliedFilterInterface,
  FilterInterface,
} from '@/utilities/types';
import useI18n from '@/use/useI18n';
import PlusIcon from '@icons/PlusIcon.svg';
import styles from '@polaris/components/Filters/Filters.module.css';

type FiltersBarProps = {
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
};

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

const activatorButtonDisabled = computed(() => {
  return props.disabled || (unsectionedFilters.value.length === 0 && sectionedFilters.value.length === 0) || props.disableFilters;
});
const appliedFilterKeys = computed(() => props.appliedFilters?.map((filter) => filter.name) || []);
const pinnedFiltersFromPropsAndAppliedFilters = computed<FilterInterface[]>(() => {
  return props.filters.filter((filter) => {
    const isPinnedOrApplied = Boolean(filter.pinned || appliedFilterKeys.value.includes(filter.name));

    return isPinnedOrApplied;
  });
});

const localPinnedFilters = ref<string[]>(
  pinnedFiltersFromPropsAndAppliedFilters.value.map((filter) => filter.name),
);

const pinnedFilters = computed(() => {
  return localPinnedFilters.value
    .map((key) => props.filters.find((filter) => filter.name === key))
    .reduce<FilterInterface[]>(
      (acc, filter) => (filter ? [...acc, filter] : acc),
      [],
    );
});

const onFilterClick = (filter: FilterInterface) => {
  setTimeout(() => {
    localPinnedFilters.value = [
      ...new Set([...localPinnedFilters.value, filter.name]),
    ];
    filter.onAction?.();
    togglePopoverActive();
  }, 0);
};

const filterToActionItem = (filter: FilterInterface) => {
  const serialFilters = {
    disabled: filter.disabled,
    suffix: filter.suffix,
  };

  // Only return props that Action List Item needs
  return {
    ...serialFilters,
    content: filter.label,
    onAction: () => {
      onFilterClick(filter);
    },
  };
};


const unpinnedFilters = computed(() => props.filters.filter(
  (filter) => !pinnedFilters.value.some(({name}) => name === filter.name),
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

const shouldShowAddButton = computed(() => props.filters.some((filter) => !filter.pinned) || props.filters.length !== localPinnedFilters.value.length);
const filterWrapperClass = computed(() => classNames(
  styles.FiltersWrapper,
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
const pinnedFromPropsKeys = computed(() => props.filters
  .filter(({pinned}) => pinned)
  .map(({name}) => name));

const appliedFilter = (filterKey?: string) => {
  return props.appliedFilters?.find((filter) => filter.name === filterKey);
};

const handleFilterPillRemove = (filterKey: string) => {
  const appliedFiltered = appliedFilter(filterKey);
  localPinnedFilters.value = localPinnedFilters.value.filter((name) => name !== filterKey);
   localPinnedFilters.value.filter((name) => {
    const isMatchedFilters = name === filterKey;
    const isPinnedFilterFromProps = pinnedFromPropsKeys.value.includes(name);
    return !isMatchedFilters || isPinnedFilterFromProps;
  }),

  appliedFiltered?.onRemove(filterKey);
};

const handleClearAllFilters = () => {
  localPinnedFilters.value = [];

  emits('clear-all');
}

onMounted(() => {
  hasMounted.value = true;
});

watch(
  () => props.filters.length,
  () => {
    localPinnedFilters.value = pinnedFiltersFromPropsAndAppliedFilters.value.map((filter) => filter.name);
  },
);
</script>
