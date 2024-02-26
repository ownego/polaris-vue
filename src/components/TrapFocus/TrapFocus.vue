<template lang="pug">
Focus(
  :disabled="disableFocus",
  :root="wrapperNode",
)
  div(ref="wrapperNode")
    EventListener(
      event="focusin",
      :handler="handleFocusIn",
    )
    KeypressListener(
      :key-code="Key.Tab",
      :handler="handleTab",
      key-event="keydown",
    )
    slot
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { portal } from '@polaris/components/shared';
import {
  focusFirstFocusableNode,
  findFirstKeyboardFocusableNode,
  findLastKeyboardFocusableNode,
  focusFirstKeyboardFocusableNode,
  focusLastKeyboardFocusableNode,
} from '@/utilities/focus';
import {
  Focus,
  EventListener,
  KeypressListener,
} from '@/components';
import { useFocusManager } from '@/use/useFocusManager';
import { Key } from '@/utilities/types';

interface Props {
  trapping?: boolean;
}

const props = withDefaults(defineProps<Props>(), { trapping: true });

const { canSafelyFocus } = useFocusManager({ trapping: props.trapping });

const wrapperNode = ref<HTMLElement | null>(null);

const disableFocus = ref<boolean>(true);

watch([() => props.trapping], () => {
  disableFocus.value = canSafelyFocus.value
    && !(wrapperNode.value && wrapperNode.value.contains(document.activeElement))
    ? !props.trapping
    : true;
});

const handleFocusIn = (event: FocusEvent) => {
  if (!props.trapping
    || !wrapperNode.value
    || wrapperNode.value.contains(document.activeElement)
    || (event.target instanceof Element && event.target.matches(`${portal.selector} *`))
  ) {
    return;
  }

  if (canSafelyFocus.value
    && event.target instanceof HTMLElement
    && wrapperNode.value !== event.target
    && wrapperNode.value.contains(event.target)
  ) {
    focusFirstFocusableNode(wrapperNode.value);
  }
}

const handleTab = (event: KeyboardEvent) => {
  if (!props.trapping || !wrapperNode.value) {
    return;
  }

  const firstFocusableNode = findFirstKeyboardFocusableNode(wrapperNode.value);
  const lastFocusableNode = findLastKeyboardFocusableNode(wrapperNode.value);

  if (event.target === lastFocusableNode && !event.shiftKey) {
    event.preventDefault();
    focusFirstKeyboardFocusableNode(wrapperNode.value);
  }

  if (event.target === firstFocusableNode && event.shiftKey) {
    event.preventDefault();
    focusLastKeyboardFocusableNode(wrapperNode.value);
  }
}
</script>
