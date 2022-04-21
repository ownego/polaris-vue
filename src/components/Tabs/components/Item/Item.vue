<template lang="pug">
li
  UnstyledLink(
    v-if="url",
    ref="focusedNode",
    v-bind="sharedProps",
    @click="$emit('click')",
  )
    slot
  button(
    v-else,
    type="button",
    ref="focusedNode",
    v-bind="sharedProps",
    @click="$emit('click')",
  )
    slot
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import styles from '@/classes/Tabs.json';
import { UnstyledLink } from '@/components';

interface ItemProps {
  id: string;
  focused: boolean;
  panelID?: string;
  url?: string;
  accessibilityLabel?: string;
}

const props = defineProps<ItemProps>();

const focusedNode = ref<HTMLElement | null>(null);

const classItem = classNames(styles.Item);

const sharedProps = computed(() => {
  return {
    id: props.id,
    class: classItem,
    'aria-controls': props.panelID,
    'aria-selected': false,
    'aria-label': props.accessibilityLabel,
  };
})
</script>

