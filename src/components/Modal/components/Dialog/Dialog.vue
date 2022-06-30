<template lang="pug">
div(
  v-if="instant",
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
        KeypressListener(:keyCode="Key.Escape", :handler="() => $emit('close')")
        slot
div(
  v-else,
  :class="styles.Container",
  data-polaris-layer,
  data-polaris-overlay,
  ref='dialog',
)
  TrapFocus
    div(
      role="dialog",
      aria-modal,
      :aria-labelledby="labelledBy",
      tabindex="-1",
      :class="styles.Dialog"
    )
      div(:class="classes")
        KeypressListener(:keyCode="Key.Escape", :handler="() => $emit('close')")
        slot
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import styles from '@/classes/Modal-Dialog.json';
import { focusFirstFocusableNode } from '@/utilities/focus';
import { KeypressListener, Key } from '@/components/KeypressListener';
import { TrapFocus } from '@/components/TrapFocus';

interface Props {
  labelledBy?: string;
  instant?: boolean;
  limitHeight?: boolean;
  large?: boolean;
  small?: boolean;
  fullScreen?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{ (event: 'close'): void, (event: 'entered'): void, (event: 'exited'): void  }>();

const dialogNode = ref<HTMLElement | null>(null);

const classes = computed(() => {
  return classNames(
    styles.Modal,
    props.small && styles.sizeSmall,
    props.large && styles.sizeLarge,
    props.limitHeight && styles.limitHeight,
    props.fullScreen && styles.fullScreen,
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
})
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Modal/components/Dialog/Dialog.scss';
</style>
