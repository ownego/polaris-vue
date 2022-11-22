<template lang="pug">
div(:id="sectionContext", aria-hidden)
  Box(
    v-if="!isSlotContainHTMLTag",
    padding-block-start="2",
    padding-inline-start="4",
    padding-block-end="2",
    padding-inline-end="4",
  )
    Text(as="span", variant="headingXs", color="subdued")
      slot
  slot(v-else)
</template>

<script setup lang="ts">
import { inject, useSlots, computed } from 'vue';
import { Box, Text } from '@/components';

const sectionContext = inject<string>('sectionContext', '');

const slots = useSlots();
const defaultSlot = computed(() => slots.default?.());

const isSlotContainHTMLTag = computed(() => {
  if (!defaultSlot.value) {
    return false;
  }

  // More than 2 elements => it's HTML tag
  if (defaultSlot.value.length > 1) {
    return true;
  }

  // The only element is not Text or null Symbol
  if (defaultSlot.value[0]
    && defaultSlot.value[0].type.toString() !== 'Symbol(Text)'
    && defaultSlot.value[0].type.toString() !== 'Symbol()'
  ) {
    return true;
  }

  return false;
});
</script>
