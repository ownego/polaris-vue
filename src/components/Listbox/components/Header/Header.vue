<template lang="pug">
div(:id="sectionId", aria-hidden)
  slot(v-if="isSlotContainHTMLTag")
  Box(
    v-else,
    padding-block-start="200",
    padding-inline-start="400",
    padding-block-end="200",
    padding-inline-end="400",
  )
    Text(as="span", variant="headingSm", tone="subdued")
      slot
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { Box, Text } from '@/components';
import { useSection } from '@/use/useListbox';

const sectionId = useSection();
const slots = useSlots();

const isSlotContainHTMLTag = computed(() => {
  if (!slots.default) {
    return false;
  }

  // More than 2 elements => it's HTML tag
  if (slots.default().length > 1) {
    return true;
  }

  // The only element is not Text or null Symbol
  if (slots.default()[0]
    && slots.default()[0].type.toString() !== 'Symbol(Text)'
    && slots.default()[0].type.toString() !== 'Symbol(v-txt)'
    && slots.default()[0].type.toString() !== 'Symbol()'
  ) {
    return true;
  }

  return false;
});
</script>
