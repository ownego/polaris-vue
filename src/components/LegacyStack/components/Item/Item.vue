<template lang="pug">
</template>

<script setup lang="ts">
import { ref, computed, useCssModule } from 'vue';
import { classNames } from '@/utilities/css';

export interface LegacyItemProps {
  /** Fill the remaining horizontal space in the stack with the item  */
  fill?: boolean;
  /**
   * @default false
   */
}

const styles = useCssModule();

const props = withDefaults(defineProps<LegacyItemProps>(), {
  fill: false,
});

const className = computed(() => {
  return classNames(
    styles.Item,
    props.fill && styles['Item-fill'],c
  );
});
</script>

<style lang="scss" module>
@import '@polaris/components/LegacyStack/LegacyStack.scss';
</style>
