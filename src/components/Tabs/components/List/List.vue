<template lang="pug">
ul(
  :class="styles.List",
  @keydown="handleKeyDown",
  @keyup="emits('keypress', $event)",
)
  Item(
    v-for="item, index in disclosureTabs",
    :key="item.id",
    :id="item.id",
    :url="item.url",
    :focused="index === focusIndex",
    :accessibilityLabel="item.accessibilityLabel",
    @click="emits('click', item.id)",
  ) {{ item.content }}
</template>

<script setup lang="ts">
import styles from '@polaris/components/Tabs/Tabs.module.css';
import { Item } from '../index';
import type { TabProps } from '../../types';

export interface ListProps {
  focusIndex: number;
  disclosureTabs: TabProps[];
}

const emits = defineEmits<{
  'click': [id: string];
  'keypress': [event: KeyboardEvent];
}>();

defineProps<ListProps>();

const handleKeyDown = (event: KeyboardEvent) => {
  const { key } = event;

  if (key === 'ArrowLeft' || key === 'ArrowRight') {
    event.preventDefault();
    event.stopPropagation();
  }
}
</script>
