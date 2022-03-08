<template lang="pug">
Labelled(
  :id="selectId",
  :error="error",
  :action="labelAction",
  :label-hidden="selectLabelHidden",
  :required-indicator="requiredIndicator",
)
  template(
    v-if="!labelInline && slots['label']",
    #label,
  )
    slot(name="label")
  template(
    #help-text
    v-if="slots['help-text']",
  )
    slot(name="help-text")
  div(:class="className")
    select(
      :id="selectId",
      :name="name",
      :class="styles.Input",
      :disabled="disabled",
      :value="modelValue",
      :aria-invalid="!!error",
      :aria-describedby="describedBy.join(' ') || undefined",
      :aria-required="requiredIndicator",
      @focus="$emit('focus')",
      @blur="$emit('blur')",
      @change="handleChange",
    )
      template(
        v-for="option in optionsMarkup",
      )
        optgroup(
          v-if="isGroup(option)",
          :label="getOptionTitle(option)",
          :key="getOptionTitle(option)",
        )
          template(
            v-for="opt in getGroupOptions(option)",
            :key="opt.value",
          )
            option(
              :value="opt.value",
              :disabled="opt.disabled",
            ) {{ opt.label }}
        option(
          v-else,
          :key="getHideableStrictOption(option).value",
          :value="getHideableStrictOption(option).value",
          :disabled="getHideableStrictOption(option).disabled",
        ) {{ getHideableStrictOption(option).label }}

    div(
      :class="styles.Content",
      aria-hidden,
      :aria-disabled="disabled",
    )
      span(
        v-if="labelInline",
        :class="styles.InlineLabel"
      )
        slot(name="label")
      div(
        v-if="$slots[`prefix-${selectedOption.id}`]",
        :class="styles.Prefix",
      )
        slot(:name="`prefix-${selectedOption.id}`")
      span(:class="styles.SelectedOption")
        slot(
          v-if="$slots[`label-${selectedOption.id}`]",
          :name="`label-${selectedOption.id}`"
        )
        template(v-else) {{ selectedOption.label }}
      span(:class="styles.Icon")
        Icon(:source="SelectMinor")
    div(:class="styles.Backdrop")
</template>

<script setup lang="ts">
import { computed, useSlots, isProxy } from 'vue';
import type { Action, Error } from 'types/type';
import { classNames } from 'polaris-react/src/utilities/css';
import { UseUniqueId } from '@/use';
import styles from '@/classes/Select.json';
import SelectMinor from '@icons/SelectMinor.svg';
import type { StrictOption, SelectOption, SelectGroup, HideableStrictOption, StrictGroup } from './utils';
import { Icon } from '../Icon';
import { Labelled } from '../Labelled';
import { helpTextID } from '../Labelled/utils';

/**
 * Setup
 */
interface SelectProps {
  /** List of options or option groups to choose from */
  options: (SelectOption | SelectGroup)[];
  /** Label for the select */
  /** Adds an action to the label */
  labelAction?: Action;
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Show the label to the left of the value, inside the control */
  labelInline?: boolean;
  /** Disable input */
  disabled?: boolean;
  /** Example text to display as placeholder */
  placeholder?: string;
  /** ID for form input */
  id?: string;
  /** Name for form input */
  name?: string;
  /** Value for form input */
  value?: string;
  /** Display an error state */
  error?: Error | boolean;
  /** Visual required indicator, add an asterisk to label */
  requiredIndicator?: boolean;
  /** Value for v-model binding */
  modelValue?: string;
}

const props = defineProps<SelectProps>();

const emits = defineEmits<{
  (event: 'focus'): void
  (event: 'blur'): void
  (event: 'change', value: SelectProps['modelValue']): void
  (event: 'update:modelValue', value: SelectProps['modelValue']): void
}>();

const slots = useSlots();

const { useUniqueId } = UseUniqueId();

const describedBy: string[] = [];

/**
 * Computed
 */
const selectId = computed(() => useUniqueId('Select', props.id));

const selectLabelHidden = computed(() => props.labelInline ? true : props.labelHidden);

const className = computed(() => classNames(
  styles.Select,
  props.error && styles.error,
  props.disabled && styles.disabled,
));

// Ungroups an options array
const flattenOptions = computed(() => {
  let flatOptions: HideableStrictOption[] = [];

  normalizedOptions.value.forEach((optionOrGroup) => {
    if (isGroup(optionOrGroup)) {
      const optionGroup = optionOrGroup as StrictGroup;
      flatOptions = flatOptions.concat(optionGroup.options);
    } else {
      flatOptions.push(optionOrGroup as HideableStrictOption);
    }
  });
  return flatOptions;
});

// Gets the text to display in the UI, for the currently selected option
const selectedOption = computed(() => {
  let selected = flattenOptions.value.find((option) => props.modelValue === option.value);

  if (selected === undefined) {
    // Get the first visible option (not the hidden placeholder)
    selected = flattenOptions.value.find((option) => !option.hidden);
  }

  return selected || { value: '', label: '' };
});

const optionsMarkup = computed(() => {
  return normalizedOptions.value.map((opt) => normalizeOption(opt));
});

const normalizedOptions = computed(() => {
  let nOptions: (StrictOption | StrictGroup)[] = props.options.map(normalizeOption);

  // Add placeholder option to the first of the list
  if (props.placeholder) {
    nOptions.unshift({
      label: props.placeholder,
      value: '',
      disabled: true,
    });
  }

  return nOptions;
});

/**
 * Created
 */
if (slots['help-text']) {
  describedBy.push(helpTextID(props.id || ''));
}

if (props.error) {
  describedBy.push(`${props.id}Error`);
}

/**
 * Methods
 */
const isString = (option: SelectOption | SelectGroup): boolean => {
  return typeof option === 'string';
}

const isGroup = (option: SelectOption | SelectGroup): boolean => {
  return typeof option === 'object'
    && 'options' in option
    && option.options != null;
}

const handleChange = (event: Event) => {
  emits('update:modelValue', (event.target as HTMLSelectElement).value);
  emits('change', (event.target as HTMLSelectElement).value);
}

const getOptionTitle = (option: StrictOption | StrictGroup): string => {
  if (isGroup(option)) {
    return (option as StrictGroup).title;
  }

  return (option as HideableStrictOption).label;
}

const getHideableStrictOption = (option: StrictOption | StrictGroup): HideableStrictOption => {
  if (isGroup(option)) {
    return {
      label: (option as StrictGroup).title,
      value: '',
      disabled: true,
      hidden: true,
    };
  }

  return option as HideableStrictOption;
}

const getGroupOptions = (option: StrictGroup | HideableStrictOption): StrictOption[] => {
  if (isGroup(option)) {
    return (option as StrictGroup).options;
  }

  return [];
}

function normalizeStringOption(option: string): StrictOption {
  return {
    label: option,
    value: option,
  }
}

/**
 * Converts a string option (and each string option in a Group) into
 * an Option object.
 */
function normalizeOption(
  option: SelectOption | SelectGroup,
): HideableStrictOption | StrictGroup {
  if (isString(option)) {
    return normalizeStringOption(option as string);
  }

  if (isGroup(option)) {
    const { title, options } = option as SelectGroup;
    return {
      title,
      options: options.map((opt) => (
        isString(opt)
          ? normalizeStringOption(opt as string)
          : opt
      )) as StrictOption[],
    };
  }
  return option as HideableStrictOption;
}

</script>

<style lang="scss">
@import 'polaris-react/src/components/Select/Select.scss';
</style>
