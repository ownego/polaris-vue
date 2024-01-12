<template lang="pug">
div(:class="className")
  slot
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import type { VueNode } from '@/utilities/types';
import { classNames } from '@/utilities/css';

export interface LegacyItemProps {
  /** Fill the remaining horizontal space in the stack with the item  */
  fill?: boolean;
  /**
   * @default false
   */
}

const styles = useCssModule();

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

<style lang="scss" module>
@import '@polaris/components/LegacyStack/LegacyStack.module.scss';
</style>
