<template lang="pug">
Combobox(
  :allowMultiple="allowMultiple",
  :preferredPosition="preferredPosition",
  :willLoadMoreOptions="willLoadMoreResults",
  @scrolled-to-bottom="$emit('load-more-results')",
)
  template(#activator)
    slot(name="textField")
  Listbox(
    v-if="isShowAction || isShowOptions || loading || isShowEmptyState",
    :auto-selection="autoSelection",
    @select="updateSelection",
  )
    MappedAction(v-if="isShowAction", v-bind="actionBefore")
      template(v-if="hasSlot(slots['action-prefix'])", #prefix)
        slot(name="action-prefix")
      template(v-if="hasSlot(slots['action-suffix'])", #suffix)
        slot(name="action-suffix")
      template(v-if="hasSlot(slots['action-helpText'])", #helpText)
        slot(name="action-helpText")
    template(v-if="isShowOptions && (!loading || willLoadMoreResults)")
      div(
        v-if="isSection(conditionalOptions) && !noOptionsAvailable",
        :class="styles.SectionWrapper",
      )
        template(
          v-for="opt in sectionOptions",
          :key="opt.title",
        )
          ListboxSection(
            v-if="opt.options.length > 0",
            :divider="false",
          )
            template(#title)
              ListboxHeader {{ opt.title }}
            MappedOption(
              v-for="option in opt.options",
              :key="option.id || option.value",
              v-bind="option",
              :selected="modelValue.includes(option.value)",
              :singleSelection="!allowMultiple",
            )
              template(v-if="hasSlot(slots[`option-media-${option.id}`])", #media)
                slot(:name="`option-media-${option.id}`")
      ListboxSection(
        v-else-if="listTitle",
        :divider="false",
      )
        template(#title)
          ListboxHeader {{ listTitle }}
        MappedOption(
          v-for="option in optionDescriptorOptions",
          v-if="conditionalOptions.length > 0",
          :key="option.id || option.value",
          v-bind="option",
          :selected="modelValue.includes(option.value)",
          :singleSelection="!allowMultiple",
        )
          template(v-if="hasSlot(slots[`option-media-${option.id}`])", #media)
            slot(:name="`option-media-${option.id}`")
      MappedOption(
        v-for="option in optionDescriptorOptions",
        v-else-if="conditionalOptions.length > 0",
        :key="option.id || option.value",
        v-bind="option",
        :selected="modelValue.includes(option.value)",
        :singleSelection="!allowMultiple",
      )
        template(v-if="hasSlot(slots[`option-media-${option.id}`])", #media)
          slot(:name="`option-media-${option.id}`")
    ListboxLoading(
      v-if="loading",
      :accessibilityLabel="i18n.translate('Polaris.Autocomplete.spinnerAccessibilityLabel')",
    )
    div(
      v-if="isShowEmptyState",
      role="status",
    )
      slot(name="emptyState")
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { UseI18n } from '@/use';
import { hasSlot } from '@/utilities/has-slot';
import type { OptionDescriptor, SectionDescriptor } from '@/utilities/interface';
import type { PopoverProps } from '@/components/Popover/utils';
import type { ActionListItemDescriptor } from '@/components/ActionList/utils';
import { Combobox, Listbox, ListboxSection, ListboxHeader, ListboxLoading } from '@/components';
import { AutoSelection } from '@/components/Listbox/utils';
import { MappedAction, MappedOption } from './components';
import styles from '@/classes/Autocomplete.json';

interface AutocompleteProps {
  /** A unique identifier for the Autocomplete */
  id?: string;
  /** Collection of options to be listed */
  options: SectionDescriptor[] | OptionDescriptor[];
  /** The selected options */
  modelValue: string[];
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
}

const props = defineProps<AutocompleteProps>();

const slots = useSlots();
const i18n = UseI18n();

const emits = defineEmits<{
  (e: 'select', value: string[]): void;
  (e: 'update:modelValue', value: string[]): void;
  (e: 'load-more-results'): void;
}>();

const autoSelection = computed(() => props.actionBefore ? AutoSelection.First : undefined);

const conditionalOptions = computed(() => props.loading && !props.willLoadMoreResults ? [] : props.options);

const sectionOptions = computed(() => {
  return conditionalOptions.value as SectionDescriptor[];
});

const optionDescriptorOptions = computed(() => {
  return conditionalOptions.value as OptionDescriptor[];
});

const noOptionsAvailable = computed(() => {
  const tmpConditional = conditionalOptions.value.some((opt: Record<string, any>) => opt && opt.options.length !== 0);
  return !tmpConditional;
});

const isShowAction = computed(() => !!props.actionBefore);

const isShowOptions = computed(() => {
  if (isSection(conditionalOptions.value)) {
    if (noOptionsAvailable.value) {
      return false;
    } else {
      return true;
    }
  }

  if (props.listTitle) {
    return true;
  }

  if (conditionalOptions.value.length > 0) {
    return true;
  }

  return false;
});

const isShowEmptyState = computed(() => {
  return hasSlot(slots.emptyState) && props.options.length < 1 && !props.loading;
});

const updateSelection = (newSelection: string) => {
  if (props.allowMultiple) {
    if (props.modelValue.includes(newSelection)) {
      emits('select', props.modelValue.filter((option) => option !== newSelection));
      emits('update:modelValue', props.modelValue.filter((option) => option !== newSelection));
    } else {
      emits('select', [...props.modelValue, newSelection]);
      emits('update:modelValue', [...props.modelValue, newSelection]);
    }
  } else {
    emits('select', [newSelection]);
    emits('update:modelValue', [newSelection]);
  }
};

const isSection = (options: SectionDescriptor[] | OptionDescriptor[]): boolean => {
  const tmpOptions = options as SectionDescriptor[];
  return tmpOptions[0] && typeof tmpOptions[0] === 'object' && tmpOptions[0].options !== undefined;
};
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Autocomplete/Autocomplete.scss';
</style>
