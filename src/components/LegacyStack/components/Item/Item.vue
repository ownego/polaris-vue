<template lang="pug">
div(:class="className")
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { VueNode } from '@/utilities/types';
import { classNames } from '@/utilities/css';
import styles from '@polaris/components/LegacyStack/LegacyStack.module.scss';

export interface LegacyItemProps {
  /** Fill the remaining horizontal space in the stack with the item  */
  fill?: boolean;
  /**
   * @default false
   */
}

defineSlots<{
  /** The content to display inside the layout. */
  default: (_: VueNode) => any;
}>();

const props = withDefaults(defineProps<LegacyItemProps>(), {
  fill: false,
});

const className = computed(() => {
  return classNames(
    styles.Item,
    props.fill && styles['Item-fill'],
  );
});
</script>
