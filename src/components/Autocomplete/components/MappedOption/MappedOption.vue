<template lang="pug">
ListboxOption(
  :accessibility-label="accessibilityLabel",
  :key="value",
  :value="value",
  :selected="selected",
  :disabled="disabled",
)
  ListboxTextOption(
    :selected="selected",
    :disabled="disabled",
  )
    div(:class="styles.Content")
      div(v-if="media", :class="mediaClassNames")
        component(:is="media")

      | {{ label }}
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { OptionDescriptor } from '@/utilities/types';
import { classNames } from '@/utilities/css';
import { ListboxOption, ListboxTextOption } from '@/components';

import styles from '@polaris/components/Autocomplete/components/MappedOption/MappedOption.module.css';

type MappedOptionProps = OptionDescriptor & {
  selected: boolean;
  singleSelection: boolean;
};

const props = defineProps<MappedOptionProps>();

const mediaClassNames = computed(() => (classNames(
  styles.Media,
  props.disabled && styles.disabledMedia,
  props.singleSelection && styles.singleSelectionMedia,
)));

const accessibilityLabel = computed(() => (typeof props.label === 'string' ? props.label : undefined));
</script>
