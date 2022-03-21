<template lang="pug">
div(ref="wrapperNode")
  Focus(:disabled="disableFocus", :root="wrapperNode")
  EventListener(event="focusin", :handler="handleFocusIn")
  KeypressListener(:keyCode="Key.Tab", keyEvent="keydown", :handler="handleTab")
  slot
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { portal } from 'polaris-react/src/components/shared';
import {
  focusFirstFocusableNode,
  findFirstKeyboardFocusableNode,
  findLastKeyboardFocusableNode,
  focusFirstKeyboardFocusableNode,
  focusLastKeyboardFocusableNode,
} from '@/utilities/focus';
import { Focus } from '@/components/Focus';
import { EventListener } from '@/components/EventListener';
import { KeypressListener, Key } from '@/components/KeypressListener';
import { UseFocusManager } from '@/use';

interface Props {
  trapping?: boolean;
}

const props = withDefaults(defineProps<Props>(), { trapping: true });

const { canSafelyFocus } = UseFocusManager(props);

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
  ) {return;}

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
