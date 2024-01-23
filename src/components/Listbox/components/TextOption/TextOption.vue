<template lang="pug">
div(
  :class="className",
)
  div(:class="styles.Content")
    div(
      v-if="allowMultiple && !isAction",
      :class="styles.Checkbox",
    )
      Checkbox(
        :checked="selected",
        :disabled="disabled",
      )
        template(#label)
          slot
    Box(v-else, width="100%")
      InlineStack(
        :wrap="false",
        align="space-between",
        gap="200",
      )
        slot
        InlineStack(align="end")
          Icon(:source="TickMinor")
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import TickMinor from '@icons/TickMinor.svg';
import { classNames } from '@/utilities/css';
import {
  Box,
  Checkbox,
  InlineStack,
  Icon,
} from '@/components';
import styles from '@polaris/components/Listbox/components/TextOption/TextOption.module.scss';

interface TextOptionProps {
  // Whether the option is selected
  selected?: boolean;
  // Whether the option is disabled
  disabled?: boolean;
}

const props = defineProps<TextOptionProps>();

const { allowMultiple } = inject('combobox-list-option-context', { allowMultiple: false });
const isAction = inject('action-context', false);

const className = computed(() => classNames(
  styles.TextOption,
  props.selected && !allowMultiple && styles.selected,
  props.disabled && styles.disabled,
  allowMultiple && styles.allowMultiple,
  isAction && styles.isAction,
));
</script>
