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
    :panelID="item.panelID",
    :accessibilityLabel="item.accessibilityLabel",
    :focused="index === focusIndex",
    @click="emits('click', item.id)",
  )
    slot(v-if="hasSlot(slots[item.id])", :name="item.id")
    template(v-else) {{ item.content }}
</template>
<script setup lang="ts">
import { useSlots } from 'vue';
import styles from '@/classes/Tabs.json';
import { Item } from '../Item';
import type { TabDescriptor } from '../../types';
import { hasSlot } from '@/utilities/has-slot';

interface ListProps {
  focusIndex: number;
  disclosureTabs: TabDescriptor[];
}

const props = defineProps<ListProps>();

const slots = useSlots();

const emits = defineEmits<{
  (e: 'click', id: string): void;
  (e: 'keypress', event: KeyboardEvent): void;
}>();

const handleKeyDown = (event: KeyboardEvent) => {
  const { key } = event;
  if (key === 'ArrowLeft' || key === 'ArrowRight') {
    event.preventDefault();
    event.stopPropagation();
  }
}
</script>

