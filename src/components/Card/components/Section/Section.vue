<template lang="pug">
div(:class="className")
  div(
    v-if="slots.title || actions",
    :class="styles.SectionHeader",
  )
    Stack(v-if="actions", noItemWrap, alignment="baseline")
      StackItem(fill)
        slot(
          v-if="!isTextOnlyTitle",
          name="title",
        )
        Subheading(v-else)
          slot(name="title")
      ButtonGroup
        ButtonFrom(
          v-for="action, index in actions",
          :key="index",
          :index="index",
          :action="action",
          :overrides="{ plain: true }",
        )
    template(v-else)
      slot(v-if="!isTextOnlyTitle", name="title")
      Subheading(v-else)
        slot(name="title")
  slot
</template>
<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import type { ComplexAction } from '@/utilities/interface';
import { ButtonGroup, Stack, StackItem, Subheading } from '@/components';
import { ButtonFrom } from '@/components/Button';
import styles from '@/classes/Card.json';

interface CardSectionProps {
  subdued?: boolean;
  flush?: boolean;
  fullWidth?: boolean;
  /** Allow the card to be hidden when printing */
  hideOnPrint?: boolean;
  actions?: ComplexAction[];
}

const props = defineProps<CardSectionProps>();

const slots = useSlots();

const className = computed(() => {
  return classNames(
    styles.Section,
    props.flush && styles['Section-flush'],
    props.subdued && styles['Section-subdued'],
    props.fullWidth && styles['Section-fullWidth'],
    props.hideOnPrint && styles['Section-hideOnPrint'],
  );
});

const isTextOnlyTitle = computed(() => {
  if (slots.title && slots.title().length === 1) {
    if (slots.title()[0]?.type.toString() === 'Symbol(Text)' || slots.title()[0]?.type.toString() === 'Symbol()') {
      return true;
    } else {
      return slots.title()[0].children
        && slots.title()[0].children?.length === 1
        && (slots.title()[0].children?.[0].type.toString() === 'Symbol(Text)'
        || slots.title()[0].children?.[0].type.toString() === 'Symbol()');
    }
  }

  return false;
});
</script>
