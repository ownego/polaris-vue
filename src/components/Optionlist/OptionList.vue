<template lang="pug">
Box(
  as="ul",
  :role="role",
  padding="150",
)
  template(v-if="optionsExist")
    template(
      v-for="{title, options}, sectionIndex in normalizedOptions",
      :key="title || `noTitle-${sectionIndex}`",
    )
      Box(
        as="li",
        :padding-block-start="sectionIndex === 0 ? (title ? '100' : '0') : (title ? '050' : '0')",
      )
        BlockStack(
          :gap="sectionIndex === 0 && sections ? undefined : '0'",
        )
          Box(
            v-if="title",
            :padding-block-start="sectionIndex === 0 ? '050' : '300'",
            padding-inline-start="150",
            padding-block-end="100",
            padding-inline-end="150",
            border-secondary="border-secondary",
          )
            Text(
              :as="sectionIndex === 0 ? 'h2' : 'h3'",
              variant="headingSm",
            ) {{ title }}
          Box(
            as="ul",
            :id="`${id}-${sectionIndex}`",
            :role="role"
          )
            template(v-if="options")
              OptionItem(
                v-for="option, optionIndex in options",
                v-bind="option",
                :key="option.id || `${uniqueId}-${sectionIndex}-${optionIndex}`",
                :id="option.id || `${uniqueId}-${sectionIndex}-${optionIndex}`",
                :section="sectionIndex",
                :index="optionIndex",
                :select="model?.includes(option.value)",
                :allow-multiple="allowMultiple",
                :vertical-align="verticalAlign",
                @click="handleClick",
                @pointer-enter="handlePointerEnter",
                @focus="handleFocus",
              )
                template(#label)
                  slot(
                    v-if="slots[`option-label-${option.id}`]"
                    :name="`option-label-${option.id}`"
                  )
                  template(v-else) {{ option.label }}
                template(#media, v-if="slots[`option-media-${option.id}`]")
                  slot(:name="`option-media-${option.id}`")
</template>

<script setup lang="ts">
import { ref, computed, watch, type VNode } from 'vue';
import {
  Box,
  Text,
  BlockStack,
} from '@/components';
import type { BoxProps } from '@/components/Box/types';
import { Option as OptionItem } from './components/Option';
import type {
  OptionDescriptor,
  SectionDescriptor,
  VueNode,
} from '@/utilities/types';
import useId from '@/use/useId';

type Alignment = 'top' | 'center' | 'bottom';

interface OptionListProps {
  /** A unique identifier for the option list */
  id?: string;
  /** List title */
  title?: string;
  /** Collection of options to be listed */
  options?: OptionDescriptor[];
  /** Defines a specific role attribute for the list itself */
  role?: 'listbox' | 'combobox' | BoxProps['role'] | string;
  /** Defines a specific role attribute for each option in the list */
  optionRole?: string;
  /** Sections containing a header and related options */
  sections?: SectionDescriptor[];
  /** Allow more than one option to be selected */
  allowMultiple?: boolean;
  /** Vertically align child content to the center, top, or bottom.  */
  verticalAlign?: Alignment;
}

type OptionListEvents = {
  /** Callback when an option is changed */
  'change': [selected: string[]];
  /** Callback when pointer enters the option */
  'pointer-enter-option': [selected: string];
  /** Callback when option is focused */
  'focus-option': [selected: string];
};

const props = defineProps<OptionListProps>();
const emits = defineEmits<OptionListEvents>();
const model = defineModel<string[]>();
const slots = defineSlots<{
  [key: string]: (_?: VueNode) => VNode[];
}>();

const uniqueId = useId();

const normalizedOptions = ref<SectionDescriptor[]>(createNormalizedOptions(props.options, props.sections, props.title));

const id = computed(() => props.id || String(uniqueId));
const optionsExist = computed(() => normalizedOptions.value.length > 0);

const handleClick = (sectionIndex: number, optionIndex: number) => {
  const selectedValue =
    normalizedOptions.value[sectionIndex].options[optionIndex].value;
  const foundIndex = model.value?.indexOf(selectedValue);
  if (props.allowMultiple) {
    const newSelection =
      foundIndex === -1
        ? [selectedValue, ...(model.value || [])]
        : [
            ...(model.value?.slice(0, foundIndex) || []),
            ...model.value?.slice((foundIndex || 0) + 1, model.value?.length) || [],
          ];
    emits('change', newSelection);
    return;
  }
  emits('change', [selectedValue]);
};

const handlePointerEnter = (sectionIndex: number, optionIndex: number) => {
  const selectedValue =
    normalizedOptions.value[sectionIndex].options[optionIndex].value;

  emits('pointer-enter-option', selectedValue);
};

const handleFocus = (sectionIndex: number, optionIndex: number) => {
  const selectedValue =
    normalizedOptions.value[sectionIndex].options[optionIndex].value;

  emits('focus-option', selectedValue);
};

function createNormalizedOptions(
  options?: OptionDescriptor[],
  sections?: SectionDescriptor[],
  title?: string,
): SectionDescriptor[] {
  if (!options || !options.length) {
    const section = title ? [{options: [], title}] : [];
    return (!sections || !sections.length) ? [] : [...section, ...sections];
  }
  if (!sections || !sections.length) {
    return [
      {
        title,
        options,
      },
    ];
  }

  return [
    {
      title,
      options,
    },
    ...sections,
  ];
}

watch(
  () => [props.options, props.sections, props.title],
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      normalizedOptions.value = createNormalizedOptions(props.options || [], props.sections || [], props.title);
    }
  },
);
</script>
