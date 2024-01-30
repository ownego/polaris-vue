<template lang="pug">
div(:id="sectionId", aria-hidden)
  slot(v-if="hasSlot(slots.default)")
  Box(
    v-else,
    padding-block-start="200",
    padding-inline-start="400",
    padding-block-end="200",
    padding-inline-end="400",
  )
    Text(as="span", variant="headingSm", color="subdued")
      slot
</template>

<script setup lang="ts">
import { useSlots } from 'vue';
import { Box, Text } from '@/components';
import { useHasSlot } from '@/use/useHasSlot';
import { useSection } from '@/use/useListbox';

const sectionId = useSection();
const slots = useSlots();
const { hasSlot } = useHasSlot();
</script>
