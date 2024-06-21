<template lang="pug">
div(:class="styles.Header")
  InlineStack(
    v-if="actions || hasSlot(slots.default)",
    align="space-between",
    blockAlign="center",
    :wrap="false",
    gap="200",
  )
    slot(v-if="isTextOnlyTitle", name="title")
    Text(
      v-else-if="title",
      variant="headingSm",
      as="h2",
    ) {{ title }}
    InlineStack(
      blockAlign="center",
      :wrap="false",
      gap="400",
    )
      ButtonGroup(v-if="actions")
        ButtonFrom(
          v-for="action, index in actions",
          :key="index",
          :action="action",
          :overrides="{ variant: 'plain' }",
        )
      slot(v-if="hasSlot(slots.default)")
  template(v-else)
    slot(v-if="isTextOnlyTitle", name="title")
    Text(
      v-else-if="title",
      variant="headingSm",
      as="h2",
    ) {{ title }}
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { InlineStack, ButtonGroup, ButtonFrom, Text } from '@/components';
import styles from '@polaris/components/LegacyCard/LegacyCard.module.css';
import { useHasSlot } from '@/use/useHasSlot';
import type { DisableableAction } from '@/utilities/types';

export interface LegacyCardHeaderProps {
  title?: string;
  actions?: DisableableAction[];
}

defineProps<LegacyCardHeaderProps>();

const { hasSlot } = useHasSlot();
const slots = useSlots();

const isTextOnlyTitle = computed(() => {
  if (slots.title && slots.title().length === 1) {
    if (slots.title()[0]?.type.toString() === 'Symbol(v-txt)' || slots.title()[0]?.type.toString() === 'Symbol()') {
      return true;
    } else {
      return slots.title()[0].children
        && slots.title()[0].children?.length === 1
        && ((slots.title()[0] as any).children?.[0].type.toString() === 'Symbol(v-txt)'
        || (slots.title()[0] as any).children?.[0].type.toString() === 'Symbol()');
    }
  }

  return false;
});
</script>
