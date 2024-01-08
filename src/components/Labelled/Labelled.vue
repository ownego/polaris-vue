<template lang="pug">
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import { classNames } from '@/utilities/css';
import type { Action } from '@/utilities/types';
import type { LabelProps } from '@/components/Label/Label.vue';

interface LabelledProps {
  /** A unique identifier for the label */
  id: LabelProps['id'];
  /** Error to display beneath the label */
  error?: Error | boolean;
  /** An action */
  action?: Action;
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Visual required indicator for the label */
  requiredIndicator?: boolean;
  /** Labels signify a disabled control */
  disabled?: boolean;
  /** Labels signify a readOnly control */
  readOnly?: boolean;
}

const styles = useCssModule();

const props = defineProps<LabelledProps>();

const className = computed(() => {
  return classNames(
    props.labelHidden && styles.hidden,
    props.disabled && styles.disabled,
    props.readOnly && styles.readOnly,
  )
});
</script>

<style module lang="scss">
@import '@polaris/components/Labelled/Labelled.scss';
</style>
