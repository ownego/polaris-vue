<template lang="pug">
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, useAttrs, useSlots } from 'vue';
import { UseFrame } from '@/utilities/frame';
import type { ContextualSaveBarAction, ContextualSaveBarCombinedActionProps } from '@/utilities/frame/types';

export interface ContextualSaveBarProps {
  /** Extend the contents section to be flush with the left edge  */
  alignContentFlush?: boolean;
  /** Accepts a string of content that will be rendered to the left of the actions */
  message?: string;
  /** Save or commit contextual save bar action with text defaulting to 'Save' */
  saveAction?: ContextualSaveBarAction;
  /** Discard or cancel contextual save bar action with text defaulting to 'Discard' */
  discardAction?: ContextualSaveBarCombinedActionProps;
  /** Remove the normal max-width on the contextual save bar */
  fullWidth?: boolean;
  /** Accepts a component that is used to help users switch between different contexts */
  contextControl?: any;
  /** Accepts a node that is rendered to the left of the discard and save actions */
  secondaryMenu?: any;
}

const props = defineProps<ContextualSaveBarProps>();

const { useFrame } = UseFrame();
const {
  setContextualSaveBar,
  removeContextualSaveBar,
} = useFrame();

const slots = useSlots();

onMounted(() => {
  const {
    message,
    saveAction,
    discardAction,
    alignContentFlush,
    fullWidth,
  } = props;

  setContextualSaveBar({
    message,
    saveAction,
    discardAction,
    alignContentFlush,
    fullWidth,
    contextControl: slots.contextControl && slots.contextControl(),
    secondaryMenu: slots.secondaryMenu && slots.secondaryMenu(),
  });
});

onBeforeUnmount(() => {
  removeContextualSaveBar();
});
</script>
