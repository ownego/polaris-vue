<template lang="pug">

</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue';
import { classNames, variationName } from '@/utilities/css';
import { Labelled, Box, Icon, Text } from '@/components';
import { helpTextID } from '@/components/Labelled/utils';
import { useToggle } from '@/use/useToggle';
import { useHasSlot } from '@/use/useHasSlot';
import type { SelectProps, SelectSlots, SelectEvents } from './types';

import SelectMinor from '@icons/SelectMinor.svg';
import styles from '@polaris/components/Select/Select.module.scss';

const PLACEHOLDER_VALUE = '';

const props = defineProps<SelectProps>();
const slots = defineSlots<SelectSlots>();
const emits = defineEmits<SelectEvents>();

const model = defineModel<string>();

const {
  value: focused,
  toggle: toggleFocused,
} = useToggle(false);
const { hasSlot } = useHasSlot();

const uniqId = getCurrentInstance()?.uid;

const id = computed(() => props.id || uniqId);
const labelHidden = computed(() => props.labelInline ? true : props.labelHidden);

const className = computed(() => (classNames(
  styles.Select,
  props.error && styles.error,
  props.tone && styles[variationName('tone', props.tone)],
  props.disabled && styles.disabled,
)));

const hasHelpText = computed(() => hasSlot(slots.helpText) || props.helpText);

const ariaDescribedBy = computed(() => {
  const describedBy = [];

  if (hasHelpText.value) {
    describedBy.push(helpTextID(`${id.value}`));
  }

  if (props.error) {
    describedBy.push(`${id.value}Error`);
  }

  return describedBy.length ? describedBy.join(' ') : undefined;
});

const handleFocus = (e: FocusEvent) => {
  toggleFocused();
  emits('focus', e);
}

const handleBlur = (e: FocusEvent) => {
  toggleFocused();
  emits('blur', e);
}

const handleChange = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  model.value = target.value;
  emits('change', target.value, `${id.value}`);
}



</script>
