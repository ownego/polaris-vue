<template lang="pug">
div(:id="sectionId", aria-hidden)
  slot(v-if="isSlotContainHtml(slots.default)")
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
import { useSlots } from 'vue';
import { Box, Text } from '@/components';
import { useSection } from '@/use/useListbox';
import { useHasSlot } from '@/use/useHasSlot';

const sectionId = useSection();
const slots = useSlots();

const { isSlotContainHtml } = useHasSlot();
</script>
