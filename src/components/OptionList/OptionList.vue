<template lang="pug">
ul(:class="styles.OptionList", :role="role")
  template(v-if="optionsExist")
    li(
      v-for="optionItem, sectionIndex in normalizedOptions",
      :key="optionItem.title || `noTitle-${sectionIndex}`",
    )
      p(
        v-if="optionItem.title",
        :class="styles.Title",
      ) {{ optionItem.title }}
      ul(
        :class="styles.Options",
        :id="`${uniqueId}-${sectionIndex}`",
        :role="role",
      )
        template(v-if="optionItem.options")
          OptionItem(
            v-for="option, optionIndex in optionItem.options",
            :key="option.id || `${uniqueId}-${sectionIndex}-${optionIndex}`",
            :id="option.id || `${uniqueId}-${sectionIndex}-${optionIndex}`",
            :section="sectionIndex",
            :index="optionIndex",
            v-bind="option",
            :select="modelValue.includes(option.value)",
            :allowMultiple="allowMultiple",
            :verticalAlign="verticalAlign",
            :role="optionRole",
            @click="handleClick",
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
import { ref, computed, watch, useSlots } from 'vue';
import { arraysAreEqual } from 'polaris/polaris-react/src/utilities/arrays';
import { UseUniqueId } from '@/use';
import type { OptionDescriptor, SectionDescriptor } from '@/utilities/interface';
import styles from '@/classes/OptionList.json';
import { Option as OptionItem } from './components/Option';

type Alignment = 'top' | 'center' | 'bottom';

interface OptionListProps {
  /** A unique identifier for the option list */
  id?: string;
  /** List title */
  title?: string;
  /** Collection of options to be listed */
  options?: OptionDescriptor[];
  /** Defines a specific role attribute for the list itself */
  role?: 'listbox' | 'combobox' | string;
  /** Defines a specific role attribute for each option in the list */
  optionRole?: string;
  /** Sections containing a header and related options */
  sections?: SectionDescriptor[];
  /** The selected options */
  modelValue: string[];
  /** Allow more than one option to be selected */
  allowMultiple?: boolean;
  /** Vertically align child content to the center, top, or bottom.  */
  verticalAlign?: Alignment;
}

const props = defineProps<OptionListProps>();

const slots = useSlots();

const emits = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
  (e: 'change', value: string[]): void;
}>();

const normalizedOptions = ref<SectionDescriptor[]>(createNormalizedOptions(props.options, props.sections, props.title));

const { useUniqueId } = UseUniqueId();
const uniqueId = useUniqueId('OptionList', props.id);

const handleClick = (sectionIndex: number, optionIndex: number) => {
  const selectedValue = normalizedOptions.value[sectionIndex].options[optionIndex].value;
  const foundIndex = props.modelValue.indexOf(selectedValue);
  if (props.allowMultiple) {
    const newSelection =
      foundIndex === -1
        ? [selectedValue, ...props.modelValue]
        : [
          ...props.modelValue.slice(0, foundIndex),
          ...props.modelValue.slice(foundIndex + 1, props.modelValue.length),
        ];
    emits('update:modelValue', newSelection);
    emits('change', newSelection);
    return;
  }
  emits('update:modelValue', [selectedValue]);
  emits('change', [selectedValue]);
};

const optionsExist = computed(() => normalizedOptions.value.length > 0);

watch(
  () => [props.options, props.sections, props.title],
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      normalizedOptions.value = createNormalizedOptions(props.options || [], props.sections || [], props.title);
    }
  },
);

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

function testSectionsPropEquality(
  previousSection: SectionDescriptor,
  currentSection: SectionDescriptor,
) {
  const {options: previousOptions} = previousSection;
  const {options: currentOptions} = currentSection;
  const optionsAreEqual = arraysAreEqual(previousOptions, currentOptions);
  const titlesAreEqual = previousSection.title === currentSection.title;
  return optionsAreEqual && titlesAreEqual;
}
</script>
<style lang="scss">
@import 'polaris/polaris-react/src/components/OptionList/OptionList.scss';
</style>

