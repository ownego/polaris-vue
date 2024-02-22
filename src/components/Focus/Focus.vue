<template lang="pug">
slot
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { focusFirstFocusableNode } from '@/utilities/focus';

interface FocusProps {
  disabled?: boolean;
  root: HTMLElement | null;
}

const props = defineProps<FocusProps>();

const focusNode = () => {
  if (props.disabled || !props.root) return;

  if (!props.root || props.root.querySelector('[autofocus]')) return;

  focusFirstFocusableNode(props.root, false);
};

watch(
  [
    () => props.disabled,
    () => props.root,
  ],
  () => focusNode(),
)

onMounted(() => {
  focusNode();
});
</script>

