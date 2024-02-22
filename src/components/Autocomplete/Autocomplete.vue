<template lang="pug">
Combobox(
  :allow-multiple="allowMultiple",
  :preferred-position="preferredPosition",
  :will-load-more-options="willLoadMoreResults",
  @scrolled-to-bottom="emits('load-more-results')",
)
  template(#activator)
    slot(name="textField")

  Listbox(
    :auto-selection="autoSelection",
    @select="updateSelection",
  )
    MappedAction(
      v-if="actionBefore",
      v-bind="actionBefore",
    )

    div(
      v-if="isSection(conditionalOptions) && !noOptions",
      :class="styles.SectionWrapper",
    )
      template(
        v-for="{ options, title } in conditionalOptions",
        :key="title",
      )
        ListboxSection(
          v-if="options.length > 0",
          :divider="false",
        )
          template(#title)
            ListboxHeader {{ title }}

          MappedOption(
            v-for="option in options",
            :key="option.id || option.value",
            v-bind="option",
            :selected="selected.includes(option.value)",
            :single-selection="!allowMultiple",
          )

    template(v-else-if="!isSection(conditionalOptions) && !noOptions")
      ListboxSection(
        v-if="listTitle",
        :divider="false",
      )
        template(#title)
          ListboxHeader {{ listTitle }}

        MappedOption(
          v-for="option in conditionalOptions",
          :key="option.id || option.value",
          v-bind="option",
          :selected="selected.includes(option.value)",
          :single-selection="!allowMultiple",
        )

      template(v-else)
        MappedOption(
          v-for="option in conditionalOptions",
          :key="option.id || option.value",
          v-bind="option",
          :selected="selected.includes(option.value)",
          :single-selection="!allowMultiple",
        )

    ListboxLoading(
      v-if="loading",
      :accessibility-label="i18n.translate('Polaris.Autocomplete.spinnerAccessibilityLabel')",
    )

    div(
      v-if="hasSlot(slots.emptyState) && options.length === 0 && !loading",
      role="status"
    )
      slot(name="emptyState")

</template>

<script setup lang="ts">
import { type VNode, computed } from 'vue';
import type {
  ActionListItemDescriptor,
  OptionDescriptor,
  SectionDescriptor,
  VueNode,
} from '@/utilities/types';
import { isSection } from '@/utilities/options';
import useI18n from '@/use/useI18n';
import { Combobox, type PopoverProps } from '@/components';
import { AutoSelection } from '@/components/Listbox/utils';
import { useHasSlot } from '@/use/useHasSlot';

import { MappedAction, MappedOption } from './components';
import styles from '@polaris/components/Autocomplete/components/MappedAction/MappedAction.module.scss';
import { Listbox, ListboxHeader, ListboxSection, ListboxLoading } from '../Listbox';

type AutocompleteProps = {
  /** A unique identifier for the Autocomplete */
  id?: string;
  /** Collection of options to be listed */
  options: SectionDescriptor[] | OptionDescriptor[];
  /** The selected options */
  selected: string[];
  /** The preferred direction to open the popover */
  preferredPosition?: PopoverProps['preferredPosition'];
  /** Title of the list of options */
  listTitle?: string;
  /** Allow more than one option to be selected */
  allowMultiple?: boolean;
  /** An action to render above the list of options */
  actionBefore?: ActionListItemDescriptor & {
    /** Specifies that if the label is too long it will wrap instead of being hidden  */
    wrapOverflow?: boolean;
  };
  /** Display loading state */
  loading?: boolean;
  /** Indicates if more results will load dynamically */
  willLoadMoreResults?: boolean;
};

type AutocompleteSlots = {
  /** The text field component attached to the list of options */
  textField: (_?: VueNode) => VNode[];
  /** The content to display inside the popover */
  default: (_?: VueNode) => VNode[];
  /** Is rendered when there are no options */
  emptyState: (_?: VueNode) => VNode[];
};

type AutocompleteEvents = {
  /** Callback when the selection of options is changed */
  'select': [selected: string[]];
  /** Callback when the end of the list is reached */
  'load-more-results': [];
}

const props = defineProps<AutocompleteProps>();
const slots = defineSlots<AutocompleteSlots>();
const emits = defineEmits<AutocompleteEvents>();

const i18n = useI18n();
const { hasSlot } = useHasSlot();

const autoSelection = computed(() => props.actionBefore ? AutoSelection.First : undefined);

const conditionalOptions = computed(() => props.loading && !props.willLoadMoreResults ? [] : props.options);

const noOptions = computed(() => {
  if (isSection(conditionalOptions.value)) {
    return conditionalOptions.value.every((section) => section.options.length === 0);
  }

  return conditionalOptions.value.length === 0;
});

const updateSelection = (newSelection: string) => {
  if (props.actionBefore && newSelection === props.actionBefore.content) {
    props.actionBefore.onAction && props.actionBefore.onAction();
    return;
  }

  if (props.allowMultiple) {
    if (props.selected.includes(newSelection)) {
      emits('select', props.selected.filter((option) => option !== newSelection));
    } else {
      emits('select', [...props.selected, newSelection]);
    }
  } else {
    emits('select', [newSelection]);
  }
};
</script>
