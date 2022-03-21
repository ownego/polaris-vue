<template lang="pug">
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, useAttrs } from 'vue';
import { UseUniqueId } from '@/use';
import { UseFrame } from '@/utilities/frame';
import type { Action } from '@/utilities/type';

export interface ToastProps {
  /** The content that should appear in the toast message */
  content: string;
  /**
   * The length of time in milliseconds the toast message should persist
   * @default 5000
   */
  duration?: number;
  /** Display an error toast. */
  error?: boolean;
  /** Adds an action next to the message */
  action?: Action;
}

const props = defineProps<ToastProps>();

const attrs = useAttrs();

const { useUniqueId } = UseUniqueId();
const { useFrame } = UseFrame();
const {
  showToast,
  hideToast,
} = useFrame();

const id = useUniqueId('Toast');

onMounted(() => {
  showToast({ id, ...props, ...attrs });
});

onBeforeUnmount(() => {
  hideToast({ id });
});
</script>
