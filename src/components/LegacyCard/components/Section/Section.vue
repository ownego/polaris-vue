<template lang="pug">
div(:className="className")
  div(
    v-if="typeof title === 'string' || actions",
    :className="styles.SectionHeader",
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
        template(v-else, name="title")
      ButtonGroup(v-if="actions")
        ButtonFrom(
          v-for="action, index in actions",
          :key="index",
          :action="action",
          :overrides="{ variant: 'plain' }",
        )
    Text(
      v-if="typeof title === 'string'",
      variant="headingSm",
      as="h3",
      fontWeight="medium",
    ) {{ title }}
    template(v-else, name="title")
  slot(v-if="hasSlot(slots.default)")
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { classNames } from '@/utilities/css';
import { useHasSlot } from '@/use/useHasSlot';
import styles from '@polaris/components/LegacyCard/LegacyCard.module.scss';

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
