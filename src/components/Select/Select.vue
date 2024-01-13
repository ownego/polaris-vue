<template lang="pug">
Labelled(
  :id="`${id}`",
  :error="error",
  :action="labelAction",
  :label-hidden="labelHidden",
  :required-indicator="requiredIndicator",
  :disabled="disabled",
)
  template(v-if="hasLabel", #label)
    slot(v-if="slots.label", name="label")
    template(v-else) {{ props.label }}
  template(v-if="hasHelpText", #helpText)
    slot(v-if="slots.helpText", name="helpText")
    template(v-else) {{ props.helpText }}

  div(:class="className")
    select(
      :id="`${id}`",
      :name="name",
      :value="value",
      :class="styles.Input",
      :disabled="disabled",
      :aria-invalid="Boolean(error)",
      :aria-describedby="ariaDescribedBy",
      :aria-required="requiredIndicator",
      @focus="handleFocus",
      @blur="handleBlur",
      @change="handleChange",
    )
      template(v-for="optOrGroup in optionsMarkup")
        optgroup(
          v-if="isGroup(optOrGroup)",
          :label="optOrGroup.title",
          :key="optOrGroup.title",
        )
          option(
            v-for="option in optOrGroup.options",
            :key="option.key || option.value",
            :value="option.value",
            :disabled="option.disabled",
            v-bind="getOptionAttrs(option)",
          ) {{ option.label }}

        option(
          v-else,
          :key="optOrGroup.key || optOrGroup.value",
          :value="optOrGroup.value",
          :disabled="optOrGroup.disabled",
          v-bind="getOptionAttrs(optOrGroup)",
        ) {{ optOrGroup.label }}


    div(
      :class="styles.Content",
      aria-hidden,
      :aria-disabled="disabled",
    )
      Box(v-if="labelInline", padding-inline-end="100")
        Text(
          as="span",
          :tone="tone && tone === 'magic' && !focused ? 'magic-subdued' : 'subdued'",
          truncate,
        )
          slot(v-if="slots.label", name="label")
          template(v-else) {{ props.label }}

      div(v-if="selectedOption.prefix", :class="styles.Prefix")
        component(:is="selectedOption.prefix")

      span(:class="styles.SelectedOption") {{ selectedOption.label }}
      span(:class="styles.Icon")
        Icon(:source="SelectMinor")

    div(:class="styles.Backdrop")
</template>

<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue';
import { classNames, variationName } from '@/utilities/css';
import { Labelled, Box, Icon, Text } from '@/components';
import { helpTextID } from '@/components/Labelled/utils';
import { useToggle } from '@/use/useToggle';
import { useHasSlot } from '@/use/useHasSlot';
import type {
  SelectProps,
  SelectSlots,
  SelectEvents,
  SelectOption,
  SelectGroup,
  StrictOption,
  HideableStrictOption,
  StrictGroup,
} from './types';

import SelectMinor from '@icons/SelectMinor.svg';
import styles from '@polaris/components/Select/Select.module.scss';

const PLACEHOLDER_VALUE = '';

const props = defineProps<SelectProps>();
const slots = defineSlots<SelectSlots>();
const emits = defineEmits<SelectEvents>();

const model = defineModel<string>({
  default: PLACEHOLDER_VALUE,
});

const {
  value: focused,
  toggle: toggleFocused,
} = useToggle(false);
const { hasSlot } = useHasSlot();

const uniqId = getCurrentInstance()?.uid;

const id = computed(() => props.id || uniqId);
const labelHidden = computed(() => props.labelInline ? true : props.labelHidden);

const className = computed(() => (classNames(
  styles.Select,
  props.error && styles.error,
  props.tone && styles[variationName('tone', props.tone)],
  props.disabled && styles.disabled,
)));

const hasLabel = computed(() => hasSlot(slots.label) || props.label);
const hasHelpText = computed(() => hasSlot(slots.helpText) || props.helpText);

const ariaDescribedBy = computed(() => {
  const describedBy = [];

  if (hasHelpText.value) {
    describedBy.push(helpTextID(`${id.value}`));
  }

  if (props.error) {
    describedBy.push(`${id.value}Error`);
  }

  return describedBy.length ? describedBy.join(' ') : undefined;
});

const optionsMarkup = computed(() => {
  return normalizedOptions.value.map((opt) => normalizeOption(opt));
});

const normalizedOptions = computed(() => {
  let options = (props.options || []).map(normalizeOption);

  if (props.placeholder) {
    options = [
      {
        value: PLACEHOLDER_VALUE,
        label: props.placeholder,
        disabled: true,
      },
      ...options,
    ];
  }

  return options;
});

/**
 * Gets the text to display in the UI, for the currently selected option
 */
 const selectedOption = computed(() => {
  let selected = flattenOptions.value.find((option) => model.value === option.value);

  if (!selected) {
    // Get the first visible option (not the hidden placeholder)
    selected = flattenOptions.value.find((option) => !option.hidden);
  }

  return selected || {value: '', label: ''};
});

/**
 * Ungroups an options array
 */
const flattenOptions = computed(() => {
  let flatOptions: HideableStrictOption[] = [];

  normalizedOptions.value.forEach((optionOrGroup) => {
    if (isGroup(optionOrGroup)) {
      flatOptions = flatOptions.concat(optionOrGroup.options);
    } else {
      flatOptions.push(optionOrGroup);
    }
  });

  return flatOptions;
});

const handleFocus = (e: FocusEvent) => {
  toggleFocused();
  emits('focus', e);
}

const handleBlur = (e: FocusEvent) => {
  toggleFocused();
  emits('blur', e);
}

const handleChange = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  model.value = target.value;
  emits('change', target.value, `${id.value}`);
}

const getOptionAttrs = (option: HideableStrictOption) => {
  const {value, label, prefix: _prefix, key, ...rest} = option;
  return { ...rest };
}


function isString(option: SelectOption | SelectGroup): option is string {
  return typeof option === 'string';
}

function isGroup(option: SelectOption | SelectGroup): option is SelectGroup {
  return (
    typeof option === 'object' && 'options' in option && option.options != null
  );
}

function normalizeStringOption(option: string): StrictOption {
  return {
    label: option,
    value: option,
  };
}

/**
 * Converts a string option (and each string option in a Group) into
 * an Option object.
 */
function normalizeOption(
  option: SelectOption | SelectGroup,
): HideableStrictOption | StrictGroup {
  if (isString(option)) {
    return normalizeStringOption(option);
  } else if (isGroup(option)) {
    const {title, options} = option;
    return {
      title,
      options: options.map((option) => {
        return isString(option) ? normalizeStringOption(option) : option;
      }),
    };
  }

  return option;
}
</script>
