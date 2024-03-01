<template lang="pug">
Box(
  v-if="titleHidden || !isDefaultSlotUsed",
  position="absolute",
  :inset-inline-end="headerPaddingInline",
  :inset-block-start="headerPaddingBlock",
  z-index="1",
)
  CloseButton(@click="emits('close')")

Box(
  v-else,
  padding-block-start="400",
  padding-block-end="400",
  :padding-inline-start="headerPaddingInline",
  :padding-inline-end="headerPaddingBlock",
  border-block-end-width="025",
  border-color="border",
  background="bg-surface-tertiary",
)
  InlineGrid(
    gap="400",
    :columns="{ xs: '1fr auto' }",
  )
    InlineStack(
      gap="400",
      block-align="center",
    )
      Text(
        break-word,
        as="h2",
        variant="headingMd",
        :id="id",
      )
        slot
    CloseButton(
      :pressed="closing",
      @click="emits('close')",
    )
</template>

<script setup lang="ts">
import { useSlots, computed } from 'vue';
import { useHasSlot } from '@/use/useHasSlot';
import {
  Box,
  InlineGrid,
  InlineStack,
  Text
} from '@/components';
import { CloseButton } from '../CloseButton';

export interface HeaderProps {
  id: string;
  titleHidden: boolean;
  closing: boolean;
}

defineProps<HeaderProps>();

const emits = defineEmits<{
  close: [],
}>();

const headerPaddingInline = '400';
const headerPaddingBlock = '400';

const slots = useSlots();
const { hasSlot } = useHasSlot();

const isDefaultSlotUsed = computed(() => hasSlot(slots.default)); 
</script>
