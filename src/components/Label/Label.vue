<template lang="pug">
div(
  :class="className",
)
  label(
    :id="labelId(id)",
    :for="id",
    :class="requiredIndicator",
  )
    slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from '@/utilities/css';
import type { VueNode } from '@/utilities/types';
import { labelId } from './utils';
import styles from '@polaris/components/Label/Label.module.scss';

export type LabelProps = {
  /** A unique identifier for the label */
  id: string;
  /** Visually hide the label */
  hidden?: boolean;
  /** Visual required indicator for the label */
  requiredIndicator?: boolean;
}

const props = defineProps<LabelProps>();
const slots = defineSlots<{
  /** Label content */
  default: (_: VueNode) => any;
}>();

const className = computed(() => {
  return classNames(
    styles.Label,
    props.hidden && styles.hidden,
  );
});
const requiredIndicator = computed(() => classNames(
  styles.Text,
  props.requiredIndicator && styles.requiredIndicator,
));
</script>

<style lang="scss" module>
@import '@polaris/components/Label/Label.module.scss';
</style>
