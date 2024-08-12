<template lang="pug">
li
  UnstyledLink(
    v-if="url",
    v-bind="sharedProps",
    ref="focusedNode",
    :url="url",
    @click="emits('click')",
  )
    slot
  button(
    v-else,
    v-bind="sharedProps",
    ref="focusedNode",
    type="button",
    @click="emits('click')",
  )
    slot
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { UnstyledLink } from '@/components';
import type { VueNode } from '@/utilities/types';
import { classNames } from '@/utilities/css';
import styles from '@polaris/components/Tabs/Tabs.module.css';

export interface ItemProps {
  id: string;
  focused: boolean;
  url?: string;
  accessibilityLabel?: string;
}

defineSlots<{
  /** Elements to display inside the tag*/
  default: (_?: VueNode) => any;
}>();

const emits = defineEmits<{
  /** Callback when tag is clicked or keypressed */
  'click': [];
}>();

const props = defineProps<ItemProps>();

const focusedNode = ref<HTMLButtonElement | null>(null);

watch(
  () => props.focused,
  () => {
    if (
      focusedNode.value &&
      focusedNode.value instanceof HTMLElement &&
      props.focused
    ) {
      focusedNode.value.focus();
    }
  },
);

const buttonClass = computed(() => classNames(styles.Item));

const sharedProps = computed(() => ({
  id: props.id,
  className: buttonClass.value,
  'aria-selected': false,
  'aria-label': props.accessibilityLabel,
}));
</script>
