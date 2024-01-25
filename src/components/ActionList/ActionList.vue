<template lang="pug">
template(v-if="(allowFiltering || filterActions) && hasManyActions && isFilterable")
  Box(
    padding="200",
    :padding-block-end="totalFilteredActions > 0 ? '0' : '200'",
  )
    TextField(
      clear-button,
      label-hidden,
      :label="i18n.translate('Polaris.ActionList.SearchField.placeholder')",
      :placeholder="i18n.translate('Polaris.ActionList.SearchField.placeholder')",
      autoComplete="off"
      :value="searchText"
      @change="(value) => setSearchText(value)",
      @clear-button-click="() => setSearchText('')"
    )
      template(#prefix)
        Icon(:source="SearchMinor")
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
      @action-any-item="emit('action-any-item')",
    )
      template(v-for="{ prefixId } in section.items" #[`prefix-${prefixId}`])
        slot(:name="`prefix-${prefixId}`")
      template(v-for="{ suffixId } in section.items" #[`suffix-${suffixId}`])
        slot(:name="`suffix-${suffixId}`")
</template>

<script setup lang="ts">
import { type VNode, computed, ref } from 'vue';
import {
  Box,
  TextField,
  Icon,
  KeypressListener,
} from '@/components';
import { Section } from './components';
import SearchMinor from '@icons/SearchMinor.svg';
import {
  wrapFocusNextFocusableMenuItem,
  wrapFocusPreviousFocusableMenuItem,
} from '@/utilities/focus';
import useFilterActions from '@/use/useFilterActions';
import useI18n from '@/use/useI18n';
import { Key } from '@/utilities/types';
import type { ActionListItemDescriptor, ActionListSection, VueNode } from '../../utilities/types';

interface ActionListProps {
  /** Collection of actions for list */
  items?: readonly ActionListItemDescriptor[];
  /** Collection of sectioned action items */
  sections?: readonly ActionListSection[];
  /** Defines a specific role attribute for each action in the list */
  actionRole?: 'menuitem' | string;
  /** Allow users to filter items in the list. Will only show if more than 8 items in the list. The item content of every items must be a string for this to work */
  allowFiltering?: boolean;
}

const FILTER_ACTIONS_THRESHOLD = 8;

type ActionListSlots = {
  /** Slot to custom prefix for each item of ActionList by `prefixId` */
  'prefix-{prefixId}': (_?: VueNode) => VNode[];
  /** Slot to custom suffix for each item of ActionList by `suffixId` */
  'suffix-{suffixId}': (_?: VueNode) => VNode[];
  [key: string]: (_?: VueNode) => VNode[];
}

const props = defineProps<ActionListProps>();
const emit = defineEmits<{
  /** Callback when any item is clicked or keypressed */
  'action-any-item': [];
}>();
const slots = defineSlots<ActionListSlots>();

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
