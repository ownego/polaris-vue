<template lang="pug">
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import type { Key } from '@/utilities/types';

type KeyEvent = 'keydown' | 'keyup';

export type NonMutuallyExclusiveProps = {
  keyCode: Key;
  handler(event: KeyboardEvent): void;
  keyEvent?: KeyEvent;
}

export type KeypressListenerProps = NonMutuallyExclusiveProps &
  (
    | { useCapture?: boolean; options?: undefined }
    | { useCapture?: undefined; options?: AddEventListenerOptions }
  );

const props = withDefaults(defineProps<KeypressListenerProps>(), {
  keyEvent: 'keyup',
});

/**
 * Note: handler and keyCode will be re-assign every time props change
 * but we still not met any case that need to change handler or keyCode every time props change
 * => So just need in install their value at the beginning
 */
const tracked = ref({
  handler: props.handler,
  keyCode: props.keyCode,
});

onMounted(() => {
  document.addEventListener(
    props.keyEvent || 'keyup',
    handleKeyEvent,
    props.useCapture || props.options,
  );
  console.log('KeypressListener mounted', props.keyEvent, props.handler);
});

onBeforeUnmount(() => {
  document.removeEventListener(
    props.keyEvent || 'keyup',
    handleKeyEvent,
    props.useCapture || props.options,
  );
});

const handleKeyEvent = (event: KeyboardEvent) => {
  const { handler, keyCode } = tracked.value;

  if (event.keyCode === keyCode) {
    handler(event);
  }
};
</script>
