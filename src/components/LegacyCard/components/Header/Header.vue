
import { useSlots } from 'vue';
<template lang="pug">
div(:className="styles.Header")
  InlineStack(
    v-if="actions || hasSlot(slots.default)",
    align="space-between",
    blockAlign="center",
    :wrap="false",
    :gap="200",
  )
    Text(
      v-if="isTextOnlyTitle",
      variant="headingSm",
      as="h2",
    )
      slot(name="title")
    slot(v-else-if="hasSlot(slots.title)", name="title")

    InlineStack(
      blockAlign="center",
      :wrap="false",
      :gap="400",
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
    Text(
      v-if="isTextOnlyTitle",
      variant="headingSm",
      as="h2",
    )
      slot(name="title")
    slot(v-else="hasSlot(slots.title)", name="title")
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import styles from '@polaris/components/LegacyCard/LegacyCard.module.scss';
import { useHasSlot } from '@/use/useHasSlot';
import type { DisableableAction } from '@/utilities/types';

export interface LegacyCardHeaderProps {
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
        && (slots.title()[0].children?.[0].type.toString() === 'Symbol(v-txt)'
        || slots.title()[0].children?.[0].type.toString() === 'Symbol()');
    }
  }

  return false;
});
</script>
