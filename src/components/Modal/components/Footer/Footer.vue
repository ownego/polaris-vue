<template lang="pug">
InlineStack(
  gap="400",
  block-align="center",
)
  Box(
    border-color="border",
    border-block-start-width="025",
    padding="400",
    width="100%",
  )
    InlineStack(
      gap="400",
      block-align="center",
      align="space-between",
    )
      Box
        slot
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  Box,
  InlineStack,
  ButtonFrom,
} from '@/components'
import type { ComplexAction } from '@/utilities/types';

export interface FooterProps {
  /** Primary action */
  primaryAction?: ComplexAction;
  /** Collection of secondary actions */
  secondaryActions?: ComplexAction[];
}

const props = defineProps<FooterProps>();
</script>
