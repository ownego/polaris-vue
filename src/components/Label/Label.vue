<template lang="pug">
div(
  :class="className",
)
  label(
    :id="labelId(id)",
    :for="id",
    :class="requiredIndicator",
  )
    Text(
      as="span",
      variant="bodyMd",
    )
      slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from '@/utilities/css';
import type { VueNode } from '@/utilities/types';
import { labelId } from './utils';
import { Text } from '@/components';
import styles from '@polaris/components/Label/Label.module.css';

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
