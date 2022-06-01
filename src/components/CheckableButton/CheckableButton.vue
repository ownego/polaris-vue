<template lang="pug">
div(:class="className", @click="$emit('toggle-all')")
  div(:class="styles.Checkbox")
    Checkbox(
      ref="checkBoxRef",
      :label="accessibilityLabel",
      labelHidden,
      :checked="selected",
      :disabled="disabled",
      @change="$emit('toggle-all')",
    )
  span(:class="styles.Label") {{ label }}
</template>

<script setup lang="ts">
import { computed, inject, ref, onUpdated } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import { Checkbox } from '@/components';
import type { ResourceListContextType, CheckableButtonKey } from '@/utilities/resource-list';
import styles from '@/classes/CheckableButton.json';

interface CheckableButtonProps {
  accessibilityLabel?: string;
  label?: string;
  selected?: boolean | 'indeterminate';
  selectMode?: boolean;
  smallScreen?: boolean;
  plain?: boolean;
  measuring?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<CheckableButtonProps>(), {
  label: '',
});
const { registerCheckableButtons } = inject('ResourceListContext', {}) as ResourceListContextType;

const checkBoxRef = ref(null);

const currentKey = computed<CheckableButtonKey>(() => {
  if (props.plain) {
    return 'plain';
  }

  if (props.smallScreen) {
    return 'bulkSm';
  }

  return 'bulkLg';
});

onUpdated(
  () => {
    if (checkBoxRef.value && registerCheckableButtons) {
      registerCheckableButtons(currentKey.value, checkBoxRef.value);
    }
  },
);

const className = computed(() => {
  return props.plain
    ? classNames(styles.CheckableButton, styles['CheckableButton-plain'])
    : classNames(
      styles.CheckableButton,
      props.selectMode && styles['CheckableButton-selectMode'],
      props.selected && styles['CheckableButton-selected'],
      props.measuring && styles['CheckableButton-measuring'],
    );
});
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/CheckableButton/CheckableButton.scss';
</style>
