<template lang="pug">
ListboxOption(
  :accessibilityLabel="accessibilityLabel",
  :key="value",
  :selected="selected",
  :value="value",
  :disabled="disabled",
)
  ListboxTextOption(:selected="selected", :disabled="disabled")
    div(:class="styles.Content")
      div(
        v-if="hasSlot(slots.media)",
        :class="mediaClassNames"
      )
        slot(name="media")
      | {{ label }}
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import { hasSlot } from '@/utilities/has-slot';
import { ListboxOption, ListboxTextOption } from '@/components';
import styles from '@/classes/Autocomplete-MappedOption.json';

interface MappedOptionProps {
  label: string;
  value: string;
  disabled?: boolean;
  selected: boolean;
  singleSelection: boolean;
}

const props = defineProps<MappedOptionProps>();
const slots = useSlots();

const mediaClassNames = computed(() => classNames(
  styles.Media,
  props.disabled && styles.disabledMedia,
  props.singleSelection && styles.singleSelectionMedia,
));

const accessibilityLabel = computed(() => typeof props.label === 'string'
  ? props.label
  : undefined,
);
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Autocomplete/components/MappedOption/MappedOption.scss';
</style>
