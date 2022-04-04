<template lang="pug">
component(
  :is="element",
  :aria-label="ariaLabel",
  :class="styles.Subheading",
)
  slot
</template>

<script setup lang="ts">
import { useSlots, computed } from 'vue';
import type { HeadingTagName } from '@/utilities/type';
import styles from '@/classes/Subheading.json';

interface SubheadingProps {
  /**
   * The element name to use for the subheading
   * @default 'h3'
   */
  element?: HeadingTagName;
}

const props = withDefaults(defineProps<SubheadingProps>(), {
  element: 'h3',
});

const slots = useSlots();

const isTextOnlySlot = computed(() => {
  return slots.default
    && (slots.default()[0]?.type.toString() === 'Symbol(Text)'
    || slots.default()[0]?.type.toString() === 'Symbol()');
});

const ariaLabel = isTextOnlySlot.value ? (slots.default && slots.default()[0].children) : undefined;
</script>

<style lang="scss">
@import 'polaris-react/src/components/Subheading/Subheading.scss';
</style>
