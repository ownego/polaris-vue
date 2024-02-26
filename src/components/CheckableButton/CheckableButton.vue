<template lang="pug">
div(:class="className", @click="emits('toggle-all')")
  div(:class="styles.Checkbox")
    Checkbox(
      v-model="isChecked",
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
import styles from '@polaris/components/CheckableButton/CheckableButton.module.scss';

export interface CheckboxHandles {
  focus(): void;
}

interface CheckableButtonProps {
  accessibilityLabel?: string;
  label?: string;
  selected?: boolean | 'indeterminate';
  disabled?: boolean;
  ariaLive?: 'off' | 'polite';
}

const props = withDefaults(defineProps<CheckableButtonProps>(), {
  label: '',
});
const emits = defineEmits<{
  'toggle-all': [];
}>();
const model = defineModel<boolean | string>();

const checkBoxRef = ref<CheckboxHandles | null>(null);

const className = computed(() => classNames(styles.CheckableButton));

const isIndeterminate = computed(() => props.selected === 'indeterminate');

const isChecked = computed(() => Boolean(!isIndeterminate.value && model.value));

function focus() {
  checkBoxRef.value?.focus();
}

defineExpose({ focus });
</script>
