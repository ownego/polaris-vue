<template lang="pug">
div(
  ref="containerNode",
  data-polaris-layer,
  data-polaris-overlay,
  :class="styles.Container",
)
  TrapFocus
    div(
      role="dialog",
      tabindex="-1",
      aria-modal,
      :aria-label="labelledBy",
      :aria-labelledby="labelledBy",
      :class="styles.Dialog",
    )
      div(:class="classes")
        KeypressListener(
          key-event="keydown",
          :key-code="Key.Escape",
          :handler="handleKeyDown",
        )
        KeypressListener(
          :key-code="Key.Escape",
          :handler="handleKeyUp",
        )
        slot
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { classNames, variationName } from '@/utilities/css';
import styles from '@polaris/components/Modal/components/Dialog/Dialog.module.css';
import { focusFirstFocusableNode } from '@/utilities/focus';
import { KeypressListener, TrapFocus } from '@/components';
import { Key } from '@/utilities/types';
import type { ModalSize } from '../../utils';

export interface DialogProps {
  labelledBy?: string;
  limitHeight?: boolean;
  size?: ModalSize;
  in?: boolean;
  hasToasts?: boolean;
}

const props = defineProps<DialogProps>();

const emit = defineEmits<{
  (event: 'close'): void;
  (event: 'closing', value: boolean): void;
  (event: 'entered'): void;
  (event: 'exited'): void;
}>();

const dialogNode = ref<HTMLElement | null>(null);
const closing = ref(false);

const classes = computed(() => {
  return classNames(
    styles.Modal,
    props.size && styles[variationName('size', props.size)],
    props.limitHeight && styles.limitHeight,
  );
});

onMounted(() => {
  if (dialogNode.value && dialogNode.value.contains(document.activeElement)) {
    focusFirstFocusableNode(dialogNode.value);
  }

  emit('entered');
});

onBeforeUnmount(() => {
  emit('exited');
});

const handleKeyDown = () => {
  closing.value = true;
  emit('closing', true);
};

const handleKeyUp = () => {
  closing.value = false;
  emit('closing', false);
  emit('close');
};
</script>
