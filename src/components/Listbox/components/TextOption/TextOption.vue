<template lang="pug">
div(:class="className")
  div(:class="styles.Content")
    div(
      v-if="allowMultiple && !isAction",
      :class="styles.Checkbox",
    )
      Checkbox(
        v-model="model",
        :disabled="disabled",
      )
        template(#label)
          slot
    template(v-else)
      Box(v-if="selected", width="100%")
        InlineStack(
          :wrap="false",
          align="space-between",
          gap="200",
        )
          slot
          InlineStack(align="end")
            Icon(:source="CheckIcon")
      slot(v-else)
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import CheckIcon from '@icons/CheckIcon.svg';
import { classNames } from '@/utilities/css';
import { useComboboxListboxOption, useAction } from '@/use/useListbox';
import {
  Box,
  Checkbox,
  InlineStack,
  Icon,
} from '@/components';
import styles from '@polaris/components/Listbox/components/TextOption/TextOption.module.css';

interface TextOptionProps {
  // Whether the option is selected
  selected?: boolean;
  // Whether the option is disabled
  disabled?: boolean;
}

const props = defineProps<TextOptionProps>();

const model = defineModel<boolean>();

onMounted(() => {
  model.value = props.selected;
});

watch(
  () => props.selected,
  (newVal) => {
    model.value = newVal;
  }, { immediate: true },
);

const { allowMultiple } = useComboboxListboxOption();
const isAction = useAction();

const className = computed(() => classNames(
  styles.TextOption,
  props.selected && !allowMultiple && styles.selected,
  props.disabled && styles.disabled,
  allowMultiple && styles.allowMultiple,
  isAction && styles.isAction,
));
</script>
