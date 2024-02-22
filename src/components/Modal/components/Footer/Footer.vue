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

      InlineStack(
        v-if="primaryAction || secondaryActions",
        gap="200",
      )
        template(v-if="secondaryActions")
          ButtonFrom(
            v-for="action, index in secondaryActions",
            :key="String(index)",
            :action="action",
          ) 
        template(v-if="primaryAction")
          ButtonFrom(
            :action="primaryAction",
            :overrides="{ variant: 'primary' }",
          )
</template>

<script setup lang="ts">
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

defineProps<FooterProps>();
</script>
