<template lang="pug">
div(:class="textOptionClassName")
  div(:class="styles.Content")
    div(
      v-if="allowMultiple && !isAction",
      :class="styles.Checkbox",
    )
      Checkbox(:checked="selected")
        template(#label)
          slot
    slot(v-else)
</template>

<script setup lang="ts">
import { inject, computed } from 'vue';
import { classNames } from 'polaris-react/src/utilities/css';
import type { ComboboxListboxOptionType } from '@/utilities/interface';
import styles from '@/classes/Listbox-TextOption.json';
import { Checkbox } from '../../../Checkbox';

const comboboxListboxOptionContext = inject<ComboboxListboxOptionType>('comboboxListboxOptionContext', {});
const actionContext = inject<boolean>('actionContext', false);

interface Props {
  // Whether the option is selected
  selected?: boolean;
  // Whether the option is disabled
  disabled?: boolean;
}

const props = defineProps<Props>();

const allowMultiple = computed(() => Boolean(comboboxListboxOptionContext.allowMultiple));
const isAction = computed(() => actionContext);

const textOptionClassName = computed(() => classNames(
  styles.TextOption,
  props.selected && !allowMultiple.value && styles.selected,
  props.disabled && styles.disabled,
  allowMultiple.value && styles.allowMultiple,
  isAction.value && styles.isAction,
));
</script>

<style lang="scss">
@import 'polaris-react/src/components/Listbox/components/TextOption/TextOption.scss';
</style>
