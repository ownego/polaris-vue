<template lang="pug">
template(v-if="(allowFiltering || filterActions) && hasManyActions && isFilterable")
  Box(
    padding="200",
    :padding-block-end="totalFilteredActions > 0 ? '0' : '200'",
  )
    TextField(
      clear-button,
      label-hidden,
      :label="filterLabel || i18n.translate('Polaris.ActionList.SearchField.placeholder')",
      :placeholder="filterLabel || i18n.translate('Polaris.ActionList.SearchField.placeholder')",
      autoComplete="off"
      :value="searchText"
      @change="(value) => setSearchText(value)",
      @clear-button-click="() => setSearchText('')"
    )
      template(#prefix)
        Icon(:source="SearchIcon")
Box(
  :as="HasMultipleSections ? 'ul' : 'div'",
  ref="actionListRef",
  :role="elementRole",
  :tabindex="elementTabIndex",
)
  //- Listeners
  template(v-if="actionRole === 'menuitem'")
    KeypressListener(
      keyEvent="keydown",
      :keyCode="Key.DownArrow",
      :handler="handleFocusNextItem",
    )
    KeypressListener(
      keyEvent="keydown",
      :keyCode="Key.UpArrow"
      :handler="handleFocusPreviousItem",
    )
  //- SectionMarkup
  template(v-for="section, index in finalSections")
    Section(
      v-if="section.items && section.items.length > 0",
      :key="section.title || index",
      :section="section",
      :hasMultipleSections="HasMultipleSections",
      :actionRole="actionRole",
      @action-any-item="emits('action-any-item')",
    )
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  Box,
  TextField,
  Icon,
  KeypressListener,
} from '@/components';
import { ActionListSection as Section } from './components';
import SearchIcon from '@icons/SearchIcon.svg';
import {
  wrapFocusNextFocusableMenuItem,
  wrapFocusPreviousFocusableMenuItem,
} from '@/utilities/focus';
import useFilterActions from '@/use/useFilterActions';
import useI18n from '@/use/useI18n';
import { Key } from '@/utilities/types';
import type { ActionListItemDescriptor, ActionListSection } from '@/utilities/types';

interface ActionListProps {
  /** Collection of actions for list */
  items?: ActionListItemDescriptor[];
  /** Collection of sectioned action items */
  sections?: ActionListSection[];
  /** Defines a specific role attribute for each action in the list */
  actionRole?: 'menuitem' | string;
  /** Allow users to filter items in the list. Will only show if more than 8 items in the list. The item content of every items must be a string for this to work */
  allowFiltering?: boolean;
  /** Filter label used as a placeholder in the search field */
  filterLabel?: string;
}

const FILTER_ACTIONS_THRESHOLD = 8;

const props = defineProps<ActionListProps>();
const emits = defineEmits<{
  /** Callback when any item is clicked or keypressed */
  'action-any-item': [];
}>();

const filterActions = useFilterActions();
const i18n = useI18n();

const searchText = ref<string>('');
const actionListRef = ref<HTMLElement | null>(null);

const finalSections = computed(() => {
  if (props.items) {
    return [{ items: props.items }, ...(props.sections || [])];
  }

  if (props.sections) {
    return props.sections;
  }

  return [];
});
const isFilterable = computed(() => finalSections.value?.some((section) =>
  section.items.some((item) => typeof item.content === 'string')));
const HasMultipleSections = computed(() => finalSections.value?.length > 1 || false);
const elementRole = computed(() => HasMultipleSections.value && props.actionRole === 'menuitem' ? 'menu' : undefined);
const elementTabIndex = computed(() => HasMultipleSections.value && props.actionRole === 'menuitem' ? -1 : undefined);
const filteredSections = computed(() => {
  return finalSections.value?.map((section) => ({
    ...section,
    items: section.items.filter(({content}) =>
      typeof content === 'string'
        ? content?.toLowerCase().includes(searchText.value.toLowerCase())
        : content,
    ),
  }));
});
const totalActions = computed(() =>  finalSections.value?.reduce(
  (acc: number, section) => acc + section.items.length,
  0,
) || 0
);
const totalFilteredActions = computed(() => {
  const totalSectionItems =
    filteredSections.value?.reduce(
      (acc, section) => acc + section.items.length,
      0,
    ) || 0;

  return totalSectionItems;
});

const hasManyActions = computed(() => totalActions.value >= FILTER_ACTIONS_THRESHOLD);

const setSearchText = (value: string) => {
  searchText.value = value;
};

const handleFocusPreviousItem = (evt: KeyboardEvent) => {
  evt.preventDefault();
  if (actionListRef.value && evt.target) {
    if (actionListRef.value.contains(evt.target as HTMLElement)) {
      wrapFocusPreviousFocusableMenuItem(
        actionListRef.value,
        evt.target as HTMLElement,
      );
    }
  }
};

const handleFocusNextItem = (evt: KeyboardEvent) => {
  evt.preventDefault();
  if (actionListRef.value && evt.target) {
    if (actionListRef.value.contains(evt.target as HTMLElement)) {
      wrapFocusNextFocusableMenuItem(
        actionListRef.value,
        evt.target as HTMLElement,
      );
    }
  }
};
</script>
