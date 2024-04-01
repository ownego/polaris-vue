<template lang="pug">
div(:class="className", @click="emits('toggle-all')")
  div(:class="styles.Checkbox")
    Checkbox(
      v-model="model",
      ref="checkBoxRef",
      labelHidden,
      :checked="selected",
      :label="accessibilityLabel",
      :disabled="disabled",
      @change="emits('toggle-all')",
    )
  span(
    v-if="label",
    :class="styles.Label",
    :aria-live="ariaLive",
    ) {{ label }}
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { classNames } from '@/utilities/css';
import { Checkbox } from '@/components';
import type { CheckableButtonProps } from './types';
import styles from '@polaris/components/CheckableButton/CheckableButton.module.css';

export interface CheckboxHandles {
  focus(): void;
}

const props = withDefaults(defineProps<CheckableButtonProps>(), {
  label: '',
});

const emits = defineEmits<{
  'toggle-all': [];
  'update:modelValue': [value: boolean | 'indeterminate' | undefined];
}>();

const model = computed({
  get() {
    return props.selected;
  },
  set(value: boolean | 'indeterminate' | undefined) {
    emits('update:modelValue', value);
  },
});

const checkBoxRef = ref<CheckboxHandles | null>(null);

const className = computed(() => classNames(styles.CheckableButton));

function focus() {
  checkBoxRef.value?.focus();
}

defineExpose({ focus });
</script>
