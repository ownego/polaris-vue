<template lang="pug">
div(:class="className", @click="$emit('toggle-all')")
  div(:class="styles.Checkbox")
    Checkbox(
      v-model="selectedValue",
      ref="checkBoxRef",
      labelHidden,
      :label="accessibilityLabel",
      :disabled="disabled",
      @change="$emit('toggle-all')",
    )
  span(:class="styles.Label") {{ label }}
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { classNames } from '@/utilities/css';
import { Checkbox } from '@/components';
import styles from '@polaris/components/CheckableButton/CheckableButton.module.scss';

export interface CheckboxHandles {
  focus(): void;
}

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
const emits = defineEmits<{
  'toggle-all': [];
}>();

const checkBoxRef = ref<CheckboxHandles | null>(null);

const className = computed(() => classNames(styles.CheckableButton));
const selectedValue = computed(() => props.selected ?? false);

function focus() {
  checkBoxRef.value?.focus();
}

defineExpose({ focus });
</script>
