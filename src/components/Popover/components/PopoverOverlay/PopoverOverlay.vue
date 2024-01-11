<template lang="pug">
</template>

<script setup lang="ts">
import {
  useCssModule,
  ref,
  reactive,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import { themeDefault } from '@shopify/polaris-tokens';
import { overlay } from '@polaris/components/shared';
import { classNames } from '@/utilities/css';
import { usePortalsManager } from '@/use/usePortalsManager';
import { findFirstKeyboardFocusableNode } from '@/utilities/focus';
import { isElementOfType, wrapWithComponent } from '@/utilities/component';
import {
  nodeContainsDescendant,
  wasContentNodeDescendant,
  wasPolarisPortalDescendant,
} from './utilities';

import {
  EventListener,
  KeyPressListener,
  PositionedOverlay,
} from '@/components';
import { Pane } from '../Pane';

import type{ Key } from '@/utilities/types';
import type { PortalsContainerElement } from '@polaris/utilities/portals';
import type { PositionedOverlayProps } from '@/components/PositionedOverlay/PositionedOverlay.vue';
import type { PaneProps } from '../Pane/Pane.vue';

export enum PopoverCloseSource {
  Click,
  EscapeKeypress,
  FocusOut,
  ScrollOut,
}

export type PopoverAutofocusTarget = 'none' | 'first-node' | 'container';

enum TransitionStatus {
  Entering = 'entering',
  Entered = 'entered',
  Exiting = 'exiting',
  Exited = 'exited',
}

export interface PopoverOverlayProps {
  fullWidth?: boolean;
  fullHeight?: boolean;
  fluidContent?: boolean;
  preferredPosition?: PositionedOverlayProps['preferredPosition'];
  preferredAlignment?: PositionedOverlayProps['preferredAlignment'];
  active: boolean;
  id: string;
  zIndexOverride?: number;
  activator: HTMLElement;
  preferInputActivator?: PositionedOverlayProps['preferInputActivator'];
  sectioned?: boolean;
  fixed?: boolean;
  hideOnPrint?: boolean;
  autofocusTarget?: PopoverAutofocusTarget;
  preventCloseOnChildOverlayClick?: boolean;
  captureOverscroll?: boolean;
}

interface State {
  transitionStatus: TransitionStatus;
}

type Emit = {
  close: [event: PopoverCloseSource];
}

const styles = useCssModule();

const context = usePortalsManager();

const props = defineProps<PopoverOverlayProps>();

const emits = defineEmits<Emit>();

const state = reactive<State>({
  transitionStatus: props.active
    ? TransitionStatus.Entering
    : TransitionStatus.Exited,
});

const contentNode = ref<HTMLElement | null>(null);
const enteringTimer = ref<number | undefined>(undefined);
const overlayRef = ref<HTMLElement | null>(null);

watch(
  () => props.active,
  (newVal, oldVal) => {
    if (newVal && !oldVal) {
      focusContent();
      changeTransitionStatus(TransitionStatus.Entering, () => {
        clearTransitionTimeout();

        enteringTimer.value = window.setTimeout(() => {
          state.transitionStatus = TransitionStatus.Entered;
          // Important: This will not update when the active theme changes.
          // Update this to `useTheme` once converted to a function component.
        }, parseInt(themeDefault.motion['motion-duration-100'], 10));
      })
    }

    if (!newVal && oldVal) {
      clearTransitionTimeout();

      state.transitionStatus = TransitionStatus.Exited;
    }
  }
);

onMounted(() => {
  if (props.active) {
    focusContent();
    
    changeTransitionStatus(TransitionStatus.Entered);
  }
});

onBeforeUnmount(() => {
  clearTransitionTimeout();
});

const changeTransitionStatus = (transitionStatus: TransitionStatus, callback?: () => void) => {
  state.transitionStatus = transitionStatus;

  callback && callback();

  contentNode.value && contentNode.value.getBoundingClientRect();
};

function clearTransitionTimeout() {
  if (enteringTimer.value) {
    window.clearTimeout(enteringTimer.value);
  }
}

function focusContent() {
  const { autofocusTarget = 'container' } = props;

  if (autofocusTarget === 'none' || contentNode.value === null) {
    return;
  }

  requestAnimationFrame(() => {
    if (contentNode.value === null) {
      return;
    }

    const focusableChild = findFirstKeyboardFocusableNode(contentNode.value);

    // TODO: check if env variables is using correctly
    if (focusableChild && autofocusTarget === 'first-node') {
      focusableChild.focus({
        preventScroll: process.env.NODE_ENV === 'development',
      })!;
    } else {
      contentNode.value.focus({
        preventScroll: process.env.NODE_ENV === 'development',
      });
    }
  });
}

function handleClick(event: Event) {
  const target = event.target as HTMLElement;
  const tmpContentNode = contentNode.value;
  const { activator, preventCloseOnChildOverlayClick } = props;
  const composedPath = event.composedPath();
  const wasDescendant = preventCloseOnChildOverlayClick
    ? wasContentNodeDescendant(composedPath, target)
    : nodeContainsDescendant(composedPath, tmpContentNode);
  const isActivatorDescendant = nodeContainsDescendant(activator, target);

  if (
    wasDescendant
    || isActivatorDescendant
    || state.transitionStatus !== TransitionStatus.Entered
  ) {
    return;
  }

  emits('close', PopoverCloseSource.Click);
}

function handleScrollOut() {
  emits('close', PopoverCloseSource.ScrollOut);
}

function handleEscape(event: Event) {
  const target = event.target as HTMLElement;
  const tmpContentNode = contentNode.value;
  const activator = props;
  const composedPath = event.composedPath();
  const wasDescendant = wasContentNodeDescendant(composedPath, tmpContentNode);
  const isActivatorDescendant = nodeContainsDescendant(activator, target);

  if (wasDescendant || isActivatorDescendant) {
    emits('close', PopoverCloseSource.EscapeKeypress);
  }
}

function handleFocusFirstItem() {
  emits('close', PopoverCloseSource.FocusOut);
}

function handleFocusLastItem() {
  emits('close', PopoverCloseSource.FocusOut);
}
</script>

<style lang="scss" module>
@import '@polaris/components/Popover/Popover.scss';
</style>
