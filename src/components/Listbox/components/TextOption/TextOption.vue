<template lang="pug">
div(:class="textOptionClassName")
  div(:class="styles.Content")
    div(
      v-if="allowMultiple && !isAction",
      :class="styles.Checkbox",
    )
      Checkbox(
        :disabled="disabled",
        :checked="selected",
      )
        template(#label)
          slot
    slot(v-else)
</template>

<script setup lang="ts">
import { inject, computed } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import type { ComboboxListboxOptionType } from '@/utilities/interface';
import styles from '@/classes/Listbox-TextOption.json';
import { Checkbox } from '../../../Checkbox';

const { allowMultiple} = inject<ComboboxListboxOptionType>('comboboxListboxOptionContext', {});
const isAction = inject<boolean>('actionContext', false);

interface Props {
  // Whether the option is selected
  selected?: boolean;
  // Whether the option is disabled
  disabled?: boolean;
}

const props = defineProps<Props>();

const textOptionClassName = computed(() => classNames(
  styles.TextOption,
  props.selected && !allowMultiple && styles.selected,
  props.disabled && styles.disabled,
  allowMultiple && styles.allowMultiple,
  isAction && styles.isAction,
));
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Listbox/components/TextOption/TextOption.scss';
</style>
