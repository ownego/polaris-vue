<template lang="pug">
div(
  :class="styles.Container",
  data-polaris-layer,
  data-polaris-overlay,
  ref="dialogNode",
)
  TrapFocus
    div(
      role="dialog",
      aria-modal,
      :aria-labelledby="labelledBy",
      tabindex="-1",
      :class="styles.Dialog",
    )
      div(:class="classes")
        KeypressListener(
          :key-code="Key.Escape",
          key-event="keydown",
          :handler="handleKeyDown",
        )
        KeypressListener(:keyCode="Key.Escape", :handler="handleKeyUp")
        slot

</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { classNames, variationName } from '@/utilities/css';
import styles from '@polaris/components/Modal/components/Dialog/Dialog.module.scss';
import { focusFirstFocusableNode } from '@/utilities/focus';
import { KeypressListener, TrapFocus } from '@/components';
import { Key } from '@/utilities/types';
import type { ModalSize } from '../utils';
 
export interface DialogProps {
  labelledBy?: string;
  instant?: boolean;
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
