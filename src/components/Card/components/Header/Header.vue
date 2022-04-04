<template lang="pug">
div(:class="styles.Header")
  Stack(
    v-if="slots.default || actions",
    alignment="baseline",
    noItemWrap,
  )
    StackItem(:fill="true")
      slot(v-if="!isTextOnlyTitle", name="title")
      Heading(v-else)
        slot(name="title")
    StackItem(v-if="actions")
      ButtonGroup
        template(
          v-for="action, index in actions",
          :key="index",
        )
          ButtonFrom(
            :action="action",
            :overrides="{ plain: true }",
          )
    StackItem(v-if="slots.default")
      slot
  template(v-else)
    slot(
      v-if="!isTextOnlyTitle",
      name="title"
    )
    Heading(v-else)
      slot(name="title")
</template>
<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { DisableableAction } from '@/utilities/interface';
import { ButtonGroup, Stack, StackItem, Heading } from '@/components';
import { ButtonFrom } from '@/components/Button';
import styles from '@/classes/Card.json';

interface CardHeaderProps {
  actions?: DisableableAction[];
}

const props = defineProps<CardHeaderProps>();

const slots = useSlots();

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
