<template lang="pug">
div(:class="className")
  div(
    v-if="title || hasSlot(slots.title) || actions",
    :class="styles.SectionHeader",
  )
    LegacyStack(
      v-if="actions",
      alignment="baseline",
    )
      LegacyStackItem(fill)
        Text(
          v-if="typeof title === 'string'",
          variant="headingSm",
          as="h3",
          fontWeight="medium"
        ) {{ title }}
        slot(v-else, name="title")
      ButtonGroup(v-if="actions")
        ButtonFrom(
          v-for="action, index in actions",
          :key="index",
          :action="action",
          :overrides="{ variant: 'plain' }",
        )
    template(v-else)
      Text(
        v-if="typeof title === 'string'",
        variant="headingSm",
        as="h3",
        fontWeight="medium",
      ) {{ title }}
      slot(v-else, name="title")
  slot(v-if="hasSlot(slots.default)")
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { LegacyStack, LegacyStackItem, ButtonGroup, ButtonFrom, Text } from '@/components';
import { classNames } from '@/utilities/css';
import { useHasSlot } from '@/use/useHasSlot';
import type { ComplexAction } from '@/utilities/types';
import styles from '@polaris/components/LegacyCard/LegacyCard.module.css';

export interface LegacyCardSectionProps {
  title?: string;
  subdued?: boolean;
  flush?: boolean;
  fullWidth?: boolean;
  /** Allow the card to be hidden when printing */
  hideOnPrint?: boolean;
  actions?: ComplexAction[];
}

const props = defineProps<LegacyCardSectionProps>();

const { hasSlot } = useHasSlot();
const slots = useSlots();

const className = computed(() =>
  classNames(
    styles.Section,
    props.flush && styles['Section-flush'],
    props.subdued && styles['Section-subdued'],
    props.fullWidth && styles['Section-fullWidth'],
    props.hideOnPrint && styles['Section-hideOnPrint'],
  ),
);
</script>
